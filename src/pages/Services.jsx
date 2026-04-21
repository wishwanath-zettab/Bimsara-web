import { Link } from 'react-router-dom'
import sellersHeroFull from '../assets/images/sellers-hero-full.webp'
import buyersHeroFull from '../assets/images/buyers-hero-full.webp'
import landlordsHeroFull from '../assets/images/landlords-hero-full.webp'
import tenantsHeroFull from '../assets/images/tenants-hero-full.webp'
import sellersIcon from '../assets/images/sellers-icon.webp'
import buyersIcon from '../assets/images/buyers-icon.webp'
import landlordsIcon from '../assets/images/landlords-icon.webp'
import tenantsIcon from '../assets/images/tenants-icon.webp'
import whiteArrow from '../assets/images/white-arrow.webp'
import isoLogo from '../assets/images/iso-logo.png'
import safetynetLogo from '../assets/images/safetynet-logo.png'

const services = [
  {
    id: 'sellers',
    title: 'For Sellers',
    sub: 'Property owners who want to sell',
    description:
      'Your property will be showcased in multiple renowned property portals and social media platforms to harness the best potential.',
    icon: sellersIcon,
    image: sellersHeroFull,
    href: '/sellers',
    accent: '#e5322d',
    num: '01',
  },
  {
    id: 'buyers',
    title: 'For Buyers',
    sub: 'Individuals seeking their dream property',
    description:
      'We shortlist properties matching your exact requirements, represent you in negotiations, conduct due diligence and guide you to a smooth and confident purchase.',
    icon: buyersIcon,
    image: buyersHeroFull,
    href: '/buyers',
    accent: '#0f64fa',
    num: '02',
  },
  {
    id: 'landlords',
    title: 'For Landlords',
    sub: 'Property owners who want to rent out',
    description:
      'We assess the rental market, rigorously screen prospective tenants, draft lease agreements and coordinate the full rental handover on your behalf.',
    icon: landlordsIcon,
    image: landlordsHeroFull,
    href: '/landlords',
    accent: '#b8406e',
    num: '03',
  },
  {
    id: 'tenants',
    title: 'For Tenants',
    sub: 'Individuals looking for a rental property',
    description:
      'We match properties to your specific lifestyle and budget, negotiate favourable rental terms and walk you through every step of documentation and move-in.',
    icon: tenantsIcon,
    image: tenantsHeroFull,
    href: '/tenants',
    accent: '#8e44ad',
    num: '04',
  },
]

export default function Services() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="services-hero-bg py-[80px] lg:py-[120px] px-5 lg:px-[8%] lg:-mr-[100px]">
        <p className="font-lato text-[14px] lg:text-[16px] tracking-[0.35em] text-royal-blue uppercase mb-4">
          BIMSARA REAL ESTATE
        </p>
        <h1 className="font-lato text-[38px] lg:text-[64px] font-bold text-white leading-tight mb-5 max-w-3xl">
          Our Services are <br className="hidden lg:block" />tailored for you.
        </h1>
        <p className="font-lato text-[17.6px] lg:text-[19.8px] font-light text-nobel leading-[33px] max-w-2xl mb-8">
          Whether you're selling, buying, renting out or renting in — Bimsara
          Real Estate has a dedicated team and a proven process for every need.
        </p>
        <div className="flex items-center gap-8">
          <img src={isoLogo} alt="ISO Certified" className="h-[34px] opacity-70" />
          <img src={safetynetLogo} alt="Safetynet" className="h-[34px] opacity-70" />
        </div>
      </section>

      {/* ═══ SERVICE CARDS ═══ */}
      <section className="bg-ebony py-[60px] lg:py-[80px] px-5 lg:px-[8%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {services.map((s) => (
            <Link
              key={s.id}
              to={s.href}
              className="group relative overflow-hidden rounded-[20px] min-h-[300px] lg:min-h-[400px] block"
            >
              {/* bg image */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

              {/* number accent */}
              <div className="absolute top-6 left-6">
                <span
                  className="font-khand text-[77px] lg:text-[96px] font-medium leading-none opacity-45 tracking-[0.01em]"
                  style={{ color: s.accent, textShadow: '0 0 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)' }}
                >
                  {s.num}
                </span>
              </div>

              {/* right accent bar */}
              <div
                className="absolute top-0 right-0 w-[3px] h-full opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to bottom, transparent, ${s.accent}, transparent)` }}
              />

              {/* content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4 lg:mb-2 justify-end lg:justify-start">
                  <img src={s.icon} alt="" className="w-7 h-7" />
                  <span className="max-w-[60%] lg:max-w-none font-lato text-[13px] lg:text-[14.4px] font-medium text-white/80 tracking-[0.11em] uppercase" style={{ textShadow: '0 0 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)' }}>
                    {s.sub}
                  </span>
                </div>
                <h2 className="font-lato text-[30.2px] lg:text-[40.8px] font-bold text-white mb-3 leading-tight">
                  {s.title}
                </h2>
                <p className="font-lato text-[15.1px] lg:text-[16.8px] font-medium text-white/75 leading-[20.7px] lg:leading-[28.8px] mb-5 max-w-sm tracking-[0.01em]" style={{ textShadow: '0 0 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)' }}>
                  {s.description}
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className="font-lato text-[14px] lg:text-[15.6px] tracking-[0.275em] uppercase font-medium"
                    style={{ color: s.accent, textShadow: '0 0 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)' }}
                  >
                    Learn More
                  </span>
                  <img
                    src={whiteArrow}
                    alt=""
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                    style={{ filter: `hue-rotate(${s.id === 'sellers' ? '0' : s.id === 'buyers' ? '200deg' : s.id === 'landlords' ? '300deg' : '260deg'})` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ DARK CTA SECTION ═══ */}
      <section className="iso-section-bg py-[60px] lg:py-[100px] px-5 lg:px-[8%] text-center">
        <h2 className="services-dark-cta-heading mb-10 lg:mb-20 max-w-4xl mx-auto">
          Want to go on the safe side with your property?
        </h2>
        <div className="flex justify-center">
          <Link to="/#contact" className="pill-btn">
            Talk to us
            <img src={whiteArrow} alt="" className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══ TRUSTED STRIP ═══ */}
      <section className="py-[50px] px-5 lg:px-[8%] bg-lines">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            {['Trusted Advisor', 'Skilled Negotiator', 'Expert Facilitator'].map((t) => (
              <span key={t} className="services-tagline w-full flex justify-center text-center">
                {t}
              </span>
            ))}
          </div>
          <Link to="/#contact" className="pill-btn shrink-0">
            Get in Touch
            <img src={whiteArrow} alt="" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
