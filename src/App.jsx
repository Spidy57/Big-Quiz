import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Quizzes from "./pages/Quizzes";
import AboutUs from "./pages/AboutUs";

import Navbar from './components/Navbar'

import './App.css'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path = "/" element = {<Home />}/>
      <Route path = "/quiz" element = {<Quizzes />}/>
      <Route path = "/about" element = {<AboutUs />}/>
    </Routes>
    </>
  )
}

export default App
