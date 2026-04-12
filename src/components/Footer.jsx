import { Link } from 'react-router-dom'
import safetynetLogo from '../assets/images/safetynet-logo.png'
import fbIcon from '../assets/images/fb-icon.png'
import googleIcon from '../assets/images/google-icon.png'
import linkedinIcon from '../assets/images/linkedin-icon.png'
import instagramIcon from '../assets/images/instagram-icon.png'
import youtubeIcon from '../assets/images/youtube-icon.png'

const footerLinks = [
  {
    title: 'For Sellers',
    links: [
      { label: 'Our Services', href: '/services' },
      { label: "Seller's Guide", href: '/services' },
    ],
  },
  {
    title: 'Testimonials',
    links: [
      { label: 'Reviews', href: '/#testimonials' },
      { label: 'Video Testimonials', href: '/#testimonials' },
    ],
  },
  {
    title: 'For Buyers',
    links: [
      { label: 'What we offer', href: '/services' },
      { label: "Buyer's Guide", href: '/services' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Who we are', href: '/about' },
      { label: 'Our direction', href: '/about' },
      { label: 'ISO Certification', href: '/about' },
      { label: 'Company Overview', href: '/about' },
      { label: 'Our Team', href: '/about' },
    ],
  },
  {
    title: 'For Landlords',
    links: [
      { label: 'Our Services', href: '/services' },
      { label: "Landlord's Guide", href: '/services' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact Us', href: '/#contact' },
      { label: 'Our location', href: '/#contact' },
    ],
  },
  {
    title: 'For Tenants',
    links: [
      { label: 'What we offer', href: '/services' },
      { label: "Tenant's Guide", href: '/services' },
    ],
  },
  {
    title: 'Downloads',
    links: [
      { label: "Seller's Checklist", href: '#' },
      { label: "Buyer's Checklist", href: '#' },
      { label: "Landlord's Checklist", href: '#' },
      { label: "Tenant's Checklist", href: '#' },
    ],
  },
  {
    title: 'Tools',
    links: [{ label: 'Land Grading Tool', href: '#' }],
  },
]

const socialLinks = [
  { icon: fbIcon, alt: 'Facebook', href: 'https://www.facebook.com/bimsararealestate/' },
  { icon: googleIcon, alt: 'Google', href: 'https://g.page/r/CcszCwgyi0e4EAE' },
  { icon: linkedinIcon, alt: 'LinkedIn', href: 'https://www.linkedin.com/company/safetynet-private-limited' },
  { icon: instagramIcon, alt: 'Instagram', href: 'https://www.instagram.com/bimsara.realestate/' },
  { icon: youtubeIcon, alt: 'YouTube', href: 'https://www.youtube.com/channel/UC7qFW8s7CdI1GeDChAY5nTw/featured' },
]

export default function Footer() {
  return (
    <footer className="bg-ebony text-white border-t-2 border-crimson-light">
      <div className="max-w-[1400px] mx-auto px-[5%] pt-[60px] pb-[40px]">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Brand */}
          <div className="lg:w-[220px] shrink-0">
            <img src={safetynetLogo} alt="Safetynet" className="h-[54px] mb-6" />
            <p className="font-lato text-[13px] lg:text-[18px] font-light text-nobel leading-[24px]">
              Safetynet (Private) Limited DBA Bimsara Real Estate is a licensed
              Real Estate Broker and an Auctioneer based in Sri Lanka.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-6 flex-1">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="font-lato text-[13px] lg:text-[19px] font-normal mb-2 text-white">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="font-lato text-[11px] lg:text-[16px] font-light text-nobel hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social */}
        {/* <div className="mt-10 flex items-center gap-4">
          <span className="font-lato font-bold" style={{ color: '#0f64fa', fontSize: '18px', lineHeight: '33px' }}>
            WE ARE SOCIAL
          </span>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.alt}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[34px] h-[34px] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <img src={s.icon} alt={s.alt} className="w-[24px] h-[24px] object-contain" />
              </a>
            ))}
          </div>
        </div> */}
      </div>

      {/* Bottom */}
      <div className="border-t border-crimson-light/30 px-[5%] py-5">
        <p className="font-lato text-[12px] lg:text-[19px] font-light text-nobel text-center">
          All rights reserved &copy; {new Date().getFullYear()} Safetynet (Private) Limited. Developed
          by Millionyse (Pvt) Ltd.
        </p>
      </div>
    </footer>
  )
}
