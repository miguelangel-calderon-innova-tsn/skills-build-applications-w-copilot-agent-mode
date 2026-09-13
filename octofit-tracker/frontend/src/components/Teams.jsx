import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './CollectionPage.jsx'
import { ErrorState, LoadingState } from './collectionStates.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])

  return <CollectionPage eyebrow="Train together" title="Find your people." intro="Teams turn a solo workout into a shared ritual. Meet the crews making momentum visible.">
    {error ? <ErrorState message={error} /> : teams.length ? <div className="card-grid">{teams.map((team) => <article className="team-card" key={team._id || team.name}><div className="team-stripe" style={{ backgroundColor: team.color || '#d8ff3e' }} /><span className="card-kicker">TEAM / {team.name}</span><h2>{team.name}</h2><p>{team.description}</p><footer>Captain <strong>{team.captain?.displayName || 'Open invite'}</strong></footer></article>)}</div> : <LoadingState />}
  </CollectionPage>
}

export default Teams