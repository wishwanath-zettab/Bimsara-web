import React from "react";
import Button from "../../components/button/Button";
import RateCard from "../../components/rateCard/RateCard";
import "./ServicesStyles.scss";

const ServicesContentThree = () => {
  return (
    <div className="ServicesContentFour" id="home-testimonials">
      <div className="top-container">
        <div className="top-content">CLIENT TESTIMONIALS</div>
      </div>
      <div className="bottom-container">
        <div className="bottom-left-container">
          <div className="heder-content">
            Our client testimonials are proof of
          </div>
          <div className="sub-content-two">
            how well we have treated real estate market by not only setting the
            trends, but also uplifting the standards which were long standing
            and will be long-lasting.
          </div>
          <div className="button-container" id="reviews_btn_1">
            <a target="_blank" rel="noreferrer" href="https://www.google.com/search?q=Bimsara+Real+Estate&oq=bim&aqs=chrome.0.69i59j69i57j69i59l2j0i512l3j46i512j46i175i199i512j0i512.1528j0j15&sourceid=chrome&ie=UTF-8#lrd=0x3ae25995119a0d4b:0xb8478b32080b33cb,1,,, ">
              <Button buttonText="VIEW ALL GOOGLE REVIEWS" primary />
            </a>
          </div>
        </div>
        <div className="bottom-right-container">
          <RateCard des="Google Reviews by Satisfied Clients" rate="100+" />
          <div className="margin-top-100" />
          <RateCard googlRating des="Star Rated" rate="4.9" />
        </div>
      </div>
      <div className="button-container" id="reviews_btn_2">
        <a target="_blank" href="https://www.google.com/search?q=Bimsara+Real+Estate&oq=bim&aqs=chrome.0.69i59j69i57j69i59l2j0i512l3j46i512j46i175i199i512j0i512.1528j0j15&sourceid=chrome&ie=UTF-8#lrd=0x3ae25995119a0d4b:0xb8478b32080b33cb,1,,, ">
          <Button buttonText="VIEW ALL GOOGLE REVIEWS" primary />
        </a>
      </div>
    </div>
  );
};
export default ServicesContentThree;
