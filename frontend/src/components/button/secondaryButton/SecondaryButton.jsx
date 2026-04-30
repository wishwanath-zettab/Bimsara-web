import React from "react";
import download from "../../../assets/icons/download.webp";
import "./SecondaryButtonStyles.scss";
const SecondaryButton = (props) => {
  return (
    <div
      className="secondary-button-styles"
      onClick={props.onClick}
    >
      <div>{props.buttonText}</div>
      <img
        alt=""
        src={download}
        className="icon"
      />
    </div>
  );
};
export default SecondaryButton;
