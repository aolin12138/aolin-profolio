import { BrowserRouter } from "react-router-dom"

import React from "react"
import './index.css'

import {
  About, Contact, Experience, Feedbacks,
  Hero, Navbar, Tech, Works, StarsCanvas, NavigationControls
} from "./components"

const App = () => {
  return (
    <BrowserRouter className="pt-20">
      <div className='relative z-0 bg-primary'>
        <NavigationControls />
        <StarsCanvas />
        <div className="bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Contact />
      </div>
    </BrowserRouter>
  )
}

export default App
