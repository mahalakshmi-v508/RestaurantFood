import React from 'react';
import { SubHeading } from '../../components';
import { images, data } from '../../constants';
import foodDeliveryGif from '../../assets/Food-delivery-animation.gif';
import './Laurels.css';


const AwardCard = ({ award: { imgUrl, title, subtitle } }) => (
  <div className="award-card">
    <img src={imgUrl} alt="awards" className="award-card-img" />
    <div className="award-card-content">
      <p className="p__cormorant" style={{ color: '#DCCA87' }}>{title}</p>
      <p className="p__opensans">{subtitle}</p>
    </div>
  </div>
);

const Laurels = () => (
  <div className="laurels-container" id="awards">
    <div className="laurels-info">
      <SubHeading title="Awards & recognition" />
      <h1 className="headtext__cormorant">Our Journey So Far</h1>

      <div className="laurels-awards">
        {data.awards.map((award) => (
          <AwardCard award={award} key={award.title} />
        ))}
      </div>
    </div>

    <div className="laurels-image-container">
      <img src={images.laurels} alt="Food-delivery-animation.gif" className="laurels-image" />
    </div>
  </div>
);

export default Laurels;
