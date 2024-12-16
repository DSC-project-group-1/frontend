
export function LeaderboardPage() {
    return (
        <div>
            <h1>Leaderboard Page</h1>
        </div>
    );
};




//three.js animation

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


// <!-- <style>
// 			.landingPage-btn{
// 				background-color: #FF5733; 
//                 color: white; 
//                 font-size: 18px;
//                 padding: 15px 30px; 
//                 border: none;
//                 border-radius: 15px; 
//                 text-align: center;
//                 text-transform: uppercase;
//                 font-weight: bold;
//                 box-shadow: 0 6px #999, 0 3px 5px rgba(0, 0, 0, 0.2);
//                 transition: all 0.3s ease; 
//                 cursor: pointer;
// 			}
//             .landingPage-btn:hover {
//                 background-color: #e44d26; /* Slightly darker red on hover */
//                 box-shadow: 0 12px 15px rgba(0, 0, 0, 0.2); /* More intense shadow on hover */
//                 transform: translateY(-5px); /* Lift the button when hovered */
//             }
//             .landingPage-btn:active {
//              box-shadow: 0 3px #666;
//              transform: translateY(2px); /* Slightly push the button down on click */
//             }
// 		</style> -->