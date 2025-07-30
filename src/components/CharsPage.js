import React from "react";
import { useLineBreaks } from "./Utilities";
import "./Homepage.css";
import "./Utilities.css";
import "./Colors.css";
import BackButton from "./BackButton";
import './CharsPage.css';

function CharsPage() {
    const openingText = (
        <p> 
            Various characters that I really love in anime/video games/anything really! (Although mostly just anime) (guess this is akin to a kin list? not fully tho) <br />
            Given/Family name order probably swapped around for some, I get them mixed up a lot. <br />
            Harpies and bird girls are my favorite designs! (Obviously hehe) Followed by fox/wolf girls :3 <br />
        </p>
    );
    const likedChars = (
        <p>
            ♥ Harpae ♥ <br />
            Ami Le'Viand <br />
            Kuon & Eruruu (Utawarerumono) <br />
            Kasukabe You <br />
            Mary Anta <br />
            Junna Hoshimi <br />
            Sangonomiya Kokomi <br />
            Naganohara Yoimiya <br />
            Botan Kurashiki <br />
            Fuu Inubouzaki <br />
            Lilly Satou <br />
            Lea (Crosscode) <br />
            Estella (Vivy) <br />
            Lizbeth (SAO) <br />
            Konno Yuuki <br />
            Ayano Tateyama <br />
            Rina Touin <br />
            Chihaya Kisaragi <br />
            Maki Nishikino <br />
            Kotori Minami <br />
            Riko Sakurauchi <br />
            Asuka Takizawa <br />
            Kyojuro Rengoku <br />
            Yuuki Yuuna <br />
            Asahi Azumane <br />
            Hoshino Ichika <br />
            Madoka Kaname <br />
            Suzuki Iruma <br />
            Hayate Shizuki <br />
            Izayoi Sakamaki <br />
            Sakurai Yuuta <br />
            Hinagiku Katsura <br />
        </p>
    );
    const closing = (
        <p>
            I also love cosplaying! Characters I've cosplayed: Izayoi Sakamaki | John Egbert | Hayate Shizuki | Harpae | Cure Flamingo | Fu Hua (Hi3) | Suu (Hi3) <br />
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
                        {likedChars}
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

export default CharsPage;
