import React, { useContext } from 'react';
import Navbar from './Navbar';
import '../Css/About.css';

function About() {
  
  return (
    <>
    <Navbar/>
    <div className="about-content">
      <div className="col-lg-4 col-sm-12  artist-img">
        <div className='a-img'>
          <img src='./img/pic1.jpg' alt=''></img>
        </div>
      </div>
      <div className="col-lg-8 col-md-12 col-sm-12 about-artist">
        <h3 id="about-quote">“The job of the artist is always to deepen the mystery . ” - Francis Bacon</h3>
        <h1 id ="about-me">About Me</h1>
        <p id="intro">Hello myself Anirban Ghosh.<br/>
        Currently I am pursuing B.Tech in Computer Science from MCKV Institute of Engineering , Liluah , Howrah. 
        I have learnt Drawing for around 12 years from MERAA SMRITI SISHU ANKAN SIKSHA KENDRA.
        Here are my latest certification exams.
        </p>
        <p id ="intro">
          You can go through my Works in this website. There are different categoriess , like 'Commissioned Works','For Sale' and 'Gifts'.
          One can Place Order for the drawings Under Category "For Sale". One can also Order for Commissioned Works. Currently I am working on Mediums like Water Colour,Graphite,Mixed Medium,and Dot Painting.


        </p>
      </div>
      
    </div>
    </>
    
  )
}

export default About
