import React from "react";
import logo from "../../assets/images/Bimsara Real Estate - About Logo.webp";
import SecondaryButton from "../../components/button/secondaryButton/SecondaryButton";
import config from "../../config";
import "./AboutStyles.scss";

const AboutContentTwo = ({ companyProfilePath }) => {
  const companyProfileUrl = companyProfilePath
    ? `http://localhost:5000${companyProfilePath}`
    : null;

  return (
    <div className="AboutContentTwo" id="about-who">
      <div className="who-header">WHO WE ARE</div>
      <div className="inner-who">
        <div className="about-content-two-left">
          <div className="bottom-left-container">
            <div className="heder-content">
              Bimsara Real Estate is a premier broking brand at the forefront of
              Sri Lanka’s real estate market.
            </div>
            <div className="sub-content">
              With many successful transactions concluded, we possess an
              unparalleled, profound, insightful understanding of the property
              market in Sri Lanka. Attributed to our far-flung experience in the
              industry, we are capable of providing holistic, end-to-end options
              to the versatile demands and concerns of every client.
            </div>
            <div className="sub-content-two">
              The brand is put to the forefront by Safetynet (Private) Limited
              founded in 2006. The company has been in the industry since then
              and has extended mediation services under the
              guidance and close inspection of the founder and the Managing
              Director; Bimsara Gamage, to a wide spectrum of property sellers,
              landlords, buyers and tenants with myriad, diverse and unique
              needs and requirements.
            </div>

            {companyProfileUrl && (
              <div className="button-container">
                <a
                  href={companyProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SecondaryButton buttonText="Download Company Profile Book" />
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="about-content-two-right">
          <img alt="" src={logo} />
        </div>
      </div>
    </div>
  );
};
export default AboutContentTwo;
