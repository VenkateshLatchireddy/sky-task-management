import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getTasks, updateTaskStatus } from '../utils/storage'

function UserDashboard() {
  const { currentUser } = useAuth()
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (currentUser) {
      loadTasks()
    }
  }, [currentUser])

  const loadTasks = () => {
    const allTasks = getTasks()
    const userTasks = allTasks.filter(task => task.assigneeId === currentUser.id)
    setTasks(userTasks)
  }

  const markComplete = (taskId) => {
    updateTaskStatus(taskId, 'Completed')
    loadTasks()
    setMessage('Task marked as completed!')
    setTimeout(() => setMessage(''), 3000)
  }

  if (!currentUser) {
    return null
  }

  if (tasks.length === 0) {
    return (
      <div style={styles.empty}>
        <h3>No Tasks Assigned</h3>
        <p>You don't have any tasks assigned yet.</p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Tasks</h2>
      <p style={styles.count}>{tasks.length} task{tasks.length !== 1 ? 's' : ''} assigned</p>
      
      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}
      
      <div style={styles.tasks}>
        {tasks.map(task => (
          <div key={task.id} style={styles.task}>
            <div style={styles.taskHeader}>
              <h3 style={styles.taskTitle}>{task.title}</h3>
              <button
                onClick={() => markComplete(task.id)}
                disabled={task.status === 'Completed'}
                style={{
                  ...styles.completeBtn,
                  ...(task.status === 'Completed' && styles.completedBtn)
                }}
              >
                {task.status === 'Completed' ? 'Completed ✓' : 'Mark Complete'}
              </button>
            </div>
            
            {task.description && (
              <p style={styles.description}>{task.description}</p>
            )}
            
            <div style={styles.taskFooter}>
              <span style={{
                ...styles.status,
                ...(task.status === 'Completed' ? styles.statusCompleted : styles.statusPending)
              }}>
                {task.status}
              </span>
              <span style={styles.date}>
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: 'white',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    margin: '0 0 8px 0',
    color: '#333'
  },
  count: {
    margin: '0 0 20px 0',
    color: '#666',
    fontSize: '14px'
  },
  message: {
    background: '#d1fae5',
    color: '#065f46',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '20px',
    border: '1px solid #a7f3d0'
  },
  tasks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  task: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '18px',
    transition: 'all 0.2s'
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '15px'
  },
  taskTitle: {
    margin: '0',
    fontSize: '17px',
    color: '#333',
    flex: 1
  },
  completeBtn: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  completedBtn: {
    background: '#94a3b8',
    cursor: 'default'
  },
  description: {
    margin: '0 0 15px 0',
    color: '#555',
    fontSize: '15px',
    lineHeight: '1.5'
  },
  taskFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid #f0f0f0',
    fontSize: '13px',
    color: '#777'
  },
  status: {
    padding: '3px 10px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '12px'
  },
  statusPending: {
    background: '#fef3c7',
    color: '#92400e'
  },
  statusCompleted: {
    background: '#d1fae5',
    color: '#065f46'
  },
  empty: {
    textAlign: 'center',
    padding: '40px 20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }
}

export default UserDashboard