import { useState } from 'react'
import { validateLogin } from '../utils/storage'

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password')
      return
    }
    
    setIsLoading(true)
    
    // Simulate network delay
    setTimeout(() => {
      const user = validateLogin(username, password)
      
      if (user) {
        onLogin(user)
      } else {
        setError('Invalid username or password')
      }
      
      setIsLoading(false)
    }, 300)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Task Manager</h1>
        <p style={styles.subtitle}>Sign in to continue</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={styles.input}
              disabled={isLoading}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={styles.input}
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          
          <div style={styles.credentials}>
            <p style={styles.credentialsTitle}>Demo Credentials:</p>
            <div style={styles.credentialsList}>
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>User 1:</strong> venky / venky123</p>
              <p><strong>User 2:</strong> sky / sky123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  card: {
    background: 'white',
    borderRadius: '10px',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  title: {
    margin: '0 0 8px 0',
    color: '#333',
    textAlign: 'center'
  },
  subtitle: {
    margin: '0 0 25px 0',
    color: '#666',
    textAlign: 'center',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  error: {
    background: '#fee',
    color: '#c33',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '14px',
    border: '1px solid #fcc'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555'
  },
  input: {
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '16px'
  },
  button: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  },
  credentials: {
    marginTop: '20px',
    padding: '15px',
    background: '#f8f8f8',
    borderRadius: '6px',
    border: '1px solid #eee'
  },
  credentialsTitle: {
    margin: '0 0 10px 0',
    fontWeight: '600',
    color: '#555',
    fontSize: '14px'
  },
  credentialsList: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.5'
  }
}

export default LoginForm