import * as THREE from 'three';
import './TrackballControls';
import './STLLoader';

function deg2rad(degrees) {
	return degrees * Math.PI / 180;
}


class Boite {
	constructor() {
		this.OFFSET = 0.3;
		this.obj = new THREE.Object3D();
		this.front = null;
		this.back = null;
		this.loadParts();
	}

	getObject3D() {
		return this.obj;
	}

	loadParts() {
		var loader = new THREE.STLLoader(),
			self = this,
			material;

		loader.load('./models/laboite_front_v42.stl', (geometry) => {
			geometry.scale(-0.2, 0.2, -0.2);
			geometry.computeBoundingBox();
			material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
			self.front = new THREE.Mesh(geometry, material)
			self.front.translateZ(geometry.boundingBox.getSize().z);
			var center = geometry.boundingBox.getCenter();
			self.front.position.set(-center.x, -center.y, -center.z + this.OFFSET);
			self.obj.add(self.front);
		});

		loader.load('./models/laboite_back_v42.stl', (geometry) => {
			geometry.scale(0.2, 0.2, 0.2);
			geometry.computeBoundingBox();
			material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
			self.back = new THREE.Mesh(geometry, material)
			var center = geometry.boundingBox.getCenter();
			self.back.position.set(-center.x, -center.y, -center.z - this.OFFSET);
			self.obj.add(self.back);
		});

		this.obj.rotateY(deg2rad(-90))
	}

	_setColor(part, r, g, b) {
		part.material.color.setRGB(r, g, b);
	}

	setBackColor(r, g, b) {
		this._setColor(this.back, r, g, b);
	}   

	setFrontColor(r, g, b) {
		this._setColor(this.front, r, g, b);
	}
}


var renderer,
	scene,
	camera,
	controls,
	light,
	laboite;


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
	laboite = new Boite();
	scene.add(laboite.getObject3D());

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