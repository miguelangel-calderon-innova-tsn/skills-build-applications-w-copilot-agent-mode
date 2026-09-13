import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './CollectionPage.jsx'
import { ErrorState, LoadingState } from './collectionStates.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(usersEndpoint).then(setUsers).catch((reason) => setError(reason.message)) }, [])

  return <CollectionPage eyebrow="The roster" title="Athletes in motion." intro="See who is showing up, putting in the work, and making the group stronger.">
    {error ? <ErrorState message={error} /> : users.length ? <div className="roster-grid">{users.map((user) => <article className="roster-card" key={user._id || user.username}><div className="avatar avatar--large">{user.displayName?.slice(0, 1) || '?'}</div><div><h2>{user.displayName}</h2><p>@{user.username}</p><span className="team-tag">{user.team?.name || 'Independent'}</span></div></article>)}</div> : <LoadingState />}
  </CollectionPage>
}

export default Users