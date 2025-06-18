import React from 'react';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Home = () => (
  <div className="header-container" id="home">
    <div className="header-content">
      <SubHeading title="Delicious Meals, Delivered Fast" />
      
      <h1 className="header-title">Order Food from Top Restaurants Near You</h1>
      
      <p className="header-subtext">
        Craving something tasty? Discover a wide range of cuisines from your favorite local restaurants and cloud kitchens—all in one place. Whether it's a quick bite or a full-course meal, get it delivered hot and fresh, right to your doorstep. Fast delivery, exclusive offers, and seamless experience—all at your fingertips.
      </p>
      
      <button type="button" className="header-button">Browse Restaurants</button>
    </div>

    <div className="header-image">
      <img src={images.welcome} alt="food_delivery_banner" />
    </div>
  </div>
);

export default Home;
