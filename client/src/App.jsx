import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home.jsx' 
import About from './pages/About.jsx' 
import Project from './pages/Projects.jsx' 
import Dashboard from './pages/Dashboard.jsx' 
import SignIn from './pages/SignIn.jsx' 
import SignUp from './pages/SignUp.jsx' 
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/project' element={<Project />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
