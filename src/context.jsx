import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

const geiInitialDarkMode = () => {
  const preferDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'
  return storedDarkMode || preferDarkMode
}

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(geiInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState('cat')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])
  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
