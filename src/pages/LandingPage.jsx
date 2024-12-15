/* eslint-disable no-undef */
import {useState, useRef, useEffect} from 'react';
export function LandingPage() {
   
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
        script.async = true;
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        };
      }, []);
      
    const [isRecording, setIsRecording] = useState(false);

    const handleStart = () => {
        setIsRecording(true);
    }

    const handleStop = () => {
        setIsRecording(false);
    }

    return (
        <div>
            <h1 className="text-3xl text-red-400">
                Landing Page!
            </h1>
            <div style={{ padding: '20px', background: '#eef2f3' }}>

      <h2 style={{ color: '#333', textAlign: 'center' }}>Your Prompt: 
      <label htmlFor="prompt"></label>
      <input type="text" placeholder="Enter text" className="justify-content items-center"></input>
      </h2>

      <h2 style={{ color: '#333', textAlign: 'center' }}>Audio :  
      <label htmlFor="prompt"></label>
      <input type="file" accept="audio/*" className="justify-content items-center"></input>
      </h2>
      
      <h2 style={{ color: '#333', textAlign: 'center' }}>Video :  
      <label htmlFor="prompt"></label>
      <input type="file" accept="video/*" className="justify-content items-center"></input>
      </h2>

  <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button className="btn-1" onClick={()=> handleStart()} style={{ margin: '0 10px', padding: '10px 20px', background: '#6ab04c', color: '#fff', borderRadius: '10px' }}>
          Record
        </button>
        <button className="btn-2" onClick={() => handleStop()} style={{ margin: '0 10px', padding: '10px 20px', background: '#f0932b', color: '#fff', borderRadius: '10px' }}>
          Stop
        </button>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {/* <p style={{ fontSize: '1.2em', color: '#777' }}>{message && <p>Recording in progress...</p>}</p> */}
        <p style={{ fontSize: '1.2em', color: '#777' }}>{isRecording? <p>Recording in progress...</p> : <p> </p>}</p>

        <iframe
          title="Xbox Controller"
          width="50%"
          height="50%"
          src="https://sketchfab.com/models/1658ffe50e154dd8b830412a6f845b37/embed"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
        ></iframe>

        <div className="wave-animation"></div> 
      </div>
    </div>
        </div>
    );
};
