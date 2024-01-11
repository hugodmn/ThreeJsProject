import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15


// Fetch the canvas element created in index.html, replace 'canvas' with the id of your canvas
const canvas = document.getElementById('canvas');


const controls = new OrbitControls(camera, canvas);

const loader = new GLTFLoader()

loader.load('659d1fd3baa4b388c8eb6f59.glb', // .glb model

function (gltf) { // callback
 const model = gltf.scene
 scene.add(model)
})

// Create a WebGLRenderer and set its width and height
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // Antialiasing is used to smooth the edges of what is rendered
    antialias: true,
    // Activate the support of transparency
   // alpha: true
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );

window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});





const textureLoader = new THREE.TextureLoader();
// Adding a background
let textureEquirec = textureLoader.load( 'abandoned_bakery.jpg' );
textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
textureEquirec.colorSpace = THREE.SRGBColorSpace;

scene.background = textureEquirec;

const light = new THREE.DirectionalLight( 0xffffff, 10 );
light.position.set( 15, 0, 0 );
scene.add( light );



const icosahedron_geometry = new THREE.IcosahedronGeometry(2.5, 0)
const icosahedron_material = new THREE.MeshPhysicalMaterial( {
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
    color: 0xC4B454,
    envMap: textureEquirec,
    envMapIntensity: 1.0,
    ior: 1.25,
    iridescence: 0.8,
    metalness: 0.2,
    roughness: 0.9,
    thickness: 0.0,
    transmission: 0.0,
} );
const icosahedron = new THREE.Mesh(icosahedron_geometry, icosahedron_material)
scene.add(icosahedron)
icosahedron.position.set(0,25,0)



const torusknot_geometry = new THREE.TorusKnotGeometry(10, 3, 300, 8, 13, 4)
const torusknot_material = new THREE.MeshPhysicalMaterial( {
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
    color: 0x9370DB,
    envMap: textureEquirec,
    envMapIntensity: 1.0,
    ior: 1.25,
    iridescence: 0.8,
    metalness: 0.9,
    roughness: 0.9,
    thickness: 0.0,
    transmission: 0.0,
} );
const torusknot = new THREE.Mesh(torusknot_geometry, torusknot_material)
scene.add(torusknot)
torusknot.position.set(0,0,0)


const octahedron_geometry = new THREE.OctahedronGeometry(5,0)
const octahedron_material = new THREE.MeshPhysicalMaterial( {
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
    color: 0xC4B454,
    envMap: textureEquirec,
    envMapIntensity: 1.0,
    ior: 1.25,
    iridescence: 0.8,
    metalness: 0.9,
    roughness: 0.9,
    thickness: 5.0,
    transmission: 0.0,
} );
const octahedron = new THREE.Mesh(octahedron_geometry, octahedron_material)
scene.add(octahedron)
octahedron.position.set(0,25,0)

const sphere_geometry = new THREE.SphereGeometry( 5, 32, 32 ); 
const sphere_material = new THREE.MeshPhysicalMaterial( {
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
    color: 0x01ffff,
    envMap: textureEquirec,
    envMapIntensity: 1.0,
    ior: 1.25,
    iridescence: 0.8,
    metalness: 0.2,
    roughness: 0.9,
    thickness: 5.0,
    transmission: 1.0,
} );
const sphere = new THREE.Mesh(sphere_geometry, sphere_material);
scene.add(sphere);

sphere.position.set(0,0,15)

// const group = new THREE.Group();
// group.add(mesh1);
// group.add(mesh2);
// scene.add(group);




// Call animate for the first time
let angle_torus = 1
let octahedron_angle = 0.5
let sphere_pos = 7
let movement = 2
const animate = () => {
    // Call animate recursively
    requestAnimationFrame(animate);

    controls.update()
    // Render the scene
    renderer.render(scene, camera);

   
    torusknot.rotateZ(angle_torus)

    octahedron.rotateY(octahedron_angle)
    icosahedron.rotateX(octahedron_angle)
    icosahedron.rotateY(octahedron_angle)
    icosahedron.rotateZ(octahedron_angle)
    if ((sphere_pos > 35)||(sphere_pos < -30)){movement = -movement}
    sphere_pos = sphere_pos + movement
    sphere.position.set(0,0,sphere_pos)
    icosahedron.position.set(0,0,sphere_pos)
    
}

animate();


