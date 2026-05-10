import React from "react";
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

      <div className="play-wrapper">
      <a className="play" href={props.link} target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="play-icon-bg" d="M23.495 2.814a3.016 3.016 0 0 0-2.122-2.136C19.505 0 12 0 12 0S4.495 0 2.627.678A3.016 3.016 0 0 0 .505 2.814C0 4.686 0 9 0 9s0 4.314.505 6.186a3.016 3.016 0 0 0 2.122 2.136C4.495 18 12 18 12 18s7.505 0 9.373-.678a3.016 3.016 0 0 0 2.122-2.136C24 13.314 24 9 24 9s0-4.314-.505-6.186Z" />
          <path className="play-icon-triangle" d="M9.6 12.857 15.818 9 9.6 5.143v7.714Z" />
        </svg>
        Watch Video
      </a>
      </div>
    </div>
  );
};
export default ClientCard;
