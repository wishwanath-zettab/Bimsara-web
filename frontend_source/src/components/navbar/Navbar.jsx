import React from "react";
import img from "../../assets/images/Bimsara Real Estate - Sellers Icon.webp";
import buyer from "../../assets/images/Bimsara Real Estate - Buyers Icon.webp";
import img2 from "../../assets/images/Bimsara Real Estate - Landlords Icon.webp";
import img3 from "../../assets/images/Bimsara Real Estate - Tenants Icon.webp";
import fb from "../../assets/icons/Facebook.webp";
import gl from "../../assets/icons/Google.webp";
import ln from "../../assets/icons/LinkedIn.webp";
import yt from "../../assets/icons/YouTube.webp";
import inst from "../../assets/icons/Instagram.webp";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyProfileBook from "../../assets/pdf/Company Profile Book.pdf";
import BuyersGuide from "../../assets/pdf/Buyers's Guide.pdf";
import LandlordsGuide from "../../assets/pdf/Landlords's Guide.pdf";
import SellersGuide from "../../assets/pdf/Sellers's Guide.pdf";
import TenantGuide from "../../assets/pdf/Tenant's Guide.pdf";

import "./NavbarStyles.scss";

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 ||
    rect.bottom >= 35
  );
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getServices = () => {
    return (
      <div className="service-cont">
        <div className="div-c">
          <div className="service-layout ">
            <div className="img-cont">
              <img alt="" src={img} />
            </div>
            <div className="text">
              <a href="/sellers">
                <div className="head" id="NavSellers">Sellers</div>
                <div className="sub">Our services for property sellers</div>
              </a>
            </div>
          </div>
          <div className="service-layout ">
            <div className="img-cont">
              <img alt="" src={buyer} />
            </div>
            <div className="text">
              <a href="/buyers">
                <div className="head" id="NavBuyers">Buyers</div>
                <div className="sub">What we offer to property buyers</div>
              </a>
            </div>
          </div>
          <div className="service-layout ">
            <div className="img-cont">
              <img alt="" src={img2} />
            </div>
            <div className="text">
              <a href="/landlords">
                <div className="head" id="NavLandlords">Landlords</div>
                <div className="sub">Our services for landlords</div>
              </a>
            </div>
          </div>
          <div className="service-layout ">
            <div className="img-cont">
              <img alt="" src={img3} />
            </div>
            <div className="text">
              <a href="/tenants">
                <div className="head" id="NavTenants">Tenants</div>
                <div className="sub">What we offer to tenants</div>
              </a>
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="div-b">
          <div className="hdr-t" style={{ cursor: "default" }}>Read the Guides</div>
          <div
            className="sub-2"
          >
            <a onClick={() => {
              navigate("/sellers");
              setTimeout(() => {
                document
                  .getElementById("sellers-guide")
                  .scrollIntoView({ behavior: "smooth" });
              }, 10);
            }} style={{ cursor: "pointer" }} className="hover-red">Seller’s Guide</a>
          </div>
          <div
            className="sub-2"
          >
            <a onClick={() => {
              navigate("/buyers");
              setTimeout(() => {
                document
                  .getElementById("buyers-guide")
                  .scrollIntoView({ behavior: "smooth" });
              }, 10);
            }} style={{ cursor: "pointer" }} className="hover-red">Buyer’s Guide</a>
          </div>
          <div
            className="sub-2"
          >
            <a onClick={() => {
              navigate("/landlords");
              setTimeout(() => {
                document
                  .getElementById("landlords-guide")
                  .scrollIntoView({ behavior: "smooth" });
              }, 10);
            }} style={{ cursor: "pointer" }} className="hover-red">Landlord’s Guide</a>
          </div>
          <div
            className="sub-2"
          >
            <a onClick={() => {
              navigate("/tenants");
              setTimeout(() => {
                document
                  .getElementById("tenants-guide")
                  .scrollIntoView({ behavior: "smooth" });
              }, 10);
            }} style={{ cursor: "pointer" }} className="hover-red">Tenant’s Guide</a>
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
                    .getElementById("about-who")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              <div className="head"><a href="javascript:void(0);" className="hover-red" id="NavAbout1">Who we are</a></div>
              <div className="sub">About us</div>
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
              }}
            >
              <div className="head"><a href="javascript:void(0);" className="hover-red" id="NavAbout2">Our Direction</a></div>
              <div className="sub">Vision, Mission, Values</div>
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
              }}
            >
              <div className="head"><a href="javascript:void(0);" className="hover-red" id="NavAbout3">ISO Certicafication</a></div>
              <div className="sub">We love to follow systems</div>
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
              }}
            >
              <div className="head"><a href="javascript:void(0);" className="hover-red" id="NavAbout4">Company Overview</a></div>
              <div className="sub">The registered company</div>
            </div>
          </div>
          <div className="service-layout">
            <div className="text">
              <div
                className="head"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-team")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                <a href="javascript:void(0);" className="hover-red" id="NavAbout5">Our Team</a>
              </div>
              <div className="sub">Who’s behind the brand</div>
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="div-b">
          <div className="hdr" style={{ cursor: "default" }}>Download</div>
          <div className="sub-2"><a href={CompanyProfileBook} target="_blank" className="hover-red">Company Profile Book</a></div>
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
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("home-contact")
                    .scrollIntoView({ behavior: "smooth" });
                }, 400);
              }}
            >
              <div className="head"><a href="javascript:void(0);" className="hover-red">Contact Us</a></div>
              <div className="sub">Contact the divisions</div>
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
              }}
            >
              <div className="head"><a href="javascript:void(0);" className="hover-red">Our Location</a></div>
              <div className="sub">Meet at office</div>
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="div-b">
          <div className="hdr">Social Links</div>
          <div className="sub-2" onClick={() => window.open("https://www.facebook.com/bimsararealestate/", "_blank")} style={{ cursor: "pointer" }}>
            <div className="img-img">
              <img alt="" src={fb} />
            </div>
            <span className="hover-red">@bimsararealestate</span>
          </div>
          <div className="sub-2" onClick={() => window.open("https://g.page/r/CcszCwgyi0e4EAE", "_blank")} style={{ cursor: "pointer" }}>
            <div className="img-img">
              <img alt="" src={gl} />
            </div>
            <span className="hover-red">Bimsara Real Estate</span>
          </div>{" "}
          <div className="sub-2" onClick={() => window.open("https://www.linkedin.com/company/safetynet-private-limited", "_blank")} style={{ cursor: "pointer" }}>
            <div className="img-img">
              <img alt="" src={ln} />
            </div>
            <span className="hover-red">Safetynet (Private) Limited</span>
          </div>{" "}
          <div className="sub-2" onClick={() => window.open("https://www.youtube.com/channel/UC7qFW8s7CdI1GeDChAY5nTw/featured", "_blank")} style={{ cursor: "pointer" }}>
            <div className="img-img">
              <img alt="" src={yt} />
            </div>
            <span className="hover-red">Bimsara Real Estate</span>
          </div>{" "}
          <div className="sub-2" onClick={() => window.open("https://www.instagram.com/bimsara.realestate/", "_blank")} style={{ cursor: "pointer" }}>
            <div className="img-img">
              <img alt="" src={inst} />
            </div>
            <span className="hover-red">Bimsara Real Estate</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="Nav-bar" onLoad={() => {
      if (location.pathname === "/") {
        const path = document.getElementById("NavHome");
        path.style.setProperty('color', true ? '#e5322d' : '#e5322d')
      } else if (location.pathname === "/about") {
        const path = document.getElementById("NavAbout");
        path.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        const about1 = document.getElementById("about-who");
        const about2 = document.getElementById("about-mission");
        const about3 = document.getElementById("about-iso");
        const about4 = document.getElementById("about-overview");
        const about5 = document.getElementById("about-team");
        const about6 = document.getElementById("footer");
        const NavAbout1 = document.getElementById("NavAbout1");
        const NavAbout2 = document.getElementById("NavAbout2");
        const NavAbout3 = document.getElementById("NavAbout3");
        const NavAbout4 = document.getElementById("NavAbout4");
        const NavAbout5 = document.getElementById("NavAbout5");
        document.addEventListener('scroll', function () {
          if (isInViewport(about1)) {
            NavAbout1.style.color = '#e5322d';
            NavAbout2.style.color = '#303548';
            NavAbout3.style.color = '#303548';
            NavAbout4.style.color = '#303548';
            NavAbout5.style.color = '#303548';
          } else if (isInViewport(about2)) {
            NavAbout1.style.color = '#303548';
            NavAbout2.style.color = '#e5322d';
            NavAbout3.style.color = '#303548';
            NavAbout4.style.color = '#303548';
            NavAbout5.style.color = '#303548';
          } else if (isInViewport(about3)) {
            NavAbout1.style.color = '#303548';
            NavAbout2.style.color = '#303548';
            NavAbout3.style.color = '#e5322d';
            NavAbout4.style.color = '#303548';
            NavAbout5.style.color = '#303548';
          } else if (isInViewport(about4)) {
            NavAbout1.style.color = '#303548';
            NavAbout2.style.color = '#303548';
            NavAbout3.style.color = '#303548';
            NavAbout4.style.color = '#e5322d';
            NavAbout5.style.color = '#303548';
          } else if (isInViewport(about5)) {
            NavAbout1.style.color = '#303548';
            NavAbout2.style.color = '#303548';
            NavAbout3.style.color = '#303548';
            NavAbout4.style.color = '#303548';
            NavAbout5.style.color = '#e5322d';
          } else if (isInViewport(about6)) {
            NavAbout1.style.color = '#303548';
            NavAbout2.style.color = '#303548';
            NavAbout3.style.color = '#303548';
            NavAbout4.style.color = '#303548';
            NavAbout5.style.color = '#303548';
          }
        });
      } else {
        const path = document.getElementById("NavServices");
        path.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        if (location.pathname === "/sellers") {
          const path = document.getElementById("NavSellers");
          path.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        } else if (location.pathname === "/buyers") {
          const path = document.getElementById("NavBuyers");
          path.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        } else if (location.pathname === "/landlords") {
          const path = document.getElementById("NavLandlords");
          path.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        } else if (location.pathname === "/tenants") {
          const path = document.getElementById("NavTenants");
          path.style.setProperty('color', true ? '#e5322d' : '#e5322d')
        }
      }
    }
    }>
      <div className="overlayer" />
      <div class="main-nav">
        <div class="nav">
          <div className="homeNav">
            <div className="rotate">
              <a href="/" className="hover-red" id="NavHome">Home</a>
            </div>
          </div>
          <div className="servicesNav">
            <div className="rotate">
              <a href="javascript:void(0);" className="hover-red" id="NavServices">Services</a>
            </div>

            <div className="hovercontent">{getServices()}</div>
          </div>
          <div className="testimonialsNav">
            <div
              className="rotate"
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("home-testimonials")
                    .scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
            >
              <a href="javascript:void(0);" className="hover-red">Testimonials</a>
            </div>
          </div>
          <div className="aboutNav">
            <div className="rotate">
              <a href="/about" className="hover-red" id="NavAbout">About</a>
            </div>
            <div className="hovercontent-2">{getAbout()}</div>
          </div>
          <div className="contactNav">
            <div className="rotate">
              <a href="javascript:void(0);" className="hover-red">Contact</a>
            </div>
            <div className="hovercontent-3">{getContact()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
