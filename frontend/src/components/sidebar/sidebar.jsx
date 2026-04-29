import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { navigateAndScroll, openExternal } from "../../utils/navigation";
import "./sidebarStyles.scss";

const serviceLinks = [
  { label: "Sellers", desc: "Our services for property sellers", path: "/sellers", icon: img, target: "sellers-guide" },
  { label: "Buyers", desc: "What we offer to property buyers", path: "/buyers", icon: buyer, target: "buyers-guide" },
  { label: "Landlords", desc: "Our services for landlords", path: "/landlords", icon: img2, target: "landlords-guide" },
  { label: "Tenants", desc: "What we offer to tenants", path: "/tenants", icon: img3, target: "tenants-guide" },
];

const aboutLinks = [
  { label: "About", desc: "", target: "root" },
  { label: "Who we are", desc: "About us", target: "about-who" },
  { label: "Our Direction", desc: "Vision, Mission, Values", target: "about-mission" },
  { label: "ISO Certification", desc: "We love to follow systems", target: "about-iso" },
  { label: "Company Overview", desc: "The registered company", target: "about-overview" },
  { label: "Our Team", desc: "Who's behind the brand", target: "about-team" },
];

const socialLinks = [
  { label: "@bimsararealestate", icon: fb, url: "https://www.facebook.com/bimsararealestate/" },
  { label: "Bimsara Real Estate", icon: gl, url: "https://g.page/r/CcszCwgyi0e4EAE" },
  { label: "Safetynet (Private) Limited", icon: ln, url: "https://www.linkedin.com/company/safetynet-private-limited" },
  { label: "Bimsara Real Estate", icon: yt, url: "https://www.youtube.com/channel/UC7qFW8s7CdI1GeDChAY5nTw/featured" },
  { label: "Bimsara Real Estate", icon: inst, url: "https://www.instagram.com/bimsara.realestate/" },
];

const Sidebar = ({ setSidebar }) => {
  const [openPanel, setOpenPanel] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("drawer-open");
    return () => document.body.classList.remove("drawer-open");
  }, []);

  const close = () => setSidebar(false);
  const goAndClose = (path, target = "root", delay = 100) => {
    navigateAndScroll(navigate, path, target, delay);
    close();
  };

  return (
    <div className="side-bar" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <button type="button" className="mobile-nav-backdrop" aria-label="Close navigation" onClick={close} />
      <div className="main-nav" id="sidee">
        <ul className="nav">
          <li>
            <button type="button" className="drawer-close" onClick={close} aria-label="Close navigation">
              <img alt="" src={ham} className="img-1" />
              <img alt="" src={ham2} className="img-2" />
            </button>
          </li>
          <li>
            <Link className={`nv ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={close}>Home</Link>
          </li>
          <li>
            <button
              type="button"
              className={`nv ${openPanel === "services" ? "active" : ""}`}
              onClick={() => setOpenPanel(openPanel === "services" ? "" : "services")}
            >
              Services
            </button>
            {openPanel === "services" && (
              <div className="hovercontent">
                <div className="service-cont">
                  <div className="div-c">
                    {serviceLinks.map((item) => (
                      <Link className="service-layout" to={item.path} onClick={close} key={item.path}>
                        <div className="img-cont">
                          <img alt="" src={item.icon} />
                        </div>
                        <div className="text">
                          <div className="head">{item.label}</div>
                          <div className="sub-n">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="line" />
                  <div className="div-b">
                    <div className="hdr">Read the Guides</div>
                    {serviceLinks.map((item) => (
                      <button type="button" className="sub-2" key={item.target} onClick={() => goAndClose(item.path, item.target)}>
                        {item.label === "Sellers" ? "Seller" : item.label === "Buyers" ? "Buyer" : item.label.slice(0, -1)}'s Guide
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>
          <li>
            <button type="button" className="nv" onClick={() => goAndClose("/", "home-testimonials", 320)}>
              Testimonials
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nv ${openPanel === "about" ? "active" : ""}`}
              onClick={() => setOpenPanel(openPanel === "about" ? "" : "about")}
            >
              About
            </button>
            {openPanel === "about" && (
              <div className="hovercontent">
                <div className="service-cont">
                  <div className="div-c">
                    {aboutLinks.map((item) => (
                      <button type="button" className="service-layout text-button" key={item.target} onClick={() => goAndClose("/about", item.target, 120)}>
                        <div className="text">
                          <div className="head">{item.label}</div>
                          {item.desc && <div className="sub-n">{item.desc}</div>}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="line" />
                  <div className="div-b">
                    <div className="hdr">Download</div>
                    <a className="sub-2" href={CompanyProfileBook} target="_blank" rel="noopener noreferrer">Company Profile Book</a>
                  </div>
                </div>
              </div>
            )}
          </li>
          <li>
            <button
              type="button"
              className={`nv ${openPanel === "contact" ? "active" : ""}`}
              onClick={() => setOpenPanel(openPanel === "contact" ? "" : "contact")}
            >
              Contact
            </button>
            {openPanel === "contact" && (
              <div className="hovercontent-3">
                <div className="service-cont">
                  <div className="div-c">
                    <button type="button" className="service-layout text-button" onClick={() => goAndClose("/", "home-contact", 420)}>
                      <div className="text">
                        <div className="head">Contact Us</div>
                        <div className="sub-n">Contact the divisions</div>
                      </div>
                    </button>
                    <button type="button" className="service-layout text-button" onClick={() => goAndClose("/", "home-location", 420)}>
                      <div className="text">
                        <div className="head">Our Location</div>
                        <div className="sub-n">Meet at office</div>
                      </div>
                    </button>
                  </div>
                  <div className="line" />
                  <div className="div-b">
                    <div className="hdr">Social Links</div>
                    <div className="bt">
                      {socialLinks.map((item) => (
                        <button type="button" className="sub-2" key={`${item.url}-${item.label}`} onClick={() => openExternal(item.url)}>
                          <div className="img-img">
                            <img alt="" src={item.icon} />
                          </div>
                          <span className="span-t">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
