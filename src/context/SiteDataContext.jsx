import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const SiteDataContext = createContext(null)

const defaultData = {
  teamPositions: 0,
  serviceProviderCount: 0,
  isoCertificateImage: '',
  serviceProviders: [],
  contacts: [],
  teamMembers: [],
  officeAddress: '',
  commissionRate: '',
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/site-data')
      if (!res.ok) throw new Error('Failed to fetch site data')
      const json = await res.json()
      setData({ ...defaultData, ...json })
      setError(null)
    } catch (err) {
      console.error('SiteData fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Admin: update settings (key-value pairs)
  const updateSettings = async (updates) => {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updates),
    })
    if (!res.ok) throw new Error('Failed to update settings')
    await fetchData()
  }

  // Admin: contact CRUD
  const addContact = async (contact) => {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(contact),
    })
    if (!res.ok) throw new Error('Failed to add contact')
    await fetchData()
  }

  const updateContact = async (id, updates) => {
    const res = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updates),
    })
    if (!res.ok) throw new Error('Failed to update contact')
    await fetchData()
  }

  const deleteContact = async (id) => {
    const res = await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!res.ok) throw new Error('Failed to delete contact')
    await fetchData()
  }

  // Admin: provider CRUD
  const addProvider = async (formData) => {
    const res = await fetch('/api/providers', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    if (!res.ok) throw new Error('Failed to add provider')
    await fetchData()
  }

  const updateProvider = async (id, formData) => {
    const res = await fetch(`/api/providers/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    })
    if (!res.ok) throw new Error('Failed to update provider')
    await fetchData()
  }

  const deleteProvider = async (id) => {
    const res = await fetch(`/api/providers/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!res.ok) throw new Error('Failed to delete provider')
    await fetchData()
  }

  // Admin: team member CRUD
  const addTeamMember = async (formData) => {
    const res = await fetch('/api/team', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    if (!res.ok) throw new Error('Failed to add team member')
    await fetchData()
  }

  const updateTeamMember = async (id, formData) => {
    const res = await fetch(`/api/team/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    })
    if (!res.ok) throw new Error('Failed to update team member')
    await fetchData()
  }

  const deleteTeamMember = async (id) => {
    const res = await fetch(`/api/team/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!res.ok) throw new Error('Failed to delete team member')
    await fetchData()
  }

  // Admin: ISO cert upload
  const uploadIsoCert = async (formData) => {
    const res = await fetch('/api/upload/iso-cert', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    if (!res.ok) throw new Error('Failed to upload ISO certificate')
    await fetchData()
  }

  const deleteIsoCert = async () => {
    const res = await fetch('/api/upload/iso-cert', {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!res.ok) throw new Error('Failed to delete ISO certificate')
    await fetchData()
  }

  return (
    <SiteDataContext.Provider value={{
      data,
      loading,
      error,
      fetchData,
      updateSettings,
      addContact,
      updateContact,
      deleteContact,
      addProvider,
      updateProvider,
      deleteProvider,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      uploadIsoCert,
      deleteIsoCert,
    }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider')
  return ctx
}
