import React from "react";
import rightArrow from "../../../assets/icons/right-arrow-2.webp";
import "./GradientButtonStyles.scss";
const GradientButton = (props) => {
  return (
    <div className="GradientButton">
      <span>
        {props.buttonText} <img alt="" src={rightArrow} />
      </span>
    </div>
  );
};
export default GradientButton;
