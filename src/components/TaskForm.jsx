import { useState, useEffect } from 'react'
import { getUsers, addTask } from '../utils/storage'

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assigneeId, setAssigneeId] = useState('')
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Load users for the assignee dropdown
    const allUsers = getUsers()
    const regularUsers = allUsers.filter(user => user.role === 'user')
    setUsers(regularUsers)
    
    if (regularUsers.length > 0) {
      setAssigneeId(regularUsers[0].id)
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    
    if (!title.trim()) {
      setMessage('Please enter a task title')
      return
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      assigneeId: Number(assigneeId)
    }

    addTask(newTask)
    
    // Clear form
    setTitle('')
    setDescription('')
    
    // Show success message
    setMessage('Task created successfully!')
    
    // Notify parent component
    if (onTaskAdded) {
      onTaskAdded()
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Create New Task</h3>
      
      {message && (
        <div style={{
          ...styles.messageBox,
          ...(message.includes('successfully') 
            ? styles.successBox 
            : styles.errorBox)
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            style={styles.input}
            maxLength={100}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about the task..."
            style={styles.textarea}
            rows={4}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="assignee" style={styles.label}>
            Assign To
          </label>
          <select
            id="assignee"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            style={styles.select}
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.username})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Create Task
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px'
  },
  heading: {
    fontSize: '20px',
    color: '#1e293b',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid #f1f5f9'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569'
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s',
    outline: 'none'
  },
  textarea: {
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  select: {
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s',
    outline: 'none',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '10px'
  },
  messageBox: {
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  successBox: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '1px solid #a7f3d0'
  },
  errorBox: {
    backgroundColor: '#fee',
    color: '#c33',
    border: '1px solid #fcc'
  }
}

export default TaskForm