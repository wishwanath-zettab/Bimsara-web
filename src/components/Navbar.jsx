import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import sellersIcon from '../assets/images/sellers-icon.webp'
import buyersIcon from '../assets/images/buyers-icon.webp'
import landlordsIcon from '../assets/images/landlords-icon.webp'
import tenantsIcon from '../assets/images/tenants-icon.webp'
import fbIcon from '../assets/images/fb-icon.png'
import googleIcon from '../assets/images/google-icon.png'
import linkedinIcon from '../assets/images/linkedin-icon.png'
import youtubeIcon from '../assets/images/youtube-icon.png'
import instagramIcon from '../assets/images/instagram-icon.png'
import hamburgerLg from '../assets/images/hamburger-lg.webp'
import hamburgerSm from '../assets/images/hamburger-sm.webp'

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
  const [closing, setClosing] = useState(false)
  const [openFlyout, setOpenFlyout] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const closeNav = () => {
    setClosing(true)
    setOpenFlyout(null)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 500)
  }

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash
    }
    if (path.includes('#')) {
      const [pathPart, hashPart] = path.split('#')
      return location.pathname === pathPart && location.hash === `#${hashPart}`
    }
    if (path.startsWith('/')) {
      return location.pathname.startsWith(path)
    }
    return false
  }

  const toggleFlyout = (name) => {
    setOpenFlyout(prev => prev === name ? null : name)
  }

  const goTo = (path, hash) => {
    closeNav()
    setOpenFlyout(null)
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

      {/* ═══ MOBILE HAMBURGER BUTTON (floating, single toggle) ═══ */}
      <button
        onClick={() => { if (open || closing) closeNav(); else { setOpen(true); setOpenFlyout(null) } }}
        className="sm:hidden fixed top-4 right-4 z-[60] p-2"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <img src={hamburgerSm} alt="Menu" />
      </button>

      {/* ═══ RIGHT SIDEBAR (always on desktop / slides in on mobile) ═══ */}
      <nav className={`fixed right-0 top-0 h-screen w-[80px] lg:w-[100px] z-50 flex-col items-center justify-between py-[2.5vh] nav-glass
        ${(open || closing) ? 'flex' : 'hidden'} sm:flex ${closing ? 'nav-slide-out' : ''}`}>

        {/* Home */}
        <div className="flex-1 flex items-center justify-center">
          <Link to="/" onClick={closeNav} className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text ${isActive('/') ? 'text-crimson' : 'text-ebony-clay'}`}>
            Home
          </Link>
        </div>

        {/* Services — with flyout */}
        <div className={`flex-1 flex items-center justify-center nav-item-has-flyout ${openFlyout === 'services' ? 'flyout-open' : ''}`}>
          <button onClick={() => toggleFlyout('services')} className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text bg-transparent border-none cursor-pointer ${isActive('/services') || isActive('/sellers') || isActive('/buyers') || isActive('/landlords') || isActive('/tenants') ? 'text-crimson' : 'text-ebony-clay'}`}>
            Services
          </button>
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
        <div className={`flex-1 flex items-center justify-center nav-item-has-flyout ${openFlyout === 'testimonials' ? 'flyout-open' : ''}`}>
          <button onClick={() => toggleFlyout('testimonials')} className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text cursor-pointer bg-transparent border-none ${location.pathname === '/' && location.hash === '#testimonials' ? 'text-crimson' : 'text-ebony-clay'}`}>
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
        <div className={`flex-1 flex items-center justify-center nav-item-has-flyout ${openFlyout === 'about' ? 'flyout-open' : ''}`}>
          <button onClick={() => toggleFlyout('about')} className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text bg-transparent border-none cursor-pointer ${isActive('/about') ? 'text-crimson' : 'text-ebony-clay'}`}>
            About
          </button>
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
        <div className={`flex-1 flex items-center justify-center nav-item-has-flyout ${openFlyout === 'contact' ? 'flyout-open' : ''}`}>
          <button onClick={() => toggleFlyout('contact')} className={`block whitespace-nowrap transition-colors duration-200 hover:text-crimson nav-link-text cursor-pointer bg-transparent border-none ${location.pathname === '/' && location.hash === '#contact' ? 'text-crimson' : 'text-ebony-clay'}`}>
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
    </>
  )
}
