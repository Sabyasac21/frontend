import React from "react";
import "./Hero.css";
import hero_image from "../Assests/hero_image.png";

const Hero = () => {
  return (
    <section className="hero section-shell">
      <div className="hero-left">
        <span className="hero-kicker">New season curated edit</span>
        <div className="hero-copy">
          <h1>
            Refined fashion for
            <span> daily confidence.</span>
          </h1>
          <p>
            Built for shoppers who want premium basics, clean silhouettes, and
            effortless styling across women, men, and kids.
          </p>
        </div>
        <div className="hero-actions">
          <a className="hero-primary" href="#collections">
            Explore collection
          </a>
          <div className="hero-metrics">
            <div>
              <strong>120+</strong>
              <span>new arrivals</span>
            </div>
            <div>
              <strong>48h</strong>
              <span>dispatch promise</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-spotlight">
          <div className="hero-floating-card">
            <span>Editor pick</span>
            <strong>Contemporary comfort layers</strong>
            <p>Lightweight textures, premium finish, strong everyday styling.</p>
          </div>
          <img src={hero_image} alt="Featured seasonal fashion" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
