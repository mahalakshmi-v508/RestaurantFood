import React, { useEffect, useRef, useState } from "react";
import "./menu.css";
import axios from "axios";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
      .then((res) => {
        const dataWithImgPath = res.data.map((item) => ({
          name: item.foodname,
          img: `http://localhost:5000/images/${item.img}`,
        }));
        setCategories(dataWithImgPath);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
      });
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="food-slider">
      <div className="arrow-buttons-container">
        <button className="scroll-btn" onClick={scrollLeft}>‹</button>
        <button className="scroll-btn" onClick={scrollRight}>›</button>
      </div>

      <div className="food-category-scroll" ref={scrollRef}>
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
