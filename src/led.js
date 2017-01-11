import * as THREE from 'three';

import deg2rad from './utils';


const DEFAULT_COLOR = 0xffffff,
	  TARGET_INTENSITY = 0.1,
	  RADIUS = 0.3,
	  HEIGHT = 0.4,
	  SEGMENTS = 5,
	  CYLINDER = new THREE.CylinderGeometry(RADIUS, RADIUS, HEIGHT, SEGMENTS).rotateZ(deg2rad(90));


export default class Led extends THREE.PointLight {
	constructor() {
		super(DEFAULT_COLOR, TARGET_INTENSITY, 10, 2);
		var material = new THREE.MeshBasicMaterial({ color: 0xffffff,
													 transparent: true,
	  										   		 opacity: 0.5 }),
			mesh = new THREE.Mesh(CYLINDER, material);
		this.add(mesh);
	}

	setColorRGB(r, g, b) {
		this._setMaterialColorRGB(r, g, b);
		this.color.setRGB(r, g, b);
	}

	_setMaterialColorRGB(r, g, b) {
		this.children[0].material.color.setRGB(r, g, b);
	}

	switch() {
		if (this.intensity > 0) {
			this.intensity = 0;
			this._setMaterialColorRGB(255, 255, 255);
		} else {
			this.intensity = TARGET_INTENSITY;
			this._setMaterialColorRGB(this.color.r, this.color.g, this.color.b);
		}
	}
}
