import React from "react";
import iso from "../../assets/images/Bimsara Real Estate - ISO Certificate.webp";
import "./modalStyles.scss";

const Modal = (props) => {
  const certificateUrl = props.certificatePath
    ? `http://localhost:5000${props.certificatePath}`
    : iso;

  const isPdf = props.certificatePath && props.certificatePath.toLowerCase().endsWith('.pdf');

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
        {isPdf ? (
          <iframe title="ISO Certificate" src={certificateUrl} style={{ width: '100%', height: '80vh', border: 'none' }} />
        ) : (
          <img src={certificateUrl} alt="ISO Certificate" />
        )}
      </div>
    </div>
  );
};

export default Modal;
