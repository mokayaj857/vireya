"use client"

import { useState } from 'react'
import { analyticsSummary, createSupportTicket, welcome } from '@/lib/api'

export default function TestApiPage() {
  const [ans, setAns] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getSummary = async () => {
    setLoading(true)
    try {
      const data = await analyticsSummary()
      setAns({ ok: true, data })
    } catch (err) {
      setAns({ ok: false, err: String(err) })
    } finally { setLoading(false) }
  }

  const postTicket = async () => {
    setLoading(true)
    try {
      const res = await createSupportTicket({ subject: 'Test', message: 'Hello from test page' })
      setAns({ ok: true, res })
    } catch (err) {
      setAns({ ok: false, err: String(err) })
    } finally { setLoading(false) }
  }

  const getWelcome = async () => {
    setLoading(true)
    try {
      const data = await welcome()
      setAns({ ok: true, data })
    } catch (err) {
      setAns({ ok: false, err: String(err) })
    } finally { setLoading(false) }
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">API Test</h2>
      <div className="flex gap-3 mb-4">
        <button onClick={getSummary} className="px-4 py-2 bg-blue-600 text-white rounded">Get Summary</button>
        <button onClick={postTicket} className="px-4 py-2 bg-green-600 text-white rounded">Post Ticket</button>
        <button onClick={getWelcome} className="px-4 py-2 bg-purple-600 text-white rounded">Get Welcome</button>
      </div>
      {loading && <div>Loading...</div>}
      {ans && <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded">{JSON.stringify(ans, null, 2)}</pre>}
    </div>
  )
}
