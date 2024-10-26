import React from 'react'
import Chatbot from './components/Chatbot'
import { ThemeContext, theme }  from './components/ThemeContext'
import './App.css'


function App() {
  return (
    <div className='app'>
      <ThemeContext.Provider value={theme}>
        <Chatbot />
      </ThemeContext.Provider>
    </div>
  )
}

export default App
