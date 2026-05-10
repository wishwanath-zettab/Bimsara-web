import React from "react";
import iso from "../../assets/images/Bimsara Real Estate - ISO Logo.webp";
import safetynet from "../../assets/images/Safetynet Private Limited - Logo.webp";
import circle from "../../assets/icons/round.webp";
import "./floatingButtonStyles.scss";

const FloatingButton = ({ onCircleClick }) => {
  return (
    <div className="floating-button">
      <img alt="" src={iso} className="fb-iso" />
      <img alt="" src={safetynet} className="fb-safetynet" />
      <img alt="" src={circle} className="fb-circle" onClick={onCircleClick} />
    </div>
  );
};

export default FloatingButton;
