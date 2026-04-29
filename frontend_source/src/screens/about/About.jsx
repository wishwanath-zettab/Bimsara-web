import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import RightBar from "../../components/rightBar/RightBar";
import AboutContentOne from "./AboutContentOne";
import AboutContentTwo from "./AboutContentTwo";
import ContactComponent from "../../components/contactComponent/contactComponent";
import "./AboutStyles.scss";
import AboutContentThree from "./AboutContentThree";
import AboutContentFour from "./AboutContentFour";
import AboutContentFive from "./AboutContentFive";
import AboutContentSix from "./AboutContentSix";
import AboutContentSeven from "./AboutContentSeven";
import Modal from "../../components/modal/modal";
import ContactModal from "../../components/modal/contactModal/contactModal";
import Footer from "../../components/footer/footer";
import HamburgerIcon from "../../components/hamburgerIcon/hamburgerIcon";
import Sidebar from "../../components/sidebar/sidebar";
const About = () => {
  const [modal, setModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="About">
      {sidebar ? <Sidebar setSidebar={setSidebar} /> : ""}
      <div className="about-background" id="about-background"
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
        <div className="about-nav-bar">
          <Navbar nav="about" />
        </div>
        <AboutContentOne setContactModal={setContactModal} />
      </div>
      <div className="about-bottom-container">
        <div className="left-about-container">
          <AboutContentTwo />
          <AboutContentThree />
          <AboutContentFour setModal={setModal} />
          <AboutContentFive />
          <AboutContentSix />
          <AboutContentSeven />
          <Footer />
        </div>

        <div className="about-right-bar">
          <RightBar />
        </div>
      </div>
      {modal ? <Modal setModal={setModal} /> : ""}
      {contactModal ? <ContactModal setContactModal={setContactModal} /> : ""}
    </div>
  );
};
export default About;
