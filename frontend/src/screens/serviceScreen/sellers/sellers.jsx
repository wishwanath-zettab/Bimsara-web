import React, { useState, useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import logo from "../../../assets/images/Bimsara Real Estate - Logo.webp";
import image from "../../../assets/images/Bimsara Real Estate - Sellers Hero Mini.webp";
import circle from "../../../assets/icons/round.webp";
import sellerImg from "../../../assets/images/Bimsara Real Estate - Sellers Hero.webp";
import iso from "../../../assets/images/Bimsara Real Estate - ISO Logo.webp";
import safetynet from "../../../assets/images/Safetynet Private Limited - Logo.webp";

import "./sellersStyles.scss";
import SellerCard from "../../../components/sellerCard/sellerCard";
import RightBar from "../../../components/rightBar/RightBar";
import ServiceCard from "../../../components/serviceCard/serviceCard";
import SellerContent from "./sellersContent";
import Collapsible from "../../../components/collapsible/collapsible";
import ContactModal from "../../../components/modal/contactModal/contactModal";
import Footer from "../../../components/footer/footer";
import HamburgerIcon from "../../../components/hamburgerIcon/hamburgerIcon";
import Sidebar from "../../../components/sidebar/sidebar";
import GradientModal from "../../../components/modal/gradientModal/gradientModal";
const Sellers = () => {
  const [selected, setSelected] = useState(1);
  const [contactModal, setContactModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [num, setNum] = useState(1);
  const [nextNum, setNextNum] = useState(null);
  const [isSwitching, setIsSwitching] = useState(false);

  // Handle popup switching when clicking different button while modal is open
  useEffect(() => {
    if (nextNum !== null && modal && !modalClosing && !isSwitching) {
      console.log('Switching popup from', num, 'to', nextNum);
      setIsSwitching(true);
      setModalClosing(true);
      
      setTimeout(() => {
        // After closing animation, update content and reopen
        console.log('Animation complete, showing popup', nextNum);
        setNum(nextNum);
        setNextNum(null);
        setModalClosing(false);
        setIsSwitching(false);
      }, 300); // Match animation duration
    }
  }, [nextNum, modal, modalClosing, isSwitching]);

  // Close modal on scroll with animation
  useEffect(() => {
    const handleScroll = () => {
      if (modal && !modalClosing) {
        setModalClosing(true);
        setTimeout(() => {
          setModal(false);
          setModalClosing(false);
        }, 300); // Match animation duration
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [modal, modalClosing]);

  const data = [
    {
      name: "Facts at a Glance",
      onclick: () => {
        setSelected(2);
      },
    },
    {
      name: "Finding a Good Real Estate Professional",
      onclick: () => {
        setSelected(3);
      },
    },
    {
      name: "Setting the Right Price",
      onclick: () => {
        setSelected(4);
      },
    },
    {
      name: "Listing Your Property for Sale",
      onclick: () => {
        setSelected(5);
      },
    },
    {
      name: "Marketing Process",
      onclick: () => {
        setSelected(6);
      },
    },
    {
      name: "When Offers Come In",
      onclick: () => {
        setSelected(7);
      },
    },
    {
      name: "Managing the Transaction",
      onclick: () => {
        setSelected(8);
      },
    },
    {
      name: "Closing the Deal",
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
          <div className="head">Plan & Carry Out Promotional Campaigns</div>
          <div className="margin-top-20" />
          Each property is a unique project.
          <div className="margin-top-20" />
          Planning of the promotional campaigns are materialized giving detailed
          attention to market the speciality of the property. We ensure that the
          maximum attention from the genuine buyers is harnessed at a time by
          expanding our promotions across multiple platforms.
        </div>
      );
    } else if (num === 2) {
      return (
        <div className="gradient-cont">
          <div className="head"> Help you to Make Selling Decisions</div>
          <div className="margin-top-20" />
          Your time, money and efforts do count.
          <div className="margin-top-20" />
          Even with the past property selling experiences, you need help to make
          the best decision at the moment of a sale. Our expertise knowledge in
          market conditions will be presented with timely information to help
          you identify the right value for your property and to make best and
          quick decisions during the sale.
        </div>
      );
    } else {
      return (
        <div className="gradient-cont">
          <div className="head"> Facilitation of Price Negotiations</div>
          <div className="margin-top-20" />
          Negotiating is not bargaining!
          <div className="margin-top-20" />
          During this sensitive and emotional stage of a sale for a property
          owner, we are there to mediate a smooth transaction helping sellers to
          make informed selling decisions and absorbing the turbulences in price
          negotiations between the seller and the buyer while maintaining the
          transparency.
          Successful negotiation is more than a matter of luck or natural talent. It also encompasses the learned ability to use certain skills and techniques to bring about those coveted win-win results.
        </div>
      );
    }
  };

  return (
    <div className="Sellers">
      {sidebar ? <Sidebar setSidebar={setSidebar} /> : ""}
      <div className="sellers-background" id="sellers"
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
        <div className="sellersContentOne">
          <div className="sellersContentOne-inner">
            <div className="top-containr">
              <div class="img-cont" style={thumb_css}>
                <img alt="" src={sellerImg} className="img-c" />
              </div>
              <div className="top-conatiner-left">
                <div className="left-inner">
                  <div className="header">Selling your property</div>
                  <div className="sub">OUR SERVICES</div>
                  <div className="seller-card-container">
                    <SellerCard 
                      content="Plan & Carry Out Promotional Campaigns"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (modal && num !== 1) {
                          // Modal is open and clicking different button - switch popup
                          setNextNum(1);
                        } else if (!modal) {
                          // Modal is closed - open it
                          setNum(1);
                          setModal(true);
                        }
                        // If modal is open and clicking same button - do nothing
                      }}
                    />
                    <SellerCard 
                      content="Help you to Make Selling Decisions"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Clicked Button 2. Current state - modal:', modal, 'num:', num);
                        if (modal && num !== 2) {
                          // Modal is open and clicking different button - switch popup
                          console.log('Triggering switch to popup 2');
                          setNextNum(2);
                        } else if (!modal) {
                          // Modal is closed - open it
                          console.log('Opening popup 2');
                          setNum(2);
                          setModal(true);
                        } else {
                          console.log('Already showing popup 2, doing nothing');
                        }
                        // If modal is open and clicking same button - do nothing
                      }}
                    />
                    <SellerCard 
                      content="Facilitation of Price Negotiations"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (modal && num !== 3) {
                          // Modal is open and clicking different button - switch popup
                          setNextNum(3);
                        } else if (!modal) {
                          // Modal is closed - open it
                          setNum(3);
                          setModal(true);
                        }
                        // If modal is open and clicking same button - do nothing
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="top-conatiner-right">
                <div className="img-container" onclick={e => img_thumb({ visibility: 'visible', opacity: '1' })} onMouseEnter={e => img_thumb({ visibility: 'visible', opacity: '1' })} onMouseLeave={e => img_thumb({ visibility: 'hidden', opacity: '0' })}>
                  <img alt="" src={image} />
                </div>
                <div className="right-content">
                  Regular Updates to Sellers
                  <br />
                  <div className="margin-top-15" />
                  Assisting with furnishing of Unavailable Documents
                  <br />
                  <div className="margin-top-15" />
                  Providing assistance in property surveying
                  <br />
                  <div className="margin-top-15" />
                  Arrangeing & Facilitating Site Inspections
                  <br />
                  <div className="margin-top-15" />
                  Services of a dedicated Transactions Coordinator
                  <br />
                  <div className="margin-top-15" />
                  End-to-end liaising of all matters involved in the sale
                  <br />
                  <div className="margin-top-15" />
                  Attending to necessary approvals with authorities
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
      <div className="sellers-background-bottom" id="sellers-guide">
        <div className="left-in">
          <div className="top-containr">
            <div className="top-conatiner-left">
              <div className="left-inner">
                <div className="header">Selling your property</div>
                <div className="seller-service-card">
                  <ServiceCard
                    setSelected={setSelected}
                    selected={selected}
                    data={data}
                    type="Seller"
                  />
                </div>
                <div className="cnt-form-div">
                  <Collapsible
                    setSelected={setSelected}
                    selected={selected}
                    data={data}
                    type="Seller"
                  />
                </div>
              </div>
            </div>
            <div className="top-conatiner-right">
              <SellerContent selected={selected} />
            </div>
          </div>
          <Footer />
        </div>
        <div className="sellers-right-bar">
          <RightBar />
        </div>
      </div>
      {modal && (
        <GradientModal 
          key={isSwitching ? 'switching' : num} 
          setModal={setModal} 
          content={getModalContent()} 
          externalClosing={modalClosing}
        />
      )}
      {contactModal ? <ContactModal setContactModal={setContactModal} /> : ""}
    </div>
  );
};
export default Sellers;
