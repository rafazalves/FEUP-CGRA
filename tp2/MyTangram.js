import {CGFobject} from '../lib/CGF.js';
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
	}

    display() {

         this.diamond.display();

         //display Triangle
         this.scene.pushMatrix();
         this.scene.translate(1,-1.4,0);
         this.scene.rotate(45*Math.PI/180 + Math.PI,0,0,1);
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
         this.parallelogram.display();
         this.scene.popMatrix();


         //display Big Triangle 1
          this.scene.pushMatrix();
            this.scene.translate(0,1,0);
            this.scene.rotate(-45*Math.PI/180,0,0,1);
            this.bigTriangle1.display();
          this.scene.popMatrix();

          //display Big Triangle 2
          this.scene.pushMatrix();
            this.scene.translate(0,3.83,0);
            this.scene.rotate(135*Math.PI/180,0,0,1);
            this.bigTriangle2.display();
          this.scene.popMatrix();

          // display small triangle 1
          this.scene.pushMatrix();
            this.scene.translate(-2.12,5.5,0);
            this.scene.rotate(-135*Math.PI/180,0,0,1);
            this.smallTriangle1.display();
          this.scene.popMatrix();

           // display small triangle 2
           this.scene.pushMatrix();
           this.scene.translate(-1.4,2,0);
           this.scene.rotate(90*Math.PI/180,0,0,1);
           this.smallTriangle2.display();
         this.scene.popMatrix();

    }
}
