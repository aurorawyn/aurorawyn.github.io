import { useEffect, useState, useRef } from "react";
import { Player } from "textalive-app-api";
import React from "react";
import "./MikuPage.css";

function MikuPage() {
    const [text, setText] = useState("Miku!");
    const [lyrics, setLyrics] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [curPosition, setCurPosition] = useState(0);
    const playerRef = useRef(null);
    const initializedRef = useRef(false);
    const lastWord = useRef("");

    useEffect(() => {
        if(playerRef.current) return; // prevent double initialization
        const player = new Player({
            app: {
                token: "uDkMf2dBIXUprPNR",
            },
        });
        playerRef.current = player;

        player.addListener({
            onAppReady: (app) => {
                if (!app.managed) {
                    if(!initializedRef.current) { // Prevent loading song twice
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
                        initializedRef.current = true;
                    }
                }
                setText(prev => prev + " App Ready!");
            },
            onVideoReady: (v) => {
                setText(prev => prev + " Song ["+player.data.song.name+"] Ready!");
            },
            onTimerReady: (t) => {
                setText(prev => prev + " Timer Ready!");
                setLoaded(true);
            },
            onPlay: () => {
                player.volume = 5;
            },
            onTimeUpdate: (position) => {
                // const word = player.video?.findWord(position);
                // if(word && word != lastWord.current) {
                //     setLyrics(prev => prev + word);
                // }
                // lastWord.current = word;

                // CURRENT WAY OF DOING THINGS SKIPS LYRICS!!! LOOK THROUGH ALL WORDS AND MAKE THE RENDER FUNCTION!!! Cause the Ku and Question mark are presumably at the exact same position!

                const curChar = player.video?.findChar(position);
                if (curChar && curChar != lastWord.current) {
                    setLyrics(prev => prev + curChar);
                }
                lastWord.current = curChar;
                setCurPosition(position);
            },
        });
    }, []);

    const onPlayButtonClick = () => {
        playerRef.current?.requestPlay();
    }
    const onPauseButtonClick = () => {
        playerRef.current?.requestPause();
    }
    
    return (
        <div className="background">
            {!loaded && (           
                <div className="loadingText">
                    {text}
                </div>
            )}
            {loaded && (
                <div>
                    <button onClick={onPlayButtonClick}>Play</button>
                    <button onClick={onPauseButtonClick}>Pause</button>
                </div>
            )}
            <div className="loadingText">
                {curPosition}
            </div>
            <img className="starImage" src="/images/Star.png" alt="Star" style={{width: "300px", transform: `translate(-50%, -50%) rotate(${(-curPosition/8.0)%360}deg)`}}/>
            <div className="lyrics">
                {lyrics}
            </div>
        </div>
    );
}
export default MikuPage;