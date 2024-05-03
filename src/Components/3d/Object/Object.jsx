import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react';
import './Object.css'
import Loader from '../Loader/Loader.jsx'
import Model from '../model/model'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useScroll } from 'react-use-gesture';


const Object = () =>{
    const cameraRef = useRef();
    const scene = useRef(null);

    const handleMouseMove = (e) => {
      // const windowHalfX = window.innerWidth / 2;
      // const windowHalfY = window.innerHeight / 2;
  
      // const mouseX = (e.clientX - windowHalfX);
      // const mouseY = (e.clientY - windowHalfY);
  
      const mouseX = (e.clientX / window.innerWidth) *7 - 10;
      const mouseY = -(e.clientY / window.innerHeight) *7  + 10;
  
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseX - cameraRef.current.position.x) * 0.2;
        cameraRef.current.position.y += (mouseY - cameraRef.current.position.y) * 0.2;
        cameraRef.current.lookAt(0, 0, 0);
  
        console.log('Mouse Position:', { mouseX, mouseY });
        console.log('Camera Position:', {
          x: cameraRef.current.position.x,
          y: cameraRef.current.position.y,
          z: cameraRef.current.position.z,
        });
      }
    };
    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
    
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);


    // Speaker
    

return (
 
    <Canvas style={{ width: '800px', height: '800px' }} className='draww' camera={{ position: [1, 2, 8], near: 0.1, far: 5000 }}
    onPointerMove={handleMouseMove}
    onCreated={({ gl }) => {
  
    }}>
    <Suspense fallback={<Loader/>}>
      <directionalLight position={[5, 1, 10]} intensity={2} color="#BADFE7" />
      <ambientLight intensity={1} color="#3BD3E2" />
      <spotLight intensity={26} color="#3BD3E2" position={[5, 1, 10]} angle={Math.PI / 4} penumbra={0.05} />
      <hemisphereLight skycolor="#b1e1ff" intensity={0.5} groundColor="#ff8c00" />
      {/* <PerspectiveCamera ref={cameraRef} makeDefault /> */}
      <pointLight intensity={700} color="#3BD3E2" position={[-5, 1, -10]} distance={20} />
  

        <Model/>

    </Suspense>
  </Canvas>
  
)
}
export default Object ;