import React from 'react'
import Car from './../../assets/img/Electric car.svg';
import { useInView } from "framer-motion";
import { useRef } from "react";
import './Hero.css';
import { motion } from 'framer-motion';
import Blob from './../../assets/img/blob.svg';

import UseMousePosition from '../Utilitis/useMousePosition';
 const Hero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const { mousePosition, cursorVariant, variants, textEnter, textLeave }= UseMousePosition();
  return (
    <div className='Hero' ref={ref}
    >
        <div className="Head" style={{
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 3s"
      }}>
            
            <h1  className='h11' > 
                HertzEv
                <span  className='solutions'> SOLUTIONS</span>
            </h1>
            <p className='p11' >
                Electric car solutions
            </p >
            <img onMouseEnter={textEnter} onMouseLeave={textLeave} src={Blob} className='blob' />
        </div>
       
    </div>
    
  )
}
export default Hero;
