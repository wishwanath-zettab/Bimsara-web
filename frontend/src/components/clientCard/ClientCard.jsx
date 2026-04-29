import React from "react";
import play from "../../assets/icons/play.webp";
import "./ClientCardStyles.scss";
const ClientCard = (props) => {
  return (
    <div className="ClientCard">
      <div className="cont-dv">
        <div className="client-name">{props.name}</div>
        <div className="client-rev">{props.rev}</div>
        <div className="client-des">{props.des}</div>
        <div className="client-des">{props.des2}</div>
      </div>

      <a className="play" href={props.link} target="_blank">
        <img alt="" src={play} />
        Watch Video
      </a>
    </div>
  );
};
export default ClientCard;
