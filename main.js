// public/main.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Initialisation de la scène, de la caméra et du rendu
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

// Chargement du modèle GLTF
const loader = new GLTFLoader();
let model;

loader.load('/public/models/gltf/test.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);

  // Positionnement de la caméra pour regarder le modèle
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  controls.target.copy(center);
  controls.update();

  // Création d'un rectangle bleu
  const geometry = new THREE.PlaneGeometry(2, 2); // Taille du rectangle
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide }); // Couleur bleue
  const blueRectangle = new THREE.Mesh(geometry, material);

  // Positionnement du rectangle sur l'objet 3D
  if (model) {
    const size = box.getSize(new THREE.Vector3());
    blueRectangle.position.set(center.x, center.y + size.y / 2, center.z); // Position au-dessus du modèle
    scene.add(blueRectangle);
  }
});

// Positionnement de la caméra
camera.position.z = 5;

// Fonction d'animation
const animate = () => {
  requestAnimationFrame(animate);

  // Mise à jour des contrôles
  controls.update();

  // Renderer la scène
  renderer.render(scene, camera);
};

// Appel initial de la fonction animate
animate();
