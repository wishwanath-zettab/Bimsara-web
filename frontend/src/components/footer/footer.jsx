import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/Safetynet Private Limited - Logo.webp";
import "./footerStyles.scss";
import CompanyProfileBook from "../../assets/pdf/Company Profile Book.pdf";
import BuyersGuide from "../../assets/pdf/Buyers's Guide.pdf";
import LandlordsGuide from "../../assets/pdf/Landlords's Guide.pdf";
import SellersGuide from "../../assets/pdf/Sellers's Guide.pdf";
import TenantGuide from "../../assets/pdf/Tenant's Guide.pdf";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="footer" id="footer">
      <div className="inner-footer" id="footer_desktop">
        <div className="div-left">
          <div className="footer-item">
            <div>
              <img alt="" src={logo} className="logo" />
            </div>
            <div>
              Safetynet (Private) Limited DBA Bimsara Real Estate is a licensed Real Estate Broker and an Auctioneer based in Sri Lanka.
            </div>
          </div>
          <div className="footer-mini-item">
            <div className="top">
              <div className="hed" onClick={() => {
                navigate("/sellers");
                setTimeout(() => {
                  document
                    .getElementById("root")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}><a href="javascript:void(0);" class="hover-red">For Sellers</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/sellers");
                  setTimeout(() => {
                    document
                      .getElementById("sellers")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Our Services</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => {
                  navigate("/sellers");
                  setTimeout(() => {
                    document
                      .getElementById("sellers-guide")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 10);
                }} style={{ cursor: "pointer" }} class="hover-red">Seller's Guide</a>
              </div>
            </div>
            <div className="bottom">
              <div
                className="hed"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-testimonials")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Testimonials</a>
              </div>
              <div
                className="sub"
              >
                <a target="_blank" href="https://www.google.com/search?q=Bimsara+Real+Estate&oq=bim&aqs=chrome.0.69i59j69i57j69i59l2j0i512l3j46i512j46i175i199i512j0i512.1528j0j15&sourceid=chrome&ie=UTF-8#lrd=0x3ae25995119a0d4b:0xb8478b32080b33cb,1,,, " class="hover-red">Reviews</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-video")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Video Testimonials</a>
              </div>
            </div>
          </div>
          <div className="footer-mini-item">
            <div className="top">
              <div className="hed" onClick={() => {
                navigate("/buyers");
                setTimeout(() => {
                  document
                    .getElementById("root")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}>
                <a href="javascript:void(0);" class="hover-red">For Buyers</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/buyers");
                  setTimeout(() => {
                    document
                      .getElementById("buyers")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">What we offer</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => {
                  navigate("/buyers");
                  setTimeout(() => {
                    document
                      .getElementById("buyers-guide")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 10);
                }} style={{ cursor: "pointer" }} class="hover-red">Buyer's Guide</a>
              </div>
            </div>
            <div className="bottom">
              <div
                className="hed"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("root")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">About</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-who")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Who we are</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-mission")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Our direction</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-iso")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">ISO Certification</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-overview")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Company Overview</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-team")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Our Team</a>
              </div>
            </div>
          </div>
        </div>
        <div className="div-right">
          <div className="footer-mini-item-1">
            <div className="top">
              <div className="hed" onClick={() => {
                navigate("/landlords");
                setTimeout(() => {
                  document
                    .getElementById("root")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}><a href="javascript:void(0);" class="hover-red">For Landlords</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/landlords");
                  setTimeout(() => {
                    document
                      .getElementById("landlords")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Our Services</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => {
                  navigate("/landlords");
                  setTimeout(() => {
                    document
                      .getElementById("landlords-guide")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 10);
                }} style={{ cursor: "pointer" }} class="hover-red">Landlord's Guide</a>
              </div>
            </div>
            <div className="bottom">
              <div className="hed" onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("home-contact")
                    .scrollIntoView({ behavior: "smooth" });
                }, 500);
              }}><a href="javascript:void(0);" class="hover-red">Contact</a></div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-contact")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Contact Us</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-location")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
              >
                <a href="javascript:void(0);" class="hover-red">Our location</a>
              </div>
            </div>
          </div>
          <div className="footer-mini-item-2">
            <div className="top">
              <div className="hed" onClick={() => {
                navigate("/tenants");
                setTimeout(() => {
                  document
                    .getElementById("root")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}>
                <a href="javascript:void(0);" class="hover-red">For Tenants</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/tenants");
                  setTimeout(() => {
                    document
                      .getElementById("tenants")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">What we offer</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => {
                  navigate("/tenants");
                  setTimeout(() => {
                    document
                      .getElementById("tenants-guide")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 10);
                }} style={{ cursor: "pointer" }} class="hover-red">Tenant's Guide</a>
              </div>
            </div>
            <div className="bottom">
              <div className="hed">Contact</div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (location.pathname === "/about") {
                    document
                      .getElementById("about-contact")
                      .scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/");
                    setTimeout(() => {
                      document
                        .getElementById("home-contact")
                        .scrollIntoView({ behavior: "smooth" });
                    }, 500);
                  }
                }}
              >
                <a href="javascript:void(0);" class="hover-red">Contact Us</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-location")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
              >
                <a href="javascript:void(0);" class="hover-red">Our Location</a>
              </div>
            </div>
          </div>
          <div className="footer-mini-item">
            <div className="top">
              <div className="hed">Downloads</div>
              <div className="sub"><a href={CompanyProfileBook} target="_blank" class="hover-red">Seller's Checklist</a></div>
              <div className="sub"><a href={CompanyProfileBook} target="_blank" class="hover-red">Buyer's Checklist</a></div>
              <div className="sub"><a href={CompanyProfileBook} target="_blank" class="hover-red">Landlord's Checklist</a></div>
              <div className="sub"><a href={CompanyProfileBook} target="_blank" class="hover-red">Tenant's Checklist</a></div>
            </div>
            <div className="bottom-2">
              <div className="hed">Tools</div>
              <div className="sub"><a href="javascript:void(0)" title="Coming Soon" class="hover-red">Land Grading Tool</a></div>
            </div>
          </div>
        </div>
      </div>

      <div className="inner-footer" id="footer_mobile">
        <div className="div-left">
          <div className="footer-item">
            <div>
              <img alt="" src={logo} className="logo" />
            </div>
            <div>
              Safetynet (Private) Limited DBA Bimsara Real Estate is a licensed Real Estate Broker and an Auctioneer based in Sri Lanka.
            </div>
          </div>
          <div className="footer-mini-item">
            <div className="top">
              <div className="hed" onClick={() => {
                navigate("/sellers");
                setTimeout(() => {
                  document
                    .getElementById("root")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}><a href="javascript:void(0);" class="hover-red">For Sellers</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/sellers");
                  setTimeout(() => {
                    document
                      .getElementById("sellers")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Our Services</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => {
                  navigate("/sellers");
                  setTimeout(() => {
                    document
                      .getElementById("sellers-guide")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 10);
                }} style={{ cursor: "pointer" }} class="hover-red">Seller's Guide</a>
              </div>
            </div>
            <div className="bottom"><div className="hed" onClick={() => {
              navigate("/landlords");
              setTimeout(() => {
                document
                  .getElementById("root")
                  .scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}><a href="javascript:void(0);" class="hover-red">For Landlords</a>
            </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/landlords");
                  setTimeout(() => {
                    document
                      .getElementById("landlords")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Our Services</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => {
                  navigate("/landlords");
                  setTimeout(() => {
                    document
                      .getElementById("landlords-guide")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 10);
                }} style={{ cursor: "pointer" }} class="hover-red">Landlord's Guide</a>
              </div>
            </div>
          </div>
          <div className="footer-mini-item">
            <div className="top">
              <div className="hed" onClick={() => {
                navigate("/buyers");
                setTimeout(() => {
                  document
                    .getElementById("root")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}>
                <a href="javascript:void(0);" class="hover-red">For Buyers</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/buyers");
                  setTimeout(() => {
                    document
                      .getElementById("buyers")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">What we offer</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => {
                  navigate("/buyers");
                  setTimeout(() => {
                    document
                      .getElementById("buyers-guide")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 10);
                }} style={{ cursor: "pointer" }} class="hover-red">Buyer's Guide</a>
              </div>
            </div>
            <div className="bottom">
              <div className="hed" onClick={() => {
                navigate("/tenants");
                setTimeout(() => {
                  document
                    .getElementById("root")
                    .scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}>
                <a href="javascript:void(0);" class="hover-red">For Tenants</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/tenants");
                  setTimeout(() => {
                    document
                      .getElementById("tenants")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">What we offer</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => {
                  navigate("/tenants");
                  setTimeout(() => {
                    document
                      .getElementById("tenants-guide")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 10);
                }} style={{ cursor: "pointer" }} class="hover-red">Tenant's Guide</a>
              </div>
            </div>
          </div>
        </div>
        <div className="div-right">
          <div className="footer-mini-item-1">
            <div className="top">
              <div
                className="hed"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-testimonials")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Testimonials</a>
              </div>
              <div
                className="sub"
              >
                <a target="_blank" href="https://www.google.com/search?q=Bimsara+Real+Estate&oq=bim&aqs=chrome.0.69i59j69i57j69i59l2j0i512l3j46i512j46i175i199i512j0i512.1528j0j15&sourceid=chrome&ie=UTF-8#lrd=0x3ae25995119a0d4b:0xb8478b32080b33cb,1,,, " class="hover-red">Reviews</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-video")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Video Testimonials</a>
              </div>
            </div>
          </div>
          <div className="footer-mini-item-2">
            <div className="top">
              <div
                className="hed"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("root")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">About</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-who")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Who we are</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-mission")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Our direction</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-iso")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">ISO Certification</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-overview")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Company Overview</a>
              </div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/about");
                  setTimeout(() => {
                    document
                      .getElementById("about-team")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Our Team</a>
              </div>
            </div>
          </div>
          <div className="footer-mini-item">
            <div className="top">
              <div className="hed">Downloads</div>
              <div className="sub"><a href={CompanyProfileBook} target="_blank" class="hover-red">Seller's Checklist</a></div>
              <div className="sub"><a href={CompanyProfileBook} target="_blank" class="hover-red">Buyer's Checklist</a></div>
              <div className="sub"><a href={CompanyProfileBook} target="_blank" class="hover-red">Landlord's Checklist</a></div>
              <div className="sub"><a href={CompanyProfileBook} target="_blank" class="hover-red">Tenant's Checklist</a></div>
            </div>
          </div>
        </div>
        <div className="div-right">
          <div className="footer-mini-item-1">
            <div className="bottom">
              <div className="hed" onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("home-contact")
                    .scrollIntoView({ behavior: "smooth" });
                }, 500);
              }}><a href="javascript:void(0);" class="hover-red">Contact</a></div>
              <div
                className="sub"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-contact")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                style={{ cursor: "pointer" }}
              >
                <a href="javascript:void(0);" class="hover-red">Contact Us</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-location")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
              >
                <a href="javascript:void(0);" class="hover-red">Our location</a>
              </div>
            </div>
          </div>
          <div className="footer-mini-item-2">
            <div className="bottom">
              <div className="hed">Contact</div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (location.pathname === "/about") {
                    document
                      .getElementById("about-contact")
                      .scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/");
                    setTimeout(() => {
                      document
                        .getElementById("home-contact")
                        .scrollIntoView({ behavior: "smooth" });
                    }, 500);
                  }
                }}
              >
                <a href="javascript:void(0);" class="hover-red">Contact Us</a>
              </div>
              <div
                className="sub"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("home-location")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
              >
                <a href="javascript:void(0);" class="hover-red">Our Location</a>
              </div>
            </div>
          </div>
          <div className="footer-mini-item">
            <div className="bottom-2">
              <div className="hed">Tools</div>
              <div className="sub"><a href="javascript:void(0)" title="Coming Soon" class="hover-red">Land Grading Tool</a></div>
            </div>
          </div>
        </div>
      </div>
      <div className="designer-foot">
        All rights reserved © 2023 Safetynet (Private) Limited.
        <div className="margin-top" />
        <a href="https://millionyse.com?ref=bimsara.lk">
          {" "}
          Developed by Millionyse (Pvt) Ltd.
        </a>
      </div>
    </div>
  );
};
export default Footer;
