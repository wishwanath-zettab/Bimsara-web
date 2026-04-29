import React from "react";
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
import CompanyProfileBook from "../../assets/pdf/Company Profile Book.pdf";
import { navigateAndScroll, openExternal } from "../../utils/navigation";
import "./NavbarStyles.scss";

const serviceLinks = [
  { label: "Sellers", desc: "Our services for property sellers", path: "/sellers", icon: img, id: "NavSellers" },
  { label: "Buyers", desc: "What we offer to property buyers", path: "/buyers", icon: buyer, id: "NavBuyers" },
  { label: "Landlords", desc: "Our services for landlords", path: "/landlords", icon: img2, id: "NavLandlords" },
  { label: "Tenants", desc: "What we offer to tenants", path: "/tenants", icon: img3, id: "NavTenants" },
];

const guideLinks = [
  { label: "Seller's Guide", path: "/sellers", target: "sellers-guide" },
  { label: "Buyer's Guide", path: "/buyers", target: "buyers-guide" },
  { label: "Landlord's Guide", path: "/landlords", target: "landlords-guide" },
  { label: "Tenant's Guide", path: "/tenants", target: "tenants-guide" },
];

const aboutLinks = [
  { label: "Who we are", desc: "About us", target: "about-who", id: "NavAbout1" },
  { label: "Our Direction", desc: "Vision, Mission, Values", target: "about-mission", id: "NavAbout2" },
  { label: "ISO Certification", desc: "We love to follow systems", target: "about-iso", id: "NavAbout3" },
  { label: "Company Overview", desc: "The registered company", target: "about-overview", id: "NavAbout4" },
  { label: "Our Team", desc: "Who's behind the brand", target: "about-team", id: "NavAbout5" },
];

const socialLinks = [
  { label: "@bimsararealestate", icon: fb, url: "https://www.facebook.com/bimsararealestate/" },
  { label: "Bimsara Real Estate", icon: gl, url: "https://g.page/r/CcszCwgyi0e4EAE" },
  { label: "Safetynet (Private) Limited", icon: ln, url: "https://www.linkedin.com/company/safetynet-private-limited" },
  { label: "Bimsara Real Estate", icon: yt, url: "https://www.youtube.com/channel/UC7qFW8s7CdI1GeDChAY5nTw/featured" },
  { label: "Bimsara Real Estate", icon: inst, url: "https://www.instagram.com/bimsara.realestate/" },
];

const NavAction = ({ children, className = "hover-red", id, onClick }) => (
  <button type="button" className={`nav-action ${className}`} id={id} onClick={onClick}>
    {children}
  </button>
);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceActive = ["/sellers", "/buyers", "/landlords", "/tenants"].includes(location.pathname);

  const servicesPanel = (
    <div className="service-cont">
      <div className="div-c">
        {serviceLinks.map((item) => (
          <Link className="service-layout" to={item.path} key={item.path}>
            <div className="img-cont">
              <img alt="" src={item.icon} />
            </div>
            <div className="text">
              <div className={`head ${location.pathname === item.path ? "active" : ""}`} id={item.id}>{item.label}</div>
              <div className="sub">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="line" />
      <div className="div-b">
        <div className="hdr-t">Read the Guides</div>
        {guideLinks.map((item) => (
          <div className="sub-2" key={item.target}>
            <NavAction onClick={() => navigateAndScroll(navigate, item.path, item.target)}>
              {item.label}
            </NavAction>
          </div>
        ))}
      </div>
    </div>
  );

  const aboutPanel = (
    <div className="service-cont" id="services">
      <div className="div-c">
        {aboutLinks.map((item) => (
          <button
            type="button"
            className="service-layout text-button"
            key={item.target}
            onClick={() => navigateAndScroll(navigate, "/about", item.target, 120)}
          >
            <div className="text">
              <div className="head hover-red" id={item.id}>{item.label}</div>
              <div className="sub">{item.desc}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="line" />
      <div className="div-b">
        <div className="hdr">Download</div>
        <div className="sub-2">
          <a href={CompanyProfileBook} target="_blank" rel="noopener noreferrer" className="hover-red">
            Company Profile Book
          </a>
        </div>
      </div>
    </div>
  );

  const contactPanel = (
    <div className="service-cont">
      <div className="div-c">
        <button type="button" className="service-layout text-button" onClick={() => navigateAndScroll(navigate, "/", "home-contact", 420)}>
          <div className="text">
            <div className="head hover-red">Contact Us</div>
            <div className="sub">Contact the divisions</div>
          </div>
        </button>
        <button type="button" className="service-layout text-button" onClick={() => navigateAndScroll(navigate, "/", "home-location", 420)}>
          <div className="text">
            <div className="head hover-red">Our Location</div>
            <div className="sub">Meet at office</div>
          </div>
        </button>
      </div>
      <div className="line" />
      <div className="div-b">
        <div className="hdr">Social Links</div>
        {socialLinks.map((item) => (
          <button type="button" className="sub-2 social-action" key={`${item.url}-${item.label}`} onClick={() => openExternal(item.url)}>
            <div className="img-img">
              <img alt="" src={item.icon} />
            </div>
            <span className="hover-red">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <nav className="Nav-bar" aria-label="Primary navigation">
      <div className="overlayer" />
      <div className="main-nav">
        <div className="nav">
          <div className="homeNav">
            <div className="rotate">
              <Link to="/" className={`hover-red ${location.pathname === "/" ? "active" : ""}`} id="NavHome">Home</Link>
            </div>
          </div>
          <div className="servicesNav">
            <div className="rotate">
              <NavAction id="NavServices" className={serviceActive ? "hover-red active" : "hover-red"}>Services</NavAction>
            </div>
            <div className="hovercontent">{servicesPanel}</div>
          </div>
          <div className="testimonialsNav">
            <div className="rotate">
              <NavAction onClick={() => navigateAndScroll(navigate, "/", "home-testimonials", 320)}>
                Testimonials
              </NavAction>
            </div>
          </div>
          <div className="aboutNav">
            <div className="rotate">
              <Link to="/about" className={`hover-red ${location.pathname === "/about" ? "active" : ""}`} id="NavAbout">About</Link>
            </div>
            <div className="hovercontent-2">{aboutPanel}</div>
          </div>
          <div className="contactNav">
            <div className="rotate">
              <NavAction>Contact</NavAction>
            </div>
            <div className="hovercontent-3">{contactPanel}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
