const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export async function fetchCollection(resourceOrUrl) {
  const endpoint = resourceOrUrl.startsWith('http')
    ? resourceOrUrl
    : `${apiBaseUrl}/${resourceOrUrl}/`
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${endpoint} (${response.status})`)
  return collectionFromResponse(await response.json())
}

export function formatDate(value) {
  return value ? new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—'
}