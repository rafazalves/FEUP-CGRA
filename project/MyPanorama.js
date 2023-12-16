import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.sphere = new MySphere(scene,36,15,true);
        this.texture = texture;

        //Material
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1.0,1.0,1.0,1.0);
        this.material.setTexture(this.texture);
    }

    display(camera_pos){
        this.scene.pushMatrix();
        this.material.apply();

        this.scene.translate(camera_pos[0],camera_pos[1],camera_pos[2]);
        this.scene.scale(200,200,200);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.sphere.display();
        this.scene.popMatrix();
    }
}