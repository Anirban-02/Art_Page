import React, { useState } from 'react';
import Homeswipe from './Homeswipe';
import Navbar from './Navbar';
import About from './About'
import '../Css/Home.css';
function Home() {
  return (
    <>
      <Navbar/>
      <div className="home">
        <div id="hello">Welcome to My Page</div>
        <div className="sliderdiv">
          <div className="slider" >
            <h1>Hillo Home</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
