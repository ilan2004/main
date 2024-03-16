import "./App.css";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import useScrollSnap from "react-use-scroll-snap";
import { useState } from 'react'
import Navbars from './Components/Navbar/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Wave from '../src/assets/img/wave.svg';
import UseMousePosition from './Components/Utilitis/useMousePosition';
import { motion } from 'framer-motion';
import Hero from './Components/Hero/Hero';
import { useInView } from "framer-motion";
import Services from './Components/Services/Services';

import {
  useVelocity,
  useMotionValueEvent,
  useScroll,
  useSpring
} from "framer-motion";

const App = () => {
  const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const { mousePosition, cursorVariant, variants}= UseMousePosition();
  const wrapper = useRef();
  const content = useRef();

  // const { scrollY } = useScroll();
  // const scrollVelocity = useVelocity(scrollY);
  // const smoothVelocity = useSpring(scrollVelocity, {
  //   damping: 50,
  //   stiffness: 400
  // });

  // useMotionValueEvent(smoothVelocity, "change", (latest) => {
  //   console.log("Page scroll: ", latest);
  // });

  const lenis = useLenis(({ scroll }) => {});

  return (
    <div className="App" ref={wrapper}>
      <ReactLenis root>
      <div className="app">
      <img className='Wave' src={Wave}
      ref={ref}
      style={{
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }} />
      <Navbars/>
      <Hero
      />
      {/* <Services/> */}
      <motion.div
         className='cursor'
          variants={variants} 
          animate={cursorVariant}/>
    </div>
      </ReactLenis>
    </div>
  );
}
export default App