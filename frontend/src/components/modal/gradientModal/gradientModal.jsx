import React from "react";
import close from "../../../assets/icons/close.webp";
import "./gradientModalStyles.scss";

const GradientModal = (props) => {
  return (
    <div className="gradient-modal-container ">
      <div
        className="gradient-modal"
        onClick={() => {
          props.setModal(false);
        }}
      ></div>
      <div className="gradient-modal-content">
        <div>
          <img
            alt=""
            src={close}
            className="close-icon"
            onClick={() => {
              props.setModal(false);
            }}
          />
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default GradientModal;
