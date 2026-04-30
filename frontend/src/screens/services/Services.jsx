import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Bimsara Real Estate - Logo.webp";
import image from "../../assets/images/Bimsara Real Estate - Home Hero.webp";
import image2 from "../../assets/images/Bimsara Real Estate - Home Testimonials Cover.webp";
import rect from "../../assets/images/Bimsara Real Estate - Home dropdown bg web.webp";
import rect2 from "../../assets/images/Bimsara Real Estate - Home dropdown bg tablet.webp";
import hamburger from "../../assets/icons/hamburger.webp";
import arrow from "../../assets/icons/white-arrow.webp";
import circle from "../../assets/icons/round.webp";
import iso from "../../assets/images/Bimsara Real Estate - ISO Logo.webp";
import safetynet from "../../assets/images/Safetynet Private Limited - Logo.webp";

import "./ServicesStyles.scss";

import Navbar from "../../components/navbar/Navbar";
import ServicesContentOne from "./ServicesContentOne";
import RightBar from "../../components/rightBar/RightBar";
import ServicesContentTwo from "./ServicesContentTwo";
import ServicesContentThree from "./ServicesContentThree";
import ServicesContentFour from "./ServicesContentFour";
import ServicesContentFive from "./ServicesContectFive";
import ContactComponent from "../../components/contactComponent/contactComponent";
import ContactModal from "../../components/modal/contactModal/contactModal";
import Footer from "../../components/footer/footer";
import HamburgerIcon from "../../components/hamburgerIcon/hamburgerIcon";
import Sidebar from "../../components/sidebar/sidebar";

const Services = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="Services">
      {sidebar ? <Sidebar setSidebar={setSidebar} /> : ""}
      <div className="Services-background"
        onClick={() => {
          let element = document.getElementById('sidee');
          if (element) {
            element.style.right = "0";
            element.style.animation = "slideout 1s backwards";
            setTimeout(() => {
              setSidebar(false);
            }, 500);
          }
        }}
      >
        <div className="ham-bar-div">
          <HamburgerIcon setSidebar={setSidebar} sidebar={sidebar} />
        </div>
        <div className="nav-bar-div">
          <Navbar nav="services" />
        </div>
        <div className="logo-container">
          <img alt="" src={logo} className="logo" onClick={() => {
            navigate("/");
            setTimeout(() => {
              document
                .getElementById("root")
                .scrollIntoView({ behavior: "smooth" });
            }, 500);
          }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="header-text">
          <div className="normal-header-text">Redefining</div>
          <div className="bold-header-text">Real Estate Brokering</div>
          <div className="normal-header-text">since 2006.</div>
        </div>
        <div className="top-bottom-container">
          <div className="topper-container">
            <div className="topper-text">
              <div className="inner-content">
                <img alt="" src={rect} className="rect" />
                <img alt="" src={rect2} className="rect2" />

                <div className="inner-content-div">
                  <div className="want">I want to</div>
                  <div
                    className="custom-select"
                    onClick={() => {
                      setDropdown(!dropdown);
                    }}
                  >
                    <div className="div-c">Choose your purpose</div>
                    <div className="img-dv">
                      <img alt="" src={hamburger} />
                    </div>
                  </div>
                  {dropdown ? (
                    <div className="custom-drpdown">
                      <div className="div-se">
                        <a href="/sellers">Sell my property</a>
                      </div>
                      <div className="div-se">
                        <a href="/buyers">Buy a property</a>
                      </div>
                      <div className="div-se">
                        <a href="/landlords"> Rent Out my property</a>
                      </div>
                      <div className="div-se">
                        <a href="/tenants">Rent Occupy a property</a>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="want-content">
                    <div className="want-inner">
                      <a href="/sellers">Sell my property</a>
                      <img alt="" src={arrow} className="arrow" />
                    </div>
                    <div className="want-inner">
                      <a href="/buyers">Buy a property</a>
                      <img alt="" src={arrow} className="arrow" />
                    </div>
                    <div className="want-inner">
                      <a href="/landlords"> Rent Out my property</a>
                      <img alt="" src={arrow} className="arrow" />
                    </div>
                    <div className="want-inner">
                      <a href="/tenants">Rent Occupy a property</a>
                      <img alt="" src={arrow} className="arrow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="topper-image"
              onClick={() => {
                setDropdown(false);
              }}
            >
              <div
                className="top-content-arrow"
              >
                <img alt="" src={iso} className="iso" />
                <img alt="" src={safetynet} className="safetynet" />
                <img alt="" src={circle} className="circle"
                  onClick={() => setContactModal(true)} />
              </div>
              <img alt="" src={image} className="bg" />
            </div>
          </div>
        </div>
      </div>
      <div className="Services-bottom-container">
        <div className="left-b">
          <ServicesContentOne />
          <ServicesContentTwo />
          <ServicesContentThree />
          <div className="service-img-container">
            <img alt="" src={image2} />
          </div>
          <ServicesContentFour />
          <div className="contact-component">
            <ContactComponent from="home" />
          </div>
          <ServicesContentFive />
          <Footer />
        </div>
        <div className="right-bar-div">
          <RightBar />
        </div>
      </div>
      {contactModal ? <ContactModal setContactModal={setContactModal} /> : ""}
    </div>
  );
};
export default Services;
