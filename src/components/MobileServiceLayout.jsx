import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import arrowRight from '../assets/images/arrow-right.png'
import logo from '../assets/images/logo.png'

function renderContentItem(item, i) {
  if (typeof item === 'object' && item.topic) {
    return <h4 key={i} className="font-lato text-[15px] font-bold text-ebony-clay mt-5 mb-1">{item.topic}</h4>
  }
  if (typeof item === 'object' && item.table) {
    return (
      <div key={i} className="overflow-x-auto my-3">
        <table className="w-full border-collapse font-lato text-[13px] text-ebony-clay">
          <tbody>
            {item.table.map((row, ri) => (
              <tr key={ri} className="border border-gray-300">
                {row.map((cell, ci) => (
                  <td key={ci} className={`border border-gray-300 px-2 py-1.5 leading-[1.6] ${ci === row.length - 1 ? 'text-center font-semibold w-[60px]' : ''} ${ci === 0 ? 'w-[36px] text-center' : ''}`}
                    dangerouslySetInnerHTML={{__html: cell}} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (typeof item === 'object' && item.italic) {
    return <p key={i} className="font-lato text-[13px] font-light text-scorpion italic">{item.italic}</p>
  }
  if (typeof item === 'object' && item.bold) {
    return (
      <p key={i} className="font-lato text-[15px] font-light text-ebony-clay leading-[26px] text-justify">
        <span className="font-bold">{item.bold}</span>{' '}{item.text || ''}
      </p>
    )
  }
  return <p key={i} className="font-lato text-[15px] font-light text-ebony-clay leading-[26px] text-justify">{item}</p>
}

export default function MobileServiceLayout({
  heroTitle,
  heading,
  description,
  servicesList,
  guideTitle,
  guideName,
  guideSteps,
  defaultContentTitle,
  defaultContentBody,
  breadcrumbLabel,
  renderAfterServices,
  renderAfterDefaultContent,
}) {
  const [selectedService, setSelectedService] = useState(null)
  const [activeStep, setActiveStep] = useState(null)
  const [guideOpen, setGuideOpen] = useState(true)

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedService])

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen text-white overflow-hidden" style={{backgroundColor: '#0A0F20'}}>

        <div className="relative z-10 w-full px-[7.2%] pt-[80px] pb-[40px]">
          {/* Breadcrumb */}
          <p className="font-lato text-[12px] text-nobel mb-6">
            <Link to="/services" className="hover:text-white transition-colors">Our Services</Link>
            <span className="mx-2 text-nobel/50">/</span>
            <span className="text-white">{breadcrumbLabel}</span>
          </p>

          {/* Title */}
          <h1 className="font-lato text-[28px] font-normal text-white mb-6 leading-tight">
            {heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="font-lato text-[14px] tracking-[0.84em] text-royal-blue uppercase mb-8">
            OUR SERVICES
          </p>

          {/* Heading */}
          {heading && (
            <h2 className="font-lato text-[24px] font-normal text-white mb-5 leading-snug text-center">
              {heading}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className="font-lato text-[15px] font-semibold text-white/70 leading-[1.8] text-center mb-10">
              {description}
            </p>
          )}

          {/* Service cards */}
          <div className="space-y-3">
            {servicesList.map((s) => (
              <button
                key={s.title}
                onClick={() => setSelectedService(s)}
                className="w-full flex items-center justify-between px-5 py-4 rounded-[16px] text-left transition-colors"
                style={{background: 'linear-gradient(to right, #2e2e3e, #1a1a2e, #2e2e3e)'}}
              >
                <span className="font-lato text-[15px] font-normal text-white">
                  {s.title}
                </span>
                <div className="w-[40px] h-[40px] rounded-full border border-white/50 flex items-center justify-center shrink-0 ml-3">
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {renderAfterServices && renderAfterServices()}
        </div>

        {/* Service overlay - slides from right with transparent margin */}
        <div
          className="fixed z-50 rounded-[20px]"
          style={{
            background: 'linear-gradient(160deg, #f4a4c0 0%, #c9a4f4 35%, #a4c4f4 70%, #d0e8ff 100%)',
            top: '50%',
            left: '50%',
            width: 'calc(100% - 28px)',
            height: '65vh',
            transform: selectedService ? 'translate(-50%, -50%)' : 'translate(110%, -50%)',
            transition: 'transform 0.5s ease-out',
          }}
        >
          <button
            onClick={() => setSelectedService(null)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 transition-colors flex items-center justify-center text-gray-600 text-lg font-light z-10"
          >
            ×
          </button>
          <div className="h-full overflow-y-auto px-6 pt-[62px] pb-16 rounded-[20px]">
            {selectedService && (
              <>
                <p className="font-lato text-[18px] text-royal-blue font-semibold mb-4 tracking-wide leading-snug">
                  {selectedService.overlayTitle}
                </p>
                {selectedService.overlayTagline && (
                  <p className="font-lato text-[15px] text-ebony-clay mb-3 leading-[1.7]">
                    {selectedService.overlayTagline}
                  </p>
                )}
                <p className="font-lato text-[15px] text-ebony-clay/80 leading-[1.7]">
                  {selectedService.overlayBody}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Overlay backdrop - semi-transparent to see page below */}
        {selectedService && (
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setSelectedService(null)} />
        )}

      </section>

      {/* ═══ GUIDE ═══ */}
      <section className="py-[6%] px-[5.3%] bg-white bg-lines">

        {/* Title */}
        <h2 className="font-lato text-[24px] font-normal text-crimson mb-4">{guideTitle}</h2>

        {/* Collapsible guide panel */}
        <div className="bg-gray-100 rounded-[12px] p-4">
          {/* Header */}
          <button
            onClick={() => setGuideOpen(!guideOpen)}
            className="w-full flex items-center justify-between mb-2"
          >
            <h3 className="font-lato text-[17px] font-bold text-ebony-clay">{guideName}</h3>
            <svg
              className={`w-5 h-5 text-ebony-clay transition-transform duration-300 ${guideOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {guideOpen && (
            <div className="space-y-0">
              {activeStep === null ? (
                /* Show all steps */
                guideSteps.map((step, i) => (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(i)}
                    className="w-full text-left flex items-center gap-3 py-3 border-b border-transparent border-b-gray-200 px-0 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-[6px] shrink-0 overflow-hidden" style={{
                      background: 'linear-gradient(135deg, #f4a4c0 0%, #c9a4f4 33%, #a4c4f4 66%, #a4f4e0 100%)',
                      opacity: 0.7
                    }} />
                    <span className="font-lato text-[15px] leading-tight text-ebony-clay">
                      {step.title}
                    </span>
                  </button>
                ))
              ) : (
                /* Show only active step */
                <button
                  onClick={() => setActiveStep(null)}
                  className="w-full text-left flex items-center gap-3 py-3 border border-gray-300 rounded-[8px] px-3 bg-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-[6px] shrink-0 overflow-hidden" style={{
                    background: 'linear-gradient(135deg, #f4a4c0 0%, #c9a4f4 33%, #a4c4f4 66%, #a4f4e0 100%)',
                    opacity: 0.7
                  }} />
                  <span className="font-lato text-[15px] leading-tight text-gray-400">
                    {guideSteps[activeStep].title}
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content area */}
        <div className="mt-6 px-1">
          {activeStep === null ? (
            /* Default content */
            <>
              <h3 className="font-lato text-[22px] font-normal text-ebony-clay mb-4">{defaultContentTitle}</h3>
              <div className="space-y-3">
                {defaultContentBody.map((item, i) => renderContentItem(item, i))}
              </div>
              {renderAfterDefaultContent && renderAfterDefaultContent()}
            </>
          ) : (
            /* Guide step content */
            <>
              <h3 className="font-lato text-[22px] font-normal text-ebony-clay mb-1">
                {guideSteps[activeStep].title}
              </h3>
              <div className="space-y-3 mt-3">
                {guideSteps[activeStep].content?.map((item, i) => renderContentItem(item, i))}
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-4">
          <Link to="/#contact" className="pill-btn" style={{fontSize: '12px', padding: '7px 18px', gap: '10px'}}>
            Contact Us
            <img src={arrowRight} alt="" className="w-3.5 h-3.5" />
          </Link>
          <Link to="/services" className="font-lato text-[11px] text-scorpion hover:text-ebony-clay transition-colors">
            ← Back to All Services
          </Link>
        </div>
      </section>
    </div>
  )
}
