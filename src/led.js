import * as THREE from 'three';

import deg2rad from './utils';


const DEFAULT_COLOR = 0xffffff,
	  RADIUS = 0.3,
	  HEIGHT = 0.5,
	  SEGMENTS = 32,
	  CYLINDER = new THREE.CylinderGeometry(RADIUS, RADIUS, HEIGHT, SEGMENTS).rotateX(deg2rad(90)),
	  MATERIAL = new THREE.MeshBasicMaterial({ color: 0xffffff,
	  										   opacity: 0.2 });


export default class Led extends THREE.PointLight {
	constructor() {
		super(DEFAULT_COLOR, 1, 20, 2);
		var mesh = new THREE.Mesh(CYLINDER, MATERIAL);
		this.add(mesh);
	}

	setColorRGB(r, g, b) {
		this.children[0].material.color.setRGB(r, g, b);
		this.color.setRGB(r, g, b);
	}

	switch() {
		this.intensity = this.intensity == 1 ? 0 : 1;
	}
}
