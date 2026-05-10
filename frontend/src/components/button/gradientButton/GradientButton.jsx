import React from "react";
import rightArrow from "../../../assets/icons/right-arrow-2.webp";
import "./GradientButtonStyles.scss";
const GradientButton = (props) => {
  return (
    <div className="GradientButton">
      <div className="GradientButton-inner">
        <span>{props.buttonText}</span>
        <img alt="" src={rightArrow} />
      </div>
    </div>
  );
};
export default GradientButton;
