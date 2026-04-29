import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/Bimsara Real Estate - Sellers Icon.webp";
import buyer from "../../assets/images/Bimsara Real Estate - Buyers Icon.webp";
import img2 from "../../assets/images/Bimsara Real Estate - Landlords Icon.webp";
import img3 from "../../assets/images/Bimsara Real Estate - Tenants Icon.webp";
import fb from "../../assets/icons/Facebook.webp";
import gl from "../../assets/icons/Google.webp";
import ln from "../../assets/icons/LinkedIn.webp";
import yt from "../../assets/icons/YouTube.webp";
import inst from "../../assets/icons/Instagram.webp";
import ham from "../../assets/images/Bimsara Real Estate - Hamburger 1.webp";
import ham2 from "../../assets/images/Bimsara Real Estate - Hamburger 2.webp";
import CompanyProfileBook from "../../assets/pdf/Company Profile Book.pdf";
import "./sidebarStyles.scss";

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 ||
    rect.bottom >= 35
  );
}

const Sidebar = (props) => {
  const [service, setService] = useState(false);
  const [contact, setContact] = useState(false);
  const [about, setAbout] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const getServices = () => {
    return (
      <div className="service-cont">
        <div className="div-c">
          <a href="/sellers">
            <div className="service-layout ">
              <div className="img-cont">
                <img alt="" src={img} />
              </div>
              <div className="text">
                <div className="head" id="NavSellers">Sellers</div>
                <div className="sub-n">Our services for property sellers</div>
              </div>
            </div>
          </a>
          <a href="/buyers">
            <div className="service-layout ">
              <div className="img-cont">
                <img alt="" src={buyer} />
              </div>
              <div className="text">
                <div className="head" id="NavBuyers">Buyers</div>
                <div className="sub-n">What we offer to property buyers</div>
              </div>
            </div>
          </a>
          <a href="/landlords">
            <div className="service-layout ">
              <div className="img-cont">
                <img alt="" src={img2} />
              </div>
              <div className="text">
                <div className="head" id="NavLandlords">Landlords</div>
                <div className="sub-n">Our services for landlords</div>
              </div>
            </div>
          </a>
          <a href="/tenants">
            <div className="service-layout ">
              <div className="img-cont">
                <img alt="" src={img3} />
              </div>
              <div className="text">
                <div className="head" id="NavTenants">Tenants</div>
                <div className="sub-n">What we offer to tenants</div>
              </div>
            </div>
          </a>
        </div>
        <div className="line" />
        <div className="div-b">
          <div className="hdr">Read the Guides</div>
          <div
            className="sub-2"
            onClick={() => {
              navigate("/sellers");
              setTimeout(() => {
                document
                  .getElementById("sellers-guide")
                  .scrollIntoView({ behavior: "smooth" });
              }, 10);
              props.setSidebar(false);
            }}
            style={{ cursor: "pointer" }}
          >
            Seller’s Guide
          </div>
          <div
            className="sub-2"
            onClick={() => {
              navigate("/buyers");
              setTimeout(() => {
                document
                  .getElementById("buyers-guide")
                  .scrollIntoView({ behavior: "smooth" });
              }, 0);
              props.setSidebar(false);
            }}
            style={{ cursor: "pointer" }}
          >
            Buyer’s Guide
          </div>
          <div
            className="sub-2"
            onClick={() => {
              navigate("/landlords");
              setTimeout(() => {
                document
                  .getElementById("landlords-guide")
                  .scrollIntoView({ behavior: "smooth" });
              }, 10);
              props.setSidebar(false);
            }}
            style={{ cursor: "pointer" }}
          >
            Landlord’s Guide
          </div>
          <div
            className="sub-2"
            onClick={() => {
              navigate("/tenants");
              setTimeout(() => {
                document
                  .getElementById("tenants-guide")
                  .scrollIntoView({ behavior: "smooth" });
              }, 10);
              props.setSidebar(false);
            }}
            style={{ cursor: "pointer" }}
          >
            Tenant’s Guide
          </div>
        </div>
      </div>
    );
  };
  const getContact = () => {
    return (
      <div className="service-cont">
        <div className="div-c">
          <div className="service-layout ">
            <div
              className="text"
              onClick={() => {
                props.setSidebar(false);
                console.log(location.pathname);
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("home-contact")
                    .scrollIntoView({ behavior: "smooth" });
                }, 400);
              }}
            >
              <div className="head">Contact Us</div>
              <div className="sub-n">Contact the divisions</div>
            </div>
          </div>
          <div className="service-layout ">
            <div
              className="text"
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("home-location")
                    .scrollIntoView({ behavior: "smooth" });
                }, 400);
                props.setSidebar(false);
              }}
            >
              <div className="head">Our Location</div>
              <div className="sub-n">Meet at office</div>
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="div-b">
          <div className="hdr">Social Links</div>
          <div className="bt">
            <div className="sub-2" onClick={() => window.open("https://www.facebook.com/bimsararealestate/", "_blank")}>
              <div className="img-img">
                <img alt="" src={fb} />
              </div>
              <div className="span-t">@bimsararealestate</div>
            </div>
            <div className="sub-2" onClick={() => window.open("https://g.page/r/CcszCwgyi0e4EAE", "_blank")}>
              <div className="img-img">
                <img alt="" src={gl} />
              </div>
              <div className="span-t">Bimsara Real Estate</div>
            </div>{" "}
            <div className="sub-2" onClick={() => window.open("https://www.linkedin.com/company/safetynet-private-limited", "_blank")}>
              <div className="img-img">
                <img alt="" src={ln} />
              </div>
              <div className="span-t">Safetynet (Private) Limited</div>
            </div>{" "}
            <div className="sub-2" onClick={() => window.open("https://www.youtube.com/channel/UC7qFW8s7CdI1GeDChAY5nTw/featured", "_blank")}>
              <div className="img-img">
                <img alt="" src={yt} />
              </div>
              <div className="span-t">Bimsara Real Estate</div>
            </div>{" "}
            <div className="sub-2" onClick={() => window.open("https://www.instagram.com/bimsara.realestate/", "_blank")}>
              <div className="img-img">
                <img alt="" src={inst} />
              </div>
              <div className="span-t">Bimsara Real Estate</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const getAbout = () => {
    return (
      <div className="service-cont" id="services">
        <div className="div-c">
          <div className="service-layout ">
            <div
              className="text"
              onClick={() => {
                navigate("/about");
                setTimeout(() => {
                  document
                    .getElementById("root")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
                props.setSidebar(false);
              }}
            >
              <div className="head" id="NavAbout0">About</div>
              <div className="sub-n"></div>
            </div>
          </div>
          <div className="service-layout ">
            <div
              className="text"
              onClick={() => {
                navigate("/about");
                setTimeout(() => {
                  document
                    .getElementById("about-who")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
                props.setSidebar(false);
              }}
            >
              <div className="head" id="NavAbout1">Who we are</div>
              <div className="sub-n">About us</div>
            </div>
          </div>
          <div className="service-layout ">
            <div
              className="text"
              onClick={() => {
                navigate("/about");
                setTimeout(() => {
                  document
                    .getElementById("about-mission")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
                props.setSidebar(false);
              }}
            >
              <div className="head" id="NavAbout2">Our Direction</div>
              <div className="sub-n">Vision, Mission, Values</div>
            </div>
          </div>
          <div className="service-layout ">
            <div
              className="text"
              onClick={() => {
                navigate("/about");
                setTimeout(() => {
                  document
                    .getElementById("about-iso")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
                props.setSidebar(false);
              }}
            >
              <div className="head" id="NavAbout3">ISO Certicafication</div>
              <div className="sub-n">We love to follow systems</div>
            </div>
          </div>
          <div className="service-layout ">
            <div
              className="text"
              onClick={() => {
                navigate("/about");
                setTimeout(() => {
                  document
                    .getElementById("about-overview")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
                props.setSidebar(false);
              }}
            >
              <div className="head" id="NavAbout4">Company Overview</div>
              <div className="sub-n">The registered company</div>
            </div>
          </div>
          <div className="service-layout">
            <div className="text"
              onClick={() => {
                navigate("/about");
                setTimeout(() => {
                  document
                    .getElementById("about-team")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
                props.setSidebar(false);
              }}
            >
              <div className="head" id="NavAbout5">Our Team</div>
              <div className="sub-n">Who’s behind the brand</div>
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="div-b">
          <div className="hdr">Download</div>
          <div className="sub-2"><a href={CompanyProfileBook} target="_blank">Company Profile Book</a></div>
        </div>
      </div>
    );
  };

  return (
    <div className="side-bar" onLoad={() => {
      if (location.pathname === "/") {
        const NavHome = document.getElementById("NavHome");
        NavHome.style.setProperty('color', true ? '#e5322d' : '#e5322d')
      } else if (location.pathname === "/about") {
        const NavHome = document.getElementById("NavAbout");
        NavHome.style.setProperty('color', true ? '#e5322d' : '#e5322d')
      } else {
        const NavHome = document.getElementById("NavServices");
        NavHome.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        if (location.pathname === "/sellers") {
          const NavHome = document.getElementById("NavSellers");
          NavHome.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        } else if (location.pathname === "/buyers") {
          const NavHome = document.getElementById("NavBuyers");
          NavHome.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        } else if (location.pathname === "/landlords") {
          const NavHome = document.getElementById("NavLandlords");
          NavHome.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        } else if (location.pathname === "/tenants") {
          const NavHome = document.getElementById("NavTenants");
          NavHome.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        }
      }
    }
    }>

      <div class="main-nav" id="sidee">
        <ul class="nav">
          <li
            onClick={() => {
              let element = document.getElementById('sidee')
              element.style.right = "0";
              element.style.animation = "slideout 1s backwards";
              setTimeout(() => {
                props.setSidebar(false);
              }, 500);
            }}
          >
            <img alt="" src={ham} className="img-1" />
            <img alt="" src={ham2} className="img-2" />
          </li>
          <li>
            <div className="nv">
              <a href="/" id="NavHome">Home</a>
            </div>
          </li>
          <li>
            <div
              className="nv"
              onClick={() => {
                setService(!service);
                setContact(false);
                setAbout(false);
              }}
              style={{ color: service ? "#EA4335" : "" }}
              id="NavServices">
              Services
            </div>
            {service ? <div className="hovercontent">{getServices()}</div> : ""}
          </li>
          <li>
            <div
              className="nv"
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("home-testimonials")
                    .scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
            >
              Testimonials
            </div>
          </li>
          <li>
            <div
              className="nv"
              onClick={() => {
                setService(false);
                setContact(false);
                setAbout(!about);
              }}
              id="NavAbout">
              About
            </div>
            {about ? <div className="hovercontent">{getAbout()}</div> : ""}
          </li>
          <li>
            <div
              className="nv"
              onClick={() => {
                setContact(!contact);
                setService(false);
                setAbout(false);
              }}
              style={{ color: contact ? "#EA4335" : "" }}
            >
              Contact
            </div>
            {contact ? (
              <div className="hovercontent-3">{getContact()}</div>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
