import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getTasks, getUsers } from '../utils/storage'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'
import UserDropZone from './UserDropZone'

function AdminDashboard() {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    loadData()
  }, [refreshKey])

  function loadData() {
    const allTasks = getTasks()
    const allUsers = getUsers()
    
    setTasks(allTasks)
    // Filter only regular users (not admin)
    const regularUsers = allUsers.filter(user => user.role === 'user')
    setUsers(regularUsers)
  }

  function handleTaskAdded() {
    setRefreshKey(prev => prev + 1)
  }

  function handleTaskReassigned() {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Admin Dashboard</h2>
          <p style={styles.subtitle}>
            Manage tasks and assign them to users
          </p>
        </div>

        <div style={styles.grid}>
          {/* Left Column: Task Creation */}
          <div style={styles.column}>
            <TaskForm onTaskAdded={handleTaskAdded} />
            
            <div style={styles.statsCard}>
              <h3 style={styles.statsTitle}>Dashboard Stats</h3>
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>{tasks.length}</span>
                  <span style={styles.statLabel}>Total Tasks</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>
                    {tasks.filter(t => t.status === 'Completed').length}
                  </span>
                  <span style={styles.statLabel}>Completed</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>{users.length}</span>
                  <span style={styles.statLabel}>Users</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Task Management */}
          <div style={styles.column}>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                All Tasks ({tasks.length})
                <span style={styles.sectionHint}>
                  Drag tasks to reassign
                </span>
              </h3>
              
              {tasks.length === 0 ? (
                <div style={styles.emptySection}>
                  <p style={styles.emptyText}>No tasks created yet.</p>
                  <p style={styles.emptySubtext}>Create your first task using the form on the left.</p>
                </div>
              ) : (
                <div style={styles.tasksList}>
                  {tasks.map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      users={users}
                    />
                  ))}
                </div>
              )}
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                Drag Tasks to Users
              </h3>
              
              <div style={styles.usersGrid}>
                {users.map(user => (
                  <UserDropZone 
                    key={user.id} 
                    user={user}
                    onTaskReassigned={handleTaskReassigned}
                  />
                ))}
              </div>
              
              <div style={styles.instructionBox}>
                <p style={styles.instructionText}>
                  <strong>How to reassign tasks:</strong>
                </p>
                <ol style={styles.instructionList}>
                  <li>Drag a task from the list above</li>
                  <li>Drop it on a user card below</li>
                  <li>The task will be automatically reassigned</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

const styles = {
  container: {
    flex: 1,
    padding: '24px 0'
  },
  header: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    color: '#1e293b',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '16px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  statsTitle: {
    fontSize: '18px',
    color: '#1e293b',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid #f1f5f9'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#4f46e5',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#1e293b',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionHint: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: 'normal',
    backgroundColor: '#f1f5f9',
    padding: '4px 12px',
    borderRadius: '20px'
  },
  tasksList: {
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '8px'
  },
  emptySection: {
    textAlign: 'center',
    padding: '40px 20px'
  },
  emptyText: {
    fontSize: '16px',
    color: '#64748b',
    marginBottom: '8px'
  },
  emptySubtext: {
    fontSize: '14px',
    color: '#94a3b8'
  },
  usersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '20px'
  },
  instructionBox: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '20px'
  },
  instructionText: {
    color: '#0369a1',
    fontSize: '14px',
    marginBottom: '8px'
  },
  instructionList: {
    color: '#0369a1',
    fontSize: '14px',
    paddingLeft: '20px',
    margin: 0
  }
}

export default AdminDashboard