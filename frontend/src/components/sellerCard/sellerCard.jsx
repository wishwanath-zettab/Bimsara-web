import React from "react";
import arrow from "../../assets/icons/rounded-arrow.webp";
import "./sellerCardStyles.scss";
const SellerCard = (props) => {
  return (
    <div className="sellerCardContainer">
      <div className="sellerCard" onClick={props.onClick}>
        <div className="content">{props.content}</div>
        <img alt="" src={arrow} />
      </div>
    </div>
  );
};
export default SellerCard;
