import React from "react";
import "./flipCardStyles.scss";

const FilpCard = (props) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="content">{props.content}</div>
        </div>
        <div className="flip-card-back">
          <div className="header-back">{props.content}</div>
          <div className="back-content">
              {props.backContent}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilpCard;
