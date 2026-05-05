import React from "react";
import GradientButton from "../../components/button/gradientButton/GradientButton";
import "./ServicesStyles.scss";
const ServicesContentTwo = () => {
  return (
    <div className="ServicesContentThree">
      <div className="inner-container">
        <div className="header">Our Services are for...</div>
        <div className="button-grid">
          <div className="button-grid-div">
            <a href="/sellers">
            <GradientButton buttonText="Sellers" />
          </a>
          </div >
          <div className="button-grid-div">
            <a href="/landlords">
            <GradientButton buttonText="Landlords" />
          </a>
          </div>
          <div className="button-grid-div">
            <a href="/buyers">
            <GradientButton buttonText="Buyers" />
          </a>
          </div>
          <div className="button-grid-div">
            <a href="/tenants">
            <GradientButton buttonText="Tenants" />
          </a>
          </div>
          
          
          
        </div>
      </div>
    </div>
  );
};
export default ServicesContentTwo;
