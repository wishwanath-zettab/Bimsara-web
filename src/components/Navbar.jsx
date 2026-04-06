import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import sellersIcon from '../assets/images/sellers-icon.webp'
import buyersIcon from '../assets/images/buyers-icon.webp'
import landlordsIcon from '../assets/images/landlords-icon.webp'
import tenantsIcon from '../assets/images/tenants-icon.webp'
import fbIcon from '../assets/images/fb-icon.png'
import googleIcon from '../assets/images/google-icon.png'
import linkedinIcon from '../assets/images/linkedin-icon.png'
import youtubeIcon from '../assets/images/youtube-icon.png'
import instagramIcon from '../assets/images/instagram-icon.png'

function FlyoutLink({ img, head, sub, onClick }) {
  return (
    <div className="nav-flyout-link" onClick={onClick}>
      {img && <img src={img} alt="" className="nav-flyout-thumb" />}
      <div className="pt-1">
        <div className="nav-flyout-head">{head}</div>
        {sub && <div className="nav-flyout-sub">{sub}</div>}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    // Home should only be active on exact '/' path
    if (path === '/') {
      return location.pathname === '/' && !location.hash
    }
    
    // For hash links like testimonials and contact
    if (path.includes('#')) {
      const [pathPart, hashPart] = path.split('#')
      return location.pathname === pathPart && location.hash === `#${hashPart}`
    }
    
    // For regular paths, check if current pathname starts with the path
    if (path.startsWith('/')) {
      return location.pathname.startsWith(path)
    }
    
    return false
  }

  const goTo = (path, hash, delay = 100) => {
    setOpen(false)
    if (hash) {
      if (location.pathname === path) {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate(path + '#' + hash)
      }
    } else {
      navigate(path)
    }
  }

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location])

  return (
    <>
      {/* ═══ DESKTOP RIGHT SIDEBAR ═══ */}
      <nav className="hidden lg:fixed lg:flex right-0 top-0 h-screen w-[100px] 2xl:w-[137px] z-50 flex-col items-center justify-between py-[2.5vh] nav-glass">

        {/* Home */}
        <div className="flex-1 flex items-center justify-center">
          <Link to="/" className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text ${isActive('/') ? 'text-crimson' : 'text-ebony-clay'}`}>
            Home
          </Link>
        </div>

        {/* Services — with flyout */}
        <div className="flex-1 flex items-center justify-center nav-item-has-flyout">
          <Link to="/services" className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text ${isActive('/services') || isActive('/sellers') || isActive('/buyers') || isActive('/landlords') || isActive('/tenants') ? 'text-crimson' : 'text-ebony-clay'}`}>
            Services
          </Link>
          <div className="nav-flyout">
            <div className="p-[36px]">
              <FlyoutLink img={sellersIcon} head="Sellers" sub="Our services for property sellers" onClick={() => goTo('/sellers')} />
              <FlyoutLink img={buyersIcon} head="Buyers" sub="What we offer to property buyers" onClick={() => goTo('/buyers')} />
              <FlyoutLink img={landlordsIcon} head="Landlords" sub="Our services for landlords" onClick={() => goTo('/landlords')} />
              <FlyoutLink img={tenantsIcon} head="Tenants" sub="What we offer to tenants" onClick={() => goTo('/tenants')} />
              <div className="nav-flyout-divider" />
              <div className="nav-flyout-section-title">Read the Guides</div>
              <div className="nav-flyout-sub-link" onClick={() => goTo('/sellers')}>Seller's Guide</div>
              <div className="nav-flyout-sub-link" onClick={() => goTo('/buyers')}>Buyer's Guide</div>
              <div className="nav-flyout-sub-link" onClick={() => goTo('/landlords')}>Landlord's Guide</div>
              <div className="nav-flyout-sub-link" onClick={() => goTo('/tenants')}>Tenant's Guide</div>
            </div>
          </div>
        </div>

        {/* Testimonials — with flyout */}
        <div className="flex-1 flex items-center justify-center nav-item-has-flyout">
          <button onClick={() => goTo('/', 'testimonials')} className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text cursor-pointer bg-transparent border-none ${location.pathname === '/' && location.hash === '#testimonials' ? 'text-crimson' : 'text-ebony-clay'}`}>
            Testimonials
          </button>
          <div className="nav-flyout">
            <div className="p-[36px]">
              <FlyoutLink head="Reviews" sub="Google Reviews" onClick={() => goTo('/', 'testimonials')} />
              <FlyoutLink head="Video Testimonials" sub="Watch client stories" onClick={() => goTo('/', 'testimonials')} />
            </div>
          </div>
        </div>

        {/* About — with flyout */}
        <div className="flex-1 flex items-center justify-center nav-item-has-flyout">
          <Link to="/about" className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text ${isActive('/about') ? 'text-crimson' : 'text-ebony-clay'}`}>
            About
          </Link>
          <div className="nav-flyout nav-flyout-bottom">
            <div className="p-[36px]">
              <FlyoutLink head="Who we are" sub="About us" onClick={() => goTo('/about', 'about-who')} />
              <FlyoutLink head="Our Direction" sub="Vision, Mission, Values" onClick={() => goTo('/about', 'about-mission')} />
              <FlyoutLink head="ISO Certification" sub="We love to follow systems" onClick={() => goTo('/about', 'about-iso')} />
              <FlyoutLink head="Company Overview" sub="The registered company" onClick={() => goTo('/about', 'about-overview')} />
              <FlyoutLink head="Our Team" sub="Who's behind the brand" onClick={() => goTo('/about', 'about-team')} />
              <div className="nav-flyout-divider" />
              <div className="nav-flyout-section-title">Download</div>
              <a href="/assets/company-profile.pdf" target="_blank" rel="noopener noreferrer" className="nav-flyout-sub-link nav-download-link">
                Company Profile Book
              </a>
            </div>
          </div>
        </div>

        {/* Contact — with flyout */}
        <div className="flex-1 flex items-center justify-center nav-item-has-flyout">
          <button onClick={() => goTo('/', 'contact')} className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text cursor-pointer bg-transparent border-none ${location.pathname === '/' && location.hash === '#contact' ? 'text-crimson' : 'text-ebony-clay'}`}>
            Contact
          </button>
          <div className="nav-flyout nav-flyout-bottom">
            <div className="p-[36px]">
              <FlyoutLink head="Contact Us" sub="Contact the divisions" onClick={() => goTo('/', 'contact')} />
              <FlyoutLink head="Our Location" sub="Meet at office" onClick={() => goTo('/', 'contact')} />
              <div className="nav-flyout-divider" />
              <div className="nav-flyout-section-title">Social Links</div>
              <a href="https://www.facebook.com/bimsararealestate/" target="_blank" rel="noopener noreferrer" className="nav-flyout-social-row">
                <img src={fbIcon} alt="Facebook" className="nav-flyout-social-icon" />
                <span>@bimsararealestate</span>
              </a>
              <a href="https://g.page/r/CcszCwgyi0e4EAE" target="_blank" rel="noopener noreferrer" className="nav-flyout-social-row">
                <img src={googleIcon} alt="Google" className="nav-flyout-social-icon" />
                <span>Bimsara Real Estate</span>
              </a>
              <a href="https://www.linkedin.com/company/safetynet-private-limited" target="_blank" rel="noopener noreferrer" className="nav-flyout-social-row">
                <img src={linkedinIcon} alt="LinkedIn" className="nav-flyout-social-icon" />
                <span>Safetynet (Private) Limited</span>
              </a>
              <a href="https://www.youtube.com/channel/UC7qFW8s7CdI1GeDChAY5nTw/featured" target="_blank" rel="noopener noreferrer" className="nav-flyout-social-row">
                <img src={youtubeIcon} alt="YouTube" className="nav-flyout-social-icon" />
                <span>Bimsara Real Estate</span>
              </a>
              <a href="https://www.instagram.com/bimsara.realestate/" target="_blank" rel="noopener noreferrer" className="nav-flyout-social-row">
                <img src={instagramIcon} alt="Instagram" className="nav-flyout-social-icon" />
                <span>Bimsara Real Estate</span>
              </a>
            </div>
          </div>
        </div>

      </nav>

      {/* ═══ MOBILE HAMBURGER NAV ═══ */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
        <div className="flex items-center justify-between px-5 py-3">
          <Link to="/">
            <img src={logo} alt="Bimsara Real Estate" className="h-10" />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-ebony"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {open && (
          <div className="bg-white px-6 py-6 border-t mobile-menu-enter max-h-[80vh] overflow-y-auto">
            {/* Home */}
            <Link to="/" onClick={() => setOpen(false)} className={`block font-league text-xl tracking-[0.15em] py-3 ${isActive('/') ? 'text-crimson' : 'text-ebony-clay'}`}>
              Home
            </Link>

            {/* Services */}
            <div>
              <button onClick={() => setMobileSection(mobileSection === 'services' ? null : 'services')} className={`w-full text-left font-league text-xl tracking-[0.15em] py-3 ${isActive('/services') || isActive('/sellers') || isActive('/buyers') || isActive('/landlords') || isActive('/tenants') ? 'text-crimson' : 'text-ebony-clay'}`}>
                Services
              </button>
              {mobileSection === 'services' && (
                <div className="pl-4 pb-3 space-y-3">
                  <div className="nav-flyout-sub-link" onClick={() => { goTo('/sellers'); setOpen(false) }}>Sellers</div>
                  <div className="nav-flyout-sub-link" onClick={() => { goTo('/buyers'); setOpen(false) }}>Buyers</div>
                  <div className="nav-flyout-sub-link" onClick={() => { goTo('/landlords'); setOpen(false) }}>Landlords</div>
                  <div className="nav-flyout-sub-link" onClick={() => { goTo('/tenants'); setOpen(false) }}>Tenants</div>
                </div>
              )}
            </div>

            {/* Testimonials */}
            <button onClick={() => { goTo('/', 'testimonials'); setOpen(false) }} className={`block font-league text-xl tracking-[0.15em] py-3 text-ebony-clay`}>
              Testimonials
            </button>

            {/* About */}
            <div>
              <button onClick={() => setMobileSection(mobileSection === 'about' ? null : 'about')} className={`w-full text-left font-league text-xl tracking-[0.15em] py-3 ${isActive('/about') ? 'text-crimson' : 'text-ebony-clay'}`}>
                About
              </button>
              {mobileSection === 'about' && (
                <div className="pl-4 pb-3 space-y-3">
                  <div className="nav-flyout-sub-link" onClick={() => { goTo('/about'); setOpen(false) }}>Who we are</div>
                  <div className="nav-flyout-sub-link" onClick={() => { goTo('/about', 'about-mission'); setOpen(false) }}>Our Direction</div>
                  <div className="nav-flyout-sub-link" onClick={() => { goTo('/about', 'about-iso'); setOpen(false) }}>ISO Certification</div>
                  <div className="nav-flyout-sub-link" onClick={() => { goTo('/about', 'about-overview'); setOpen(false) }}>Company Overview</div>
                  <div className="nav-flyout-sub-link" onClick={() => { goTo('/about', 'about-team'); setOpen(false) }}>Our Team</div>
                </div>
              )}
            </div>

            {/* Contact */}
            <button onClick={() => { goTo('/', 'contact'); setOpen(false) }} className={`block font-league text-xl tracking-[0.15em] py-3 text-ebony-clay`}>
              Contact
            </button>
          </div>
        )}
      </nav>
      <div className="lg:hidden h-[56px]" />
    </>
  )
}
