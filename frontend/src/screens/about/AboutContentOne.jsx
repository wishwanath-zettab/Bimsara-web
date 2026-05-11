import React from "react";
import heroImage from "../../assets/images/about-hero.webp";
import logo from "../../assets/images/Bimsara Real Estate - Logo.webp";
import FloatingButton from "../../components/floatingButton/FloatingButton";
import TaglineBar from "../../components/taglineBar/TaglineBar";

const AboutContentOne = (props) => {
  return (
    <div className="AboutContentOne">
      <div className="AboutContentOne-inner">
        <img src={heroImage} alt="Bimsara Real Estate office" className="about-hero-img" />
        <div className="logo-container">
          <img alt="" src={logo} className="logo" style={{ cursor: "pointer" }} onClick={() => window.open("/", "_self")} />
        </div>
      </div>
      <TaglineBar />
      <FloatingButton onCircleClick={() => props.setContactModal(true)} />
    </div>
  );
};
export default AboutContentOne;
