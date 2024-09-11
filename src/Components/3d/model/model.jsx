import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { a } from "@react-spring/three";
import gsap from "gsap";

const Model = (props) => {
  const modelsRef = useRef();

  // Load the GLB model from the public folder with Draco compression support
  const { nodes, materials } = useGLTF('/scooter.glb', 'https://www.gstatic.com/draco/v1/decoders/');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const rotationAngle = scrollPos * 0.01; // Adjust the multiplier as needed
      gsap.to(modelsRef.current.rotation, {
        y: rotationAngle,
        duration: 0.5, // Adjust the duration as needed
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a.group position={[-Math.PI / 9, -2, 1]} ref={modelsRef} {...props}>
      <group rotation={[-Math.PI / 2, 0, 1]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={3}>
          <group scale={[1, 1, 1]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials.material_1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials.material_2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_7.geometry}
              material={materials.material_3}
            />
          </group>
        </group>
      </group>
    </a.group>
  );
};

export default Model;
