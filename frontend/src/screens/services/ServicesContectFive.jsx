import React, { useEffect, useState } from "react";
import axios from "axios";
import facebook from "../../assets/icons/fb.webp";
import google from "../../assets/icons/gl.webp";
import linkedin from "../../assets/icons/lin.webp";
import instagram from "../../assets/icons/insta.webp";
import youtube from "../../assets/icons/yt.webp";
import "./ServicesStyles.scss";
const ServicesContentFive = () => {
  const [officeAddress, setOfficeAddress] = useState('');

  useEffect(() => {
    const fetchOfficeAddress = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact-details');
        setOfficeAddress(response.data.office_address || '');
      } catch (error) {
        setOfficeAddress('199/58, Rajagiriya Road, Rajagiriya.');
      }
    };

    fetchOfficeAddress();
  }, []);

  const officeLines = officeAddress
    ? officeAddress.split(/,|\n/).map((line) => line.trim()).filter(Boolean)
    : [];

  return (
    <div className="ServicesContentSeven" id="home-location">
      <div className="presennse-header">OUR PRESENCE</div>
      <div className="inner-presense">
        <div className="inner-presense-left">
          <div className="offices-container">
            <div className="header-office">OFFICE</div>
            <div className="content-office">
              {officeLines.length > 0 ? officeLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < officeLines.length - 1 ? <br /> : null}
                </span>
              )) : 'Loading...'}
            </div>
          </div>
          <div className="social-container">
            <div className="header-social">WE ARE SOCIAL</div>
            <div className="content-social">
              <img alt="" src={facebook} onClick={()=> window.open("https://www.facebook.com/bimsararealestate/", "_blank")} style={{ cursor: "pointer" }}/>
              <img alt="" src={google} onClick={()=> window.open("https://g.page/r/CcszCwgyi0e4EAE", "_blank")} style={{ cursor: "pointer" }}/>
              <img alt="" src={linkedin} onClick={()=> window.open("https://www.linkedin.com/company/safetynet-private-limited", "_blank")} style={{ cursor: "pointer" }}/>
              <img alt="" src={instagram} onClick={()=> window.open("https://www.instagram.com/bimsara.realestate/", "_blank")} style={{ cursor: "pointer" }} />
              <img alt="" src={youtube} onClick={()=> window.open("https://www.youtube.com/channel/UC7qFW8s7CdI1GeDChAY5nTw/featured", "_blank")} style={{ cursor: "pointer" }}/>
            </div>
          </div>
        </div>
        <div className="inner-presense-right">
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3960.7648129039626!2d79.8930121!3d6.918696!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25995119a0d4b%3A0xb8478b32080b33cb!2sBimsara%20Real%20Estate!5e0!3m2!1sen!2slk!4v1652678023249!5m2!1sen!2slk"
              width="100%"
              height="100%"
              frameborder="0"
              style={{ border: 0 }}
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
              title="map"
              onClick={()=> window.open("https://www.google.com/maps/place/Bimsara+Real+Estate/@6.918631,79.894804,15z/data=!4m5!3m4!1s0x0:0xb8478b32080b33cb!8m2!3d6.9186314!4d79.8948042?hl=en", "_blank")}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesContentFive;
