import React from "react";
import { useLineBreaks } from "./Utilities";
import "./Homepage.css";
import "./Utilities.css";
import "./Colors.css";
import BackButton from "./BackButton";
import './GamePage.css';

function GamePage() {
    const gameText = (
        <p>
            I love playing video games! I've been doing so since very young and I love experiencing & immersing into new worlds and stories in the games I play. <br />
            I also enjoy playing a lot of multiplayer games as a way to socialize with other. Feel free to add me on steam, my friend ID is 162943405.<br />
            RPG Maker Horror games will always hold a special place in my heart and I love them ♥ <br />
        </p>
    );
    const likedGames = (
        <p>
            ♥ Pocket Mirror ♥ <br />
            Ib <br />
            Witch's House <br />
            Crosscode <br />
            Nier Automata <br />
            Kirby and the Forgotten Land <br />
            Honkai Impact 3rd <br />
            Katawa Shoujo (My first VN) <br />
            Alice Madness Returns <br />
            Splatoon <br />
            Pokémon Mystery Dungeon Explorers of Time <br />
            Minecraft <br />
            Halo Reach <br />
            Xenoblade X <br />
            Klonoa <br />
            Paper Mario TTYD <br />
            Beat Saber & Osu <br />
            Monster Hunter <br />
            999 <br />
            Cemetery Mary <br />
        </p>
    );
    const closing = (
        <p>
            There's plenty mroe games that I like playing which aren't on here. It's hard to list them all. <br />
            For the most part when I was younger I played Nintendo games. I also played some old Halo and Call of Duty with my older brother and his friends. <br />
            Messing around with custom maps and game modes in Halo Reach/34 (I forget exactly which) was so fun when friends would come over <br />
            <br />
            A lot of my childhood was also taken up with Minecraft classic servers. I played a lot of Blocktopia Zombie Survival and met some of my most longstanding friends there ♥<br />
        </p>
    );

    return (
        <div className="background-aurora-image">
            <div className="background-aurora-color">
                <BackButton />
                <div className="textbox">
                    <div className="body-text">
                        {gameText}
                    </div>
                </div>
                <div className="textbox">
                    <div className="body-text">
                        {likedGames}
                    </div>
                </div>
                <div className="textbox">
                    <div className="body-text">
                        {closing}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamePage;
