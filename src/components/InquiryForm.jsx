import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_USER_ID, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../lib/emailjs'

const PROPERTY_TYPES = ['House', 'Apartment', 'Land', 'Commercial', 'Villa', 'Other']

function validate(data) {
  const errs = {}
  if (!data.name.trim())        errs.name    = 'Name is required.'
  if (!data.email.trim())       errs.email   = 'Email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please use the format: name@example.com'
  if (!data.phone.trim())       errs.phone   = 'Contact number is required.'
  if (!data.purpose)            errs.purpose = 'Please select an option.'
  return errs
}

// inputClass / labelClass let callers tweak styling to fit their context
export default function InquiryForm({ inputClass = '', labelClass = '' }) {
  const [form, setForm]       = useState({ name: '', email: '', countryCode: '+94', phone: '', purpose: '', propertyType: '' })
  const [errors, setErrors]   = useState({})
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    const sanitized = name === 'phone' ? value.replace(/\D/g, '') : value
    setForm(prev => ({ ...prev, [name]: sanitized }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleEmailBlur = () => {
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrors(prev => ({ ...prev, email: 'Please use the format: name@example.com' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitError(false)
    setSending(true)
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name:    form.name,
        email:   form.email,
        number:  form.phone,
        type:    form.propertyType,
        purpose: form.purpose.toLowerCase().replace(' ', ''),
      },
      EMAILJS_USER_ID
    ).then(() => {
      setSending(false)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', email: '', countryCode: '+94', phone: '', purpose: '', propertyType: '' })
      }, 4000)
    }).catch(() => {
      setSending(false)
      setSubmitError(true)
    })
  }

  const field = `w-full bg-white rounded-[8px] h-[40px] px-3 outline-none border font-lato text-[14px] ${inputClass}`
  const lbl   = `block font-lato text-[13px] lg:text-[17px] font-bold text-ebony-75 mb-2 ${labelClass}`
  const err   = (key) => errors[key] && <p className="font-lato text-[12px] text-crimson mt-1">{errors[key]}</p>

  if (submitted) {
    return (
      <div className="text-center py-12">
        <p className="font-lato text-[24px] font-bold text-crimson mb-2">Thank you!</p>
        <p className="font-lato text-[20px] text-ebony-clay">We'll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>

        {/* Error banner */}
        {submitError && (
          <div className="flex items-start gap-3 bg-crimson/10 border border-crimson/30 rounded-[10px] px-4 py-3">
            <svg className="shrink-0 mt-[2px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="rgba(229,50,45,0.15)" />
              <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="#e5322d" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <div className="flex-1">
              <p className="font-lato text-[13px] font-bold text-crimson leading-snug">Something went wrong.</p>
              <p className="font-lato text-[13px] text-crimson/80 leading-snug">Please try again.</p>
            </div>
            <button type="button" onClick={() => setSubmitError(false)}
              className="shrink-0 text-crimson/50 hover:text-crimson text-lg leading-none transition-colors">×</button>
          </div>
        )}

        {/* Name */}
        <div>
          <label className={lbl}>Name <span className="text-crimson">*</span></label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            className={`${field} ${errors.name ? 'border-crimson' : 'border-transparent'}`} />
          {err('name')}
        </div>

        {/* Email */}
        <div>
          <label className={lbl}>Email Address <span className="text-crimson">*</span></label>
          <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleEmailBlur}
            placeholder="e.g. yourname@domain.com"
            className={`${field} ${errors.email ? 'border-crimson' : 'border-transparent'}`} />
          {err('email')}
        </div>

        {/* Phone */}
        <div>
          <label className={lbl}>Contact Number <span className="text-crimson">*</span></label>
          <div className={`flex rounded-[8px] border ${errors.phone ? 'border-crimson' : 'border-transparent'}`}>
            <input type="text" name="countryCode" value={form.countryCode} onChange={handleChange}
              className="bg-white border-r border-ebony-75/50 rounded-l-[8px] h-[40px] w-[20%] px-3 outline-none font-lato text-[14px]" />
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              className="bg-white rounded-r-[8px] h-[40px] w-[80%] px-3 outline-none font-lato text-[14px]" />
          </div>
          {err('phone')}
        </div>

        {/* Purpose */}
        <div>
          <label className={lbl}>I want to <span className="text-crimson">*</span></label>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
            {['Sell', 'Buy', 'Rent Out', 'Rent Occupy'].map((o) => (
              <label key={o} className="flex items-center gap-2 cursor-pointer font-lato text-[13px] lg:text-[17px] text-ebony-75">
                <input type="radio" name="purpose" value={o} checked={form.purpose === o} onChange={handleChange}
                  className="accent-crimson cursor-pointer" /> {o}
              </label>
            ))}
          </div>
          {err('purpose')}
        </div>

        {/* Property Type */}
        <div>
          <select name="propertyType" value={form.propertyType} onChange={handleChange}
            className="w-full bg-white rounded-[8px] h-[40px] px-3 outline-none border border-transparent font-lato text-[13px] lg:text-[17px] text-ebony-75">
            <option value="">Property Type</option>
            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-[20px] lg:pt-[29px]">
          <button type="submit" disabled={sending}
            className="glass-btn font-lato text-[15px] lg:text-[24px] font-bold text-ebony-clay px-[21px] lg:px-[40px] py-[8px] lg:py-[15px] cursor-pointer hover:bg-ebony-clay hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {sending ? 'Sending…' : 'Contact Me'}
          </button>
        </div>
    </form>
  )
}
