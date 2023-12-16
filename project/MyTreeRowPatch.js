import {CGFobject, CGFappearance, CGFshader} from '../lib/CGF.js';
import { MyBillboard} from './MyBillboard.js';

export class MyTreeRowPatch extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene;
		this.initBuffers();
	}
	
	initBuffers() {
        //TREE SPAWN
        this.nBranches = 6;
        this.branches = [];
        for(var i = 0; i < this.nBranches; i++){
            var x = -25 + (i * 4);
            var z = Math.floor(Math.random() * 3) - 136;
            var a = Math.random() + 6;
            var t = Math.floor(Math.random() * 3) + 1;
            this.branches.push(new MyBillboard(this.scene, x, z, a, t));
        }
        
	}

    display() {
        this.scene.pushMatrix();
        for(var i = 0; i < this.nBranches; i++) {
            if (this.branches[i] != null) {
                this.scene.pushMatrix();
                this.branches[i].display();
                this.scene.popMatrix();
            }
          }
        this.scene.popMatrix();
      }
}