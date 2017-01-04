import * as THREE from 'three';
import './TrackballControls';
import './STLLoader';

var renderer,
	scene,
	camera,
	controls,
	light,
	laboite;

function deg2rad(degrees) {
	return degrees * Math.PI / 180;
}


function init() {
	// Renderer
	renderer = new THREE.WebGLRenderer();
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
	light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(0, 30, 50);
	scene.add(light);

	// Add Laboite
	laboite = new THREE.Object3D();
	var loader = new THREE.STLLoader();
	loader.load('./models/laboite_front_v42.stl', (geometry) => {
		geometry.scale(-0.2, 0.2, -0.2);
		geometry.computeBoundingBox();
		material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
		let front = new THREE.Mesh(geometry, material)
		front.translateZ(geometry.boundingBox.getSize().z);
		var center = geometry.boundingBox.getCenter();
		front.position.set(-center.x, -center.y, -center.z)
		laboite.add(front);
	});
	loader.load('./models/laboite_back_v42.stl', (geometry) => {
		geometry.scale(0.2, 0.2, 0.2);
		geometry.computeBoundingBox();
		material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
		let back = new THREE.Mesh(geometry, material)
		var center = geometry.boundingBox.getCenter();
		back.position.set(-center.x, -center.y, -center.z)
		laboite.add(back);
	});
	scene.add(laboite);
	laboite.rotateY(deg2rad(-90));

	// Add ground
	/*geometry = new THREE.PlaneGeometry(100, 100);
	material = new THREE.MeshPhongMaterial({color: 0x0000ff,
						side: THREE.DoubleSide});
	var floor = new THREE.Mesh(geometry, material);
	floor.rotateX(deg2rad(90));
	floor.position.set(0, -1, 0);
	scene.add(floor);*/

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
	laboite: laboite
};