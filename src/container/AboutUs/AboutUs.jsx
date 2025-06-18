import React from 'react';
import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className="app__aboutus section__padding" id="about">
    <div className="overlay">
      <img
        src={images.Z}
        alt="overlay_logo"
        className="overlay__img"
      />
    </div>

    <div className="about__wrapper">
      <div className="about__section">
        <h1 className="headtext__cormorant">About Us</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans text-primary-gray">
          We’re not just another food delivery app—we’re your everyday hunger companion. Whether you’re craving a quick snack, a full course dinner, or something new to explore, we’ve got you covered.
        </p>
        <p className="p__opensans text-primary-gray">
          Our mission is to connect people with food they love, from the comfort of their homes. Whether you're planning a family dinner, a midnight snack, or a weekend feast, we ensure every dish arrives fresh, hot, and just the way you want it.
        </p>
        <button type="button" className="custom__button">Know More</button>
      </div>

      <div className="knife__img-container">
        <img src={images.knife} alt="knife_center" />
      </div>

      <div className="about__section">
        <h1 className="headtext__cormorant">From Us to Your Plate</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans text-primary-gray">
          Every meal we deliver is more than just food—it’s a promise. From sourcing quality ingredients to trusted kitchens, we ensure each order meets high standards and reaches you hot and fresh.
        </p>
        <p className="p__opensans text-primary-gray">
          Whether it’s breakfast before work or late-night biryani, we bring your favorite meals to your doorstep with care, speed, and satisfaction. Great food should always be within reach — no matter where you are, we’ll get it to you.        </p>
        <button type="button" className="custom__button">Explore Our Journey</button>
      </div>
    </div>
  </div>
);

export default AboutUs;
