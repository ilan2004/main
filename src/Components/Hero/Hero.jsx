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
    <div id='Home' className='Hero' ref={ref}
    >
        <div className="Head" style={{
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.8s"
      }}>
            <div className="p1">
            <h1  className='h11' > 
            Dion power solutions
                <span  className='solutions'> Revolutionize your ride </span>
            </h1>
            <p className='p11' >
            One stop solution for all your lithium batteries 

            </p >
            <p className='next' >
                Battery Extended Warranty Services
            </p >
            </div>
            
            <img onMouseEnter={textEnter} onMouseLeave={textLeave} src={Blob} className='blob' />
        </div>
        <div className="p2">
              <p>Here at Dion Power Solutions, our mission revolves around enhancing the performance and sustainability of two-wheelers and three-wheelers through advanced lithium battery solutions. With a keen focus on these vehicles, we're dedicated to optimizing their power and range while minimizing environmental impact. Our comprehensive range of services includes tailored lithium battery manufacturing, ensuring that each battery meets the specific needs of two-wheelers and three-wheelers. Additionally, we offer extended warranties to guarantee the reliability and longevity of our batteries, providing peace of mind to riders and operators alike. Join us as we drive the evolution of electric mobility for two-wheelers and three-wheelers with Dion Power Solutions.</p>
            </div>
    </div>
    
  )
}
export default Hero;

