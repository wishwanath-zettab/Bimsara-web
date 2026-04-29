import React from "react";
import wijeya from "../../assets/images/Bimsara Real Estate - Wijeya Newspapers Logo.webp";
import ikman from "../../assets/images/Bimsara Real Estate - Ikman Logo.webp";
import lpw from "../../assets/images/Bimsara Real Estate - Lanka Property Web Logo.webp";
import hit from "../../assets/images/Bimsara Real Estate - Hitmedia Logo.webp";

import "./AboutStyles.scss";
const AboutContentSeven = () => {
  return (
    <div className="AboutContentSeven">
      <div className="header">Our Service Providers</div>
      <div className="image-container">
        <img alt="" src={wijeya} className="image-item" />
        <img alt="" src={ikman} className="image-item-1" />
        <img alt="" src={lpw} className="image-item-2" />
        <img alt="" src={hit} className="image-item-3" />
      </div>
    </div>
  );
};
export default AboutContentSeven;
