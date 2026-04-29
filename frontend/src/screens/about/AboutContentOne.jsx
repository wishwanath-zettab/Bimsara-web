import React from "react";
import logo from "../../assets/images/Bimsara Real Estate - Logo.webp";
import circle from "../../assets/icons/round.webp";
import iso from "../../assets/images/Bimsara Real Estate - ISO Logo.webp";
import safetynet from "../../assets/images/Safetynet Private Limited - Logo.webp";

const AboutContentOne = (props) => {
  return (
    <div className="AboutContentOne">
      <div className="AboutContentOne-inner">
        <div className="logo-container">
          <img alt="" src={logo} className="logo" onClick={() => window.open("/", "_self")} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className="top-container">
        <div className="top-content">Trusted Advisor</div>
        <div className="top-content">Skilled Negotiator </div>
        <div className="top-content">Expert Facilitator</div>
        <div
          className="top-content-arrow"
        >
          <img alt="" src={iso} className="iso" />
          <img alt="" src={safetynet} className="safetynet" />
          <img alt="" src={circle} className="circle"
            onClick={() => props.setContactModal(true)} />
        </div>
      </div>
    </div>
  );
};
export default AboutContentOne;
