import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRectangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			1, 0, 0,	//0
			1, 1, 0,	//1
			0, 1, 0,	//2
			0, 0, 0,	//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 3, 0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
	
		this.scene.gl.disable(this.scene.gl.CULL_FACE);
		this.scene.gl.disable(this.scene.gl.BACK);

		//this.scene.gl.cullFace(this.scene.gl.FRONT_AND_BACK);
	

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

