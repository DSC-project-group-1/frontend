import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export function LandingPage() {
  const threeContainerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (threeContainerRef.current) {
      threeContainerRef.current.appendChild(renderer.domElement);
    }

    const buttonGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xff6347 });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    scene.add(button);

    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Click Me', {
        font: font,
        size: 0.3,
        height: 0.05,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-0.8, 0.1, 0.15);
      button.add(textMesh);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      button.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (threeContainerRef.current) {
        threeContainerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <div ref={threeContainerRef} style={{ width: '100%', height: '400px' }}></div>
      {/* Remaining UI code */}
    </div>
  );
}
