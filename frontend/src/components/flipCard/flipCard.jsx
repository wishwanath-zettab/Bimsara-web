import React, { useState, useEffect, useRef } from "react";
import "./flipCardStyles.scss";

// Only one flip card may show its back at a time: opening one closes the rest.
const FLIP_EVENT = "flipcard:open";

const FilpCard = (props) => {
  const [flipped, setFlipped] = useState(false);
  const idRef = useRef({});

  useEffect(() => {
    const onOtherOpen = (e) => {
      if (e.detail !== idRef.current) setFlipped(false);
    };
    window.addEventListener(FLIP_EVENT, onOtherOpen);
    return () => window.removeEventListener(FLIP_EVENT, onOtherOpen);
  }, []);

  const toggle = () => {
    setFlipped((prev) => {
      const next = !prev;
      if (next) {
        window.dispatchEvent(new CustomEvent(FLIP_EVENT, { detail: idRef.current }));
      }
      return next;
    });
  };

  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""}`}
      onClick={toggle}
    >
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
