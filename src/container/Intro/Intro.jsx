import React from 'react';
import { meal } from '../../constants';
import './Intro.css';

const Intro = () => {
  return (
    <div className="intro-container">
      <video
        src={meal}
        type="video/mp4"
        autoPlay
        loop
        muted
        controls={false}
        className="intro-video"
      />
      <div className="intro-overlay"></div>
    </div>
  );
};

export default Intro;
