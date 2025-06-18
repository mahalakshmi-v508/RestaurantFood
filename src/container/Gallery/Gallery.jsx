import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Gallery.css';

const Gallery = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    <div className="gallery section">
      <div className="gallery-content">
        <SubHeading title="Instagram" />
        <h1 className="gallery-title">Photo Gallery</h1>
        <p className="gallery-description">
            Discover our visual journey through stunning moments captured on camera — a blend of food, ambiance, and unforgettable experiences. Follow us on Instagram for more!

        </p>
        <button type="button" className="custom-button">View More</button>
      </div>
      <div className="gallery-images">
        <div className="gallery-images-container" ref={scrollRef}>
          {[images.gallery01, images.gallery02, images.gallery03, images.gallery04].map((image, index) => (
            <div className="gallery-image-card" key={`gallery_image-${index + 1}`}>
              <img src={image} alt="gallery_image" className="gallery-img" />
              <BsInstagram className="gallery-icon" />
            </div>
          ))}
        </div>
        <div className="gallery-arrows">
          <BsArrowLeftShort className="arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
