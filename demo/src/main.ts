import * as THREE from 'three';
import RendererController from '../../module/RendererController';
import FpsCounterController from '../../module/FpsCounterController';

const canvas = document.querySelector('#main-canvas');
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Failed to get #main-canvas element.");
}

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const rendererInstance = new RendererController(canvas, camera, scene);
rendererInstance.setTargetFps(60);

const fpsCounterInstance = new FpsCounterController();

rendererInstance.setAnimationLoop((delta: number) => {
    cube.rotation.x += delta;
    cube.rotation.z += delta;

    fpsCounterInstance.update(delta);
});

rendererInstance.render();
