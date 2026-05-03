import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiLogOut, FiUpload, FiCheckCircle, FiClock, FiXCircle, FiPhone, FiMail, FiMapPin, FiFileText, FiAlertCircle, FiRefreshCw } from 'react-icons/fi'
import { getApiUrl } from '../config/api'

const statusConfig = {
  pending:   { label: 'Pending',   color: 'bg-yellow-100 text-yellow-800', icon: <FiClock /> },
  approved:  { label: 'Approved',  color: 'bg-green-100 text-green-800',   icon: <FiCheckCircle /> },
  declined:  { label: 'Declined',  color: 'bg-red-100 text-red-800',       icon: <FiXCircle /> },
  contacted: { label: 'Contacted', color: 'bg-blue-100 text-blue-800',     icon: <FiPhone /> },
}

const UserDashboardPage = () => {
  const [user, setUser] = useState(null)
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadingQuoteId, setUploadingQuoteId] = useState(null)
  const [uploadMsg, setUploadMsg] = useState('')
  const navigate = useNavigate()
  const fileRefs = useRef({})

  useEffect(() => {
    fetchProfile()
    const interval = setInterval(fetchProfile, 15000) // auto-refresh every 15s
    return () => clearInterval(interval)
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch(getApiUrl('/api/user/profile'), { credentials: 'include' })
      if (res.status === 401) { navigate('/user/login'); return }
      const data = await res.json()
      setUser(data.user)
      setQuotes(data.quotes || [])
    } catch {
      navigate('/user/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch(getApiUrl('/api/user/logout'), { method: 'POST', credentials: 'include' })
    navigate('/user/login')
  }

  const handleDocUpload = async (quoteId) => {
    const formData = new FormData()
    const fields = ['cnicFront', 'cnicBack', 'landRegistry', 'electricityBill']
    let hasFiles = false
    fields.forEach(f => {
      const input = fileRefs.current[`${quoteId}_${f}`]
      if (input && input.files[0]) { formData.append(f, input.files[0]); hasFiles = true }
    })
    if (!hasFiles) { setUploadMsg('Please select at least one file to upload.'); return }

    setUploadingQuoteId(quoteId)
    setUploadMsg('')
    try {
      const res = await fetch(getApiUrl(`/api/user/quotes/${quoteId}/documents`), {
        method: 'POST', credentials: 'include', body: formData
      })
      const data = await res.json()
      if (res.ok) {
        setUploadMsg(`✅ ${data.message}`)
        fetchProfile()
      } else {
        setUploadMsg(`❌ ${data.error || 'Upload failed'}`)
      }
    } catch {
      setUploadMsg('❌ Connection failed. Please try again.')
    } finally {
      setUploadingQuoteId(null)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  )

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-green-900 to-blue-900 text-white py-8">
        <div className="container-custom px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2"><FiUser /> Welcome, {user?.name}!</h1>
              <p className="text-gray-300 mt-1 text-sm">{user?.email}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={fetchProfile} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm"><FiRefreshCw /> Refresh</button>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors text-sm"><FiLogOut /> Logout</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 min-h-screen">
        <div className="container-custom px-4">
          {/* Application Status Tracking */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">📋 My Applications</h2>

          {quotes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <FiFileText className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Applications Yet</h3>
              <p className="text-gray-500 mb-4">Submit a quote request to see your application status here.</p>
              <a href="/quote" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">Get a Quote</a>
            </div>
          ) : (
            <div className="space-y-6">
              {quotes.map(quote => {
                const status = statusConfig[quote.status] || statusConfig.pending
                return (
                  <div key={quote.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Status Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-sm text-gray-500">Application #{quote.id}</span>
                        <span className="text-xs text-gray-400 ml-3">{quote.created_at ? new Date(quote.created_at).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) : ''}</span>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}>
                        {status.icon} {status.label}
                      </span>
                    </div>

                    {/* Quote Details (Read-only) */}
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-800 mb-3">📄 Submitted Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600"><FiUser className="text-green-600" /> <span className="font-medium">Name:</span> {quote.name}</div>
                        <div className="flex items-center gap-2 text-gray-600"><FiPhone className="text-green-600" /> <span className="font-medium">Phone:</span> {quote.phone}</div>
                        <div className="flex items-center gap-2 text-gray-600"><FiMail className="text-green-600" /> <span className="font-medium">Email:</span> {quote.email}</div>
                        <div className="flex items-center gap-2 text-gray-600"><FiMapPin className="text-green-600" /> <span className="font-medium">City:</span> {quote.city || quote.address || 'N/A'}</div>
                        <div className="flex items-center gap-2 text-gray-600">⚡ <span className="font-medium">System Size:</span> {quote.system_size} KW</div>
                        <div className="flex items-center gap-2 text-gray-600">🏠 <span className="font-medium">Type:</span> {quote.project_type}</div>
                        {quote.solar_system_type && <div className="flex items-center gap-2 text-gray-600">☀️ <span className="font-medium">Solar Type:</span> {quote.solar_system_type}</div>}
                        {quote.monthly_bill && <div className="flex items-center gap-2 text-gray-600">💰 <span className="font-medium">Monthly Bill:</span> Rs. {quote.monthly_bill}</div>}
                        {quote.message && <div className="col-span-full flex items-start gap-2 text-gray-600">💬 <span className="font-medium">Message:</span> {quote.message}</div>}
                      </div>

                      {/* Status trackgin message */}
                      {quote.status === 'approved' && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
                          <FiCheckCircle /> Your application has been <strong>approved</strong>! Our team will contact you soon.
                        </div>
                      )}
                      {quote.status === 'declined' && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                          <FiXCircle /> Your application has been <strong>declined</strong>. Please contact us for more details.
                        </div>
                      )}
                      {quote.status === 'contacted' && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm flex items-center gap-2">
                          <FiPhone /> You have been <strong>contacted</strong> by our team. Check your phone/email for details.
                        </div>
                      )}
                      {quote.status === 'pending' && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm flex items-center gap-2">
                          <FiClock /> Your application is <strong>under review</strong>. We will update you shortly.
                        </div>
                      )}

                      {/* Document Upload Section */}
                      <div className="mt-6 pt-4 border-t">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><FiUpload /> Upload Documents</h4>
                        <p className="text-xs text-gray-500 mb-3">Upload required documents for faster processing. Supported formats: PNG, JPG, PDF</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { key: 'cnicFront', label: 'CNIC Front', uploaded: quote.cnic_front_path },
                            { key: 'cnicBack', label: 'CNIC Back', uploaded: quote.cnic_back_path },
                            { key: 'landRegistry', label: 'Land Registry', uploaded: quote.land_registry_path },
                            { key: 'electricityBill', label: 'Electricity Bill', uploaded: quote.electricity_bill_path },
                          ].map(doc => (
                            <div key={doc.key} className={`p-3 rounded-lg border-2 border-dashed transition-colors ${doc.uploaded ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-green-400'}`}>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">
                                {doc.label} {doc.uploaded && <span className="text-green-600">✅ Uploaded</span>}
                              </label>
                              <input
                                type="file"
                                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                                ref={el => fileRefs.current[`${quote.id}_${doc.key}`] = el}
                                className="w-full text-xs file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                              />
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => handleDocUpload(quote.id)}
                          disabled={uploadingQuoteId === quote.id}
                          className={`mt-3 flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white text-sm transition-all ${uploadingQuoteId === quote.id ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                          <FiUpload /> {uploadingQuoteId === quote.id ? 'Uploading...' : 'Upload Documents'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {uploadMsg && (
            <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${uploadMsg.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {uploadMsg}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default UserDashboardPage
