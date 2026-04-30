import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/navbar/Navbar";
import logo from "../../../assets/images/Bimsara Real Estate - Logo.webp";
import circle from "../../../assets/icons/round.webp";
import image from "../../../assets/images/Bimsara Real Estate - Buyers Hero Mini.webp";
import BuyerImg from "../../../assets/images/Bimsara Real Estate - Buyers Hero.webp";
import iso from "../../../assets/images/Bimsara Real Estate - ISO Logo.webp";
import safetynet from "../../../assets/images/Safetynet Private Limited - Logo.webp";

import "./buyersStyles.scss";
import RightBar from "../../../components/rightBar/RightBar";
import ServiceCard from "../../../components/serviceCard/serviceCard";
import FilpCard from "../../../components/flipCard/flipCard";
import BuyersContent from "./buyersContent";
import SellerCard from "../../../components/sellerCard/sellerCard";
import Collapsible from "../../../components/collapsible/collapsible";
import ContactModal from "../../../components/modal/contactModal/contactModal";
import Footer from "../../../components/footer/footer";
import HamburgerIcon from "../../../components/hamburgerIcon/hamburgerIcon";
import Sidebar from "../../../components/sidebar/sidebar";
import GradientModal from "../../../components/modal/gradientModal/gradientModal";
const Buyers = () => {
  const [selected, setSelected] = useState(1);
  const [contactModal, setContactModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState(false);
  const [num, setNum] = useState(1);
  const [commissionRate, setCommissionRate] = useState('3%');

  // Fetch commission rate from backend
  useEffect(() => {
    const fetchCommissionRate = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/other-settings');
        if (response.data && response.data.commission_rate) {
          setCommissionRate(response.data.commission_rate);
        }
      } catch (error) {
        console.error('Error fetching commission rate:', error);
        // Keep default 3% if API fails
      }
    };
    fetchCommissionRate();
  }, []);

  const data = [
    {
      name: "Define - Prioritize Your Needs",
      onclick: () => {
        setSelected(1);
      },
    },
    {
      name: "Identify Costs - Determine Affordability",
      onclick: () => {
        setSelected(2);
      },
    },
    {
      name: "Negotiate the Right Loan",
      onclick: () => {
        setSelected(3);
      },
    },
    {
      name: "Retain Your Real Estate Professional",
      onclick: () => {
        setSelected(4);
      },
    },
    {
      name: "Spotting Your Dream Home",
      onclick: () => {
        setSelected(5);
      },
    },
    {
      name: "Negotiate the Best Deal",
      onclick: () => {
        setSelected(6);
      },
    },
    {
      name: "Obtain Title Clearance",
      onclick: () => {
        setSelected(7);
      },
    },
    {
      name: "Completing the Transaction",
      onclick: () => {
        setSelected(8);
      },
    },
    {
      name: "Know Your Documents",
      onclick: () => {
        setSelected(9);
      },
    },
    {
      name: "Stamp Duty",
      onclick: () => {
        setSelected(10);
      },
    },
  ];

  const [thumb_css, img_thumb] = useState({ visibility: 'hidden', opacity: '0' });

  const getModalContent = () => {
    if (num === 2) {
      return (
        <div className="gradient-cont">
          <div className="head">Fact Finding</div>
          <div className="margin-top-40" />
          We learn everything we need to know about you, what you need and want in a property, the price range to work on and when you want to move.
        </div>
      );
    } else if (num === 1) {
      return (
        <div className="gradient-cont">
          <div className="head">Property Selection</div>
          <div className="margin-top-40" />
          We will evaluate properties in our database to determine which of them
          meets your requirements. We then present you the specific properties
          that passed the initial selection. Here, you will receive an
          informative presentation and pictures of the actual setting out of the
          property including the access roads, neighbourhood, interior and
          exterior. Together we will shortlist and make site visits to find a
          property perfect for you.
        </div>
      );
    } else if (num === 3) {
      return (
        <div className="gradient-cont">
          <div className="head">Negotiations & Closing</div>
          <div className="margin-top-20" />
          In this important and often emotional process, we will meticulously
          handle and monitor each step leading up to closing. We assure that you
          get the best possible deal.
        </div>
      );
    } else {
      return (
        <div className="gradient-cont">
          <div className="head">Fees</div>
          <div className="margin-top-40" />
          Our fees of {commissionRate} of the final selling price will be paid by the seller.
        </div>
      );
    }
  };
  return (
    <div className="buyers">
      {sidebar ? <Sidebar setSidebar={setSidebar} /> : ""}
      <div className="buyers-background" id="buyers"
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
        <div className="buyersContentOne">
          <div className="buyersContentOne-inner">
            <div className="top-containr">
              <div className="img-cont" style={thumb_css}>
                <img alt="" src={BuyerImg} className="img-c" />
              </div>
              <div className="top-conatiner-left">
                <div className="left-inner">
                  <div className="header">Buying a property</div>
                  <div className="sub">OUR SERVICES</div>
                  <div className="buyers-card-container">
                    <div className="right-content">
                      <div className="header-s">
                        Our Secret of Finding<br></br>You the Property of Your<br></br>Dreams
                      </div>
                      Finding you a great property, in a good community, with
                      the best possible terms and at the best possible price, is
                      what we do. We probably maintain the most comprehensive
                      database of properties up for sale in the geographical
                      areas of our operation. Our logically structured buying
                      program will ensure that your new residence is exactly
                      what you are looking for.
                    </div>
                  </div>
                </div>
              </div>
              <div className="top-conatiner-right">
                <div className="grid-component">
                  <div className="div-1">
                    <div className="div-t">
                      <FilpCard
                        content="Property Selection"
                        backContent="We will evaluate properties in our database to determine which of them meets your requirements. We then present you the specific properties that passed the initial selection. Here, you will receive an informative presentation and pictures of the actual setting out of the property including the access roads, neighbourhood, interior and exterior. Together we will shortlist and make site visits to find a property perfect for you."
                      />
                    </div>
                    <div className="div-b">
                      <FilpCard
                        content="Fees"
                        backContent={`Our fees of ${commissionRate} of the final selling price will be paid by the seller.`}
                      />
                    </div>
                  </div>
                  <div className="div-2">
                    <div className="div-t">
                      <FilpCard
                        content="Fact Finding"
                        backContent="We learn everything we need to know about you, what you need and want in a property, the price range to work on and when you want to move."
                      />
                    </div>
                <div className="img-container" onClick={e => img_thumb({ visibility: 'visible', opacity: '1' })} onMouseEnter={e => img_thumb({ visibility: 'visible', opacity: '1' })} onMouseLeave={e => img_thumb({ visibility: 'hidden', opacity: '0' })}>
                      <img alt="" src={image} />
                    </div>
                    <div className="div-b">
                      <FilpCard
                        content="Negotiations & Closing"
                        backContent="In this important and often emotional process, we will meticulously handle and monitor each step leading up to closing. We assure that you get the best possible deal."
                      />
                    </div>
                  </div>
                </div>
                <div className="card-compo">
                  <SellerCard 
                    content="Property Selection"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNum(1);
                      setModal(true);
                    }}
                  />
                  <SellerCard 
                    content="Fact Finding"
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
      <div className="buyers-background-bottom" id="buyers-guide">
        <div className="left-in">
          <div className="top-containr">
            <div className="top-conatiner-left">
              <div className="left-inner">
                <div className="header">Buying a Property</div>
                <div className="buyers-service-card ">
                  <ServiceCard
                    setSelected={setSelected}
                    selected={selected}
                    data={data}
                    type="Buyer"
                  />
                </div>
                <div className="cnt-form-div">
                  <Collapsible
                    setSelected={setSelected}
                    selected={selected}
                    data={data}
                    type="Buyer"
                  />
                </div>
              </div>
            </div>
            <div className="top-conatiner-right">
              <BuyersContent selected={selected} commissionRate={commissionRate} />
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
        <div className="buyers-right-bar">
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
export default Buyers;
