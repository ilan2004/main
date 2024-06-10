import React from 'react'
import Hero from '../Components/Hero/Hero';
import Services from '../Components/Services/Services';
import Warranty from '../Components/Warranty/Warranty';
import Contact from '../Components/Contact/Contact';
import Three from '../Components/3d/three';
import Wave from '../assets/img/wave.svg';
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Ripple from '../Components/Ripple/Ripple';
import NavbarV from '../Components/NavbarV2/NavbarV2';
const Home = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  return (
    <div>
    <NavbarV/>
       
        <Hero path="Home"/>

            <Three />
            <Services path="Services" />
            <Warranty/>
            <Contact path="Contact" />
    </div>
  )
}
export default Home;