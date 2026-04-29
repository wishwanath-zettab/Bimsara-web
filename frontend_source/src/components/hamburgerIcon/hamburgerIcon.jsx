import React from "react";
import icon from "../../assets/images/Bimsara Real Estate - Hamburger 1.webp";
import icon2 from "../../assets/images/Bimsara Real Estate - Hamburger 2.webp";

import "./hamburgerIconStyles.scss";

const HamburgerIcon = (props) => {
  return (
    <div className="hamburgerIcon">
      <img
        alt=""
        src={icon}
        onClick={() => {
          props.setSidebar(true);
        }}
        className="img-1"
      />
      <img
        alt=""
        src={icon2}
        onClick={() => {
          props.setSidebar(true);
        }}
        className="img-2"
      />
    </div>
  );
};
export default HamburgerIcon;
