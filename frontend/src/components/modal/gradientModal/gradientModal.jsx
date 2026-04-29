import React, { useState, useEffect } from "react";
import close from "../../../assets/icons/close.webp";
import "./gradientModalStyles.scss";

const GradientModal = (props) => {
  const [isClosing, setIsClosing] = useState(false);

  // Handle external closing (from scroll or other triggers)
  useEffect(() => {
    if (props.externalClosing) {
      setIsClosing(true);
    } else {
      // Reset closing state when externalClosing becomes false
      setIsClosing(false);
    }
  }, [props.externalClosing]);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      props.setModal(false);
    }, 300); // Match animation duration
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking on the backdrop area (not on content)
    if (e.target.classList.contains('gradient-modal-container') || 
        e.target.classList.contains('gradient-modal-backdrop')) {
      handleClose();
    }
  };

  return (
    <div 
      className={`gradient-modal-container ${isClosing ? 'closing' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="gradient-modal-backdrop"></div>
      <div className="gradient-modal-content">
        <div>
          <img
            alt=""
            src={close}
            className="close-icon"
            onClick={handleClose}
          />
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default GradientModal;
