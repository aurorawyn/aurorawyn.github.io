import { useEffect, useState, useRef } from "react";
import { Player } from "textalive-app-api";
import React from "react";
import "./MikuPage.css";

function MikuPage() {
    // Use useState for things that need to re-render on change and are NOT time sensitive relative to other things in the same frame
    const [loadingText, setLoadingText] = useState("Miku!");
    const [lyrics, setLyrics] = useState("");
    const [songLoaded, setSongLoaded] = useState(false);
    const [curPosition, setCurPosition] = useState(0);
    const [forceRender, setForceRender] = useState(0);

    // Use useRef for anything that may have a race condition with something in the same frame
    const charToIndex = useRef(new Map());
    const wordToIndex = useRef(new Map());
    const phraseToIndex = useRef(new Map());
    const charMetadata = useRef(new Map());
    const phraseToLyricStar = useRef(new Map());
    const lyricStarList = useRef([]);
    const playerRef = useRef(null);
    const curPhrase = useRef(-1);
    const songInitializedRef = useRef(false);
    const beatId = useRef(-1);
    const lastBeatStart = useRef(-1);

    // Values for rendering lyricStars
    const [curPhraseId, setCurPhraseId] = useState(0);
    const [leftX, setLeftX] = useState(0);
    const [rightX, setRightX] = useState(100);
    const [topY, setTopY] = useState(0);
    const [bottomY, setBottomY] = useState(100);


    function RandBetween(min, max) {
        return Math.random() * (max-min) + min;
    }

    class LyricStar {
        phraseId = 0;
        baseX = 0;
        baseY = 0;
        size = 0;
        rotation = 0;
        phrase = null;
        chars = [];
        animate() {
            if (this.phraseId == curPhraseId) {
                setForceRender(prev => prev + 1);
            }
        }

        render() {
            let realX = this.baseX - leftX;
            let realY = this.baseY - topY;
            // if(realX <= 0 || realX >= 100 || realY <= 0 || realY >= 100) {
            //     return <div />
            // }

            // X from 0 to 100 is more like 0 to 40 in the real thing, so multiply X by 0.4
            realX = realX * 0.4;

            return (
                <div>
                    <div> Test! {this.baseX} {this.baseY} {realX} {realY} </div>
                    <img src="/images/Star.png" alt="Star" style={{position: "absolute", left: `${realX}%`, top: `${realY}%`, width: "30px", transform: `translate(-50%, -50%) rotate(${(this.rotation)%360}deg)`}}/>
                </div>
            )
        }
    }

    useEffect(() => {
        if(playerRef.current) return; // prevent double initialization for player. This is all the app setup stuff

        // Get player using my token
        const player = new Player({
            app: {
                token: "uDkMf2dBIXUprPNR",
            },
        });
        // set playerRef so that we know it's initialized now
        playerRef.current = player;

        // Animate function for char
        const animateChar = (now, unit) => {
            // Now is the current time, unit is the IChar that this refers to
            if(unit.startTime <= now) {
                const idx = charToIndex.current.get(unit);
                const meta = charMetadata.current.get(idx);
                if(!meta.loaded) {
                    // Load this character~!
                    // In theory, this should be parent.parent
                    const phrase = unit.parent?.parent;
                    if (phrase) {
                        const pIdx = phraseToIndex.current.get(phrase);
                        // If in a new phrase, reset lyrics
                        if(pIdx != curPhrase.current) {
                            curPhrase.current = pIdx;
                            setLyrics("");
                        }
                    }
                    setLyrics(prev => prev + unit.text);
                    meta.loaded = true;
                }
            }
        }

        const animatePhrase = (now, unit) => {
            // Now is current time, Unit is the IPhrase.

        }

        player.addListener({
            onAppReady: (app) => {
                if (!app.managed) {
                    if(!songInitializedRef.current) { // Prevent loading song twice
                        //Create song
                        player.createFromSongUrl("https://piapro.jp/t/CyPO/20250128183915", {
                            video: {
                                // 音楽地図訂正履歴
                                beatId: 4694280,
                                chordId: 2830735,
                                repetitiveSegmentId: 2946483,
                            
                                // 歌詞URL: https://piapro.jp/t/jn89
                                // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FCyPO%2F20250128183915
                                lyricId: 67815,
                                lyricDiffId: 20659
                            },
                        });
                        songInitializedRef.current = true;
                    }
                }
                setLoadingText(prev => prev + " App Ready!");
            },
            onVideoReady: (v) => {
                setLoadingText(prev => prev + " Song ["+player.data.song.name+"] Ready!");
                // Loop through all characters and set their indeces in the map, and set their animate function to what is above
                let i = 0;
                let c = player.video.firstChar;
                while(c) {
                    charToIndex.current.set(c, i);
                    charMetadata.current.set(i, {
                        loaded: false,
                    });
                    c.animate = animateChar;
                    c = c.next;
                    i++;
                }

                i = 0;
                let w = player.video.firstWord;
                while(w) {
                    wordToIndex.current.set(w, i);
                    w = w.next;
                    i++;
                }
                i = 0;

                let p = player.video.firstPhrase;
                let curX = 50.0 + RandBetween(-10, 10);
                let curY = 50.0 + RandBetween(-10, 10);
                while(p) {
                    phraseToIndex.current.set(p, i);
                    // Make the lyricStar object
                    let lyricStar = new LyricStar();
                    
                    // Set it's X/Y values and phrase/char values
                    lyricStar.baseX = curX;
                    lyricStar.baseY = curY;
                    lyricStar.phrase = p;
                    lyricStar.phraseId = i;
                    lyricStar.rotation = RandBetween(0, 360);
                    let pc = p.firstChar;
                    while(pc) {
                        lyricStar.chars.push(pc);
                        pc = pc.next;
                    }
                    p.animate = animatePhrase;
                    phraseToLyricStar.current.set(p, lyricStar);
                    lyricStarList.current.push(lyricStar);
                    
                    // dumb while loop but shouldn't run for too long lmao
                    let nextX = RandBetween(5, 95);
                    let nextY = RandBetween(5, 95);
                    // Don't want it to be near center so retry if matches this
                    while((nextY >= 40 && nextY <= 60 && nextX >= 40)) {
                        nextX = RandBetween(5, 95);
                        nextY = RandBetween(5, 95);
                    }
                    
                    curX = curX + (nextX - 50);
                    curY = curY + (nextY - 50);
                    p = p.next;
                    i++;
                }

            },
            onTimerReady: (t) => {
                setLoadingText(prev => prev + " Timer Ready!");
                setSongLoaded(true);
            },
            onPlay: () => {
                player.volume = 5;
            },
            onTimeUpdate: (position) => {
                const beat = player.findBeat(position);
                if(lastBeatStart.current != beat.startTime) {
                    lastBeatStart.current = beat.startTime;
                    beatId.current = beatId.current + 1;
                }
                setCurPosition(position);
            },
        });
    }, []);

    // Pause/play buttons
    const onPlayButtonClick = () => {
        playerRef.current?.requestPlay();
    }
    const onPauseButtonClick = () => {
        playerRef.current?.requestPause();
    }
    
    return (
        <div className="background">
            {!songLoaded && (           
                <div className="loadingText">
                    {loadingText}
                </div>
            )}
            {songLoaded && (
                <div>
                    <button onClick={onPlayButtonClick}>Play</button>
                    <button onClick={onPauseButtonClick}>Pause</button>
                </div>
            )}
            <div className="loadingText">
                {curPosition}
            </div>
            <div className="loadingText">
                {beatId.current}
            </div>
            <img className="starImage" src="/images/Star.png" alt="Star" style={{width: "300px", transform: `translate(-50%, -50%) rotate(${(-curPosition/8.0)%360}deg)`}}/>
            <div className="lyrics">
                {lyrics}
            </div>
            {lyricStarList.current.map((star, index) => star.render())}
        </div>
    );
}
export default MikuPage;