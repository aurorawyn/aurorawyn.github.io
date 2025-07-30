import React from "react";
import { useLineBreaks } from "./Utilities";
import "./Homepage.css";
import "./Utilities.css";
import "./Colors.css";
import BackButton from "./BackButton";
import './SocialPage.css';

function SocialPage() {
    const openingText = (
        <p>
            Outside of discord I honestly don't really have many social media things. <br />
            Part of it is that I can have a lot of anxiety when talking to new people in a public-ish area and the vastness of social media like twitter makes me hesitant. <br />
            Another part is that for the longest time I hadn't really settled on a single username/account name to use for things so I feel I don't have a solid identity of sorts <br />
        </p>
    )
    const socials = (
        <p>
            Discord: aurorawyn <br />
            Twitch: aurorawyn <br />
            Osu: Harpae <br />
            League: Harpae#NA1 or Harpae#EUW <br />
            VR Chat: aurorawyn <br />
            Steam Code: 162943405 <br />
            FFXIV: Yuki Hanari @ Faerie <br />
        </p>
    )

    return (
        <div className="background-aurora-image">
            <div className="background-aurora-color">
                <BackButton />
                <div className="textbox">
                    <div className="body-text">
                        {openingText}
                    </div>
                </div>
                <div className="textbox">
                    <div className="header-text">
                        {socials}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialPage;
