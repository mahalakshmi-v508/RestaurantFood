import React from 'react';

import { SubHeading, MenuItem } from '../../components';
import { data, images } from '../../constants';
import './SpecialMenu.css';

const SpecialMenu = () => (
  <div className="special-menu-container" id="menu">
    <div className="special-menu-header">
      <SubHeading title="Menu that fits your palatte" />
      <h1 className="special-menu-title">Top Orders</h1>
    </div>

    <div className="special-menu-content">
      <div className="special-menu-section">
        <p className="special-menu-heading">Junk Food</p>
        <div className="special-menu-items">
          {data.junkFood.map((item, index) => (
            <MenuItem
              key={item.title + index}
              title={item.title}
              price={item.label} // Changed from item.price to item.label
              tags={item.tags}
            />
          ))}
        </div>
      </div>

      <div className="special-menu-image">
        <img src={images.menu2} alt="menu__img" className="menu-image" />
      </div>

      <div className="special-menu-section">
        <p className="special-menu-heading">Fast Food</p>
        <div className="special-menu-items">
          {data.fastFood.map((item, index) => (
            <MenuItem
              key={item.title + index}
              title={item.title}
              price={item.label} // Changed from item.price to item.label
              tags={item.tags}
            />
          ))}
        </div>
      </div>
    </div>

    <div className="special-menu-button">
      <button type="button" className="custom-button">View More</button>
    </div>
  </div>
);

export default SpecialMenu;
