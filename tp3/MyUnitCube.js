import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
  
		this.vertices = [
            -0.5, -0.5, -0.5,	//0 E
			-0.5, -0.5,  0.5,	//1 F
			-0.5,  0.5,  0.5,   //2 H
			-0.5,  0.5, -0.5, 	//3 G
        	 0.5, -0.5, -0.5,	//4 B
			 0.5, -0.5,  0.5,	//5 A
			 0.5,  0.5,  0.5,   //6 C
			 0.5,  0.5, -0.5, 	//7 D
			 -0.5, -0.5, -0.5,	//8
			-0.5, -0.5,  0.5,	//9
			-0.5,  0.5,  0.5,   //10
			-0.5,  0.5, -0.5, 	//11
             0.5, -0.5, -0.5,	//12
			 0.5, -0.5,  0.5,	//13
			 0.5,  0.5,  0.5,   //14
			 0.5,  0.5, -0.5, 	//15
			 -0.5, -0.5, -0.5,	//16
			-0.5, -0.5,  0.5,	//17
			-0.5,  0.5,  0.5,   //18
			-0.5,  0.5, -0.5, 	//19
             0.5, -0.5, -0.5,	//20
			 0.5, -0.5,  0.5,	//21
			 0.5,  0.5,  0.5,   //22
			 0.5,  0.5, -0.5, 	//23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			//front
			1,6,2,
			1,5,6,
			//back
			0,3,7,
			0,7,4,
			//down
			9,8,12,
			12,13,9,
			//top
			10,14,15,
			11,10,15,
			//left
			18,19,16,
			16,17,18,
			//right
			23,22,20,
			22,21,20,
		];

		this.normals = [];
		this.normals.push(0,0,-1); // E
		this.normals.push(0,0,1); // F
		this.normals.push(0,0,1); // H
		this.normals.push(0,0,-1); // G
		this.normals.push(0,0,-1); // B
		this.normals.push(0,0,1); // A
		this.normals.push(0,0,1); // C
		this.normals.push(0,0,-1); // D

		this.normals.push(0,-1,0);
		this.normals.push(0,-1,0);
		this.normals.push(0,1,0);
		this.normals.push(0,1,0);
		this.normals.push(0,-1,0);
		this.normals.push(0,-1,0);
		this.normals.push(0,1,0);
		this.normals.push(0,1,0);

		this.normals.push(-1,0,0);
		this.normals.push(-1,0,0);
		this.normals.push(-1,0,0);
		this.normals.push(-1,0,0);
		this.normals.push(1,0,0);
		this.normals.push(1,0,0);
		this.normals.push(1,0,0);
		this.normals.push(1,0,0);
		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

