import { CGFscene, CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from "./MyCylinder.js";

export class MyNest extends CGFobject {
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.pos = [-7, -30, -110];
        this.initBuffers();
    }

    initBuffers() {
        this.cylinder = new MyCylinder(this.scene, 8, 20);

        //Texture
        this.nestTex = new CGFtexture(this.scene, 'images/nest.jpg');
        this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.nestMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.nestMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.nestMaterial.setShininess(10.0);
        this.nestMaterial.setTexture(this.nestTex);

        this.branches = [];
    }

    addBranch(branch){
        this.branches.push(branch);
    }


    display() {
        this.nestMaterial.apply();

        this.scene.pushMatrix();

        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);

        for(var i = 0; i < this.branches.length; i++){
            this.branches[i].display();
        }

        this.scene.rotate(-Math.PI/2.0,1,0,0)
        this.scene.scale(4.5, 4.1, 3.5);
        
        this.cylinder.display();

        this.scene.popMatrix();
    }
}