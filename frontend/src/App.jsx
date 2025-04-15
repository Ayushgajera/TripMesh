import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/forgotPassword'
import ResetPassword from './pages/resetPassword'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
        <Route path="*" element={"no page found"} />
      </Routes>
    </div>
  )
}

export default App
