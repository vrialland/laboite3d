import * as THREE from 'three';
import './TrackballControls';
import './STLLoader';

var renderer,
	scene,
	camera,
	controls;

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
	camera.position.z = 5;

	// Controls
	controls = new THREE.TrackballControls(camera);
	controls.addEventListener('change', render);

	var geometry, material;

	// Add ambient light
	var ambient = new THREE.AmbientLight({ color: 0xffffff });
	scene.add(ambient);

	// Add Laboite
	var laboite = new THREE.Object3D();

	var loader = new THREE.STLLoader();
	loader.load('./models/laboite_front_v42.stl', (geometry) => {
		material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
		let front = new THREE.Mesh(geometry, material)
		front.rotation.y = deg2rad(90);
		laboite.add(front);
	});
	loader.load('./models/laboite_back_v42.stl', (geometry) => {
		material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
		let back = new THREE.Mesh(geometry)
		back.rotation.y = deg2rad(-90);
		let bbox = new THREE.Box3().setFromObject(back); 
		back.position.x += bbox.max.x - bbox.min.x;
		laboite.add(back);
	});

	scene.add(laboite);

	// Add ground
	/*geometry = new THREE.PlaneGeometry(100, 100);
	material = new THREE.MeshBasicMaterial({color: 0x0000ff,
											side: THREE.DoubleSide});
	var floor = new THREE.Mesh(geometry, material);
	floor.rotateX(deg2rad(90));
	floor.position.set(0, -1, 0);
	scene.add(floor);*/

	camera.lookAt(laboite);

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
}

function render() {
	renderer.render(scene, camera);
}

init();
animate();