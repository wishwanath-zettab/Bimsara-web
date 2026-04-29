import React from "react";
import google from "../../assets/images/Bimsara Real Estate - Google Reviews Icon.webp";
import "./RateCardStyles.scss";
const RateCard = (props) => {
  return props.googlRating ? (
    <div className="Rate-card">
      <div className="googlerate">
        <div className="rate-g">{props.rate}</div>
        <div className="description-g">{props.des}</div>
      </div>
      <img alt="" src={google} className="img-g" />
    </div>
  ) : (
    <div className="Rate-card">
      <div className="rate">{props.rate}</div>
      <div className="description">{props.des}<span>{props.des2}</span></div>
    </div>
  );
};
export default RateCard;