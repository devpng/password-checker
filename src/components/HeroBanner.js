import React from 'react';
import Avatar from './../assets/avatar.jpeg';

class HeroBanner extends React.Component {
    render() {
        return (
            <div className="hero-banner">
                <div className="hero-banner_content">
                    <h2>Protect your Data.</h2>

                    <div className="hero-banner_content-testimonial">
                        <p>"Passwords are like underwear: you don't let people see it, you should change it very often, and you shouldn't share it with strangers."</p>
                    </div>

                    <div className="hero-banner_content-avatar">
                        <img src={Avatar}></img>

                        <div className="hero-banner_content-avatar-content">
                            <p>Rafael B. Desuyo Jr.</p>
                            <p>Frontend Developer</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeroBanner;