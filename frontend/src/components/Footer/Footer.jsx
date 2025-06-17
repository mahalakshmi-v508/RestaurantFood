import React from "react";
import "./Footer.css";
import FoodVillaLogo from "../HeaderItems/Food Villa Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faPinterestP,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>
          For better experience, <strong>download the Eatster app now</strong>
        </p>
        <div className="footer-apps">
          <img
            src="https://i.ibb.co/QCJfJ1k/google-play.png"
            alt="Google Play"
          />
          <img
            src="https://i.ibb.co/yPr08YY/app-store.png"
            alt="App Store"
          />
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-logo">
          <img src={FoodVillaLogo} alt="logo" />
          <p>© 2025 Eatster Limited</p>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Eatster Corporate</li>
            <li>Careers</li>
            <li>Team</li>
            <li>Eatster One</li>
            <li>Eatster Instamart</li>
            <li>Eatster Dineout</li>
            <li>Eatster Genie</li>
            <li>Minis</li>
            <li>Pyng</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact us</h4>
          <ul>
            <li>Help & Support</li>
            <li>Partner with us</li>
            <li>Ride with us</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Available in:</h4>
          <ul>
            <li>Tamilnadu</li>
            
            <li>
              <select>
                <option>679 cities</option>
              </select>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Life at Eatster</h4>
          <ul>
            <li>Explore with Eatster</li>
            <li>Eatster News</li>
            <li>Snackables</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Investor Relations</li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Social Links</h4>
          <div className="social-icons">
            <FontAwesomeIcon icon={faLinkedinIn} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faPinterestP} />
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
