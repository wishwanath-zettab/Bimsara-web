import React from "react";
import heroImage from "../../assets/images/about-hero.webp";
import FloatingButton from "../../components/floatingButton/FloatingButton";
import TaglineBar from "../../components/taglineBar/TaglineBar";

const AboutContentOne = (props) => {
  return (
    <div className="AboutContentOne">
      <div className="AboutContentOne-inner">
        <img src={heroImage} alt="Bimsara Real Estate office" className="about-hero-img" />
      </div>
      <TaglineBar />
      <FloatingButton onCircleClick={() => props.setContactModal(true)} />
    </div>
  );
};
export default AboutContentOne;
