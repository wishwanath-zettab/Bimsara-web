import React from "react";
import rightArrow from "../../assets/icons/right-arrow.webp";
import "./ButtonStyles.scss";
const Button = (props) => {
  return (
    <div
      className="Button-styles"
      onClick={props.onClick}
      style={{
        borderColor: props.primary ? "#e5322d" : "#fff",
        color: props.primary ? "#e5322d" : "#fff",
        background: props.background ? props.background : "",
      }}
    >
      <div>{props.buttonText}</div>
      <img
        alt=""
        src={rightArrow}
        className="right-arrow"
        style={{ filter: props.primary ? "" : "brightness(0) invert(1)" }}
      />
    </div>
  );
};
export default Button;
