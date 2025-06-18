import React, { useEffect, useRef, useState } from 'react';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Chef.css';

const Chef = () => {
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="chef__bg chef__wrapper section__padding">
      <div
        ref={imgRef}
        className={`chef__img-container ${visible ? 'slide-in' : ''}`}
      >
        <img src={images.chef} alt="kitchen_image" />
      </div>

      <div className="chef__info">
        <SubHeading title="Trusted by Top Restaurants" />
        <h1 className="headtext__cormorant">From the City’s Best</h1>

        <div className="chef__content">
          <div className="chef__quote">
            <img src={images.quote} alt="quote_image" className="quote__img" />
            <p className="p__opensans">
              Real food, cooked fresh, from restaurants you love.
            </p>
          </div>
          <p className="p__opensans">
            Whether it’s spicy biryani from your favorite local spot or crispy
            noodles from a busy kitchen across town, our partner restaurants
            cook each dish with quality, care, and flavor. We bring their
            passion to your plate — hot, fresh, and on time.
          </p>
        </div>

        <div className="chef__sign">
          <p className="chef__name">Zestaurant Team</p>
          <p className="p__opensans">Bringing kitchens to your doorstep</p>
          <img src={images.sign} alt="team_sign" className="sign__img" />
        </div>
      </div>
    </div>
  );
};

export default Chef;
