import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext'

import logo from '../assets/images/logo.png'
import heroImage from '../assets/images/hero-image.png'
import arrowRight from '../assets/images/arrow-right.png'
import arrowRight2 from '../assets/images/arrow-right-2.png'
import googleReviews from '../assets/images/google-reviews.png'
import testimonialsCover from '../assets/images/testimonials-cover.png'
import playBtn from '../assets/images/play-btn.png'
import phoneIcon from '../assets/images/phone-icon.png'
import whatsappIcon from '../assets/images/whatsapp-icon.png'
import dropdownBgWeb from '../assets/images/dropdown-bg-web.webp'
import dropdownBgTablet from '../assets/images/dropdown-bg-tablet.webp'

const testimonials = [
  {
    name: 'Dudley Leelananda',
    quote: '\u201cHe is a trusted advisor, an excellent negotiator and a person with excellent communication skills.\u201d',
    role: 'Group Financial Consultant at Hijazi & Ghosheh Group',
    sub: 'Former Credit Risk Consultant at HSBC - Jordan',
  },
  {
    name: 'Ushan & Piumie Liyanage',
    quote: '\u201cHe never influenced or pressurized us. Information was given, but it\u2019s our own decision.\u201d',
    role: 'Ushan Liyanage - General Manager HR & Admin at Lankem Ceylon PLC',
    sub: 'Sri Lanka',
  },
  {
    name: 'Atheek Marikar & Crystal',
    quote: '\u201cHe seems to understand what you want very fast. He takes a good brief from the client.\u201d',
    role: 'Atheek Marikar - Managing Director/CEO at PepperCube Consultants, Sri Lanka',
    sub: 'Crystal Nathan - Strategic Curator at PepperCube Consultants, Sri Lanka',
  },
  {
    name: 'Damian Fernando',
    quote: '\u201cAt any stage of the sale process, he never pushed me.\u201d',
    role: 'Chief Operating Officer at NKAR Travels & Tours (Pvt) Ltd',
    sub: 'Senior Lecturer/Course Director at NSBM',
  },
]

// contacts now loaded from SiteDataContext

const purposeOptions = [
  { label: 'Sell my property', path: '/sellers' },
  { label: 'Buy a property', path: '/buyers' },
  { label: 'Rent Out my property', path: '/landlords' },
  { label: 'Rent Occupy a property', path: '/tenants' },
]

