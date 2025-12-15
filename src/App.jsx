import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'

// Main app content that uses the auth context
function AppContent() {
  const { currentUser, isLoading, login } = useAuth()

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <p style={{ color: '#64748b' }}>Loading application...</p>
      </div>
    )
  }

  if (!currentUser) {
    return <LoginForm onLogin={login} />
  }

  return (
    <div style={styles.app}>
      <Header />
      <main style={styles.main}>
        <div style={styles.container}>
          {currentUser.role === 'admin' ? (
            <AdminDashboard />
          ) : (
            <UserDashboard />
          )}
        </div>
      </main>
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>
            Task Management System &copy; {new Date().getFullYear()}
          </p>
          <p style={styles.footerNote}>
            Data stored locally in your browser
          </p>
        </div>
      </footer>
    </div>
  )
}

// Main App component that wraps everything with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    padding: '20px 0',
    backgroundColor: '#f8fafc'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  footer: {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '16px 0',
    marginTop: 'auto'
  },
  footerText: {
    textAlign: 'center',
    marginBottom: '4px',
    fontSize: '14px'
  },
  footerNote: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#94a3b8'
  }
}

export default App