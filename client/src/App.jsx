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
import PrivateRoute from './components/PrivateRoute.jsx'
import OnlyRouteForAdmin from './components/OnlyRouteForAdmin.jsx';
import CreatePost from './pages/CreatePost.jsx';
function App() {
  

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/project' element={<Project />} />
        <Route element={<PrivateRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyRouteForAdmin />} >
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
