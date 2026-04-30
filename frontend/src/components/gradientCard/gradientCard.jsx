import React from "react";
import GradientText from "../gradientText/gradientText";
import "./gradientCardStyles.scss";
const GradientCard = (props) => {
  return (
    <div className="gradientCard">
      <span
        style={{
          height: props.height ? props.height : "",
          display: props.height ? "table" : "block",
        }}
      >
        {props.gradient ? <GradientText text={props.header} small /> : ""}
        <div
          className="content-styles"
          style={{
            height: props.height ? props.height : "",
            display: props.height ? "table-cell" : "block",
          }}
        >
          {props.content}
        </div>
      </span>
    </div>
  );
};
export default GradientCard;
