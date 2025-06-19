import React from 'react';
import { Header, AboutUs, SpecialMenu, Chef, Intro, Laurels, Gallery } from '../container';

const Home = () => {
  return (
    <div className="home-page-container">
      <Header />
      <AboutUs />
      <SpecialMenu />
      <Chef />
      <Intro />
      <Laurels />
      <Gallery />
    </div>
  );
};

export default Home;
