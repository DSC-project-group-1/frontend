/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import { useNavigate } from 'react-router-dom';
// import * as THREE from 'three';
// import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';
// import { XRButton } from 'three/addons/webxr/XRButton.js';
// import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
// import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { LandingPage } from './pages/LandingPage.jsx'; 

// export default function HomePage() {
//   const navigate = useNavigate(); 
//   let camera, scene, renderer;
//   let controller1, controller2;
//   let controllerGrip1, controllerGrip2;

//   let room, spheres, physics;
//   const velocity = new THREE.Vector3();

//   let count = 0;

//   init();
//   await initPhysics();

//   function init() {
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x505050);

//     camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 50);
//     camera.position.set(0, 1.6, 3);

//     room = new THREE.LineSegments(
//       new BoxLineGeometry(6, 6, 6, 10, 10, 10),
//       new THREE.LineBasicMaterial({ color: 0x808080 })
//     );
//     room.geometry.translate(0, 3, 0);
//     scene.add(room);

//     scene.add(new THREE.HemisphereLight(0xbbbbbb, 0x888888, 3));

//     const light = new THREE.DirectionalLight(0xffffff, 3);
//     light.position.set(1, 1, 1).normalize();
//     scene.add(light);

//     // Renderer setup
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setAnimationLoop(animate);
//     renderer.xr.enabled = true;
//     document.body.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.maxDistance = 10;
//     controls.target.y = 1.6;
//     controls.update();

//     document.body.appendChild(XRButton.createButton(renderer, {
//       'optionalFeatures': ['depth-sensing'],
//       'depthSensing': { 'usagePreference': ['gpu-optimized'], 'dataFormatPreference': [] }
//     }));

//     // Controllers and event handling

//     window.addEventListener('resize', onWindowResize);
//   }

//   function buildController(data) {
//     let geometry, material;

//     switch (data.targetRayMode) {
//       case 'tracked-pointer':
//         geometry = new THREE.BufferGeometry();
//         geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3));
//         geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3));

//         material = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending });

//         return new THREE.Line(geometry, material);

//       case 'gaze':
//         geometry = new THREE.RingGeometry(0.02, 0.04, 32).translate(0, 0, -1);
//         material = new THREE.MeshBasicMaterial({ opacity: 0.5, transparent: true });
//         return new THREE.Mesh(geometry, material);
//     }
//   }

//   function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }

//   async function initPhysics() {
//     physics = await RapierPhysics();

//     // Floor and Walls
//     const geometry = new THREE.BoxGeometry(6, 2, 6);
//     const material = new THREE.MeshNormalMaterial({ visible: false });

//     const floor = new THREE.Mesh(geometry, material);
//     floor.position.y = -1;
//     floor.userData.physics = { mass: 0 };
//     scene.add(floor);

//     // Add more physics setup for walls, spheres, etc...
//     // Refer to your physics setup code for objects like walls, spheres, etc.
//   }

//   function handleController(controller) {
//     if (controller.userData.isSelecting) {
//       // Handle physics and controller interaction
//     }
//   }

//   function animate() {
//     handleController(controller1);
//     handleController(controller2);

//     renderer.render(scene, camera);
//   }

//   const goToLandingPage = () => {
//     navigate('/landing'); 
//   };

//   return (
//     <div>
//       <button onClick={goToLandingPage} className="go-to-landing-button">
//         Go to Landing Page
//       </button>
//     </div>
//   );
// }



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