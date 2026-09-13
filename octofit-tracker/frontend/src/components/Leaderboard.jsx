import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './CollectionPage.jsx'
import { ErrorState, LoadingState } from './collectionStates.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])

  return <CollectionPage eyebrow="Competitive edge" title="The climb is communal." intro="A little friendly pressure turns good intentions into habits.">
    {error ? <ErrorState message={error} /> : entries.length ? <div className="leaderboard-list">{entries.map((entry, index) => <article className={`leader-row rank-${index + 1}`} key={entry._id || entry.user?._id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div className="avatar">{entry.user?.displayName?.slice(0, 1) || '?'}</div><div className="leader-info"><strong>{entry.user?.displayName || 'Athlete'}</strong><span>{entry.weeklyStreak} week streak</span></div><strong className="points">{entry.points?.toLocaleString()} <small>pts</small></strong></article>)}</div> : <LoadingState />}
  </CollectionPage>
}

export default Leaderboard