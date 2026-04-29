import React from "react";
import iso from "../../assets/images/Bimsara Real Estate - ISO Certificate.webp";
import "./AboutStyles.scss";
const AboutContentFour = (props) => {
  return (
    <div className="AboutContentFour" id="about-iso">
      <div className="inner-content-four">
        <div className="left-inner-content">
          <div className="we-header">WE LOVE TO FOLLOW SYSTEMS</div>
          <div className="bottom-left-container">
            <div className="heder-content">
              To ensure our framework of policies and processes are at
              internationally recognized standards.
            </div>
            <div className="sub-content">
              In 2016, we adopted an internaltionally recognized quality
              managemnt system and was awarded the ISO 9001:2008 standard. In
              2019, we acquired the revised ISO 9001:2015 certificate from
              Bureau Veritas Certification Holding SAS-UK Branch, Accredited by
              UKAS Management Systems.
            </div>
          </div>
        </div>
        <div className="right-inner-content">
          <img
            alt=""
            src={iso}
            className="iso-image"
            onClick={() => {
              props.setModal(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default AboutContentFour;
