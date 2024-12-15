
// export function button() {
//     return (
//         <>
//         <div className='flex justify-content'>
//         <button className='w-16 h-16 flex items-center border-2 bg-slate-500 justify-center'>Click me!
//         {/* inverted triangle */}
//             <div className='w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-r-[12px] border-t-slate-200'></div>
//         </button>
//         </div>
//         </>
//     );
// };

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CircularButton = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Circle (Button)
    const circleGeometry = new THREE.CircleGeometry(1, 64); // Radius 1, 64 segments
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x0077ff });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    scene.add(circle);

    // Triangle (Inverted)
    const triangleShape = new THREE.Shape();
    triangleShape.moveTo(0, 0.5);
    triangleShape.lineTo(-0.5, -0.5);
    triangleShape.lineTo(0.5, -0.5);
    triangleShape.lineTo(0, 0.5); // Close the triangle

    const triangleGeometry = new THREE.ShapeGeometry(triangleShape);
    const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);

    triangle.rotation.z = Math.PI; // Invert the triangle
    triangle.scale.set(0.5, 0.5, 1); // Scale it to fit inside the circle
    scene.add(triangle);

    // Position Camera
    camera.position.z = 5;

    // Rotation Animation
    const animate = () => {
      requestAnimationFrame(animate);
      circle.rotation.z += 0.01;
      triangle.rotation.z += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Adjust on Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default CircularButton;
