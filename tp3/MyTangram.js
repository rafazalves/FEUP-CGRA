import {CGFobject, CGFappearance} from '../lib/CGF.js';
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

        this.scene.diamondColor = new CGFappearance(this.scene);
        this.scene.diamondColor.setAmbient(0, 0.5, 0, 1.0);
        this.scene.diamondColor.setDiffuse(0, 0, 0, 1.0);
        this.scene.diamondColor.setSpecular(0, 1, 0, 1.0);
        this.scene.diamondColor.setShininess(10.0);

        this.scene.bigTriangle1Color = new CGFappearance(this.scene);
        this.scene.bigTriangle1Color.setAmbient(0, 42.5/255, 0.5, 1.0);
        this.scene.bigTriangle1Color.setDiffuse(0, 0, 0, 1.0);
        this.scene.bigTriangle1Color.setSpecular(0, 85/255, 255/255, 1.0);
        this.scene.bigTriangle1Color.setShininess(10.0);

        this.scene.bigTriangle2Color = new CGFappearance(this.scene);
        this.scene.bigTriangle2Color.setAmbient(0.5, 82.5/255, 0, 1.0);
        this.scene.bigTriangle2Color.setDiffuse(0, 0, 0, 1.0);
        this.scene.bigTriangle2Color.setSpecular(255/255, 165/255, 0, 1.0);
        this.scene.bigTriangle2Color.setShininess(10.0);

        this.scene.smallTriangle1Color = new CGFappearance(this.scene);
        this.scene.smallTriangle1Color.setAmbient(72.5/255, 5/255, 97/255, 1.0);
        this.scene.smallTriangle1Color.setDiffuse(0, 0, 0, 1.0);
        this.scene.smallTriangle1Color.setSpecular(145/255, 10/255, 194/255, 1.0);
        this.scene.smallTriangle1Color.setShininess(10.0);

        this.scene.smallTriangle2Color = new CGFappearance(this.scene);
        this.scene.smallTriangle2Color.setAmbient(0.5, 0, 0, 1.0);
        this.scene.smallTriangle2Color.setDiffuse(0, 0, 0, 1.0);
        this.scene.smallTriangle2Color.setSpecular(255/255, 0, 0, 1.0);
        this.scene.smallTriangle2Color.setShininess(10.0);

        this.scene.triangleColor = new CGFappearance(this.scene);
        this.scene.triangleColor.setAmbient(255/255, 203/255, 219/255, 1.0);
        this.scene.triangleColor.setDiffuse(0, 0, 0, 1.0);
        this.scene.triangleColor.setSpecular(230/255, 14/255, 212/255, 1.0);
        this.scene.triangleColor.setShininess(10.0);

        this.scene.parallelogramColor = new CGFappearance(this.scene);
        this.scene.parallelogramColor.setAmbient(0.5,0.5,0, 1.0);
        this.scene.parallelogramColor.setDiffuse(0, 0, 0, 1.0);
        this.scene.parallelogramColor.setSpecular(1,1,0, 1.0);
        this.scene.parallelogramColor.setShininess(10.0);
	}

    display() {

         //this.scene.diamondColor.apply();
         this.scene.materials[4].apply();
         this.diamond.display();

         //display Triangle
         this.scene.pushMatrix();
         this.scene.translate(1,-1.4,0);
         this.scene.rotate(45*Math.PI/180 + Math.PI,0,0,1);
         this.scene.triangleColor.apply();
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
         this.scene.parallelogramColor.apply();
         this.parallelogram.display();
         this.scene.popMatrix();


         //display Big Triangle 1
          this.scene.pushMatrix();
            this.scene.translate(0,1,0);
            this.scene.rotate(-45*Math.PI/180,0,0,1);
            this.scene.bigTriangle1Color.apply();
            this.bigTriangle1.display();
          this.scene.popMatrix();

          //display Big Triangle 2
          this.scene.pushMatrix();
            this.scene.translate(0,3.83,0);
            this.scene.rotate(135*Math.PI/180,0,0,1);
            this.scene.bigTriangle2Color.apply();
            this.bigTriangle2.display();
          this.scene.popMatrix();

          // display small triangle 1
          this.scene.pushMatrix();
            this.scene.translate(-2.12,5.5,0);
            this.scene.rotate(-135*Math.PI/180,0,0,1);
            this.scene.smallTriangle1Color.apply();
            this.smallTriangle1.display();
          this.scene.popMatrix();

           // display small triangle 2
           this.scene.pushMatrix();
           this.scene.translate(-1.4,2,0);
           this.scene.rotate(90*Math.PI/180,0,0,1);
           this.scene.smallTriangle2Color.apply();
           this.smallTriangle2.display();
         this.scene.popMatrix();

    }
}
