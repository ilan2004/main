import React from 'react'
import Car from './../../assets/img/Electric car.svg';
import { useInView } from "framer-motion";
import { useRef } from "react";
import './Hero.css';
import { motion } from 'framer-motion';
import Blob from './../../assets/img/blob.svg';
import { ChevronRight } from 'lucide-react';
import UseMousePosition from '../Utilitis/useMousePosition';
import Ripple from '../Ripple/Ripple';
import AnimatedGradientText from './Extras/Extra';

 const Hero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const { mousePosition, cursorVariant, variants, textEnter, textLeave }= UseMousePosition();
    const cn = (...classNames) => classNames.filter(Boolean).join(' ');

// Usage example
const Button = ({ primary, danger }) => {
  const classNames = cn("button", {
    "button-primary": primary,
    "button-danger": danger,
  });

  return <button className={classNames}>Click me</button>;
};
  return (
    
    <div id='Home' className='Hero' ref={ref}
    >
      <Ripple/>
        <div className="Head" style={{
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.8s"
      }}>
        
            <div className="p1">
            <span  className='solutions'> Revolutionize your ride </span>
            <h1  className='h11' > 
            Dion <spam className='powered'>power</spam> solutions
             
            </h1>
            <p className='p11' >
            One stop solution for all your lithium batteries 
            </p >
     <p class="etrad" >Extended warranty for Electric Vehicles Battery Provided </p>

            </div>
            
        </div>
       
            
    </div>
    
  )
}
export default Hero;

