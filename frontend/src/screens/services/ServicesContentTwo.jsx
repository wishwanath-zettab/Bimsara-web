import React from "react";
import GradientButton from "../../components/button/gradientButton/GradientButton";
import "./ServicesStyles.scss";
const ServicesContentTwo = () => {
  return (
    <div className="ServicesContentThree">
      <div className="inner-container">
        <div className="header">Our Services are for...</div>
        <div className="button-grid">
          <a href="/sellers">
            <GradientButton buttonText="Sellers" />
          </a>
          <a href="/landlords">
            <GradientButton buttonText="Landlords" />
          </a>
          <a href="/buyers">
            <GradientButton buttonText="Buyers" />
          </a>
          <a href="/tenants">
            <GradientButton buttonText="Tenants" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default ServicesContentTwo;
