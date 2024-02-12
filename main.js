// Importer Three.js et les modules nécessaires
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Création de la scène, de la caméra et du rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, (window.innerWidth * 0.75) / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Création des contrôles OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Création d'une sphère pour un éclairage d'ambiance
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Création d'une source lumineuse
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

// Initialisation du shader
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 color;
  varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Créer le material avec le shader
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    color: { value: new THREE.Color(0xff0000) } // Couleur rouge par exemple
  }
});

// Chargement du modèle GLTF et application du shaderMaterial
const loader = new GLTFLoader();
loader.load('/public/models/gltf/shirt_baked_collapsed.glb', (gltf) => {
  const model = gltf.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      child.material = shaderMaterial;
    }
  });
  scene.add(model);

  // Positionnement de la caméra pour regarder le modèle
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  camera.position.z = center.z + 5;
  controls.target.copy(center);
  controls.update();
});

// Fonction d'animation
function animate() {
  requestAnimationFrame(animate);

  // Mise à jour des contrôles
  controls.update();

  // Renderer la scène
  renderer.render(scene, camera);
};

// Appel initial de la fonction animate
animate();

// Ajoute la fonction d'upload d'image
const fileInput = document.getElementById('file-input');
const uploadedImage = document.getElementById('uploaded-image');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Utilise e.target.result pour accéder aux données de l'image
      uploadedImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});
