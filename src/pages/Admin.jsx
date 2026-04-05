import { useState, useEffect } from 'react'
import { useSiteData } from '../context/SiteDataContext'

function PasswordGate({ onAuth }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    fetch('/api/auth/check', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.authenticated) onAuth(); else setChecking(false) })
      .catch(() => setChecking(false))
  }, [onAuth])

  if (checking) return <div className="min-h-[70vh] flex items-center justify-center"><p className="font-lato text-[16px] text-scorpion">Checking session...</p></div>

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) onAuth()
      else setError('Incorrect credentials. Please try again.')
    } catch {
      setError('Server unavailable. Make sure the backend is running.')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 bg-concrete">
      <div className="bg-white rounded-[30px] shadow-lg p-10 w-full max-w-[420px]">
        <div className="text-center mb-8">
          <h1 className="font-lato text-[28px] font-bold text-ebony-clay">Control Panel</h1>
          <p className="font-lato text-[14px] text-scorpion mt-2">Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border border-alto rounded-[10px] h-[48px] px-4 outline-none font-lato text-[16px] mb-3 focus:border-royal-blue transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            placeholder="Password"
            className="w-full border border-alto rounded-[10px] h-[48px] px-4 outline-none font-lato text-[16px] mb-3 focus:border-royal-blue transition-colors"
            autoFocus
          />
          {error && <p className="font-lato text-[13px] text-crimson mb-3">{error}</p>}
          <button type="submit" className="w-full bg-ebony text-white font-lato text-[16px] font-bold py-3 rounded-[10px] hover:bg-ebony-clay transition-colors cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

function SectionCard({ title, description, children }) {
  return (
    <section className="bg-white rounded-[20px] p-6 lg:p-8 mb-6 shadow-sm">
      <h2 className="font-lato text-[20px] font-bold text-ebony-clay mb-1">{title}</h2>
      {description && <p className="font-lato text-[13px] text-scorpion mb-5">{description}</p>}
      {!description && <div className="mb-5" />}
      {children}
    </section>
  )
}

function Field({ label, children }) {
  return (
    <div className="mb-4 last:mb-0">
      <label className="block font-lato text-[14px] font-bold text-ebony-clay mb-2">{label}</label>
      {children}
    </div>
  )
}

const inputClass = "w-full border border-alto rounded-[10px] h-[44px] px-4 outline-none font-lato text-[15px] focus:border-royal-blue transition-colors"
const textareaClass = "w-full border border-alto rounded-[10px] px-4 py-3 outline-none font-lato text-[15px] focus:border-royal-blue transition-colors resize-none"

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const {
    data, fetchData,
    updateSettings,
    addContact, updateContact, deleteContact,
    addProvider, updateProvider, deleteProvider,
    addTeamMember, updateTeamMember, deleteTeamMember,
    uploadIsoCert, deleteIsoCert,
  } = useSiteData()

  const [newProviderName, setNewProviderName] = useState('')
  const [toast, setToast] = useState('')
  const [editingMember, setEditingMember] = useState(null)

  const showToast = (msg = 'Changes saved') => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    setAuthenticated(false)
  }

  if (!authenticated) return <PasswordGate onAuth={() => setAuthenticated(true)} />

  // --- Settings handlers ---
  const handleSettingChange = async (key, value) => {
    try {
      await updateSettings({ [key]: value })
      showToast()
    } catch { showToast('Error saving') }
  }

  // --- Contact handlers ---
  const handleContactChange = async (contact, field, value) => {
    try {
      await updateContact(contact.id, { ...contact, [field]: value })
      showToast()
    } catch { showToast('Error saving') }
  }

  const handleAddContact = async () => {
    try {
      await addContact({ category: 'NEW CATEGORY', email: '', phone: '' })
      showToast('Contact added')
    } catch { showToast('Error adding') }
  }

  const handleRemoveContact = async (id) => {
    try {
      await deleteContact(id)
      showToast('Contact removed')
    } catch { showToast('Error removing') }
  }

  // --- ISO cert handlers ---
  const handleIsoCertUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('image', file)
    try {
      await uploadIsoCert(fd)
      showToast('Certificate updated')
    } catch { showToast('Error uploading') }
  }

  const handleIsoCertReset = async () => {
    try {
      await deleteIsoCert()
      showToast('Reset to default')
    } catch { showToast('Error resetting') }
  }

  // --- Provider handlers ---
  const handleProviderLogoUpload = async (provider, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('name', provider.name)
    fd.append('logo', file)
    try {
      await updateProvider(provider.id, fd)
      showToast('Logo updated')
    } catch { showToast('Error uploading') }
  }

  const handleRemoveProvider = async (id) => {
    try {
      await deleteProvider(id)
      showToast('Provider removed')
    } catch { showToast('Error removing') }
  }

  const handleAddProvider = async () => {
    if (!newProviderName.trim()) return
    const fd = new FormData()
    fd.append('name', newProviderName.trim())
    try {
      await addProvider(fd)
      setNewProviderName('')
      showToast('Provider added')
    } catch { showToast('Error adding') }
  }

  // --- Team member handlers ---
  const handleSaveMember = async (memberData, imageFile) => {
    const fd = new FormData()
    fd.append('name', memberData.name)
    fd.append('position', memberData.position)
    fd.append('quote', memberData.quote)
    fd.append('description', memberData.description)
    fd.append('description2', memberData.description2)
    fd.append('linkedin_url', memberData.linkedin_url)
    if (imageFile) fd.append('image', imageFile)

    try {
      if (memberData.id) {
        await updateTeamMember(memberData.id, fd)
        showToast('Member updated')
      } else {
        await addTeamMember(fd)
        showToast('Member added')
      }
      setEditingMember(null)
    } catch { showToast('Error saving') }
  }

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Remove this team member?')) return
    try {
      await deleteTeamMember(id)
      showToast('Member removed')
    } catch { showToast('Error removing') }
  }

  const handleMoveMember = async (member, direction) => {
    const members = [...(data.teamMembers || [])]
    const idx = members.findIndex((m) => m.id === member.id)
    const swapIdx = idx + direction
    if (swapIdx < 0 || swapIdx >= members.length) return

    const thisOrder = members[idx].sort_order
    const otherOrder = members[swapIdx].sort_order

    try {
      const fd1 = new FormData()
      fd1.append('sort_order', String(otherOrder))
      const fd2 = new FormData()
      fd2.append('sort_order', String(thisOrder))
      await updateTeamMember(members[idx].id, fd1)
      await updateTeamMember(members[swapIdx].id, fd2)
      showToast('Order updated')
    } catch { showToast('Error reordering') }
  }

  return (
    <div className="min-h-screen bg-concrete py-8 lg:py-12 px-4 lg:px-8">
      <div className="max-w-[850px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-lato text-[26px] lg:text-[32px] font-bold text-ebony-clay">Site Control Panel</h1>
            <p className="font-lato text-[14px] text-scorpion mt-1">Manage your website content</p>
          </div>
          <div className="flex items-center gap-3">
            {toast && (
              <span className="font-lato text-[13px] font-bold text-green-700 bg-green-100 px-4 py-2 rounded-full animate-pulse">
                {toast}
              </span>
            )}
            <button onClick={handleLogout} className="font-lato text-[13px] text-scorpion hover:text-crimson cursor-pointer">
              Sign Out
            </button>
          </div>
        </div>

        {/* ═══ TEAM STATISTICS ═══ */}
        <SectionCard title="Team Statistics" description="These numbers appear on the About page under 'Our Team'.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Number of Positions">
              <input
                type="number"
                min="0"
                value={data.teamPositions}
                onChange={(e) => handleSettingChange('teamPositions', parseInt(e.target.value) || 0)}
                className={inputClass}
              />
            </Field>
            <Field label="Number of Service Providers">
              <input
                type="number"
                min="0"
                value={data.serviceProviderCount}
                onChange={(e) => handleSettingChange('serviceProviderCount', parseInt(e.target.value) || 0)}
                className={inputClass}
              />
            </Field>
          </div>
        </SectionCard>

        {/* ═══ ISO CERTIFICATE ═══ */}
        <SectionCard title="ISO Certificate" description="The certificate image shown on the About page.">
          {data.isoCertificateImage && (
            <div className="mb-5 p-4 bg-concrete rounded-[12px] inline-block">
              <img src={`/uploads/${data.isoCertificateImage}`} alt="Current ISO Certificate" className="max-h-[180px] rounded-lg" />
            </div>
          )}
          {!data.isoCertificateImage && (
            <p className="font-lato text-[14px] text-scorpion mb-4 italic">Using default certificate image.</p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 bg-ebony text-white font-lato text-[14px] font-bold px-5 py-3 rounded-[10px] cursor-pointer hover:bg-ebony-clay transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Upload New Image
              <input type="file" accept="image/*" onChange={handleIsoCertUpload} className="hidden" />
            </label>
            {data.isoCertificateImage && (
              <button onClick={handleIsoCertReset} className="font-lato text-[14px] text-crimson hover:underline cursor-pointer">
                Reset to Default
              </button>
            )}
          </div>
        </SectionCard>

        {/* ═══ CONTACT DETAILS ═══ */}
        <SectionCard title="Contact Details" description="Phone numbers and email addresses shown on the Home page.">
          <div className="space-y-4">
            {data.contacts.map((c) => (
              <div key={c.id} className="p-4 bg-concrete rounded-[14px]">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-lato text-[12px] font-bold text-royal-blue uppercase tracking-wider">{c.category}</span>
                  <button onClick={() => handleRemoveContact(c.id)} className="font-lato text-[12px] text-crimson hover:underline cursor-pointer">Remove</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-lato text-[12px] font-bold text-ebony-clay mb-1">Category Name</label>
                    <input type="text" defaultValue={c.category} onBlur={(e) => handleContactChange(c, 'category', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block font-lato text-[12px] font-bold text-ebony-clay mb-1">Email</label>
                    <input type="email" defaultValue={c.email} onBlur={(e) => handleContactChange(c, 'email', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block font-lato text-[12px] font-bold text-ebony-clay mb-1">Phone</label>
                    <input type="tel" defaultValue={c.phone} onBlur={(e) => handleContactChange(c, 'phone', e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleAddContact} className="mt-4 font-lato text-[14px] font-bold text-royal-blue hover:underline cursor-pointer">
            + Add New Contact Category
          </button>
        </SectionCard>

        {/* ═══ OFFICE ADDRESS ═══ */}
        <SectionCard title="Office Address" description="Shown in the 'Our Presence' section on the Home page.">
          <Field label="Address">
            <textarea
              defaultValue={data.officeAddress}
              onBlur={(e) => handleSettingChange('officeAddress', e.target.value)}
              rows={3}
              className={textareaClass}
            />
          </Field>
        </SectionCard>

        {/* ═══ COMMISSION RATE ═══ */}
        <SectionCard title="Commission Rate" description="Displayed in the Services page under 'Our Fees'.">
          <Field label="Rate (e.g. 3%)">
            <input
              type="text"
              defaultValue={data.commissionRate}
              onBlur={(e) => handleSettingChange('commissionRate', e.target.value)}
              className={inputClass}
            />
          </Field>
        </SectionCard>

        {/* ═══ SERVICE PROVIDERS ═══ */}
        <SectionCard title="Service Providers" description="Logos shown on the About page.">
          <div className="space-y-3">
            {data.serviceProviders.map((sp) => (
              <div key={sp.id} className="flex items-center gap-4 p-4 bg-concrete rounded-[14px]">
                <div className="w-[60px] h-[40px] flex items-center justify-center bg-white rounded-[6px] shrink-0">
                  {sp.logo ? (
                    <img src={`/uploads/${sp.logo}`} alt={sp.name} className="max-h-[30px] max-w-[50px] object-contain" />
                  ) : (
                    <span className="font-lato text-[9px] text-crimson text-center leading-tight">no logo</span>
                  )}
                </div>
                <span className="flex-1 font-lato text-[15px] font-bold text-ebony-clay">{sp.name}</span>
                <label className="bg-royal-blue text-white font-lato text-[12px] font-bold px-3 py-2 rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity">
                  Upload
                  <input type="file" accept="image/*" onChange={(e) => handleProviderLogoUpload(sp, e)} className="hidden" />
                </label>
                <button onClick={() => handleRemoveProvider(sp.id)} className="font-lato text-[12px] text-crimson hover:underline cursor-pointer">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <input
              type="text"
              value={newProviderName}
              onChange={(e) => setNewProviderName(e.target.value)}
              placeholder="Enter provider name..."
              className={inputClass + " flex-1"}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddProvider() } }}
            />
            <button
              onClick={handleAddProvider}
              className="bg-crimson text-white font-lato text-[14px] font-bold px-6 rounded-[10px] hover:opacity-90 transition-opacity cursor-pointer shrink-0"
            >
              Add
            </button>
          </div>
        </SectionCard>

        {/* ═══ TEAM MEMBERS ═══ */}
        <SectionCard title="Team Members" description="Manage team members shown on the About page.">
          <div className="space-y-3">
            {(data.teamMembers || []).map((member, idx) => (
              <div key={member.id} className="p-4 bg-concrete rounded-[14px]">
                <div className="flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-white shrink-0">
                    {member.image ? (
                      <img src={`/uploads/${member.image}`} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-alto text-[14px] text-scorpion">?</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-lato text-[15px] font-bold text-ebony-clay truncate">{member.name}</p>
                    <p className="font-lato text-[12px] text-scorpion truncate">{member.position}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleMoveMember(member, -1)}
                      disabled={idx === 0}
                      className="w-7 h-7 flex items-center justify-center rounded bg-white text-ebony-clay disabled:opacity-30 cursor-pointer disabled:cursor-default hover:bg-royal-blue hover:text-white transition-colors"
                      title="Move up"
                    >&#9650;</button>
                    <button
                      onClick={() => handleMoveMember(member, 1)}
                      disabled={idx === (data.teamMembers || []).length - 1}
                      className="w-7 h-7 flex items-center justify-center rounded bg-white text-ebony-clay disabled:opacity-30 cursor-pointer disabled:cursor-default hover:bg-royal-blue hover:text-white transition-colors"
                      title="Move down"
                    >&#9660;</button>
                    <button
                      onClick={() => setEditingMember({ ...member })}
                      className="font-lato text-[12px] text-royal-blue hover:underline cursor-pointer"
                    >Edit</button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="font-lato text-[12px] text-crimson hover:underline cursor-pointer"
                    >Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setEditingMember({ name: '', position: '', quote: '', description: '', description2: '', linkedin_url: '' })}
            className="mt-4 font-lato text-[14px] font-bold text-royal-blue hover:underline cursor-pointer"
          >
            + Add New Team Member
          </button>
        </SectionCard>

        {/* ═══ TEAM MEMBER EDIT MODAL ═══ */}
        {editingMember && (
          <TeamMemberModal
            member={editingMember}
            onSave={handleSaveMember}
            onClose={() => setEditingMember(null)}
          />
        )}
      </div>
    </div>
  )
}

function TeamMemberModal({ member, onSave, onClose }) {
  const [form, setForm] = useState({ ...member })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(
    member.image ? `/uploads/${member.image}` : ''
  )

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[20px] p-6 lg:p-8 w-full max-w-[600px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-lato text-[20px] font-bold text-ebony-clay mb-5">
          {member.id ? 'Edit Team Member' : 'Add Team Member'}
        </h3>

        <div className="space-y-4">
          {/* Photo */}
          <div className="flex items-center gap-4">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden bg-concrete shrink-0">
              {imagePreview ? (
                <img src={imagePreview} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-scorpion text-[12px]">No photo</div>
              )}
            </div>
            <label className="bg-royal-blue text-white font-lato text-[13px] font-bold px-4 py-2 rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity">
              {imagePreview ? 'Change Photo' : 'Upload Photo'}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <Field label="Name">
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Position">
            <input type="text" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Quote">
            <textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={3} className="w-full border border-alto rounded-[10px] px-4 py-3 outline-none font-lato text-[15px] focus:border-royal-blue transition-colors resize-none" />
          </Field>
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full border border-alto rounded-[10px] px-4 py-3 outline-none font-lato text-[15px] focus:border-royal-blue transition-colors resize-none" />
          </Field>
          <Field label="Description 2">
            <textarea value={form.description2} onChange={(e) => setForm({ ...form, description2: e.target.value })} rows={4} className="w-full border border-alto rounded-[10px] px-4 py-3 outline-none font-lato text-[15px] focus:border-royal-blue transition-colors resize-none" />
          </Field>
          <Field label="LinkedIn URL">
            <input type="url" value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} className={inputClass} placeholder="https://www.linkedin.com/in/..." />
          </Field>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onSave(form, imageFile)}
            disabled={!form.name.trim()}
            className="flex-1 bg-ebony text-white font-lato text-[15px] font-bold py-3 rounded-[10px] hover:bg-ebony-clay transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-default"
          >
            {member.id ? 'Save Changes' : 'Add Member'}
          </button>
          <button
            onClick={onClose}
            className="px-6 border-2 border-alto text-ebony-clay font-lato text-[15px] font-bold py-3 rounded-[10px] hover:bg-concrete transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
