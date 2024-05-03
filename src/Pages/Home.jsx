import React from 'react'
import Hero from '../Components/Hero/Hero';
import Services from '../Components/Services/Services';
import Warranty from '../Components/Warranty/Warranty';
import Contact from '../Components/Contact/Contact';
import Three from '../Components/3d/three';
import Wave from '../assets/img/wave.svg';
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
const Home = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  return (
    <div>
        {/* <img className='Wave' src={Wave} ref={ref} style={{ opacity: isInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }} /> */}
        <Hero path="Home" />
            <Three />
            <Services path="Services" />
            <Warranty/>
            <Contact path="Contact" />
    </div>
  )
}
export default Home;