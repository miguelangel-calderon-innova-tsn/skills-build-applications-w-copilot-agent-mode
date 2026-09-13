import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', icon: '◈' },
  { to: '/activities', label: 'Activities', icon: '↗' },
  { to: '/workouts', label: 'Workouts', icon: '✦' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '♜' },
  { to: '/teams', label: 'Teams', icon: '◎' },
  { to: '/users', label: 'Athletes', icon: '○' },
]

function Overview() {
  return (
    <section className="overview-page">
      <div className="eyebrow">OCTOFIT / TRAINING CONTROL</div>
      <h1>Move with purpose.</h1>
      <p className="lead-copy">Your training week, brought into focus. Track momentum, find your next session, and keep your team moving together.</p>
      <div className="overview-grid">
        <NavLink className="feature-panel feature-panel--lime" to="/activities"><span className="panel-number">01</span><span className="panel-title">Log activity</span><span className="panel-arrow">↗</span></NavLink>
        <NavLink className="feature-panel feature-panel--coral" to="/workouts"><span className="panel-number">02</span><span className="panel-title">Find a workout</span><span className="panel-arrow">↗</span></NavLink>
        <NavLink className="feature-panel feature-panel--ink" to="/leaderboard"><span className="panel-number">03</span><span className="panel-title">See the leaderboard</span><span className="panel-arrow">↗</span></NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <NavLink className="brand-mark" to="/" aria-label="OctoFit overview"><span className="brand-symbol">O</span><span>octofit</span></NavLink>
        <div className="sidebar-label">Workspace</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} end={item.to === '/'} key={item.to} to={item.to}><span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" /> API connected<small>Training system / 2026</small></div>
      </aside>
      <main className="app-main">
        <header className="topbar"><span>Saturday, September 13</span><span className="topbar-status">Week 37 <strong>·</strong> On track</span></header>
        <Routes>
          <Route element={<Overview />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
