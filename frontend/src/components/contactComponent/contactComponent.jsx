import React from "react";
import ContactCard from "../../components/contactCard/ContactCard";
import ContactFrom from "../../components/contactForm/ContactFrom";
import wa from "../../assets/icons/wa.webp";
import phone from "../../assets/icons/phone.webp";

import "./contactComponentStyles.scss";

const ContactComponent = (props) => {
  return (
    <div
      className="contactComponent"
      id={props.from === "about" ? "about-contact" : "home-contact"}
    >
      <div className="contact-header">Contact Us</div>
      <div className="contact-content">
        Get in touch with us for all your real estate requirements.<br></br>
        We believe in building strong relationships that go long term with our clients.
      </div>
      <div className="contact-content-container">
        <div className="left-content">
          {props?.from && props?.from === "home" ? (
            <div style={{ height: 0 }}></div>
          ) : (
            <div style={{ height: 0 }}></div>
          )}

          <div className="contct-m">
            <ContactCard
              header="GENERAL INQUIRIES"
              email="info@bimsara.com"
              phone="+94 11 777 8 777"
              general
            />
          </div>
          <div className="contct">
            <div className="contct-c">
              <ContactCard
                header="LANDS"
                email="lands@bimsara.com"
                phone="+94 77 108 2211"
              />
            </div>
            <div className="contct-c">
              <ContactCard
                header="APARTMENTS"
                email="apartments@bimsara.com"
                phone="+94 77 106 6251"
              />
            </div>
            <div className="contct-c">
              <ContactCard
                header="HOUSES"
                email="houses@bimsara.com"
                phone="+94 77 003 1007"
              />
            </div>
            <div className="contct-c">
              <ContactCard
                header="RENTALS"
                email="rentals@bimsara.com"
                phone="+94 77 741 0444"
              />
            </div>
          </div>
          <div className="wa">
            <img alt="" src={phone} className="ph" onClick={() => window.open("tel:+94117778777", "_blank")} style={{ cursor: "pointer" }} />
            <img alt="" src={wa} className="wapp" onClick={() => window.open("https://wa.me/94777800606", "_blank")} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className="right-content">
          <ContactFrom content3 from={props?.from} />
        </div>
      </div>
    </div>
  );
};
export default ContactComponent;
