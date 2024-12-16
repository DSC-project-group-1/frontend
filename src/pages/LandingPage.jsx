/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import { FaCog, FaUser, FaUsers } from 'react-icons/fa';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export function LandingPage() {
  const [isRecording, setIsRecording] = useState(false);
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
    };
  }, []);

  const handleStart = () => setIsRecording(true);
  const handleStop = () => setIsRecording(false);
  const handleSinglePlayerClick = () => alert('Single Player selected!');
  const handleMultiplayerClick = () => alert('Multiplayer selected!');

  return (
    <div>
      <div ref={threeContainerRef} style={{ width: '100%', height: '400px' }}></div>

      <div style={{ padding: '20px', background: '#eef2f3', marginTop: '20px' }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 style={{ color: '#333', textAlign: 'center' }}>
              Text :
              <input type="text" className="justify-content items-center" />
            </h2>
          </div>

          <div>
            <h3>Audio / Video</h3>
            <h2 style={{ color: '#333', textAlign: 'center' }}>
              Audio :
              <input type="file" accept="audio/*" className="justify-content items-center" />
            </h2>
            <h2 style={{ color: '#333', textAlign: 'center' }}>
              Video :
              <input type="file" accept="video/*" className="justify-content items-center" />
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <button
            onClick={handleStart}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              background: '#6ab04c',
              color: '#fff',
              borderRadius: '10px',
            }}
          >
            Record
          </button>
          <button
            onClick={handleStop}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              background: '#f0932b',
              color: '#fff',
              borderRadius: '10px',
            }}
          >
            Stop
          </button>
          <button
            onClick={() => alert('Submitted!')}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              background: '#6ab04c',
              color: '#fff',
              borderRadius: '10px',
            }}
          >
            Submit
          </button>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2em', color: '#777' }}>
            {isRecording ? 'Recording in progress...' : ''}
          </p>
        </div>

        <div className="relative w-full aspect-[16/9]">
          <iframe
            title="Xbox Controller"
            width="50%"
            height="50%"
            src="https://sketchfab.com/models/1658ffe50e154dd8b830412a6f845b37/embed"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex justify-center items-center space-x-12 mt-8">
          <div className="p-6 bg-gray-200 rounded-full shadow-md cursor-pointer hover:bg-gray-300">
            <FaCog size={40} color="#333" />
          </div>

          <div
            className="p-6 bg-blue-500 rounded-full shadow-md cursor-pointer hover:bg-blue-600 flex flex-col items-center"
            onClick={handleSinglePlayerClick}
          >
            <FaUser size={40} color="#fff" />
            <span className="mt-2 text-gray-700">Single Player</span>
          </div>

          <div
            className="p-6 bg-green-500 rounded-full shadow-md cursor-pointer hover:bg-green-600 flex flex-col items-center"
            onClick={handleMultiplayerClick}
          >
            <FaUsers size={40} color="#fff" />
            <span className="mt-2 text-gray-700">Multiplayer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