export default function Home() {
  const { data } = useSiteData()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedPurpose, setSelectedPurpose] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', countryCode: '+94', phone: '', purpose: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setDropdownOpen(false)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setDropdownOpen(!dropdownOpen)
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.purpose) return
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 4000)
  }

  return (
    <div className="bg-lines">

      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-lines">
        {/* Logo */}
        <div className="relative z-10 pt-6 lg:pt-[35px] pl-5 lg:pl-[63px]">
          <img src={logo} alt="Bimsara Real Estate" className="h-[53px] lg:h-[77px] [transform:scaleX(1.05)] origin-left" />
        </div>

        {/* Headline text */}
        <div className="relative z-10 px-5 lg:pl-[113px] mt-[20px] lg:mt-[35px] pb-[40px] lg:pb-[100px] text-center lg:text-left">
          <h1 className="font-poppins hero-headline">
            <span className="block text-crimson text-[29px] md:text-[42px] lg:text-[63px] font-normal">Redefining</span>
            <span className="block text-crimson text-[29px] md:text-[42px] lg:text-[63px] font-semibold">Real Estate Brokering</span>
            <span className="block text-crimson text-[29px] md:text-[42px] lg:text-[63px] font-normal">since 2006.</span>
          </h1>
        </div>

        {/* Mobile hero bottom — full-width gradient with option list + image below */}
        <div className="lg:hidden">
          <div className="hero-gradient-curve-mobile px-8 py-2">
            {purposeOptions.map((opt) => (
              <Link
                key={opt.label}
                to={opt.path}
                className="flex items-center justify-between py-5 font-lato text-[18px] font-normal text-white border-b border-white/20 last:border-b-0"
              >
                {opt.label}
                <svg className="w-4 h-4 shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          <div className="w-full h-[260px]">
            <img
              src={heroImage}
              alt="Happy family in front of their new home"
              className="w-full h-full object-cover hero-family-img"
            />
          </div>
        </div>

        {/* Desktop hero bottom: red gradient curve on left overlapping hero image on right */}
        <div className="hidden lg:block relative mt-[100px] hero-bottom">
          {/* Hero family image */}
          <div className="absolute right-0 bottom-0 z-[1] w-[101.3%] lg:w-[76%] h-[120%]">
            <img
              src={heroImage}
              alt="Happy family in front of their new home"
              className="w-full h-full object-cover hero-family-img"
            />
          </div>

          {/* Red-to-purple gradient curved shape */}
          <div className="absolute bottom-0 left-0 z-[3] w-[50%] lg:w-[33%] h-[132%] hero-gradient-curve">
            {/* "I want to" + custom dropdown */}
            <div className="absolute top-[15%] right-[10%] lg:top-[18%] lg:right-[15%] text-white w-[232px] lg:w-[377px]">
              <p className="font-lato text-[22px] lg:text-[34px] font-bold mb-[15px] lg:mb-[30px]">I want to</p>
              <div className="relative" ref={dropdownRef}>
                {/* Background images for combobox */}
                <img src={dropdownBgWeb} alt="" className="hidden lg:block absolute inset-0 w-full h-full object-cover rounded-[8px] pointer-events-none z-0" />
                <img src={dropdownBgTablet} alt="" className="lg:hidden absolute inset-0 w-full h-full object-cover rounded-[8px] pointer-events-none z-0" />

                <div
                  className="dropdown-combobox dropdown-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onKeyDown={handleKeyDown}
                  role="combobox"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="listbox"
                  aria-label="Choose your purpose"
                  tabIndex={0}
                >
                  <span className="dropdown-combobox-text">
                    {selectedPurpose ? purposeOptions.find(o => o.label === selectedPurpose)?.label : 'Choose your purpose'}
                  </span>
                  <div className="dropdown-combobox-icon">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                </div>
                {dropdownOpen && (
                  <div
                    className="absolute top-full left-0 right-0 bg-white rounded-b-[8px] mt-[2px] z-10 overflow-hidden dropdown-menu"
                    role="listbox"
                  >
                    {purposeOptions.map((opt) => (
                      <Link
                        key={opt.label}
                        to={opt.path}
                        className="block px-3 lg:px-4 py-2 lg:py-2.5 font-lato text-[12px] lg:text-[15px] hover:text-crimson hover:bg-concrete/50 cursor-pointer transition-colors"
                        style={{ color: '#b4b4b4' }}
                        role="option"
                        aria-selected={selectedPurpose === opt.label}
                        onClick={() => { setSelectedPurpose(opt.label); setDropdownOpen(false) }}
                      >
                        {opt.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — VALUE PROPS + DESCRIPTION
      ═══════════════════════════════════════════ */}
      <section className="mt-[40px] pt-0 pb-[95px] lg:pb-[158px] px-5 md:px-10 lg:px-[96px]">
        {/* Three value props — plain crimson text per Figma */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-0 pt-[10px] lg:pt-[20px]">
          {['Trusted Advisor', 'Skilled Negotiator', 'Expert Facilitator'].map((title) => (
            <div key={title} className="text-center w-full sm:w-1/3">
              <span className="font-lato text-[24px] lg:text-[50px] font-[1000] italic text-crimson tracking-[0.05em]">{title}</span>
            </div>
          ))}
        </div>

        {/* Main heading + description + stats */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[200px] pt-[30px] lg:pt-[100px]">
          <div className="flex-1">
            <h2 className="font-lato text-[21px] lg:text-[50px] font-bold text-ebony-clay leading-tight mb-6 lg:mb-8">
              Your go-to partner in selling and renting out your property.
            </h2>
            <p className="font-lato text-[18px] lg:text-[30px] font-normal leading-[28px] lg:leading-[46px] text-ebony-clay text-justify mb-6 mt-[50px]">
              Bimsara Real Estate is the outcome of extensive research conducted by over
              several years to identify solutions for the issues most frequently encountered by
              both sellers and buyers in the Sri Lankan real-estate market.
            </p>
            <p className="font-lato text-[18px] lg:text-[30px] font-light leading-[28px] lg:leading-[46px] text-ebony-clay text-justify mb-6 mt-[50px]">
              Our unique approach and method of business is a solution-based and
              personalized effort to help buyers to find their dream home or
              property.
            </p>
            <p className="font-lato text-[18px] lg:text-[30px] font-light leading-[28px] lg:leading-[46px] text-ebony-clay text-justify mb-6 mt-[50px]">
              We believe buyer satisfaction is the key for the seller to
              obtain optimal price. Our pledge therefore is a sincere service to
              both buyers and sellers to ensure smooth transactions.
            </p>

            {/* About Us link — per Figma, desktop only */}
            <div className="hidden lg:block mt-[120px]">
              <Link to="/about" className="pill-btn text-[25px] [padding:22px_47px] gap-[25px] border border-crimson">
                About Us
                <img src={arrowRight} alt="" className="w-[31px] h-[31px]" />
              </Link>
            </div>
          </div>

          {/* Stats column — labels in royal blue per Figma */}
          <div className="flex flex-row lg:flex-col items-start gap-8 lg:gap-4 shrink-0 w-[240px] text-center lg:text-left mx-auto lg:mx-0 pt-0 lg:pt-[70px]">
            <div className="text-center lg:text-left">
              <span className="font-khand text-[41px] lg:text-[99px] font-bold leading-none text-crimson">20+</span>
              <p className="font-lato text-[17px] lg:text-[29px] font-bold text-royal-blue leading-[20px] lg:leading-[34px] mt-1">
                Years of Industry<br />Experience
              </p>
            </div>
            <div className="text-center lg:text-left mt-0 lg:mt-4">
              <span className="font-khand text-[41px] lg:text-[99px] font-bold leading-none text-crimson">1000+</span>
              <p className="font-lato text-[17px] lg:text-[29px] font-bold text-royal-blue leading-[20px] lg:leading-[34px] mt-1">
                Satisfied Customers
              </p>
            </div>
          </div>
        </div>

        {/* About Us — mobile only, centered below stats */}
        <div className="flex justify-center mt-8 lg:hidden">
          <Link to="/about" className="pill-btn text-[16px] [padding:12px_24px] gap-[16px] border border-crimson">
            About Us
            <img src={arrowRight} alt="" className="w-[20px] h-[20px]" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — OUR SERVICES (dark bg)
      ═══════════════════════════════════════════ */}
      <section className="bg-ebony py-12 lg:py-[96px] px-5 md:px-10 lg:px-[96px] flex flex-col items-center">
        <h2 className="font-lato text-[22px] lg:text-[60px] font-bold text-white mb-8 lg:mb-10 leading-tight">
          Our Services are for...
        </h2>
        <div className="grid grid-cols-1 gap-[31px]">
          <Link to="/sellers" className="dark-service-card group cursor-pointer h-[50px] md:h-[100px] lg:h-[140px] w-full lg:w-[1000px]">
            <span className="font-lato text-[18px] lg:text-[31px] font-bold text-white flex-1 text-center">
              Property Owners who want to cell
            </span>
            <img src={arrowRight2} alt="" className="w-[28px] h-[24px] lg:w-[58px] lg:h-[48px] group-hover:translate-x-1 transition-transform" loading="lazy" />
          </Link>
          <Link to="/sellers" className="dark-service-card group cursor-pointer h-[50px] md:h-[100px] lg:h-[140px] w-full lg:w-[1000px]">
            <span className="font-lato text-[18px] lg:text-[31px] font-bold text-white flex-1 text-center">
              Landlords who want to rent out
            </span>
            <img src={arrowRight2} alt="" className="w-[28px] h-[24px] lg:w-[58px] lg:h-[48px] group-hover:translate-x-1 transition-transform" loading="lazy" />
          </Link>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <section id="testimonials" className="pt-[53px] pb-12 lg:pt-[106px] lg:pb-[96px] px-5 md:px-10 lg:px-[96px]">
        <p className="font-lato text-[22px] lg:text-[32px] tracking-[0.3em] lg:tracking-[0.6em] text-crimson uppercase mb-[41px] text-center lg:text-left">
          CLIENT TESTIMONIALS
        </p>

        {/* Heading + Stats side by side — per Figma layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8 lg:mb-10">
          {/* Left: heading + description */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-lato text-[21px] lg:text-[50px] font-bold text-ebony-clay leading-tight mb-[40px]">
              Our client testimonials are proof of
            </h2>
            <p className="font-lato text-[18px] lg:text-[30px] font-light text-ebony-clay leading-[28px] lg:leading-[42px] text-center lg:text-justify max-w-[922px] mx-auto lg:mx-0">
              how well we have treated real estate market by not only setting the
              trends, but also uplifting the standards which were long standing and
              will be long lasting.
            </p>

            <div className="flex justify-center lg:justify-start">
              <a href="#" className="pill-btn mb-8 lg:mb-10 inline-flex mt-[50px] text-[10px] lg:text-[22px] [padding:10px_20px] lg:[padding:20px_42px] gap-[14px] lg:gap-[22px] border border-crimson">
                VIEW ALL GOOGLE REVIEWS
                <img src={arrowRight} alt="" className="w-[18px] h-[18px] lg:w-[28px] lg:h-[28px]" />
              </a>
            </div>
          </div>

          {/* Right: stats + Google badge */}
          <div className="grid grid-cols-2 lg:flex lg:flex-col lg:items-start gap-4 shrink-0 lg:w-[300px]">
            {/* Left on mobile: 100+ */}
            <div>
              <span className="font-khand text-[41px] lg:text-[99px] font-bold leading-none text-crimson">100+</span>
              <p className="font-lato text-[17px] lg:text-[29px] font-bold text-royal-blue leading-[20px] lg:leading-[34px] mt-1">
                Google Reviews by<br />Satisfied Clients
              </p>
            </div>
            {/* Right on mobile: 4.9 + google image stacked */}
            <div className="flex flex-col items-start">
              <div className="flex items-end gap-2 lg:mt-[100px]">
                <span className="font-khand text-[41px] lg:text-[99px] font-bold leading-none text-crimson">4.9</span>
                <span className="font-lato text-[24px] lg:text-[29px] font-bold text-royal-blue leading-[29px] lg:leading-[34px] mb-1">star Rated</span>
              </div>
              <img src={googleReviews} alt="Google Reviews 4.9 star rating" className="h-[86px] lg:h-[114px] lg:-mt-[15px] lg:pt-[10px]" loading="lazy" />
            </div>
          </div>
        </div>


        {/* Testimonial cover */}
        <div className="relative rounded-[20px] overflow-hidden mb-10 lg:mb-12 cursor-pointer group">
          <img src={testimonialsCover} alt="Watch our client testimonials video" className="w-full" loading="lazy" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <img src={playBtn} alt="Play video" className="w-14 h-14 lg:w-20 lg:h-20 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Testimonial glass card */}
        <div className="glass-card rounded-[20px] lg:rounded-[30px] p-6 lg:p-[60px] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/80 rounded-[20px] p-5 lg:p-6 backdrop-blur-sm">
                <h4 className="font-lato text-[19px] lg:text-[26px] font-bold text-ebony-clay mb-2">{t.name}</h4>
                <p className="font-lato text-[14px] lg:text-[22px] font-light text-ebony-clay leading-[25px] mb-3">{t.quote}</p>
                <p className="font-lato text-[13px] lg:text-[16px] font-light text-scorpion">{t.role}</p>
                <p className="font-lato text-[13px] lg:text-[16px] font-light text-scorpion">{t.sub}</p>
                <button className="mt-3 flex items-center gap-2 font-lato text-[14px] lg:text-[22px] text-ebony-clay hover:text-crimson transition-colors">
                  <img src={playBtn} alt="" className="w-5 h-5" />
                  Watch Video
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — CONTACT
      ═══════════════════════════════════════════ */}
      <section id="contact" className="py-12 lg:py-[96px] px-5 md:px-10 lg:px-[96px]">
        <h2 className="font-lato text-[24px] lg:text-[60px] font-normal text-crimson text-center mb-3">
          Contact Us
        </h2>
        <p className="font-lato text-[21px] lg:text-[29px] font-light text-ebony-clay leading-[28px] lg:leading-[43px] text-center mb-8 max-w-[967px] mx-auto">
          Get in touch with us for all your real estate requirements.<br></br> We believe
          in building strong relationships that go long term with our clients.
        </p>





        {/* Phone / WhatsApp icons */}
        <div className="flex justify-center gap-5 mb-4">
          <a href="tel:+94117778777"><img src={phoneIcon} alt="Call us" className="w-10 h-10" loading="lazy" /></a>
          <a href="#"><img src={whatsappIcon} alt="Message us on WhatsApp" className="w-10 h-10" loading="lazy" /></a>
        </div>
        <p className="font-lato text-[18px] lg:text-[25px] text-crimson tracking-[0.3em] lg:tracking-[0.6em] uppercase text-center mb-8 lg:mb-10">
          GET IN TOUCH
        </p>

        {/* Contact grid */}
        <div className="border border-royal-blue mx-auto w-fit px-4 lg:px-[50px] pt-[30px] mb-10">
          <div className="flex flex-wrap justify-center gap-x-8 lg:gap-x-12 gap-y-0">
            {data.contacts.map((c) => (
              <div key={c.category} className="text-center mb-[30px]">
                <p className="font-lato text-[16px] lg:text-[18px] text-royal-blue">{c.category}</p>
                <a href={`mailto:${c.email}`} className="block font-lato text-[14px] lg:text-[16px] text-ebony-clay leading-[30px] hover:text-crimson">{c.email}</a>
                <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="block font-lato text-[14px] lg:text-[16px] text-ebony-clay leading-[30px] hover:text-crimson">{c.phone}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Form + Map row */}
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center pt-[30px]">
          {/* Map */}
          <div className="flex-1 max-w-[600px]">
            {/* ═══════════════════════════════════════════
          SECTION 6 — OUR PRESENCE
      ═══════════════════════════════════════════ */}
            <section className="pt-12 lg:pt-[80px] pb-[20px] pl-[15px] pr-5 md:pr-10 lg:pr-[96px]">
              <p className="font-lato text-[20px] lg:text-[28px] text-crimson tracking-[0.3em] lg:tracking-[0.6em] uppercase mb-4">OUR PRESENCE</p>
              <h4 className="font-lato text-[15px] lg:text-[20px] font-bold text-ebony-clay mb-1">OFFICE</h4>
              <p className="font-lato text-[14px] lg:text-[18px] text-ebony-clay leading-[30px] whitespace-pre-line">
                {'199/58,\u00A0\u00A0\u00A0\u00A0Rajagiriya Road,\u00A0\u00A0\u00A0\u00A0Rajagiriya,\u00A0\u00A0\u00A0\u00A0Sri Lanka'}
              </p>
            </section>
            <iframe
              title="Bimsara Real Estate Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798!2d79.8994!3d6.9066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25963f4fa0475%3A0x3b5f03045c09eb5b!2sBimsara%20Real%20Estate!5e0!3m2!1sen!2slk!4v1"
              className="w-full h-[300px] lg:h-[400px] rounded-[20px] border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Contact Form — border-radius 68px per Figma */}
          <div className="flex-1 bg-concrete rounded-[20px] lg:rounded-[68px] p-5 lg:p-[40px] max-w-[600px]">
            <p className="font-lato text-[22px] lg:text-[26px] font-black text-ebony-clay leading-[30px] mb-6 pt-[20px]">
              I would like to know more about the services
            </p>

            {formSubmitted ? (
              <div className="text-center py-12">
                <p className="font-lato text-[24px] font-bold text-crimson mb-2">Thank you!</p>
                <p className="font-lato text-[20px] text-ebony-clay">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="block font-lato text-[13px] lg:text-[17px] font-bold text-ebony-75 mb-2">Name <span className="text-crimson">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full bg-white border-none rounded-[8px] h-[40px] px-3 outline-none" />
                </div>
                <div>
                  <label className="block font-lato text-[13px] lg:text-[17px] font-bold text-ebony-75 mb-2">Email Address <span className="text-crimson">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full bg-white border-none rounded-[8px] h-[40px] px-3 outline-none" />
                </div>
                <div>
                  <label className="block font-lato text-[13px] lg:text-[17px] font-bold text-ebony-75 mb-2">Contact Number <span className="text-crimson">*</span></label>
                  <div className="flex mt-1">
                    <input type="text" name="countryCode" value={formData.countryCode} onChange={handleFormChange} className="bg-white border-r border-ebony-75/50 rounded-l-[8px] h-[40px] w-[20%] px-3 outline-none text-[17px]" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required className="bg-white rounded-r-[8px] h-[40px] w-[80%] px-3 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-lato text-[13px] lg:text-[17px] font-bold text-ebony-75 mb-2">I want to <span className="text-crimson">*</span></label>
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-3">
                      {['Sell', 'Rent Out'].map((o) => (
                        <label key={o} className="flex items-center gap-2 cursor-pointer font-lato text-[13px] lg:text-[17px] text-ebony-75">
                          <input type="radio" name="purpose" value={o} checked={formData.purpose === o} onChange={handleFormChange} className="cursor-pointer" /> {o}
                        </label>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      {['Buy', 'Rent Occupy'].map((o) => (
                        <label key={o} className="flex items-center gap-2 cursor-pointer font-lato text-[13px] lg:text-[17px] text-ebony-75">
                          <input type="radio" name="purpose" value={o} checked={formData.purpose === o} onChange={handleFormChange} className="cursor-pointer" /> {o}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center pt-[20px] lg:pt-[29px]">
                  <button type="submit" className="glass-btn font-lato text-[15px] lg:text-[24px] font-bold text-ebony-clay px-[21px] lg:px-[40px] py-[8px] lg:py-[15px] cursor-pointer hover:bg-ebony-clay hover:text-white transition-all">
                    Contact Me
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>


    </div>
  )
}
