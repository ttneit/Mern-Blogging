import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import { AnimatePresence } from 'framer-motion';
import AnimatedPage from './pages/AnimatedPage.jsx';
function App() {
  
  return ( 
    <BrowserRouter>
    <AnimatePresence mode='wait'>
    <ScrollToTop />
      <Header />
      <Routes >
        <Route path='/' element={
          <AnimatedPage><Home /></AnimatedPage>} />
        <Route path='/about' element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path='#' element={<AnimatedPage><Project /></AnimatedPage>} />
        <Route path='/post/:postSlug' element={<AnimatedPage><PostPage /></AnimatedPage>} />
        <Route element={<PrivateRoute />} >
          <Route path='/dashboard' element={<AnimatedPage><Dashboard /></AnimatedPage>} />
        </Route>
        <Route element={<OnlyRouteForAdmin />} >
          <Route path='/create-post' element={<AnimatedPage><CreatePost /></AnimatedPage>} />
          <Route path='/update-post/:postId' element={<AnimatedPage><UpdatePost /></AnimatedPage>} />
        </Route>
        <Route path='/signin' element={<AnimatedPage><SignIn /></AnimatedPage>} />
        <Route path='/signup' element={<AnimatedPage><SignUp /></AnimatedPage>} />
        <Route path='/search' element={<AnimatedPage><Search /></AnimatedPage>} />
      </Routes>
      <Footer />
    </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
