import React, { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import logo from "../../../assets/images/Bimsara Real Estate - Logo.webp";
import image from "../../../assets/images/Bimsara Real Estate - Landlords Hero Mini.webp";
import circle from "../../../assets/icons/round.webp";
import landlordImg from "../../../assets/images/Bimsara Real Estate - Landlords Hero.webp";
import iso from "../../../assets/images/Bimsara Real Estate - ISO Logo.webp";
import safetynet from "../../../assets/images/Safetynet Private Limited - Logo.webp";

import "./landlordsStyles.scss";
import SellerCard from "../../../components/sellerCard/sellerCard";
import RightBar from "../../../components/rightBar/RightBar";
import ServiceCard from "../../../components/serviceCard/serviceCard";
import LandlordContent from "./landlordContent";
import GradientModal from "../../../components/modal/gradientModal/gradientModal";
import Collapsible from "../../../components/collapsible/collapsible";
import ContactModal from "../../../components/modal/contactModal/contactModal";
import Footer from "../../../components/footer/footer";
import HamburgerIcon from "../../../components/hamburgerIcon/hamburgerIcon";
import Sidebar from "../../../components/sidebar/sidebar";
const Landlords = () => {
  const [selected, setSelected] = useState(1);
  const [modal, setModal] = useState(false);
  const [num, setNum] = useState(1);
  const [contactModal, setContactModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const data = [
    {
      name: "How to Become a Successful Landlord",
      onclick: () => {
        setSelected(1);
      },
    },
    {
      name: "Learn the Basics",
      onclick: () => {
        setSelected(2);
      },
    },
    {
      name: "Fix the Rent & Terms",
      onclick: () => {
        setSelected(3);
      },
    },
    {
      name: "Finding a Tenant",
      onclick: () => {
        setSelected(4);
      },
    },
    {
      name: "Tenant Screening Process",
      onclick: () => {
        setSelected(5);
      },
    },
    {
      name: "Tenancy Agreement",
      onclick: () => {
        setSelected(6);
      },
    },
    {
      name: "Handing Over",
      onclick: () => {
        setSelected(7);
      },
    },
    {
      name: "During the Tenancy",
      onclick: () => {
        setSelected(8);
      },
    },
    {
      name: "Ending the Tenancy",
      onclick: () => {
        setSelected(9);
      },
    },
  ];

  const [thumb_css, img_thumb] = useState({ visibility: 'hidden', opacity: '0' });

  const getModalContent = () => {
    if (num === 1) {
      return (
        <div className="gradient-cont">
          <div className="head"> Comprehensive Advertising & Promotion</div>
          <div className="margin-top-40" />
          Your property will not only appear on our website it will be promoted
          on a one to one basis to a large number of potential tenants who
          depend on us to find the right place for them. We will continue to
          work on your property until we find you a suitable tenant.
          <div className="margin-top-40" />
          You will never pay any advertising charges!
        </div>
      );
    } else if (num === 2) {
      return (
        <div className="gradient-cont">
          <div className="head"> Reference On Tenant</div>
          <div className="margin-top-40" />
          Finding a reliable tenant with right references is not an easy task.
          We can credit check your potential tenant. We also insist referencing
          from previous landlords and employers and verify identification.
          <div className="margin-top-40" />
          We make it hassle-free for you.
        </div>
      );
    } else if (num === 3) {
      return (
        <div className="gradient-cont">
          <div className="head">
            Full Inventory & Schedule of Condition - Including Photographs
          </div>
          <div className="margin-top-20" />
          Just before your tenant moves in, we will visit the property to
          conduct a full and comprehensive Inventory and Schedule of Condition.
          This document is vitally important to protect your property, which is
          why we use a methodical approach to recording the condition of your
          walls, floors, fixtures, fittings and everything else!
          <div className="margin-top-20" />
          This is accompanied by full colour photographs and could be made to
          form part of the Agreement of Lease between you and your tenant.
          <div className="margin-top-20" />
          You may refer back to the original document the day your tenant moves
          out when considering dilapidations, wear and tear and deposit
          deductions.<br></br><br></br>
        </div>
      );
    } else {
      return (
        <div className="gradient-cont">
          <div className="head">All - Inclusive Fees</div>
          <div className="margin-top-20" />
          We really do take care of everything. Our fee for all this is
          equivalent to one month’s rent.
        </div>
      );
    }
  };
  return (
    <div className="landlords">
      {sidebar ? <Sidebar setSidebar={setSidebar} /> : ""}
      <div className="landlords-background" id="landlords"
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
          <img alt="" src={logo} className="logo" onClick={() => window.open("/", "_self")} style={{ cursor: "pointer" }} />
        </div>
        <div className="landlordsContentOne">
          <div className="landlordsContentOne-inner">
            <div className="top-containr">
              <div className="img-cont" style={thumb_css}>
                <img alt="" src={landlordImg} className="img-c" />
              </div>
              <div className="top-conatiner-left">
                <div className="left-inner">
                  <div className="header">Renting Out your property</div>
                  <div className="sub">OUR SERVICES</div>
                  <div className="landlords-card-container">
                    <SellerCard 
                      content="Comprehensive Advertising & Promotion"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNum(1);
                        setModal(true);
                      }}
                    />
                    <SellerCard 
                      content="Reference on Tenant"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNum(2);
                        setModal(true);
                      }}
                    />
                    <SellerCard 
                      content="Full Inventory & Schedule of Condition"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNum(3);
                        setModal(true);
                      }}
                    />
                    <SellerCard 
                      content="All - Inclusive Fees"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNum(4);
                        setModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="top-conatiner-right">
                <div className="img-container" onClick={e => img_thumb({ visibility: 'visible', opacity: '1' })} onMouseEnter={e => img_thumb({ visibility: 'visible', opacity: '1' })} onMouseLeave={e => img_thumb({ visibility: 'hidden', opacity: '0' })}>
                  <img alt="" src={image} />
                </div>
                <div className="right-content">
                  <div className="landlord-hed">
                    Experience Counts. <br></br>Your Property is in Safe Hands.
                  </div>
                  Knowing what you should do and what you should not do as a
                  landlord is sometimes very difficult. Negotiating the right
                  deal is not limited to agreement on the rent, security deposit
                  or advance payment. Obtaining consent of the potential tenant
                  to go with your terms and conditions too a part of
                  negotiation. We can advise you on the terms and conditions you
                  may want to include to the agreement of lease as a landlord or
                  to answer any questions that you have.
                </div>
              </div>
            </div>

            <div
              className="top-content-arrow"
            >
              <img alt="" src={iso} className="iso" />
              <img alt="" src={safetynet} className="safetynet" />
              <img alt="" src={circle} className="circle"
                onClick={() => setContactModal(true)} />
            </div>
          </div>
        </div>
      </div>
      <div className="landlords-background-bottom" id="landlords-guide">
        <div className="left-in">
          <div className="top-containr">
            <div className="top-conatiner-left">
              <div className="left-inner">
                <div className="header">Renting Out Your Property</div>
                <div className="landlords-service-card">
                  <ServiceCard
                    setSelected={setSelected}
                    selected={selected}
                    data={data}
                    type="Landlord"
                  />
                </div>
                <div className="cnt-form-div">
                  <Collapsible
                    setSelected={setSelected}
                    selected={selected}
                    data={data}
                    type="Landlord"
                  />
                </div>
              </div>
            </div>
            <div className="top-conatiner-right">
              <LandlordContent selected={selected} />
            </div>
          </div>
          <Footer />
        </div>
        <div className="landlords-right-bar">
          <RightBar />
        </div>
      </div>
      {modal ? (
        <GradientModal setModal={setModal} content={getModalContent()} />
      ) : (
        ""
      )}
      {contactModal ? <ContactModal setContactModal={setContactModal} /> : ""}
    </div>
  );
};
export default Landlords;
