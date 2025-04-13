import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="*" element={"no page found"} />
      </Routes>
    </div>
  )
}

export default App
