import React, { useRef } from 'react';
import Object from './Object/Object';
import { useEffect } from 'react';
import './three.css'
import { useInView } from 'react-intersection-observer';
import { TweenMax, Power3 } from 'gsap';
import Projects from './Projects/Project';
const Three = () => {
    
  return (

    <div className="three">
        <Object />
        <Projects />
    </div>


  )
}

export default Three;
