import React from "react";
import ContactFrom from "../../contactForm/ContactFrom";
import "./contactModalStyles.scss";

const ContactModal = (props) => {
  return (
    <div className="contact-modal-container ">
      <div
        id="myModal"
        className="contact-modal"
        onClick={() => {
          props.setContactModal(false);
        }}
      >
      </div>
      <div className="contact-modal-content">
        <ContactFrom setContactModal={props.setContactModal}/>
        </div>
    </div>
  );
};

export default ContactModal;
