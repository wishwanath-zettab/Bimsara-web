import React from "react";
import "./gradientTextStyles.scss";
const GradientText = (props) => {
  //console.log(window.screen.width ,"width");
  return (
    <div
      className="gradientText"
      style={{
        fontSize: props.small
          ? window.screen.width > 1440
            ? "26px"
            : "24px"
          : window.screen.width > 1440
          ? "26px"
          : "24px",
          lineHeight: props.small
          ? window.screen.width > 1440
            ? ""
            : ""
          : window.screen.width > 1440
          ? ""
          : "",
      }}
    >
      {props.text}
    </div>
  );
};
export default GradientText;
