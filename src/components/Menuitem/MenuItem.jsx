import React from 'react';
import './MenuItem.css';

const MenuItem = ({ title, price, tags }) => (
  <div className="menuitem">
    <div className="menuitem-head">
      <div className="menuitem-name">
        <p className="title">{title}</p>
      </div>
      <div className="menuitem-dash" />
      <div className="menuitem-price">
        <p className="title">{price}</p>
      </div>
    </div>

    <div className="menuitem-sub">
      <p className="subtitle">{tags}</p>
    </div>
  </div>
);

export default MenuItem;
