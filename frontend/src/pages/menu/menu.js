import React from "react";
import "./menu.css";
import images1 from '../../assets/biriyani.jpeg';
import images2 from '../../assets/cake.jpeg';
import images3 from '../../assets/friedrice.jpeg';
import images4 from '../../assets/noodles.jpeg';
import images5 from '../../assets/pizza.jpeg';




const categories = [
  { name: "Biryani", img: images1},
  { name: "cake", img: images2 },
  { name: "friedrice", img: images3 },
  { name: "noodles", img: images4 },
  { name: "pizza", img: images5 },
//   { name: "pizza", img: {images6} },
];

const Menu= () => {
  return (
    <div className="food-slider">
      <div className="food-category-scroll">
        {categories.map((cat, i) => (
          <div className="food-category-card" key={i}>
            <div className="circle-img-wrapper">
              <img src={cat.img} alt={cat.name} className="circle-img" />
            </div>
            <p className="category-name">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
