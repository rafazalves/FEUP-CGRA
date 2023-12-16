import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.quad = new MyQuad(this.scene);
        this.sideTexture = new CGFappearance(this.scene);
        this.sideTexture.setAmbient(1, 1, 1, 1.0);
        this.sideTexture.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.sideTexture.setSpecular(1, 1, 1, 1.0);
        this.sideTexture.setShininess(50.0);
        this.sideTexture.loadTexture('images/terrain.jpg');
        this.sideTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.topTexture = new CGFappearance(this.scene);
        this.topTexture.setAmbient(1, 1, 1, 1.0);
        this.topTexture.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.topTexture.setSpecular(1, 1, 1, 1.0);
        this.topTexture.setShininess(50.0);
        this.topTexture.loadTexture('images/terrain.jpg');
        this.topTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.bottomTexture = new CGFappearance(this.scene);
        this.bottomTexture.setAmbient(1, 1, 1, 1.0);
        this.bottomTexture.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.bottomTexture.setSpecular(1, 1, 1, 1.0);
        this.bottomTexture.setShininess(50.0);
        this.bottomTexture.loadTexture('images/terrain.jpg');
        this.bottomTexture.setTextureWrap('REPEAT', 'REPEAT');
	}

    display() {

        //Sides
        this.sideTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
            this.scene.translate(0,0,0.5);
            this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(Math.PI,0,1,0);
            this.scene.translate(0,0,0.5);
            this.quad.display();
        this.scene.popMatrix();

         this.scene.pushMatrix();
            this.scene.translate(0.5,0,0);
            this.scene.rotate(90*Math.PI/180,0,1,0);
            this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-0.5,0,0);
            this.scene.rotate(-90*Math.PI/180,0,1,0);
            this.quad.display();
        this.scene.popMatrix();

        //Top
        this.topTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
            this.scene.translate(0,0.5,0);
            this.scene.rotate(-90*Math.PI/180,1,0,0);
            this.quad.display();
        this.scene.popMatrix();

        //Bottom
        this.bottomTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
            this.scene.translate(0,-0.5,0);
            this.scene.rotate(90*Math.PI/180,1,0,0);
            this.quad.display();
        this.scene.popMatrix();

    }
}

