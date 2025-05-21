import Navbar from './Components/NavBar/Navbar'
import React from 'react'
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}

export default App