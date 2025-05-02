import React from 'react'
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <AppRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App
