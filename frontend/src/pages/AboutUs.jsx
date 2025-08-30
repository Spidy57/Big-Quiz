import React from "react";

import ProfileCard from "../components/ProfileCard";

import limbu from "../assets/limbu.jpg";
import spidy from "../assets/spidy.png";
import jum from "../assets/jemssiu.jpg";

import rogan from "../assets/rogan.png";
import jogan from "../assets/jogan.png";
import rajogan from "../assets/rajogan.png";

import "./AboutUs.css";

const AboutUs = () => {
    return (
        <>
        <h1 className="aboutus-title">Meet the Parmars: </h1>
            <div className="aboutus-wrapper">
                <ProfileCard
                    name="Rajdeep Thorat"
                    title="Gugu"
                    handle="LimbuLemon"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl={rajogan}
                    miniAvatarUrl={limbu}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => window.open('https://github.com/RajdeepThorat', '_blank')}
                />
                <ProfileCard
                    name="Rohan Patil"
                    title="Patil ke 7% ka hakdar"
                    handle="Spidy57"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl={rogan}
                    miniAvatarUrl={spidy}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => window.open('https://github.com/Spidy57', '_blank')}
                />
                <ProfileCard
                    name="Jemish Koladiya"
                    title="Lil bro"
                    handle="DWMDemon"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl={jogan}
                    miniAvatarUrl={jum}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => window.open('https://github.com/Jemish-debug', '_blank')}
                />
            </div>
        </>
    );
};

export default AboutUs;
