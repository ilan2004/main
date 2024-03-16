import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cursor.css'
const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (event) => {
      gsap.to(cursor, {
        duration: 0.2,
        left: event.clientX,
        top: event.clientY,
        ease: 'power2.out' // Add easing effect if desired
      });
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor"></div>;
};

export default CustomCursor;
