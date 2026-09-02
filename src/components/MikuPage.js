import { useEffect, useState, useRef } from "react";
import { Player } from "textalive-app-api";
import React from "react";
import "./MikuPage.css";

function MikuPage() {
    // Static values for changing animation things
    const INIT_OFFSET = 10;
    const ZCORRECTION = 0.05;
    const STAR_ROTATION_SPEED_INVERSE = 8.0;
    const NORMAL_STAR_SIZE = 300;
    const ZOOM_TIME = 1.0;
    const X_OFFSET_FROM_CENTER = 25;

    // Enum/state values
    const STATE_NO_RENDER = 1; // Don't render. Either too far away in song or completely done
    const STATE_BACKGROUND = 2; // Just rotating in background
    const STATE_ZOOMING_TO = 3; // zooming the camera towards this thing
    const STATE_MAIN_STAGE = 4; // rendering lyrics at main stage
    const STATE_LEAVING = 5; // drifting off the screen


    // Use useState for things that need to re-render on change and are NOT time sensitive relative to other things in the same frame
    const [loadingText, setLoadingText] = useState("Miku!");
    const [lyrics, setLyrics] = useState("");
    const [debug, setDebug] = useState("");
    const [songLoaded, setSongLoaded] = useState(false);
    const [curPosition, setCurPosition] = useState(0);

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
    const curPhraseId = useRef(0);

    const leftX = useRef(0);
    const rightX = useRef(100);
    const topY = useRef(0);
    const bottomY = useRef(100);
    const curZ = useRef(0);
    const animationFrameRef = useRef(null);
    const [forceRender, setForceRender] = useState(0);

    function RandBetween(min, max) {
        return Math.random() * (max-min) + min;
    }

    class LyricStar {
        phraseId = 0;
        baseX = 0;
        baseY = 0;
        baseZ = 0;
        size = 0;
        rotationOffset = 0;
        rotationParity = 0;
        rotation = 0;
        phrase = null;
        chars = [];
        state = STATE_NO_RENDER;

        lastTime = 0;
        xDist = 0;
        yDist = 0;
        zDist = 0;

        startLeftX = 0;
        startRightX = 100;
        startTopY = 0;
        startBottomY = 100;
        startZ = 0;

        totalZoom = 0;
        zoomStartTime = 0;

        update(now) {
            if(this.state == STATE_NO_RENDER) {

            }
            else if(this.state == STATE_BACKGROUND) {
                if(this.phraseId == curPhraseId.current) {
                    this.startZoom();
                }
            }
            else if(this.state == STATE_MAIN_STAGE) {

            }
            else if(this.state == STATE_ZOOMING_TO) {
                this.updateZoom(now);
            }
            else if(this.state == STATE_LEAVING) {
            
            }
            
            this.rotation = this.rotationOffset + (this.rotationParity * now/STAR_ROTATION_SPEED_INVERSE);
            this.lastTime = now;
        }

        startZoom() {
            this.state = STATE_ZOOMING_TO;

            this.startLeftX = leftX.current;
            this.startRightX = rightX.current;
            this.startTopY = topY.current;
            this.startBottomY = bottomY.current;
            this.startZ = curZ.current;

            let centerX = (leftX.current + rightX.current) / 2.0;
            let centerY = (topY.current + bottomY.current) / 2.0;

            this.xDist = (this.baseX + X_OFFSET_FROM_CENTER) - centerX;
            this.yDist = this.baseY - centerY;
            this.zDist = this.baseZ - curZ.current;

            this.zoomStartTime = performance.now();
        }

        updateZoom(now) {
            if (this.state !== STATE_ZOOMING_TO) {
                return;
            }

            let elapsed = (now - this.zoomStartTime) / 1000.0;

            let t = Math.min(elapsed / ZOOM_TIME, 1.0);

            leftX.current =
                this.startLeftX + this.xDist * t;

            rightX.current =
                this.startRightX + this.xDist * t;

            topY.current =
                this.startTopY + this.yDist * t;

            bottomY.current =
                this.startBottomY + this.yDist * t;

            curZ.current =
                this.startZ + this.zDist * t;

            if (t >= 1.0) {
                this.state = STATE_MAIN_STAGE;
            }
        }

        animate(curTime) {
            if(this.state == STATE_NO_RENDER) {
            }
            else if(this.state == STATE_BACKGROUND) {
            }
            else if(this.state == STATE_MAIN_STAGE) {
                // Check for when to move to LEAVING & increment curPhraseId
                if(this.chars[this.chars.length-1].endTime < curTime) {
                    curPhraseId.current = curPhraseId.current + 1;
                    this.state = STATE_LEAVING;
                }
            }
            else if(this.state == STATE_ZOOMING_TO) {
            }
            else if(this.state == STATE_LEAVING) {
            }
            // Check lyrics
        }

        render() {
            let realX = this.baseX - leftX.current;
            let realY = this.baseY - topY.current;

            // Based on how far away we are from the current phrase (phraseId - curPhraseId, send the coordinates a bit more towards center (leftX+rightX)/2). Linear or slow exponential? 
            // (simulating FOV stuff)
            // WILL NEED TO HANDLE SUDDEN TRANSITION -> MAKE IT SMOOTH SOMEHOW

            let zDiff = this.baseZ - curZ.current;
            let percentCorrection = ZCORRECTION * zDiff;
            if (percentCorrection < -1) percentCorrection = -1;
            if (percentCorrection > 1) percentCorrection = 1;

            // // Move percentCorrection towards center
            let centerX = (leftX.current + rightX.current)/2.0;
            let centerY = (topY.current + bottomY.current)/2.0;
            realX = realX + (centerX - realX) * percentCorrection;
            realY = realY + (centerY - realY) * percentCorrection;

            // Now change size based off of zDiff
            // If zDiff < -1, should be 0. This star has already moved 'behind' camera
            // if zDiff > 3, should be 0. Only wanna show first 3 stars??
            let sizeMult = 0;
            if (zDiff < 0) {
                sizeMult = -2.0 * zDiff + 1;
            } else {
                sizeMult = (1.0/(10*zDiff + 1));
            }
            
            // If too far away/not supposed to be visible, return nothing
            if(sizeMult < 0) {
                return <div />
            }
            // Cap at 3x size
            if(sizeMult > 3) sizeMult = 3;
            this.size = sizeMult * NORMAL_STAR_SIZE;

            return (
                <div>
                    {/* <div> Test! {this.baseX} {this.baseY} {realX} {realY} </div> */}
                    <img src="/images/Star.png" alt="Star" style={{position: "absolute", left: `${realX}%`, top: `${realY}%`, width: `${this.size}px`, transform: `translate(-50%, -50%) rotate(${(this.rotation)%360}deg)`}}/>
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
            let lyricStar = phraseToLyricStar.current.get(unit);
            lyricStar.animate(now);
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
                let curX = (50.0 - X_OFFSET_FROM_CENTER) + RandBetween(-INIT_OFFSET, INIT_OFFSET);
                let curY = 50.0 + RandBetween(-INIT_OFFSET, INIT_OFFSET);
                let curCenterX = 50;
                let curCenterY = 50;

                while(p) {
                    phraseToIndex.current.set(p, i);
                    // Make the lyricStar object
                    let lyricStar = new LyricStar();
                    
                    // Set it's X/Y values and phrase/char values
                    lyricStar.baseX = curX;
                    lyricStar.baseY = curY;
                    lyricStar.phrase = p;
                    lyricStar.phraseId = i;
                    lyricStar.baseZ = i;
                    lyricStar.rotationOffset = RandBetween(0, 360);
                    lyricStar.rotation = lyricStar.rotationOffset;
                    if (i == 0) {
                        lyricStar.state = STATE_MAIN_STAGE;
                    } else {
                        lyricStar.state = STATE_BACKGROUND;
                    }

                    if (RandBetween(0, 1) < 0.5) {
                        lyricStar.rotationParity = 1;
                    }
                    else {
                        lyricStar.rotationParity = -1;
                    }
                    let pc = p.firstChar;
                    while(pc) {
                        lyricStar.chars.push(pc);
                        if (pc == p.lastChar) break;
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
                    
                    // Next star will be the current center of screen's coords + the random offset from -50 to 50
                    curX = curCenterX + (nextX - 50);
                    curY = curCenterY + (nextY - 50);

                    // Next center will be +25 in x from where the star is, and keep same Y
                    curCenterX = curX - X_OFFSET_FROM_CENTER;
                    curCenterY = curY;

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

    // Animation requests
    useEffect(() => {
        let running = true;

        const renderLoop = () => {
            if (!running) return;
            // Update all active animations
            for (let ind = 0; ind < lyricStarList.current.length; ind++) {
                let star = lyricStarList.current[ind];
                star.update(performance.now());
            }

            setForceRender(prev => prev + 1);

            animationFrameRef.current =
                requestAnimationFrame(renderLoop);
        };

        animationFrameRef.current =
            requestAnimationFrame(renderLoop);

        return () => {
            running = false;

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);
    
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
            {/* <img className="starImage" src="/images/Star.png" alt="Star" style={{width: "300px", transform: `translate(-50%, -50%) rotate(${(-curPosition/8.0)%360}deg)`}}/> */}
            <div className="lyrics">
                {lyrics}
            </div>
            <div className="lyrics">
                {debug}
            </div>
            {lyricStarList.current.map((star, index) => star.render())}
        </div>
    );
}
export default MikuPage;