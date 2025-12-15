import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { currentUser, logout } = useAuth()
  
  if (!currentUser) {
    return null
  }

  return (
    <header style={styles.header}>
      <div style={styles.content}>
        <div>
          <h1 style={styles.logo}>Task Management</h1>
          <div style={styles.userInfo}>
            <span style={styles.role}>
              {currentUser.role === 'admin' ? 'Administrator' : 'User'}
            </span>
            <span style={styles.name}>
              {currentUser.name}
            </span>
          </div>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </header>
  )
}

const styles = {
  header: {
    background: '#4f46e5',
    color: 'white',
    padding: '12px 0',
    boxShadow: '0 2px 10px rgba(79, 70, 229, 0.3)'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    margin: '0',
    fontSize: '20px',
    fontWeight: '600'
  },
  userInfo: {
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13px'
  },
  role: {
    background: 'rgba(255,255,255,0.2)',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600'
  },
  name: {
    opacity: '0.9'
  },
  logoutBtn: {
    background: 'transparent',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '6px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer'
  }
}

export default Header