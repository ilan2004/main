import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import models from '../../../assets/3d/green.glb'
import {a} from '@react-spring/three';
import gsap from "gsap";
const Model = (props) => {
    const modelsRef = useRef();
    const { nodes, materials } = useGLTF(models);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPos = window.scrollY;
        const rotationAngle = scrollPos * 0.01; // Adjust the multiplier as needed
        gsap.to(modelsRef.current.rotation, {
          y: rotationAngle,
          duration: 0.5 // Adjust the duration as needed
        });
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return (
      <a.group ref={modelsRef} {...props}>
        <group scale={0.013} position={[0, -1.3, 0]}>
          <group rotation={[-Math.PI / 2, 0.5, 4]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane_MatMain_0.geometry}
                  material={materials.MatMain}
                />
              </group>
              <group position={[128.33, 64.694, 165.169]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Circle002_MatWheel_0.geometry}
                  material={materials.MatWheel}
                />
              </group>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane007_MatSec_0.geometry}
                  material={materials.MatSec}
                />
              </group>
              <group position={[128.33, 64.694, -165.837]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Circle001_MatWheel_0.geometry}
                  material={materials.MatWheel}
                />
              </group>
              <group position={[-132.737, 64.694, 165.169]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Circle003_MatWheel_0.geometry}
                  material={materials.MatWheel}
                />
              </group>
              <group position={[-132.737, 64.694, -165.837]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Circle004_MatWheel_0.geometry}
                  material={materials.MatWheel}
                />
              </group>
            </group>
          </group>
        </group>
      </a.group>
    );
  };
  
  export default Model;