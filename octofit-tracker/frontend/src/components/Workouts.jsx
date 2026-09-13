import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './CollectionPage.jsx'
import { ErrorState, LoadingState } from './collectionStates.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(workoutsEndpoint).then(setWorkouts).catch((reason) => setError(reason.message)) }, [])

  return <CollectionPage eyebrow="Your next session" title="Choose your effort." intro="Purposeful sessions for wherever your energy is today.">
    {error ? <ErrorState message={error} /> : workouts.length ? <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.title}><div className="workout-top"><span className="card-kicker">{workout.category}</span><span className="difficulty">{workout.difficulty}</span></div><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.durationMinutes} min</span><span>Coach {workout.coach}</span></footer></article>)}</div> : <LoadingState />}
  </CollectionPage>
}

export default Workouts