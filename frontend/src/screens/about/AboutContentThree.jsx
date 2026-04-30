import React from "react";
import GradientCard from "../../components/gradientCard/gradientCard";
import GradientText from "../../components/gradientText/gradientText";
import "./AboutStyles.scss";
const AboutContentThree = () => {
  return (
    <div className="AboutContentThree" id="about-mission">
      <div className="inner-content-three">
        <GradientCard className="card"
          header="Vision"
          content="To be the most sought after Real Estate Broker in Sri Lanka"
          gradient
        />
        <GradientCard
          header="Mission"
          content="To set the benchmark for Sri Lankan Real Estate Broking by redefining the way the business is done."
          gradient
        />
        <div className="bottm-content">
          <GradientText text="We Value," />
          <div className="div-content">
            <div className="inner-div">
              <GradientCard
                content="Upholding the highest ethical standards and fair practices in conducting business."
                height={window.screen.width > 1440 ? "336px" : "200px"}
              />
            </div>
            <div className="inner-div">
              <GradientCard
                content="Being open and transparent in all our dealings."
                height={window.screen.width > 1440 ? "336px" : "200px"}
              />
            </div>
            <div className="inner-div">
              <GradientCard
                content="Protecting and safeguarding the interests of all our stakeholders."
                height={window.screen.width > 1440 ? "336px" : "200px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutContentThree;
