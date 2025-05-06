import React from 'react'
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <AppRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App
