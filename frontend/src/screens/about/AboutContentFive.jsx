import React from "react";
import logo from "../../assets/images/Safetynet Private Limited - Logo.webp"
import "./AboutStyles.scss";
const AboutContentFive = () => {
  return (
    <div className="AboutContentFive" id="about-overview">
      <div className="company-header">COMPANY OVERVIEW</div>
      <div className="inner-content-five">
        <div className="left-inner-content">
          <div className="bottom-left-container">
              <img alt="" src={logo} className="logo"/>
            <div className="sub-content">Safetynet (Private) Limited</div>
            <div className="sub-content-two">
              Company Registration No: PV 1525
            </div>
            <div className="sub-content-two margin-top margin-bottom">
              Safetynet (Private) Limited has been in business since its
              inception on the 19th June 2006 and the company is duly registered
              under the companies Act No. 7 of 2007 as a private company with
              limited liability with one director at present.
            </div>
            <div className="margin-top">
              <div className="contact-header-c">Registered Office</div>
              <br></br>
              <div className="contact-address">
                199/58 <br /> Rajagiriya Road, Rajagiriya
                <br /> Sri Lanka
              </div>
            </div>
          </div>
        </div>
        <div className="right-inner-content">
          <div>
            <div className="contact-header-c">Company Secretary</div>
            <div className="contact-name">
              M C A Advisory Services (Pvt) Ltd
            </div>
          </div>
          <div className="margin-top">
            <div className="contact-header-c">Auditor</div>
            <div className="contact-name">Thilak Jayathilaka & Co.</div>
            <div className="contact-address">
              Chartered Accountants
            </div>
          </div>
          <div className="margin-top">
            <div className="contact-header-c">Banker</div>
            <div className="contact-name">Hatton National Bank PLC.</div>
            <div className="contact-address">Green Path Branch</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutContentFive;
