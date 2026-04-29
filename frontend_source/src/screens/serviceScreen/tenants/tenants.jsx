import React, { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import logo from "../../../assets/images/Bimsara Real Estate - Logo.webp";
import circle from "../../../assets/icons/round.webp";
import image from "../../../assets/images/Bimsara Real Estate - Tenants Hero Mini.webp";
import TenantImg from "../../../assets/images/Bimsara Real Estate - Tenants Hero.webp";
import iso from "../../../assets/images/Bimsara Real Estate - ISO Logo.webp";
import safetynet from "../../../assets/images/Safetynet Private Limited - Logo.webp";

import "./tenantStyles.scss";
import RightBar from "../../../components/rightBar/RightBar";
import ServiceCard from "../../../components/serviceCard/serviceCard";
import FilpCard from "../../../components/flipCard/flipCard";
import TenantsContent from "./tenantsContent";
import SellerCard from "../../../components/sellerCard/sellerCard";
import Collapsible from "../../../components/collapsible/collapsible";
import ContactModal from "../../../components/modal/contactModal/contactModal";
import Footer from "../../../components/footer/footer";
import HamburgerIcon from "../../../components/hamburgerIcon/hamburgerIcon";
import Sidebar from "../../../components/sidebar/sidebar";
import GradientModal from "../../../components/modal/gradientModal/gradientModal";
const Tenants = () => {
  const [selected, setSelected] = useState(1);
  const [contactModal, setContactModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState(false);
  const [num, setNum] = useState(1);

  const data = [
    {
      name: "Do Your Homework in Advance",
      onclick: () => {
        setSelected(1);
      },
    },
    {
      name: "Check Your Financial Capabilities",
      onclick: () => {
        setSelected(2);
      },
    },
    {
      name: "It’s Still All About Location",
      onclick: () => {
        setSelected(3);
      },
    },
    {
      name: "Assessment of Accomodation Requirements",
      onclick: () => {
        setSelected(4);
      },
    },
    {
      name: "Check List Before Confirming",
      onclick: () => {
        setSelected(5);
      },
    },
    {
      name: "Learn About The Liabilities",
      onclick: () => {
        setSelected(6);
      },
    },
    {
      name: "Tenancy Agreement",
      onclick: () => {
        setSelected(7);
      },
    },
    {
      name: "Move In & Move Out Condition Report & Inventory",
      onclick: () => {
        setSelected(8);
      },
    },
    {
      name: "Helpful Tips",
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
          <div className="head">Fact Finding</div>
          <div className="margin-top-40" />
          We learn everything we need to know about you: What you want in a
          home, what you need in a home, what rent range to work on and when you
          want to move.
        </div>
      );
    } else if (num === 2) {
      return (
        <div className="gradient-cont">
          <div className="head">Property Selection</div>
          <div className="margin-top-40" />
          We will evaluate homes in our database to determine if they meet with
          the criteria you indicate. We then give you a list of ‘suitable’ homes
          and arrange a site visit.
        </div>
      );
    } else if (num === 3) {
      return (
        <div className="gradient-cont">
          <div className="head">Negotiations & Closing</div>
          <div className="margin-top-40" />
          We will do the talking on your behalf and help you secure the place
          you like. We assure you the best possible deal.
        </div>
      );
    } else {
      return (
        <div className="gradient-cont">
          <div className="head">Fees</div>
          <div className="margin-top-20" />
          Our fees equivalent to one month’s rent will be paid by the landlord.
        </div>
      );
    }
  };

  return (
    <div className="tenants">
      {sidebar ? <Sidebar setSidebar={setSidebar} /> : ""}
      <div className="tenants-background" id="tenants"
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
        <div className="tenantsContentOne">
          <div className="tenantsContentOne-inner">
            <div className="top-containr">
              <div className="img-cont" style={thumb_css}>
                <img alt="" src={TenantImg} className="img-c" />
              </div>
              <div className="top-conatiner-left">
                <div className="left-inner">
                  <div className="header">Rent Occupying </div>
                  <div className="sub">OUR SERVICES</div>
                  <div className="tenants-card-container">
                    <div className="right-content">
                      <div className="header-s">It’s Been Made Easy</div>
                      Finding you a great home, in a good neighbourhood, with
                      the best possible terms and at the best possible rent, is
                      what we do. We probably maintain the most comprehensive
                      database of properties up for rent in the geographical
                      areas of our operation. Our obligation is to make sure
                      that your new residence is exactly what you’re looking
                      for. Our approach is simple, yet comprehensive.
                    </div>
                  </div>
                </div>
              </div>
              <div className="top-conatiner-right">
                <div className="grid-component">
                  <div className="div-1">
                    <div className="div-t">
                      <FilpCard
                        content="Fact Finding"
                        backContent="We learn everything we need to know about you: What you want in a home, what you need in a home, what rent range to work on and when you want to move."
                      />
                    </div>
                    <div className="div-b">
                      <FilpCard
                        content="Fees"
                        backContent="Our fees equivalent to one month’s rent will be paid by the landlord."
                      />
                    </div>
                  </div>
                  <div className="div-2">
                    <div className="div-b">
                      <FilpCard
                        content="Property Selection"
                        backContent="We will evaluate homes in our data base to determine if they meet with the criteria you indicate. We then give you a list of ‘suitable’ homes and arrange a site visit."
                      />
                    </div>

                    <div className="div-d">
                      <FilpCard
                        content="Negotiations & Closing"
                        backContent="We will do the talking on your behalf and help you secure the place you like. We assure you the best possible deal."
                      />
                    </div>
                  </div>
                </div>
                <div className="card-compo">
                  <SellerCard 
                    content="Fact Finding"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNum(1);
                      setModal(true);
                    }}
                  />
                  <SellerCard 
                    content="Property Selection"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNum(2);
                      setModal(true);
                    }}
                  />
                  <SellerCard 
                    content="Negotiations & Closing"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNum(3);
                      setModal(true);
                    }}
                  />
                  <SellerCard 
                    content="Fees"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNum(4);
                      setModal(true);
                    }}
                  />
                </div>
                <div className="img-container" onclick={e => img_thumb({ visibility: 'visible', opacity: '1' })} onMouseEnter={e => img_thumb({ visibility: 'visible', opacity: '1' })} onMouseLeave={e => img_thumb({ visibility: 'hidden', opacity: '0' })}>
                  <img alt="" src={image} />
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
      <div className="tenants-background-bottom" id="tenants-guide">
        <div className="left-in">
          <div className="top-containr">
            <div className="top-conatiner-left">
              <div className="left-inner">
                <div className="header">Rent Occupying a property</div>
                <div className="tenants-service-card ">
                  <ServiceCard
                    setSelected={setSelected}
                    selected={selected}
                    data={data}
                    type="Tenant"
                  />
                </div>
                <div className="cnt-form-div">
                  <Collapsible
                    setSelected={setSelected}
                    selected={selected}
                    data={data}
                    type="Tenant"
                  />
                </div>
              </div>
            </div>
            <div className="top-conatiner-right">
              <TenantsContent selected={selected} />
            </div>
          </div>
          <Footer />
        </div>
        <div className="tenants-right-bar">
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
export default Tenants;
