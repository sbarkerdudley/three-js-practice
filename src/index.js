import './index.css';
import * as THREE from 'three';

let scene, camera, renderer, aspectRatio, loader;
let light, lights, otherLight, spotLight;
let mesh, geometry, color, material, backgroundColor, clone
let textureLoader;
let size = {};
let pixelRatio = Math.min(window.devicePixelRatio, 2);

const setSize = () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
};

const getAspectRatio = () => {
  return size.width / size.height;
};

const onWindowResize = () => {
  setSize();
  aspectRatio = getAspectRatio();
  updateCamera();
};

const updateCamera = () => {
  camera.fov = 40;
  camera.aspect = aspectRatio;
  camera.position.z = 20;
  camera.updateProjectionMatrix();

  camera.lookAt(0, 0, 0);

  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(size.width, size.height);
};

const animate = (time) => {
  mesh.rotation.x = time / 4000;
  mesh.rotation.y = time / 4000;
  mesh.rotation.z = time / 8000;

  camera.position.x += 0.01;
  camera.lookAt(mesh.position);

  if (camera.position.x > 20) {
    camera.position.x = -20;
  }
  renderer.render(scene, camera);
  renderer.setAnimationLoop(animate);
};

const cameraParams = {
  position: {
    x: 0,
    y: 0,
    z: 10,
  },
  fov: 150,
  aspect: aspectRatio,
};

const init = () => {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera();

  color = new THREE.Color(0x333);
  backgroundColor = new THREE.Color(0xdf40a0);
  geometry = new THREE.TorusKnotGeometry(2, 0.6, 80, 10);
  material = new THREE.MeshPhysicalMaterial({ color });
  spotLight = new THREE.SpotLight('blue');

  onWindowResize();

  renderer.antialias = true;

  material.clearcoat = 0;
  material.clearcoatRoughness = 0;
  material.roughness = 0;
  material.sheen = 1;
  material.reflectivity = 1;
  material.flatShading = true;

  mesh = new THREE.Mesh(geometry, material);
  mesh.side = THREE.DoubleSide;

  spotLight.position.z = 100;
  spotLight.intensity = 1;

  light = new THREE.PointLight(0xfff, 10);
  light.position.set(20, 20, 20);

  scene.background = backgroundColor;

  otherLight = light.copy(light);
  otherLight.position.set(-200, -200, -200);

  lights = [light, otherLight, spotLight];

  scene.add(...lights);
  scene.add(mesh);

  onWindowResize();

  renderer.antialias = true;
  document.body.appendChild(renderer.domElement);

  animate();
};

init();

window.addEventListener('resize', onWindowResize);
