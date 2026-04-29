import React from "react";
import win from "../../assets/icons/Subtract.webp";
import lineImg from "../../assets/icons/line-img.webp";

import "./serviceCardStyles.scss";

const ServiceCard = (props) => {
  const selectedIndex = props.type === "Seller" ? 2 : 1;
  return (
    <div className="serviceCard">
      {props.type === "Seller" ? (
        <div
          className={`service-Card-mini ${
            props.selected === 1 ? "border" : ""
          }`}
          style={{ fontWeight: props.selected === 1 ? "300" : "400" }}
          onClick={() => {
            props.setSelected(1);
          }}
        >
          <div className="div-img">
            <img alt="" src={win} />
          </div>
          <div>Property Sellers</div>
        </div>
      ) : (
        ""
      )}

      <div className="header-text">{props.type}’s Guide</div>
      {props.data.map((value, index) => {
        return (
          <div
            key={value.name}
            className={`guide-Card-mini ${
              props.selected === index + selectedIndex ? "border" : ""
            }`}
            style={{
              fontWeight:
                props.selected === index + selectedIndex ? "300" : "400",
            }}
            onClick={value.onclick}
          >
            <div className="div-img">
              <img alt="" src={lineImg} />
            </div>
            <div>{value.name}</div>
          </div>
        );
      })
      }
    </div>
  );
};
export default ServiceCard;
