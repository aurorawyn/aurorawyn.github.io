import React from "react";
import { useLineBreaks } from "./Utilities";
import "./Homepage.css";
import "./Utilities.css";
import "./Colors.css";
import BackButton from "./BackButton";
import './MusicPage.css';

function MusicPage() {
    const playlistLink = <a className="link-text" target="_blank" href="https://www.youtube.com/playlist?list=PLo8MrfdM9puZEGdO7-K2bayBZ-zGyUv3o">♥ here ♥</a>;
    const stopOneHeart = <a className="link-text" target="_blank" href="https://www.youtube.com/watch?v=xFHNWJVsjmY">If I Can Stop One Heart From Breaking</a>;
    const imprisonedXII = <a className="link-text" target="_blank" href="https://www.youtube.com/watch?v=1_0LTMNKYGo">Imprisoned XII</a>;
    const threeMagic = <a className="link-text" target="_blank" href="https://www.youtube.com/watch?v=RlZSxYgIc0s">Three Magic</a>;
    const juvenile = <a className="link-text" target="_blank" href="https://www.youtube.com/watch?v=N2-HzUpMY7c">Juvenile</a>;
    const asunaTheme = <a className="link-text" target="_blank" href="https://www.youtube.com/watch?v=zLGgKJWZoZE">This fan-made Asuna theme</a>;
    const openingText = (
        <p> 
            Music ♥ I'm always listening to music and it's a large part of every day for me. Most of the stuff I listen to is anime music and video game ost. I also play lots of Osu and Beat Saber <br />
            Music makes me feel so emotional and I love sharing all the music I love with others. I also love to sing and want to Karaoke more with others ♥ <br />
            I have a giant playlist of all the random songs I've liked! It's {playlistLink} and includes everything I've liked including random nightcore from 2012 :3c <br />
            Some of my favorite songs of all time: <br />
            {stopOneHeart} <br />
            {imprisonedXII} <br />
            {threeMagic} <br />
            {juvenile} <br />
        </p>
    );

    const musicText = (
        <p>
            <b>♥ Project Voltage ♥</b> <br />
            As a really big fan of Pokemon, Anime, and Hatsune Miku, project voltage hits all the things I really love and listening to project voltage songs always makes me happy! <br />
            Fav Songs: <i>Juvenile | Glorious Days</i><br />
            <br />
            <b>- Revue Starlight -</b> <br />
            Revue Starlight is amazing and currently one of the things I'm obsessed with. The movie was 10/10 amazing for me<br />
            Fav Songs: <i>The Star Knows | Hokori to Ogori | Wild Screen Baroque | Koi no Makyuu | Star Diamond</i><br />
            <br />
            <b>- Love Live -</b> <br />
            I listen to love live music all the time. I love the upbeat songs and how others focus on emotion and feelings. Fan of Saint Snow and Guilty Kiss. <br />
            Fav Songs: <i>My Mai Tonight | Tousou Meisou Mobius Loop | Believe Again | Pure Phrase | Aishiteiru Banzai | Over The Next Rainbow | Omoi yo hitotsu ni nare</i><br />
            <br />
            <b>- Kagerou Project -</b> <br />
            I like the idea of telling stories through songs and visuals like this <br />
            Fav Songs: <i>Ayano's Theory of Happiness | Kirasagi Attention | Imagination Forest</i><br />
            <br />
            <b>- Mermaid Melody -</b> <br />
            Mermaid Melody is something I watched a long time go and I love the songs from it, they have a lot of nostalgia for me <br />
            Fav Songs: <i>Legend of Mermaid | Ever Blue | Super Love Songs! | Just what is love? | Voice in the Dark | Beautiful Wish</i><br />
            <br />
            <b>- Pokémon -</b> <br />
            Music from the Pokémon anime always will have a lot of nostalgia for me and I also still love listening to them now <br />
            Fav Songs: <i>Make a Wish | Primal Dialga Theme | My Best Friends | Battle Cry</i><br />
            <br />
            <b>- Some random Bands/Artists I've listened a lot to -</b> <br />
            <i>Sekai No Owari | Goose House | One OK Rock | Kalafina | Reol | Bump of Chicken | Bradio | Do As Infinity | LiSA | FLOW | Minami | Eve | Yuzu</i><br />
            <br />
            <b>- Various other things-</b> <br />
            The first song that really got me into listening to anime music was Alchemy from Angel Beats which was one of the first shows that I watched. <br />
            3L - Three Magic from Touhou is the first song I played in Osu and has a lot of nostalgia for me <br />
            {asunaTheme} for SAO makes me really emotional and I listened to it a lot when I was younger <br />
        </p>
    );
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
                    <div className="body-text">
                        {musicText}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicPage;
