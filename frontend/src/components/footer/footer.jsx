import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Safetynet Private Limited - Logo.webp";
import CompanyProfileBook from "../../assets/pdf/Company Profile Book.pdf";
import { navigateAndScroll } from "../../utils/navigation";
import "./footerStyles.scss";

const googleReviewsUrl =
  "https://www.google.com/search?q=Bimsara+Real+Estate&oq=bim&aqs=chrome.0.69i59j69i57j69i59l2j0i512l3j46i512j46i175i199i512j0i512.1528j0j15&sourceid=chrome&ie=UTF-8#lrd=0x3ae25995119a0d4b:0xb8478b32080b33cb,1,,,";

const serviceGroups = [
  {
    title: "For Sellers",
    path: "/sellers",
    links: [
      { label: "Our Services", target: "sellers" },
      { label: "Seller's Guide", target: "sellers-guide" },
    ],
  },
  {
    title: "For Buyers",
    path: "/buyers",
    links: [
      { label: "What we offer", target: "buyers" },
      { label: "Buyer's Guide", target: "buyers-guide" },
    ],
  },
  {
    title: "For Landlords",
    path: "/landlords",
    links: [
      { label: "Our Services", target: "landlords" },
      { label: "Landlord's Guide", target: "landlords-guide" },
    ],
  },
  {
    title: "For Tenants",
    path: "/tenants",
    links: [
      { label: "What we offer", target: "tenants" },
      { label: "Tenant's Guide", target: "tenants-guide" },
    ],
  },
];

const aboutLinks = [
  { label: "Who we are", target: "about-who" },
  { label: "Our direction", target: "about-mission" },
  { label: "ISO Certification", target: "about-iso" },
  { label: "Company Overview", target: "about-overview" },
  { label: "Our Team", target: "about-team" },
];

const FooterButton = ({ children, onClick, className = "sub" }) => (
  <button type="button" className={`${className} footer-link hover-red`} onClick={onClick}>
    {children}
  </button>
);

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path, target = "root", delay = 120) => navigateAndScroll(navigate, path, target, delay);
  const goHomeSection = (target) => go("/", target, 420);
  const goContact = () => {
    if (location.pathname === "/about") {
      navigateAndScroll(navigate, "/about", "about-contact", 80);
      return;
    }
    goHomeSection("home-contact");
  };

  return (
    <footer className="footer" id="footer">
      <div className="inner-footer responsive-footer">
        <section className="footer-brand">
          <img alt="Safetynet Private Limited" src={logo} className="logo" />
          <p>
            Safetynet (Private) Limited DBA Bimsara Real Estate is a licensed Real Estate Broker and an Auctioneer based in Sri Lanka.
          </p>
        </section>

        {serviceGroups.map((group) => (
          <section className="footer-group" key={group.path}>
            <FooterButton className="hed" onClick={() => go(group.path)}>
              {group.title}
            </FooterButton>
            {group.links.map((link) => (
              <FooterButton key={link.target} onClick={() => go(group.path, link.target)}>
                {link.label}
              </FooterButton>
            ))}
          </section>
        ))}

        <section className="footer-group">
          <FooterButton className="hed" onClick={() => goHomeSection("home-testimonials")}>Testimonials</FooterButton>
          <a className="sub footer-link hover-red" target="_blank" rel="noopener noreferrer" href={googleReviewsUrl}>Reviews</a>
          <FooterButton onClick={() => goHomeSection("home-video")}>Video Testimonials</FooterButton>
        </section>

        <section className="footer-group">
          <FooterButton className="hed" onClick={() => go("/about")}>About</FooterButton>
          {aboutLinks.map((link) => (
            <FooterButton key={link.target} onClick={() => go("/about", link.target, 500)}>
              {link.label}
            </FooterButton>
          ))}
        </section>

        <section className="footer-group">
          <FooterButton className="hed" onClick={goContact}>Contact</FooterButton>
          <FooterButton onClick={goContact}>Contact Us</FooterButton>
          <FooterButton onClick={() => goHomeSection("home-location")}>Our Location</FooterButton>
        </section>

        <section className="footer-group">
          <div className="hed">Downloads</div>
          {["Seller's Checklist", "Buyer's Checklist", "Landlord's Checklist", "Tenant's Checklist"].map((label) => (
            <a className="sub footer-link hover-red" href={CompanyProfileBook} target="_blank" rel="noopener noreferrer" key={label}>
              {label}
            </a>
          ))}
          <div className="hed tools-title">Tools</div>
          <span className="sub footer-muted" title="Coming Soon">Land Grading Tool</span>
        </section>
      </div>

      <div className="designer-foot">
        All rights reserved © 2023 Safetynet (Private) Limited.
        <div className="margin-top" />
        <a href="https://millionyse.com?ref=bimsara.lk" target="_blank" rel="noopener noreferrer">
          Developed by Millionyse (Pvt) Ltd.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
