import { createContext, useState, useContext, useEffect } from 'react'
import { getCurrentUser, saveCurrentUser, clearCurrentUser } from '../utils/storage'

// Create the context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user when the app loads
  useEffect(() => {
    const savedUser = getCurrentUser()
    if (savedUser) {
      setCurrentUser(savedUser)
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = (userData) => {
    setCurrentUser(userData)
    saveCurrentUser(userData)
  }

  // Logout function
  const logout = () => {
    setCurrentUser(null)
    clearCurrentUser()
  }

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === 'admin'
  }

  // Check if user is regular user
  const isUser = () => {
    return currentUser?.role === 'user'
  }

  // The value that will be available to all components
  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    login,
    logout,
    isAdmin,
    isUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}