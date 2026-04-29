import React from "react";
import iso from "../../assets/images/Bimsara Real Estate - ISO Certificate.webp";
import "./modalStyles.scss";

const Modal = (props) => {
  return (
    <div className="modal-container">
      <div
        id="myModal"
        className="modal"
        onClick={() => {
          props.setModal(false);
        }}
      >
      </div>
      <div className="modal-content">
          <img src={iso} alt="" />
        </div>
    </div>
  );
};

export default Modal;
