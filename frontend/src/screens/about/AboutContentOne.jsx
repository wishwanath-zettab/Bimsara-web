import React from "react";
import logo from "../../assets/images/Bimsara Real Estate - Logo.webp";
import FloatingButton from "../../components/floatingButton/FloatingButton";
import TaglineBar from "../../components/taglineBar/TaglineBar";

const AboutContentOne = (props) => {
  return (
    <div className="AboutContentOne">
      <div className="AboutContentOne-inner">
        <div className="logo-container">
          <img alt="" src={logo} className="logo" onClick={() => window.open("/", "_self")} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <TaglineBar />
      <FloatingButton onCircleClick={() => props.setContactModal(true)} />
    </div>
  );
};
export default AboutContentOne;
