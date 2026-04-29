import React from "react";
import "./ContactCardStyles.scss";
const ContactCard = (props) => {
  return (
    <div className="contactCard">
      <div
        className="contact-header-c"
        style={{ fontWeight: props.general ? "800" : "400" }}
      >
        {props.header}
      </div>
      <div
        className="contact-email"
        style={{ fontWeight: props.general ? "800" : "400" }}
      >
        {props.email}
      </div>
      <div
        className="contact-phone"
        style={{ fontWeight: props.general ? "800" : "400" }}
      >
        {props.phone}
      </div>
    </div>
  );
};
export default ContactCard;
