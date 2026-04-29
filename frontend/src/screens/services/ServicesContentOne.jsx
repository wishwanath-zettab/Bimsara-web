import React from "react";
import Button from "../../components/button/Button";
import RateCard from "../../components/rateCard/RateCard";
import "./ServicesStyles.scss";

const ServicesContentOne = () => {
  return (
    <div className="ServicesContentTwo">
      <div className="top-container">
        <div className="top-content">Trusted Advisor</div>
        <div className="top-content">Skilled Negotiator </div>
        <div className="top-content">Expert Facilitator</div>
      </div>
      <div className="bottom-container">
        <div className="bottom-left-container">
          <div className="heder-content">
            Your go-to partner in selling and renting out your property.
          </div>

          <div className="sub-content">
            Bimsara Real Estate is the outcome of extensive research conducted
            by over several years to identify solutions for the issues most
            frequently encountered by both sellers and buyers in the Sri Lankan
            real-estate market.
          </div>
          <div className="sub-content-two">
            Our unique approach and method of business is a solution-based and
            personalized effort to help buyers to find their dream home or
            property.
          </div>
          <div className="sub-content-two">
            We believe buyer satisfaction is the key for the seller to obtain
            optimal price. Our pledge therefore is a sincere service to both
            buyers and sellers to ensure smooth transactions.
          </div>
        </div>
        <div className="bottom-right-container">
          <RateCard des="Years of Industry Experience" rate="20+" />
          <RateCard des="Satisfied Customers" rate="1000+" />
        </div>
      </div>
      <div className="button-container">
        <a href="/about">
          <Button buttonText="About Us" primary />
        </a>
      </div>
    </div>
  );
};
export default ServicesContentOne;
