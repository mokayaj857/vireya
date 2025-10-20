export const API_BASE = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE : ''

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: 'same-origin', ...opts })
  const text = await res.text()
  try {
    const json = text ? JSON.parse(text) : null
    if (!res.ok) throw new Error(JSON.stringify({ status: res.status, body: json }))
    return json
  } catch (e) {
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`)
    return text
  }
}

export function apiGet(path: string) {
  return request(path, { method: 'GET' })
}

export function apiPost(path: string, body: any) {
  return request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
}

export function analyticsSummary() { return apiGet('/api/analytics/summary/') }
export function contentList() { return apiGet('/api/content/') }
export function createSupportTicket(data: any) { return apiPost('/api/support/', data) }
export function welcome() { return apiGet('/api/welcome/') }

export async function drugRecognizeUpload(file: File, extra?: Record<string, string>) {
  const formData = new FormData()
  formData.append('file', file)
  if (extra) {
    for (const [k, v] of Object.entries(extra)) formData.append(k, v)
  }
  return request('/api/drug/recognize/', { method: 'POST', body: formData })
}
