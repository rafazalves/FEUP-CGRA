import { CGFscene, CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyBirdEgg extends CGFobject {
    constructor(scene, x, z){
        super(scene);
        this.scene = scene;
        this.pos = [x, -29, z];
        this.initBuffers();
    }

    initBuffers() {
        this.egg = new MySphere(this.scene, 36 , 15, false);
        
        //Texture
        this.eggTex = new CGFtexture(this.scene, 'images/egg.jpg');
        this.eggMaterial = new CGFappearance(this.scene);
        this.eggMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.eggMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eggMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.eggMaterial.setShininess(10.0);
        this.eggMaterial.setTexture(this.eggTex);
    }

    getPos(){ return this.pos; }

    display() {

        this.eggMaterial.apply();

        this.scene.pushMatrix();

        if(this.pos[0] != null && this.pos[2] != null) {
            this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
            this.scene.translate(0, 0, -0.75);
        }

        this.scene.scale(0.7, 1, 0.7);

        this.egg.display();

        this.scene.popMatrix();
    }

    degToRad(deg){
        return deg * Math.PI / 180.0;
    }
}