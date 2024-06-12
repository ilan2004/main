import React, { useRef } from 'react';
import Object from './Object/Object';
import './three.css'
import Projects from './Projects/Project';
const Three = () => {
    
  return (

    <div className="three">
      <div className="three-box">
        <Object />
        <Projects />
    </div>
    </div>


  )
}

export default Three;
