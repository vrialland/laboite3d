import * as THREE from 'three';
import deg2rad from './utils';


export default class Boite extends THREE.Object3D {
	constructor() {
		super();
		this.OFFSET = 0.3;
		this.front = null;
		this.back = null;
		this.loadParts();
	}

	loadParts() {
		var loader = new THREE.STLLoader(),
			self = this,
			material;

		loader.load('./assets/laboite_front_v42.stl', (geometry) => {
			geometry.scale(-0.2, 0.2, -0.2);
			geometry.computeBoundingBox();
			material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
			self.front = new THREE.Mesh(geometry, material);
			self.front.translateZ(geometry.boundingBox.getSize().z);
			self.front.position.set(0, 0, this.OFFSET);
			self.add(self.front);
		});

		loader.load('./assets/laboite_back_v42.stl', (geometry) => {
			geometry.scale(0.2, 0.2, 0.2);
			geometry.computeBoundingBox();
			material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
			self.back = new THREE.Mesh(geometry, material);
			var size = geometry.boundingBox.getSize();
			self.back.position.set(0, 0, -size.z - this.OFFSET);
			self.add(self.back);
		});

		this.rotateY(deg2rad(-90))
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
