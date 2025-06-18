import React, { useEffect, useState } from "react";
import FoodVillaLogo from "./Food Villa Logo.png";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AviiGif from "../../assets/changesfood.gif";
import Swal from "sweetalert2";


import {
  faSearch,
  faBars,
  faQuestionCircle,
  faUserCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Header = () => {
  const [location, setLocation] = useState({
    area: "Detecting...",
    city: "",
    state: "",
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [pincode, setPincode] = useState("");
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cartItemCount = 0;

  // ⭐️ Listen for login event to update username without reload
  useEffect(() => {
    const handleLogin = () => {
      const name = localStorage.getItem("username");
      setUsername(name);
    };

    window.addEventListener("userLoggedIn", handleLogin);



    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = response.data.address;
          setLocation({
            area:
              data.suburb || data.village || data.hamlet || "Your Area",
            city:
              data.city || data.town || data.state_district || "Your City",
            state: data.state || "Your State",
          });
        } catch (error) {
          console.error("Location fetch error:", error);
          setLocation({ area: "Unavailable", city: "", state: "" });
        }
      });
    } else {
      setLocation({ area: "Geolocation Disabled", city: "", state: "" });
    }
  }, []);

  const handlePincodeSearch = async () => {
    if (!pincode.trim()) return;
    setLoadingPincode(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`
      );

      if (response.data.length > 0) {
        const place = response.data[0];
        const { display_name, lat, lon } = place;
        const reverseRes = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const addr = reverseRes.data.address;
        setLocation({
          area: addr.suburb || addr.village || addr.hamlet || "Area",
          city: addr.city || addr.town || addr.state_district || "City",
          state: addr.state || "State",
        });
        setShowSidebar(false);
      } else {
        alert("No location found for this pincode");
      }
    } catch (err) {
      console.error("Pincode search error", err);
      alert("Error fetching location");
    }
    setLoadingPincode(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "No, stay logged in",
      confirmButtonColor: "red",
      cancelButtonColor: "grey",


    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          text: "You’ve been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
      }
    });
  };

  return (
    <>
      <div className="header">
        <div className="logo-location">
          <a href="/" className="logo-link">
            <img className="logo-gif" src={AviiGif} alt="Restaurant Logogif" />
            <img className="logo" src={FoodVillaLogo} alt="Restaurant Logo" />
          </a>
          <div className="location-text" onClick={() => setShowSidebar(true)}>
            <h2
              title={`${location.area}, ${location.city}, ${location.state}`}
              className="location-detail"
            >
              <span className="location-label">Deliver to </span>
              {`${location.area}, ${location.city}, ${location.state}`}
            </h2>
            <span className="dropdown-icon">&#9660;</span>
          </div>
        </div>


        <ul className="nav-links">
          <li>
            <a href="/menu"><FontAwesomeIcon icon={faBars} /><span>Menu</span></a>
          </li>
          <li>
            <a href="/search"><FontAwesomeIcon icon={faSearch} /><span>Search</span></a>
          </li>
          <li>
            <a href="/help"><FontAwesomeIcon icon={faQuestionCircle} /><span>Help</span></a>
          </li>
          <li>
            {username ? (
              <div className="user-dropdown">
                <span onClick={() => setDropdownOpen(!dropdownOpen)} className="username">
                  <FontAwesomeIcon icon={faUserCircle} /> {username}
                </span>
                {dropdownOpen && (
                  <div className="dropdown-menu" style={{ display: dropdownOpen ? "block" : "none" }}>

                    <p onClick={() => alert("Profile Clicked")}>Profile</p>
                    <p onClick={() => alert("Orders Clicked")}>Orders</p>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            ) : (
              <a href="/Login"><FontAwesomeIcon icon={faUserCircle} /><span>Sign In</span></a>
            )}
          </li>
          <li>
            <a href="/cart">
              <div className="cart-icon">
                <svg className={cartItemCount === 0 ? "empty-cart" : "filled-cart"} viewBox="-1 0 37 32" height="20" width="20">
                  <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                </svg>
                <span className={cartItemCount === 0 ? "cart-count-empty" : "cart-count"}>{cartItemCount}</span>
              </div>
              <span>Cart</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Sidebar Panel */}
      {showSidebar && (
        <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}>
          <div className="sidebar-panel" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowSidebar(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Enter Pincode</h3>
            <input
              type="text"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <button onClick={handlePincodeSearch} disabled={loadingPincode}>
              {loadingPincode ? "Detecting..." : "Detect Location"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;