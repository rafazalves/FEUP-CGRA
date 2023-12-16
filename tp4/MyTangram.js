import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
    initBuffers() {
		    this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.bigTriangle1 = new MyTriangleBig(this.scene);
        this.bigTriangle2 = new MyTriangleBig(this.scene);        
        this.smallTriangle1 = new MyTriangleSmall(this.scene);
        this.smallTriangle2 = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);

        this.tangramTexture = new CGFappearance(this.scene);
        this.tangramTexture.setAmbient(1, 1, 1, 1.0);
        this.tangramTexture.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.tangramTexture.setSpecular(1, 1, 1, 1.0);
        this.tangramTexture.setShininess(50.0);
        this.tangramTexture.loadTexture('images/tangram.png');
        this.tangramTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.diamond.texCoords = [
          0 , 0.5,
          0.25 ,0.75,
          0.25,0.25,
          0.5, 0.5
        ]; this.diamond.updateTexCoordsGLBuffers();

        this.triangle.texCoords = [
          0,0.5,
          0,1,
          0.5,1,
        ]; this.triangle.updateTexCoordsGLBuffers();

        this.smallTriangle1.texCoords = [
          0,0,
          0,0.5,
          0.25,0.25,
        ]; this.smallTriangle1.updateTexCoordsGLBuffers();

        this.smallTriangle2.texCoords = [
          0.5,0.5,
          0.25,0.75,
          0.75,0.75,
        ]; this.smallTriangle2.updateTexCoordsGLBuffers();

        this.bigTriangle1.texCoords = [
          0,0,
          0.5,0.5,
          1,0,
        ]; this.bigTriangle1.updateTexCoordsGLBuffers();

        this.bigTriangle2.texCoords = [
          1,1,
          0.5,0.5,
          1,0,
        ]; this.bigTriangle2.updateTexCoordsGLBuffers();

        this.parallelogram.texCoords = [
          0.25,0.75,
          0.5,1,
          1,1,
          0.75,0.75,
        ]; this.parallelogram.updateTexCoordsGLBuffers();
      
	}

    display() {
        

         this.tangramTexture.apply();
         this.diamond.display();
         

         //display Triangle
         this.scene.pushMatrix();
         this.scene.translate(1,-1.4,0);
         this.scene.rotate(45*Math.PI/180 + Math.PI,0,0,1);
         this.tangramTexture.apply();
         this.triangle.display();
         this.scene.popMatrix();

         //display parallelogram
         this.scene.pushMatrix();
      
         var reflect_x = [
           1,  0, 0, 0,
           0, -1, 0, 0,
           0,  0, 1, 0,
           0,  0, 0, 1
         ]
   
         this.scene.translate(1.4, -0.4 ,0);
        
         this.scene.multMatrix(reflect_x);
         this.tangramTexture.apply();
         this.parallelogram.display();
         this.scene.popMatrix();


         //display Big Triangle 1
          this.scene.pushMatrix();
            this.scene.translate(0,1,0);
            this.scene.rotate(-45*Math.PI/180,0,0,1);
            this.tangramTexture.apply();
            this.bigTriangle1.display();
          this.scene.popMatrix();

          //display Big Triangle 2
          this.scene.pushMatrix();
            this.scene.translate(0,3.83,0);
            this.scene.rotate(135*Math.PI/180,0,0,1);
            this.tangramTexture.apply();
            this.bigTriangle2.display();
          this.scene.popMatrix();

          // display small triangle 1
          this.scene.pushMatrix();
            this.scene.translate(-2.12,5.5,0);
            this.scene.rotate(-135*Math.PI/180,0,0,1);
            this.tangramTexture.apply();
            this.smallTriangle1.display();
          this.scene.popMatrix();

           // display small triangle 2
           this.scene.pushMatrix();
           this.scene.translate(-1.4,2,0);
           this.scene.rotate(90*Math.PI/180,0,0,1);
           this.tangramTexture.apply();
           this.smallTriangle2.display();
         this.scene.popMatrix();

    }
}
