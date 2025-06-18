import React, { useEffect, useState } from "react";
import { support_data } from "../Constant.js";
import FAQItem from "../FAQItem.js";
import "./Help.css"; // Import your CSS file

const Help = () => {
  const init = support_data
    .filter((x) => x.title === "General issues")
    .map((x) => x.data);
  const titles = support_data.map((data) => data.title);
  const [helpTitle, setHelpTitle] = useState([]);
  const [FAQ, setFAQ] = useState([]);
  const [activeTitle, setActiveTitle] = useState(false);

  useEffect(() => {
    setHelpTitle(titles);
    setActiveTitle(0);
    setFAQ(...init);
  }, []);

  const handleClick = (event, index) => {
    event.preventDefault();
    const text = event.target.textContent;
    const qna = support_data.filter((x) => x.title === text);
    setFAQ(...qna.map((x) => x.data));
    setActiveTitle(index);
  };

  return (
    <div className="help-container">
      <div className="help-header">
        <div className="help-header-inner">
          <h1>Help & Support</h1>
          <h4>Let's take a step ahead and help you better.</h4>
        </div>
        <div className="help-content-wrapper">
          <div className="help-sidebar">
            {helpTitle.map((curr, index) => (
              <div
                key={index}
                className={`help-title ${
                  activeTitle === index ? "active" : ""
                }`}
                onClick={(event) => handleClick(event, index)}
              >
                <a
                  href=""
                  className={`help-title-link ${
                    activeTitle === index ? "active-link" : ""
                  }`}
                >
                  {curr}
                </a>
              </div>
            ))}
          </div>
          <div className="help-faq-section">
            {FAQ.map((curr, index) => (
              <FAQItem {...curr} key={curr.id} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
