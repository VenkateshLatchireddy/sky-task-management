// Save data to localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

// Get data from localStorage
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error getting from localStorage:', error)
    return null
  }
}

// Initialize default users
const initDefaultUsers = () => {
  const defaultUsers = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
    { id: 2, username: 'venky', password: 'venky123', role: 'user', name: 'venkatesh' },
    { id: 3, username: 'sky', password: 'sky123', role: 'user', name: 'sumitra' }
  ]
  saveToStorage('users', defaultUsers)
  return defaultUsers
}

// Get all users
export const getUsers = () => {
  let users = getFromStorage('users')
  if (!users || users.length === 0) {
    users = initDefaultUsers()
  }
  return users
}

// Save users
export const saveUsers = (users) => {
  return saveToStorage('users', users)
}

// Get all tasks
export const getTasks = () => {
  const tasks = getFromStorage('tasks')
  return tasks || []
}

// Save tasks
export const saveTasks = (tasks) => {
  return saveToStorage('tasks', tasks)
}

// Validate login
export const validateLogin = (username, password) => {
  const users = getUsers()
  const user = users.find(u => u.username === username && u.password === password)
  return user || null
}

// Get current user
export const getCurrentUser = () => {
  return getFromStorage('currentUser')
}

// Save current user
export const saveCurrentUser = (user) => {
  return saveToStorage('currentUser', user)
}

// Clear current user
export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser')
}

// Add new task
export const addTask = (task) => {
  const tasks = getTasks()
  const newTask = {
    ...task,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: 'Pending'
  }
  const updatedTasks = [...tasks, newTask]
  saveTasks(updatedTasks)
  return newTask
}

// Update task status
export const updateTaskStatus = (taskId, status) => {
  const tasks = getTasks()
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, status } : task
  )
  saveTasks(updatedTasks)
  return updatedTasks
}

// Reassign task
export const reassignTask = (taskId, newUserId) => {
  const tasks = getTasks()
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, assigneeId: newUserId } : task
  )
  saveTasks(updatedTasks)
  return updatedTasks
}