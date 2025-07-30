import React from "react";
import { useLineBreaks } from "./Utilities";
import "./Homepage.css";
import "./Utilities.css";
import { Link } from "react-router-dom";

function Homepage() {
    function toggleAudio() {
        var x = document.getElementById("promiseBGM");
        if (x.paused) {
            x.currentTime = 0;
            x.play();
            x.volume = 0.4;
        } else {
            x.pause();
        }
    }

    var storageValue = sessionStorage.getItem("hasVisitedThisSession");
    var useAnimation = true;
    if (storageValue === "true") {
        useAnimation = false;
    }


    var bgColorString = "background-aurora-color homepage-bg-color" + (useAnimation ? " homepage-bg-color-animation" : "");   
    var titleCardString = "header-text homepage-titlecard" + (useAnimation ? " homepage-titlecard-animation" : "");
    var descriptionString = "body-text homepage-description" + (useAnimation ? " homepage-description-animation" : "");
    var imageString = "homepage-image" + (useAnimation ? " homepage-image-animation" : "");
    var musicString = "homepage-music-symbol" + (useAnimation ? " homepage-music-symbol-animation" : "");

    const title = "AuroraWyn";
    const description = `Hello! I used to mostly go by Poke or Harpae, but now\n`
      + `I'm trying to use AuroraWyn for most things!\n`
      + `I'm 26/f translesbian but still kinda figuring myself out\n`
      + `and just vibing. Feel free to call me Aurora, Rory, or Lexi\n\n`
      + `Fan of all things video games and anime. I enjoy singing,\n`
      + `cosplaying, and sewing in my free-time. Very shy when it comes\n`
      + `to initiating conversion but would be happy to talk about\n`
      + `anything listed on here! (This site is a WIP ^-^)\n`;

    const pages = [
        ['Anime interests', '/anime'],
        ['Game interests', '/games'],
        ['Character favorites', '/chars'],
        ['Music', '/music'],
        ['Miscellaneous Things', '/misc'],
        ["Socials n' stuff", '/socials'],
    ];
    
    const navClick = () => sessionStorage.setItem("hasVisitedThisSession", "true");

    const navigation = pages.map(links => {      
        return (
            <Link className="homepage-link" to={links[1]} onClick={navClick}>{links[0]}{useAnimation}</Link>
        )
    })
    const musicSymbol = "♫";

    return (
      <div className="background-aurora-image">
        <div className={bgColorString}>
            <div className={titleCardString}>{title}</div>
            <div className={descriptionString}>
                {useLineBreaks(description)}
                {navigation}
            </div>
            <img className={imageString} src="/images/pocketMirror.png" alt="pocket mirror" onClick={toggleAudio}/>
            <div className={musicString}>{musicSymbol}</div>
        </div>
      </div>
    )
}

export default Homepage;