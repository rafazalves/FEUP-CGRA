import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks){
            super(scene);
        
            this.slices = slices;
            this.stacks = stacks;

        this.initBuffers();
    }   
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var z = 0;
        var zsec = 1/this.stacks;

        for(var i = 0; i < this.stacks; i++){
            

            for(var j = 0; j<this.slices; j++){
                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var caa = Math.cos(ang+alphaAng);
                var ca=Math.cos(ang);

                this.vertices.push(ca, sa, z); //A
                this.vertices.push(caa, saa, z); // B
                this.vertices.push(ca, sa, z+zsec); // C
                this.vertices.push(caa, saa, z+zsec); // D

                /*var ponto = [(ca+caa)/2, (sa+saa)/2, 0];
                var normal = Math.sqrt(ponto[0]*ponto[0] + ponto[1]*ponto[1]);
                var normalizar = [ponto[0]/normal, ponto[1]/normal, 0];

                this.normals.push(...normalizar);
                this.normals.push(...normalizar);
                this.normals.push(...normalizar);
                this.normals.push(...normalizar);*/
                this.normals.push(ca,sa,0);
                this.normals.push(caa, saa, 0); 
                this.normals.push(ca, sa, 0); 
                this.normals.push(caa, saa, 0);

                this.indices.push((4*j+2)+this.slices*4*i, 4*j+this.slices*4*i, (4*j+1)+this.slices*4*i);
                this.indices.push((4*j+2)+this.slices*4*i, (4*j+1)+this.slices*4*i, (4*j+3)+this.slices*4*i);
                
                ang+=alphaAng;
                
            }

            z = zsec + z;
            
            
            

            


            

        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
