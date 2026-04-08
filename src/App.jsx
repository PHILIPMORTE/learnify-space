import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Home from './pages/Home'
import Login from './pages/Login'
import './App.css'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '20vh' }}>Loading...</div>
  }
  if (!session) {
    return (
      <div className="app-container">
        <Routes>
          {/* Any URL they type will force them to the Login screen */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    )
  }
  return (
    <div className="app-container">
      <header className="navbar">
        <Link to="/">
          <div className="logo">Learnify Space</div>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/my-courses">My Courses</Link>
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="login-btn" 
            style={{backgroundColor: '#ef4444'}}
          >
            Log Out
          </button>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home session={session} />} />
          {/* If they type a weird URL while logged in, send them Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App