import { useEffect, useRef, useState } from 'react'

const DURATION = 4000

export default function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const startRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))

    startRef.current = performance.now()
    const tick = (now) => {
      const elapsed = now - startRef.current
      const remaining = Math.max(0, 100 - (elapsed / DURATION) * 100)
      setProgress(remaining)
      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        handleClose()
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 350)
  }

  const isSuccess = type === 'success'

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? '0' : '-120%'})`,
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
        zIndex: 9999,
        minWidth: '320px',
        maxWidth: '420px',
        width: 'calc(100vw - 2rem)',
        fontFamily: 'Lato, sans-serif',
      }}
    >
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 8px 32px rgba(48,53,72,0.13), 0 1.5px 4px rgba(48,53,72,0.07)',
        overflow: 'hidden',
        border: `1.5px solid ${isSuccess ? 'rgba(34,197,94,0.25)' : 'rgba(229,50,45,0.2)'}`,
      }}>
        {/* Body */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px 14px' }}>
          {/* Icon */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isSuccess ? 'rgba(34,197,94,0.1)' : 'rgba(229,50,45,0.08)',
          }}>
            {isSuccess ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="rgba(34,197,94,0.15)" />
                <path d="M5 9.5L7.5 12L13 6.5" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="rgba(229,50,45,0.1)" />
                <path d="M6 6L12 12M12 6L6 12" stroke="#e5322d" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#303548',
              marginBottom: '2px',
              letterSpacing: '0.01em',
            }}>
              {isSuccess ? 'Message Sent' : 'Submission Failed'}
            </p>
            <p style={{
              fontSize: '13px',
              fontWeight: '300',
              color: '#737373',
              lineHeight: '1.5',
            }}>
              {message}
            </p>
          </div>

          {/* Close */}
          <button
            onClick={handleClose}
            style={{
              flexShrink: 0,
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#b4b4b4',
              fontSize: '18px',
              lineHeight: 1,
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#303548' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b4b4b4' }}
          >
            ×
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: '3px', background: '#f3f4f6' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: isSuccess
              ? 'linear-gradient(90deg, #16a34a, #22c55e)'
              : 'linear-gradient(90deg, #e5322d, #f87171)',
            transition: 'width 0.1s linear',
            borderRadius: '0 2px 2px 0',
          }} />
        </div>
      </div>
    </div>
  )
}
