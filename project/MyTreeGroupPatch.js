import {CGFobject, CGFappearance, CGFshader} from '../lib/CGF.js';
import { MyBillboard} from './MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene;
		this.initBuffers();
	}
	
	initBuffers() {
        //TREE SPAWN
        this.nBranches = 9;
        this.branches = [];
        var gridSize = 3;
        var spacing = 4;

        for (var i = 0; i < this.nBranches; i++) {
            var row = Math.floor(i / gridSize);
            var col = i % gridSize;
            var a = Math.floor(Math.random() * 3);
            var b = Math.floor(Math.random() * 3);
            var x = col * spacing * 2 - 50 + a;
            var z = row * spacing * 2 - 145 + b;
            var d = Math.random() + 6;
            var t = Math.floor(Math.random() * 3) + 1;
            this.branches.push(new MyBillboard(this.scene, x, z, d, t));
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