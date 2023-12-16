import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import {MyRectangle} from "./MyRectangle.js";
import {MyTriangle} from "./MyTriangle.js";


export class MyWingL extends CGFobject {
    constructor(scene){
        super(scene);
        this.initBuffers();
    }

    initBuffers(){
        this.rectangle = new MyRectangle(this.scene);
        this.triangle = new MyTriangle(this.scene);
    }

    display(){
        this.scene.pushMatrix();
            this.scene.translate(1,-1,-1.7);
            this.scene.rotate(90*Math.PI/180,1,0,0);
            this.scene.scale(1.5,0.8,1);
            this.rectangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(3.4,-1.34,-1.3);
            this.scene.rotate(-90*Math.PI/180,1,0,0);
            this.scene.scale(1,0.4,1);
            this.scene.rotate(20*Math.PI/180,0,1,0);
            this.triangle.display();
        this.scene.popMatrix();

    }
}