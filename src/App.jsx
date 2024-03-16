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
import {
  useVelocity,
  useMotionValueEvent,
  useScroll,
  useSpring
} from "framer-motion";
import Footer from "./Components/Footer/Footer";
import Contact from "./Components/Contact/Contact";
import PreLoader from "./Components/PreLoader/Preloader";
import AnimatedCursor from "react-animated-cursor"
import Three from "./Components/3d/three";
import CustomCursor from "./Components/cursor/Cursor";
export default function App() {
  const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
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
        <PreLoader/>
      <img className='Wave' src={Wave}
      ref={ref}
      style={{
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }} />
        {/* <CustomCursor/> */}
      <Navbars/>
      <Hero
      />
    <Three/>
      <Services/>
      <Contact/>
     <Footer/>
    </div>
      </ReactLenis>
    </div>
  );
}
