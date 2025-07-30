import React from "react";
import { useLineBreaks } from "./Utilities";
import "./Homepage.css";
import "./Utilities.css";
import "./Colors.css";
import BackButton from "./BackButton";
import './MiscPage.css';

function MiscPage() {
    const xcom = <a className="link-text" target="_blank" href="https://www.youtube.com/watch?v=nPO6N2okwYM">this XCOM mission</a>;
    const flipnote = <a className="link-text" target="_blank" href="https://www.youtube.com/watch?v=fEa5DU0l0Yo">flipnote</a>;

    const openingText = (
        <p>
            There's a lot of random other things about me that I'll be putting here. <br />
            This website is as much for others to know about me as it is for me to keep essentially like a diary of my interests and experiences (please be gentle) <br />
        </p>
    );

    const body = (
        <p>
            <b>- Competitive Splatoon -</b> <br />
            When the first Splatoon game came out, I made some friends streamsniping a streamer's lobby. We formed a competitive team together and were widely considered the best team in the west at the start of Splatoon's lifecycle. <br />
            Our team can be read about a bit here and although most of the team parted ways and I don't talk with them as much, I still consider them great friends and they all have a place in my heart. <br />
            I stopped playing competitive to focus on competitive programming in college but might come back for Splatoon 3 now that I graduated. However some bad memories with some other people make me hesitant to go back <br />
            <br />
            <b>- More about Sword Art Online  -</b> <br />
            I won't claim it to be the best anime or anything, but it's definitely one of the anime I've derived the most enjoyment from over the years. I love the anime, and I'm reading through the progressive light novels as well. <br />
            I haven't gotten to the video games yet but I'm excited to play them in the future. Something about the setting I just really enjoy. Part of my interest in VR stemmed from this show most likely <br />
            <br />
            <b>- VR Stuff -</b> <br />
            I really like the concept of VR and have a valve index for playing VR games. Being able to be more immersed in games and environments is something I find wonderful. <br />
            I want to play more VR chat and stuff like that but unfortunately I have a hard time putting myself out there and socializing. <br ></br>
            But I've done stuff like go to some worlds in a private instance and just take in the scenery for hours <br />
            <br />
            <b>- Various things Youtube -</b> <br />
            Watching through lets plays or random series of things on youtube is something I enjoy both alone and together with others. Some of the things I've liked on youtube over the years: <br />
            <b>🞄 ManlyBadassHero:</b> I watched them play through SO many rpg maker horror games & indie games that I really love. I love watching this kind of content with others, it's really snug ^-^ <br />
            <b>🞄 Yogscast:</b> I watched them starting in ~2010 or so. They were a big part of my childhood and I've seen Shadow of Israphael multiple times. Always a great watch. I tune into Jingle Jam every year. Their original XCOM playthrough brings back memories <br />
            <b>🞄 Crystal Star Studio:</b> One of the original lets play groups I watched when I was younger. Their kirby's dream course videos made me really love the game. <br />
            <b>🞄 Usedpizza:</b> His playthrough of A Way Out with a friend I thought was so hilarious and enjoyed so much. Also the firefighter simulator playthrough made me laugh a lot as well. <br />
            <b>🞄 TSM_TheOddOne:</b> {xcom} by oddone is a random video I really enjoy and think about randomly <br />
            <br />
            <b>- Art -</b> <br />
            I can't really express enough how much I love art. People make such pretty art that is nice to look at. I can't draw well myself so admire everyone who draws so well and the work put into it. <br />
            I love looking through art like the backgrounds of these pages. I generally like things 'mystical' or 'beautiful' if I tried to describe what I like <br />
            Although I can't really draw too well, I love to sew! I've sewn a couple dolls as well as costumes for my cosplays. I've made an Egliette doll, Shuichi doll, and a custom one for a friend. The cosplays I've done are on my character fav page ^-^ <br />
            <br />
            <b>- Warrior Cats -</b> <br />
            I read through most of the Warrior Cats series while in elementary school. With some friends we did things like make our own cat names and clans and such. <br />
            I loved the books so much at the time and I've been thinking of re-reading through them sometime. <br />
            Around this time I was really into watching Flipnotes on my ds, and really liked this one {flipnote} series about it <br />
            <br />
            <b>- Mr. Ogle -</b> <br />
            My 5th grade teacher. Amazing person and great educator. Our history lessons were essentially a year long dungeon and dragons campaign for the whole class that I still remember so much about.<br />
            The civil war in american history was a 2 month long event with the class pitted against each other and making our own strategical decisions on the map and playing a custom made board game by the teacher to determine battles. <br />
            It was amazing how much it felt like we were in control of what to do and how the teacher could still steer everything to essentially match what would happen in history. <br />
            <br />
            <b>- Twitch Communities -</b> <br />
            I still mostly lurk in most discords/communities, but the twitch communities I've been most involved in/watched are TSM_TheOddone, Iateyourpie, and UsedPizza.<br />
            Iateyourpie's yearly discord wars which is like a field day (but spanning multiple weeks and for video games) is something I look forward to every year <br />
            <br />
            <b>- More Random Stuff -</b> <br />
            I get scared VERY easily but I still enjoy things like scary games and movies/videos <br />
            I watched all of Sonic X when I was in like 3rd grade. I was amazed with the romance between Tails and Cosmo, and you could essentially say I 'kinned' tails <br />
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
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiscPage;
