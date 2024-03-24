import "./App.css";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import useScrollSnap from "react-use-scroll-snap";
import Navbars from './Components/Navbar/Navbar';
import Wave from '../src/assets/img/wave.svg';
import { motion } from 'framer-motion';
import Hero from './Components/Hero/Hero';
import { useInView } from "framer-motion";
import Services from './Components/Services/Services';
import transition from "./Components/Transition/Transition";
import Footer from "./Components/Footer/Footer";
import Contact from "./Components/Contact/Contact";
import PreLoader from "./Components/PreLoader/Preloader";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Warranty from "./Components/Warranty/Warranty";

import Three from "./Components/3d/three";


export default function App() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  

  const lenis = useLenis(({ scroll }) => {});

  return (
    <Router>
      <div className="App">
        <ReactLenis root>
          <div className="app">
            <img className='Wave' src={Wave} ref={ref} style={{ opacity: isInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }} />
            <Navbars />
            <Hero path="#Home" />
            <Three />
            <Services path="#Services" />
            <Warranty/>
            <Contact path="#Contact" />
            <Footer />
          </div>
        </ReactLenis>
      </div>
    </Router>
  );
}

