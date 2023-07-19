// importing necessary packages and dependencies
import img from './assets/space.jpg';
import img2 from './assets/kristina.jpg';
import img3 from './assets/moonTexture.jpg';
import img4 from './assets/texture.jpg';
import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



// declaring and initializing variables 
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector( '#bg' ),
});


// setting pixel ratio equal toa device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);

// setting size of the renderer
renderer.setSize( window.innerWidth, window.innerHeight );

// setting camera position

camera.position.setZ(30);

// rendering the scene

renderer.render( scene, camera );


// creating a geometric object 

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );

// creating a material for the object

const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );

// creating a mesh of the object

const torus = new THREE.Mesh( geometry, material );


// adding the mesh to the scene

scene.add( torus );

// add light 

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

// adding the light to the scene
scene.add(pointLight);

// adding an ambient light to the scene

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// adding a helper to the scene

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper); 


// const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} ); 
  const star = new THREE.Mesh( geometry, material );


  // randomly generates an x, y, z positioning and value for each star. randFloatSpread is a helper function that randomly generates a number between negative and positive 100
   const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load(img);
scene.background = spaceTexture;

// setting up a recursive function that gives an infinite loop that calls render method automatically



// avatar

const kristinaTexture = new THREE.TextureLoader().load(img2);

const kristina = new THREE.Mesh( 
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: kristinaTexture } )
); 

// adds object to scene

scene.add(kristina);


// moon
const moonTexture = new THREE.TextureLoader().load(img3);

// give appearance of depth
const normalTexture = new THREE.TextureLoader().load(img4);





const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), 
  new THREE.MeshStandardMaterial( {
    map: moonTexture, 
    normalMap: normalTexture
  } )
  );


// adds object to scene
scene.add(moon);

// position moon further down z axis since it is direction will be scrolling
moon.position.z = 30;
moon.position.setX(-10);


function moveCamera(){
const t = document.body.getBoundingClientRect().top;

moon.rotation.x += 0.05;
moon.rotation.y += 0.075;
moon.rotation.z += 0.05;

kristina.rotation.y += 0.01;
kristina.rotation.z += 0.01;

camera.position.z = t * -0.01;
camera.position.x = t * -0.0002;
camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame( animate );

   // rotating the object

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // updating the controls

  controls.update();

  renderer.render( scene, camera );
}

// calling the animate function

animate();
