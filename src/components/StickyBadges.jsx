import { useState } from 'react'
import isoLogo from '../assets/images/iso-logo.png'
import safetynetLogo from '../assets/images/safetynet-logo.png'
import roundBadge from '../assets/images/round-badge.png'
import InquiryForm from './InquiryForm'

export default function StickyBadges() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Sticky badges row */}
      <div className="fixed bottom-[2vh] z-40 flex items-center gap-[2vw] sticky-badges-pos">
        <img src={isoLogo} alt="ISO 9001 Bureau Veritas" className="hidden lg:block h-[50px] 2xl:h-[60px] object-contain" />
        <img src={safetynetLogo} alt="Safetynet (Private) Limited" className="hidden lg:block h-[50px] 2xl:h-[60px] object-contain" />
        <button
          onClick={() => setOpen(true)}
          className="relative w-[60px] h-[60px] cursor-pointer hover:scale-105 transition-transform"
        >
          <img src={roundBadge} alt="Enquire now" className="w-full h-full" />
        </button>
      </div>

      {/* Inquiry popup */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 pb-4 sm:pb-0"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="popup-card bg-[#f0f0f0] rounded-[20px] w-full max-w-[480px] shadow-2xl max-h-[90vh] flex flex-col">
            {/* Fixed header */}
            <div className="flex items-start justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-4 shrink-0">
              <h2 className="font-lato text-[18px] sm:text-[20px] font-normal text-ebony-clay">
                I would like to know more about the services
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="ml-4 shrink-0 text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            {/* Scrollable body */}
            <div className="overflow-y-auto px-6 sm:px-8 pb-6 sm:pb-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
