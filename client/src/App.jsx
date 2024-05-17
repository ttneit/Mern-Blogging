import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import UpdatePost from './pages/UpdatePost.jsx';
import PostPage from './pages/PostPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Search from './pages/Search.jsx';
function App() {
  

  return ( 
    <BrowserRouter>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='#' element={<Project />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route element={<PrivateRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyRouteForAdmin />} >
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
