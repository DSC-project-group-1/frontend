/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
//import CircularButton from '../components/button.jsx';
import { FaCog, FaUser, FaUsers } from 'react-icons/fa';

export function LandingPage() {
  const [isRecording, setIsRecording] = useState(false);
  //const [submit, handleSubmit] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleStart = () => {
    setIsRecording(true);
  };

  const handleStop = () => {
    setIsRecording(false);
  };

  const handleSinglePlayerClick = () => {
    alert("Single Player selected!");
  };

  const handleMultiplayerClick = () => {
    alert("Multiplayer selected!");
  };

  return (
    <>
      <div>
        <div style={{ padding: '20px', background: '#eef2f3', marginTop: "20px" }}>
          <div className="grid grid-cols-2 gap-4">
            {/* Text Input */}
            <div>
              <h2 style={{ color: '#333', textAlign: 'center' }}>Text :  
                <label htmlFor="prompt"></label>
                <input type="text" className="justify-content items-center"></input>
              </h2>
            </div>

            <div>
              <h3>Audio / Video</h3>
              <h2 style={{ color: '#333', textAlign: 'center' }}>Audio :  
                <label htmlFor="prompt"></label>
                <input type="file" accept="audio/*" className="justify-content items-center"></input>
              </h2>
              <h2 style={{ color: '#333', textAlign: 'center' }}>Video :  
                <label htmlFor="prompt"></label>
                <input type="file" accept="video/*" className="justify-content items-center"></input>
              </h2>
            </div>      
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <button className="btn-1" onClick={handleStart} style={{ margin: '0 10px', padding: '10px 20px', background: '#6ab04c', color: '#fff', borderRadius: '10px' }}>
              Record
            </button>
            <button className="btn-2" onClick={handleStop} style={{ margin: '0 10px', padding: '10px 20px', background: '#f0932b', color: '#fff', borderRadius: '10px' }}>
              Stop
            </button>
            <button className="submit" onClick={() => handleSubmit()} style={{ margin: '0 10px', padding: '10px 20px', background: '#6ab04c', color: '#fff', borderRadius: '10px' }}>
              Submit
            </button>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2em', color: '#777' }}>
              {isRecording ? <p>Recording in progress...</p> : <p></p>}
            </p>
          </div>

          <div className="relative w-full aspect-[16/9]">
          {/* <div style={{ marginTop: '30px', textAlign: 'center', marginLeft: '20px'}}> */}
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
            {/* Settings Icon */}
            <div
              className="p-6 bg-gray-200 rounded-full shadow-md cursor-pointer hover:bg-gray-300"
            >
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
    </>
  );
}
