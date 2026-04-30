import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactCard from "../../components/contactCard/ContactCard";
import ContactFrom from "../../components/contactForm/ContactFrom";
import wa from "../../assets/icons/wa.webp";
import phone from "../../assets/icons/phone.webp";

import "./contactComponentStyles.scss";

const ContactComponent = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact-categories');
        setCategories(response.data || []);
      } catch (error) {
        setCategories([
          { id: 1, category_name: 'GENERAL INQUIRIES', email: 'info@bimsara.com', phone: '+94 11 777 8 777' },
          { id: 2, category_name: 'LANDS', email: 'lands@bimsara.com', phone: '+94 77 108 2211' },
          { id: 3, category_name: 'APARTMENTS', email: 'apartments@bimsara.com', phone: '+94 77 106 6251' },
          { id: 4, category_name: 'HOUSES', email: 'houses@bimsara.com', phone: '+94 77 003 1007' },
          { id: 5, category_name: 'RENTALS', email: 'rentals@bimsara.com', phone: '+94 77 741 0444' }
        ]);
      }
    };

    fetchCategories();
  }, []);

  const [generalContact, ...otherContacts] = categories;

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

          {generalContact ? (
            <div className="contct-m">
              <ContactCard
                header={generalContact.category_name}
                email={generalContact.email}
                phone={generalContact.phone}
                general
              />
            </div>
          ) : null}

          {otherContacts.length > 0 ? (
            <div className="contct">
              {otherContacts.map((contact) => (
                <div className="contct-c" key={contact.id}>
                  <ContactCard
                    header={contact.category_name}
                    email={contact.email}
                    phone={contact.phone}
                  />
                </div>
              ))}
            </div>
          ) : null}

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
