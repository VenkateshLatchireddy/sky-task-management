import { useDrop } from 'react-dnd'
import { reassignTask } from '../utils/storage'

function UserDropZone({ user, onTaskReassigned }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => {
      // Reassign task when dropped
      reassignTask(item.id, user.id)
      if (onTaskReassigned) {
        onTaskReassigned()
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }), [user.id])

  return (
    <div 
      ref={drop}
      style={{
        ...styles.container,
        ...(isOver && styles.isOver)
      }}
    >
      <div style={styles.avatar}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      
      <h4 style={styles.name}>{user.name}</h4>
      <p style={styles.username}>@{user.username}</p>
      
      <div style={styles.hint}>
        {isOver ? 'Drop here!' : 'Drag tasks here'}
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '2px dashed #cbd5e1',
    textAlign: 'center',
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  isOver: {
    borderColor: '#4f46e5',
    backgroundColor: '#eef2ff',
    transform: 'scale(1.02)'
  },
  avatar: {
    width: '48px',
    height: '48px',
    backgroundColor: '#4f46e5',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 auto 12px'
  },
  name: {
    fontSize: '16px',
    color: '#1e293b',
    margin: '0 0 4px 0'
  },
  username: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 12px 0'
  },
  hint: {
    fontSize: '12px',
    color: '#94a3b8',
    padding: '6px 12px',
    backgroundColor: '#f8fafc',
    borderRadius: '4px',
    border: '1px solid #e2e8f0'
  }
}

export default UserDropZone