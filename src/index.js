import * as THREE from 'three';
import './TrackballControls';
import './STLLoader';
import Led from './led';
import deg2rad from './utils';
import Boite from './boite';


var renderer,
	scene,
	camera,
	controls,
	light,
	led,
	laboite;


function init() {
	// Renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Scene
	scene = new THREE.Scene();

	// Camera
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 0, 25);

	// Controls
	controls = new THREE.TrackballControls(camera);
	controls.addEventListener('change', render);

	var geometry, material;

	// Add ambient light

	light = new THREE.AmbientLight(0xffffff, 0.3);
	scene.add(light);
	light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(0, 30, 50);
	scene.add(light);

	// Add Laboite
	laboite = new Boite();
	scene.add(laboite);

	led = new Led();
	scene.add(led);

	window.addEventListener('resize', onWindowResize, false);
	render();
}


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
	render();
}


function animate() {
	requestAnimationFrame(animate);
	controls.update();
	render();
}


function render() {
	renderer.render(scene, camera);
}


init();
animate();

// TODO: Remove this
window.laboite = {
	THREE: THREE,
	renderer: renderer,
	scene: scene,
	camera: camera,
	controls: controls,
	light: light,
	led: led,
	laboite: laboite
};