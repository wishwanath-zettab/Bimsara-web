import React, { useState, useEffect } from "react";
import macosClose from "../../../assets/icons/icons8-macos-close-30.png";
import "./gradientModalStyles.scss";

const GradientModal = (props) => {
  const [isClosing, setIsClosing] = useState(false);
  const [fadeOutTimer, setFadeOutTimer] = useState(null);

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
    if (isClosing) {
      return;
    }

    setIsClosing(true);
    // Wait for animation to complete before actually closing
    const timerId = setTimeout(() => {
      props.setModal(false);
    }, 300); // Match animation duration
    setFadeOutTimer(timerId);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const targetElement = event.target;

      if (targetElement.closest(".gradient-modal-content")) {
        return;
      }

      if (targetElement.closest(".sellerCardContainer")) {
        return;
      }

      handleClose();
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      if (fadeOutTimer) {
        clearTimeout(fadeOutTimer);
      }
    };
  }, [fadeOutTimer, isClosing]);

  return (
    <div className={`gradient-modal-container ${isClosing ? 'closing' : ''}`}>
      <div className="gradient-modal-backdrop"></div>
      <div className="gradient-modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <button className="close-icon-btn" onClick={handleClose} aria-label="Close">
            <img src={macosClose} alt="close" className="close-icon" />
          </button>
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default GradientModal;
