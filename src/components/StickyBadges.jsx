import isoLogo from '../assets/images/iso-logo.png'
import safetynetLogo from '../assets/images/safetynet-logo.png'
import roundBadge from '../assets/images/round-badge.png'

export default function StickyBadges() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="hidden lg:flex fixed bottom-[2vh] z-40 items-center gap-[2vw] sticky-badges-pos"
    >
      {/* ISO + UKAS logos */}
      <img
        src={isoLogo}
        alt="ISO 9001 Bureau Veritas"
        className="h-[50px] 2xl:h-[60px] object-contain"
      />

      {/* Safetynet logo */}
      <img
        src={safetynetLogo}
        alt="Safetynet (Private) Limited"
        className="h-[50px] 2xl:h-[60px] object-contain"
      />

      {/* Round arrow button */}
      <button
        onClick={scrollToTop}
        className="relative w-[60px] h-[60px] 2xl:w-[80px] 2xl:h-[80px] cursor-pointer hover:scale-105 transition-transform"
      >
        <img src={roundBadge} alt="Scroll to top" className="w-full h-full" />
      </button>
    </div>
  )
}
