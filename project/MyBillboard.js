import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
	constructor(scene, x, z, a, t) {
		super(scene);
        this.scene = scene;
        this.position = [x, -27.5, z];
        this.a = a;
        this.t = t;
		this.initBuffers();
	}
	
	initBuffers() {
        this.quad = new MyQuad(this.scene);

        this.fragmentShader = new CGFshader(this.scene.gl, "../lib/CGF/shaders/Gouraud/textured/multiple_light-vertex.glsl", "../lib/CGF/shaders/Gouraud/textured/fragment.glsl");

        this.billboardTexture1 = new CGFappearance(this.scene);
        this.billboardTexture1.setAmbient(1, 1, 1, 1.0);
        this.billboardTexture1.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.billboardTexture1.setSpecular(1, 1, 1, 1.0);
        this.billboardTexture1.setShininess(50.0);
        this.billboardTexture1.loadTexture('images/billboardtree.png');
        this.billboardTexture1.setTextureWrap('REPEAT', 'REPEAT');

        this.billboardTexture2 = new CGFappearance(this.scene);
        this.billboardTexture2.setAmbient(1, 1, 1, 1.0);
        this.billboardTexture2.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.billboardTexture2.setSpecular(1, 1, 1, 1.0);
        this.billboardTexture2.setShininess(50.0);
        this.billboardTexture2.loadTexture('images/billboardtree2.png');
        this.billboardTexture2.setTextureWrap('REPEAT', 'REPEAT');

        this.billboardTexture3 = new CGFappearance(this.scene);
        this.billboardTexture3.setAmbient(1, 1, 1, 1.0);
        this.billboardTexture3.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.billboardTexture3.setSpecular(1, 1, 1, 1.0);
        this.billboardTexture3.setShininess(50.0);
        this.billboardTexture3.loadTexture('images/billboardtree3.png');
        this.billboardTexture3.setTextureWrap('REPEAT', 'REPEAT');
        
	}

    display() {
        
        this.quad.shader = this.fragmentShader;

        if(this.t == 1){
            this.billboardTexture1.apply();
        }else if(this.t == 2){
            this.billboardTexture2.apply();
        }else{
            this.billboardTexture3.apply();
        }
        this.scene.pushMatrix();
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.scene.scale(this.a,this.a,this.a);
            this.quad.display();
        this.scene.popMatrix();
      }
}

