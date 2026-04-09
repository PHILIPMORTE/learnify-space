import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  async function handleAuth(e) {
    e.preventDefault()
    setErrorMsg('')
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setErrorMsg(error.message)
      else alert("Account created! You can now log in.")
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setErrorMsg(error.message)
      else {
        navigate('/')
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignUp ? 'Create an Account' : 'Welcome'}</h2>
        
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        
        <form className="auth-form" onSubmit={handleAuth}>
          <input 
            type="email" 
            className="auth-input"
            placeholder="Email address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            className="auth-input"
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="auth-submit">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        
        <p className="auth-toggle">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Log in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login