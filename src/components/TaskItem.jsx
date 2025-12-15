import { useDrag } from 'react-dnd'

function TaskItem({ task, users }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }), [task.id])

  // Find assigned user
  const assignedUser = users.find(user => user.id === task.assigneeId)
  const userName = assignedUser ? assignedUser.name : 'Unassigned'

  return (
    <div 
      ref={drag}
      style={{
        ...styles.container,
        ...(isDragging && styles.dragging),
        ...(task.status === 'Completed' && styles.completed)
      }}
    >
      <div style={styles.header}>
        <h4 style={styles.title}>{task.title}</h4>
        <span style={{
          ...styles.status,
          ...(task.status === 'Completed' ? styles.statusCompleted : styles.statusPending)
        }}>
          {task.status}
        </span>
      </div>
      
      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}
      
      <div style={styles.footer}>
        <span style={styles.assignee}>
          Assigned to: {userName}
        </span>
        <span style={styles.date}>
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    border: '2px solid transparent',
    cursor: 'move',
    transition: 'all 0.2s',
    marginBottom: '12px'
  },
  dragging: {
    opacity: 0.5,
    transform: 'scale(0.98)'
  },
  completed: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0,
    flex: 1
  },
  status: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  statusPending: {
    backgroundColor: '#fef3c7',
    color: '#92400e'
  },
  statusCompleted: {
    backgroundColor: '#d1fae5',
    color: '#065f46'
  },
  description: {
    color: '#64748b',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '12px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid #f1f5f9',
    fontSize: '12px',
    color: '#94a3b8'
  },
  assignee: {
    fontWeight: '500'
  }
}

export default TaskItem