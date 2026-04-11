import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext'
import InquiryForm from '../components/InquiryForm'

import logo from '../assets/images/logo.png'
import heroImage from '../assets/images/hero-image.png'
import arrowRight from '../assets/images/arrow-right.png'
import arrowRight2 from '../assets/images/arrow-right-2.png'
import googleReviews from '../assets/images/google-reviews.png'
import testimonialsCover from '../assets/images/testimonials-cover.png'
import playBtn from '../assets/images/play-btn.png'
import phoneIcon from '../assets/images/phone-icon.png'
import whatsappIcon from '../assets/images/whatsapp-icon.png'
import fbIcon from '../assets/images/fb-icon.png'
import googleIcon from '../assets/images/google-icon.png'
import linkedinIcon from '../assets/images/linkedin-icon.png'
import instagramIcon from '../assets/images/instagram-icon.png'
import youtubeIcon from '../assets/images/youtube-icon.png'
import dropdownBgWeb from '../assets/images/dropdown-bg-web.webp'
import dropdownBgTablet from '../assets/images/dropdown-bg-tablet.webp'

const testimonials = [
  {
    name: 'Dudley Leelananda',
    quote: '\u201cHe is a trusted advisor, an excellent negotiator and a person with excellent communication skills.\u201d',
    role: 'Group Financial Consultant at Hijazi & Ghosheh Group',
    sub: 'Former Credit Risk Consultant at HSBC - Jordan',
    video: 'https://www.youtube.com/watch?v=47Kw96zbUkA',
  },
  {
    name: 'Ushan & Piumie Liyanage',
    quote: '\u201cHe never influenced or pressurized us. Information was given, but it\u2019s our own decision.\u201d',
    role: 'Ushan Liyanage - General Manager HR & Admin at Lankem Ceylon PLC',
    sub: 'Sri Lanka',
    video: 'https://www.youtube.com/watch?v=HoC-XXBEDvU',
  },
  {
    name: 'Atheek Marikar & Crystal',
    quote: '\u201cHe seems to understand what you want very fast. He takes a good brief from the client.\u201d',
    role: 'Atheek Marikar - Managing Director/CEO at PepperCube Consultants, Sri Lanka',
    sub: 'Crystal Nathan - Strategic Curator at PepperCube Consultants, Sri Lanka',
    video: 'https://www.youtube.com/watch?v=xmjcmufaR6M',
  },
  {
    name: 'Damian Fernando',
    quote: '\u201cAt any stage of the sale process, he never pushed me.\u201d',
    role: 'Chief Operating Officer at NKAR Travels & Tours (Pvt) Ltd',
    sub: 'Senior Lecturer/Course Director at NSBM',
    video: 'https://www.youtube.com/watch?v=5VG5JPTOJ0U&t',
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


  return (
    <div className="bg-lines">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-lines lg:-mr-[100px]">
        {/* Logo */}
        <div className="hidden lg:block relative z-10 pt-6 lg:pt-[35px] pl-5 lg:pl-[63px]">
          <img src={logo} alt="Bimsara Real Estate" className="h-[42px] w-[160px] object-contain origin-left" />
        </div>

        {/* Mobile logo — centered above headline */}
        <div className="lg:hidden relative z-10 flex justify-start px-5 pt-6 pb-2">
          <img src={logo} alt="Bimsara Real Estate" style={{ width: '133px', height: '36px' }} className="object-contain" />
        </div>

        {/* Headline text */}
        <div className="relative z-10 px-5 lg:pl-[113px] mt-[8px] lg:mt-[35px] pb-[40px] lg:pb-[100px] text-center lg:text-left">
          <h1 className="font-poppins hero-headline">
            <span className="block text-crimson text-[29px] md:text-[42px] lg:text-[47px] font-normal">Redefining</span>
            <span className="block text-crimson text-[29px] md:text-[42px] lg:text-[47px] font-semibold">Real Estate Brokering</span>
            <span className="block text-crimson text-[29px] md:text-[42px] lg:text-[47px] font-normal">since a quindecennial.</span>
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
              <p className="font-lato text-[22px] lg:text-[26px] font-bold mb-[15px] lg:mb-[30px]">I want to</p>
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
              <span className="font-lato text-[24px] lg:text-[38px] font-[1000] italic text-crimson tracking-[0.05em]">{title}</span>
            </div>
          ))}
        </div>

        {/* Main heading + description + stats */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[200px] pt-[30px] lg:pt-[100px]">
          <div className="flex-1">
            <h2 className="font-lato text-[21px] lg:text-[38px] font-bold text-ebony-clay leading-tight mb-6 lg:mb-8">
              Your go-to partner in selling and renting out your property.
            </h2>
            <p className="font-lato text-[18px] lg:text-[22px] font-normal leading-[28px] lg:leading-[26px] text-ebony-clay text-justify mb-6 mt-[50px]">
              Bimsara Real Estate is the outcome of extensive research conducted by over
              several years to identify solutions for the issues most frequently encountered by
              both sellers and buyers in the Sri Lankan real-estate market.
            </p>
            <p className="font-lato text-[18px] lg:text-[22px] font-light leading-[28px] lg:leading-[26px] text-ebony-clay text-justify mb-6 mt-[50px]">
              Our unique approach and method of business is a solution-based and
              personalized effort to help buyers to find their dream home or
              property.
            </p>
            <p className="font-lato text-[18px] lg:text-[22px] font-light leading-[28px] lg:leading-[26px] text-ebony-clay text-justify mb-6 mt-[50px]">
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
              <span className="font-khand text-[41px] lg:text-[74px] font-bold leading-none text-crimson">20+</span>
              <p className="font-lato text-[17px] lg:text-[22px] font-bold text-royal-blue leading-[20px] lg:leading-[26px] mt-1">
                Years of Industry<br />Experience
              </p>
            </div>
            <div className="text-center lg:text-left mt-0 lg:mt-4">
              <span className="font-khand text-[41px] lg:text-[74px] font-bold leading-none text-crimson">1000+</span>
              <p className="font-lato text-[17px] lg:text-[22px] font-bold text-royal-blue leading-[20px] lg:leading-[26px] mt-1">
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
      <section className="bg-ebony py-12 lg:py-[96px] px-5 md:px-10 lg:px-[96px] flex flex-col items-center lg:-mr-[100px]">
        <h2 className="font-lato text-[22px] lg:text-[40px] font-bold text-white mb-8 lg:mb-10 leading-tight">
          Our Services are for...
        </h2>
        <div className="flex flex-col items-center gap-[31px] mt-[40px] w-full max-w-[700px]">
          {[
            { label: 'Sellers', path: '/sellers' },
            { label: 'Landlords', path: '/landlords' },
            { label: 'Buyers', path: '/buyers' },
            { label: 'Tenants', path: '/tenants' },
          ].map((item) => (
            <Link key={item.label} to={item.path} className="dark-service-card group cursor-pointer">
              <div className="dark-service-card-inner">
                <span className="flex-1 text-center">{item.label}</span>
                <img src={arrowRight2} alt="" className="w-[28px] h-[24px] group-hover:translate-x-1 transition-transform" loading="lazy" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <section id="testimonials" className="pt-[53px] pb-12 lg:pt-[106px] lg:pb-[96px] px-5 md:px-10 lg:px-[96px]">
        <p className="font-lato text-[22px] lg:text-[24px] tracking-[0.3em] lg:tracking-[0.6em] text-crimson uppercase mb-[41px] text-center lg:text-left">
          CLIENT TESTIMONIALS
        </p>

        {/* Heading + Stats side by side — per Figma layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8 lg:mb-10">
          {/* Left: heading + description */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-lato text-[21px] lg:text-[38px] font-bold text-ebony-clay leading-tight mb-[40px]">
              Our client testimonials are proof of
            </h2>
            <p className="font-lato text-[18px] lg:text-[22px] font-light text-ebony-clay leading-[28px] lg:leading-[32px] text-center lg:text-justify max-w-[922px] mx-auto lg:mx-0">
              how well we have treated real estate market by not only setting the
              trends, but also uplifting the standards which were long standing and
              will be long lasting.
            </p>

            <div className="flex justify-center lg:justify-start">
              <a href="https://www.google.com/search?q=Bimsara+Real+Estate&oq=bim&aqs=chrome.0.69i59j69i57j69i59l2j0i512l3j46i512j46i175i199i512j0i512.1528j0j15&sourceid=chrome&ie=UTF-8#lrd=0x3ae25995119a0d4b:0xb8478b32080b33cb,1" target="_blank" rel="noopener noreferrer" className="pill-btn mb-8 lg:mb-10 inline-flex mt-[50px] text-[10px] lg:text-[22px] [padding:10px_20px] lg:[padding:20px_42px] gap-[14px] lg:gap-[22px] border border-crimson">
                VIEW ALL GOOGLE REVIEWS
                <img src={arrowRight} alt="" className="w-[18px] h-[18px] lg:w-[28px] lg:h-[28px]" />
              </a>
            </div>
          </div>

          {/* Right: stats + Google badge */}
          <div className="grid grid-cols-2 lg:flex lg:flex-col lg:items-start gap-4 shrink-0 lg:w-[300px]">
            {/* Left on mobile: 100+ */}
            <div>
              <span className="font-khand text-[41px] lg:text-[74px] font-bold leading-none text-crimson">100+</span>
              <p className="font-lato text-[17px] lg:text-[22px] font-bold text-royal-blue leading-[20px] lg:leading-[26px] mt-1">
                Google Reviews by<br />Satisfied Clients
              </p>
            </div>
            {/* Right on mobile: 4.9 + google image stacked */}
            <div className="flex flex-col items-start">
              <div className="flex items-end gap-2 lg:mt-[100px]">
                <span className="font-khand text-[41px] lg:text-[74px] font-bold leading-none text-crimson">4.9</span>
                <span className="font-lato text-[24px] lg:text-[22px] font-bold text-royal-blue leading-[29px] lg:leading-[26px] mb-1">star Rated</span>
              </div>
              <img src={googleReviews} alt="Google Reviews 4.9 star rating" className="h-[86px] lg:h-[114px] lg:-mt-[15px] lg:pt-[10px]" loading="lazy" />
            </div>
          </div>
        </div>



        {/* Testimonial cover */}
        <div className="relative rounded-[20px] overflow-hidden mb-10 lg:mb-12">
          <img src={testimonialsCover} alt="Watch our client testimonials video" className="w-full" loading="lazy" />
        </div>

        {/* Testimonial glass card */}
        <div className="glass-card rounded-[20px] lg:rounded-[30px] p-6 lg:p-[60px] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/80 rounded-[20px] p-5 lg:p-6 backdrop-blur-sm flex flex-col">
                <h4 className="font-lato text-[19px] lg:text-[20px] font-bold text-ebony-clay mb-2">{t.name}</h4>
                <p className="font-lato text-[14px] lg:text-[22px] font-light text-ebony-clay leading-[25px] mb-3">{t.quote}</p>
                <p className="font-lato text-[13px] lg:text-[16px] font-light text-scorpion">{t.role}</p>
                <p className="font-lato text-[13px] lg:text-[16px] font-light text-scorpion">{t.sub}</p>
                <div className="mt-auto pt-[5vh] flex justify-center">
                  <a href={t.video} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 cursor-pointer font-lato text-[18px] font-normal text-crimson border border-crimson rounded-[40px] px-[41px] py-[12px] w-max hover:bg-crimson hover:text-white transition-colors group">
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.495 2.814a3.016 3.016 0 0 0-2.122-2.136C19.505 0 12 0 12 0S4.495 0 2.627.678A3.016 3.016 0 0 0 .505 2.814C0 4.686 0 9 0 9s0 4.314.505 6.186a3.016 3.016 0 0 0 2.122 2.136C4.495 18 12 18 12 18s7.505 0 9.373-.678a3.016 3.016 0 0 0 2.122-2.136C24 13.314 24 9 24 9s0-4.314-.505-6.186Z" className="fill-crimson group-hover:fill-white transition-colors" />
                      <path d="M9.6 12.857 15.818 9 9.6 5.143v7.714Z" className="fill-white group-hover:fill-crimson transition-colors" />
                    </svg>
                    Watch Video
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — CONTACT
      ═══════════════════════════════════════════ */}
      <section id="contact" className="py-12 lg:py-[96px] px-5 md:px-10 lg:px-[96px]">
        <h2 className="font-lato text-[24px] lg:text-[45px] font-normal text-crimson text-center mb-3">
          Contact Us
        </h2>
        <p className="font-lato text-[21px] lg:text-[22px] font-light text-ebony-clay leading-[28px] lg:leading-[32px] text-center mb-8 max-w-[967px] mx-auto">
          Get in touch with us for all your real estate requirements.<br></br> We believe
          in building strong relationships that go long term with our clients.
        </p>





        {/* Phone / WhatsApp */}
        <div className="flex justify-center gap-5 mb-4">
          <a href="tel:+94117778777"><img src={phoneIcon} alt="Call us" className="w-10 h-10" loading="lazy" /></a>
          <a href="https://wa.me/94777800606" target="_blank" rel="noopener noreferrer"><img src={whatsappIcon} alt="WhatsApp" className="w-10 h-10" loading="lazy" /></a>
        </div>
        <p className="font-lato text-[18px] lg:text-[19px] text-crimson tracking-[0.3em] lg:tracking-[0.6em] uppercase text-center mb-8 lg:mb-10">
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
          {/* OUR PRESENCE */}
          <div className="flex-1 max-w-[600px]">
            <p className="font-lato text-[20px] lg:text-[21px] text-crimson tracking-[0.3em] lg:tracking-[0.6em] uppercase mb-4">OUR PRESENCE</p>
            <iframe
              title="Bimsara Real Estate Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3960.7648129039626!2d79.8930121!3d6.918696!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25995119a0d4b%3A0xb8478b32080b33cb!2sBimsara%20Real%20Estate!5e0!3m2!1sen!2slk!4v1652678023249!5m2!1sen!2slk"
              className="w-full h-[300px] lg:h-[400px] rounded-[20px] border-0"
              allowFullScreen
              loading="lazy"
            />
            <p className="font-lato text-[16px] lg:text-[20px] text-crimson tracking-[0.2em] uppercase mt-6 mb-2">OFFICE</p>
            <p className="font-lato text-[14px] lg:text-[18px] text-ebony-clay leading-[32px]">
              199/58,<br />Rajagiriya Road,<br />Rajagiriya.
            </p>
            <p className="font-lato text-[16px] lg:text-[20px] text-crimson tracking-[0.2em] uppercase mt-6 mb-4">WE ARE SOCIAL</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/bimsararealestate/" target="_blank" rel="noopener noreferrer"><img src={fbIcon} alt="Facebook" className="w-10 h-10" loading="lazy" /></a>
              <a href="https://g.page/r/CcszCwgyi0e4EAE" target="_blank" rel="noopener noreferrer"><img src={googleIcon} alt="Google" className="w-10 h-10" loading="lazy" /></a>
              <a href="https://www.linkedin.com/company/safetynet-private-limited" target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} alt="LinkedIn" className="w-10 h-10" loading="lazy" /></a>
              <a href="https://www.instagram.com/bimsara.realestate/" target="_blank" rel="noopener noreferrer"><img src={instagramIcon} alt="Instagram" className="w-10 h-10" loading="lazy" /></a>
              <a href="https://www.youtube.com/channel/UC7qFW8s7CdI1GeDChAY5nTw/featured" target="_blank" rel="noopener noreferrer"><img src={youtubeIcon} alt="YouTube" className="w-10 h-10" loading="lazy" /></a>
            </div>
          </div>

          {/* Contact Form — border-radius 68px per Figma */}
          <div className="flex-1 bg-concrete rounded-[20px] lg:rounded-[68px] p-5 lg:p-[40px] max-w-[600px]">
            <p className="font-lato text-[22px] lg:text-[20px] font-black text-ebony-clay leading-[30px] mb-6 pt-[20px]">
              I would like to know more about the services
            </p>

            <InquiryForm />
          </div>
        </div>
      </section>


    </div>
  )
}
