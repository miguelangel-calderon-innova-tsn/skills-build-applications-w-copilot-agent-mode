import { useEffect, useState } from 'react'
import { fetchCollection, formatDate } from '../api.js'
import { CollectionPage } from './CollectionPage.jsx'
import { ErrorState, LoadingState } from './collectionStates.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message))
  }, [])

  return <CollectionPage eyebrow="Activity log" title="Keep the streak alive." intro="Every session counts. Review the work that is building your next level.">
    {error ? <ErrorState message={error} /> : activities.length ? <div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id || `${activity.type}-${activity.completedAt}`}><div className="activity-badge">{activity.type?.slice(0, 2).toUpperCase()}</div><div className="activity-info"><strong>{activity.type}</strong><span>{activity.user?.displayName || 'OctoFit athlete'}</span></div><span>{activity.durationMinutes} min</span><span>{activity.calories} kcal</span><time>{formatDate(activity.completedAt)}</time></article>)}</div> : <LoadingState />}
  </CollectionPage>
}

export default Activities