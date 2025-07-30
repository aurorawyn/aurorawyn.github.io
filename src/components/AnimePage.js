import React from "react";
import { useLineBreaks } from "./Utilities";
import "./Homepage.css";
import "./Utilities.css";
import "./Colors.css";
import BackButton from "./BackButton";

function AnimePage() {

    const MALLink = <a className="link-text" target="_blank" href="https://myanimelist.net/animelist/HarpaeLV">♥ here ♥</a>;
    const animeText = (
        <p>
            There's a lot of anime that I love so it's hard to narrow it down to a smaller list but I did my best ^-^ <br />
            My MAL is {MALLink} and there's still probably a lot of stuff I love that is left out of this list <br />
        </p>
    );

    const anime = (
        <p>
            ♥ Revue Starlight ♥ <br />
            ♥ Vivy: Flourite Eye's Song ♥ <br />
            Gwain Saga <br />
            Madoka Magica <br />
            Yuuki Yuuna wa Yuusha de aru<br />
            Love Live (Sunshine is fav) <br />
            Tropical Rouge Precure <br />
            Inuyasha <br />
            Mermaid Melody <br />
            Mekakucity Actors/Kagerou Project <br />
            Pokémon <br />
            Hunter x Hunter <br />
            Shinsekai Yori <br />
            Melancholy of Haruhi Suzumiya <br />
            Sword Art Online <br />
            Problem children <br />
            Hayate no Gotoku <br />
            Mairimashita Iruma-kun <br />
            Code Geass <br />
            Sonic X (Nostalgia) <br />
            Bakugan (Nostalgia) <br />
        </p>
    );

    const manga = <p>Manga</p>

    const mangaDesc = <p>
        Not the largest manga reader but there are a few that hold a <br />
        special place in my heart for helping me realize who I am ♥:<br />
            <br />
        - Ookami Shounen Wa Kyou mo Uso wo Kasaneru <br />
        - Fukakai na Boku no Subete wo <br />
            <br />
        Nowadays I mostly just read a ton of different Yuri manga :3 my current favorite is <br />
        Akazukin ni Taberareta Ookami <br />
    </p>;

    const homestuck = <p>
        Not sure where to put it but I am also a big fan of Homestuck. I read it all and really enjoyed all of it but <br />
        never really interacted with the fandom or had people to talk about it with
    </p>

    return (
        <div className="background-aurora-image">
            <div className="background-aurora-color">
                <BackButton />
                <div className="textbox">
                    <div className="body-text">
                        {animeText}
                    </div>
                </div>
                <div className="textbox">
                    <div className="body-text">
                        {anime}
                    </div>
                </div>
                <div className="textbox">
                    <div className="header-text">
                        {manga}
                    </div>
                    <div className="body-text">
                        {mangaDesc}
                    </div>
                </div>
                <div className="textbox">
                    <div className="body-text">
                        {homestuck}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimePage;
