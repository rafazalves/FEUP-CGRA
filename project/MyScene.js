import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyNest } from "./MyNest.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyBillboard } from "./MyBillboard.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.setUpdatePeriod(50);
    
    //Initialize scene objects
    this.axis = new CGFaxis(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 2;

    //this.plane = new MyPlane(this,30);
    this.bird = new MyBird(this, 60, 0, 0, 0, 3, 0);
    this.terrain = new MyTerrain(this);
    this.nest = new MyNest(this);
    this.billboard = new MyBillboard(this, 2, 2);
    this.treeRowPatch = new MyTreeRowPatch(this);
    this.treeGroupPatch = new MyTreeGroupPatch(this);
    
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"));
  
    this.lastCameraDistance = 10;
    this.cameraDistance = 10;

    //EGGS SPAWN
    this.nBranches = 4;
    this.branches = [];
    for(var i = 0; i < this.nBranches; i++){
      var x = Math.floor(Math.random() * 31) - 50;
      var z = Math.floor(Math.random() * 11) - 120;
      this.branches.push(new MyBirdEgg(this, x, z));
    }


    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(25, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  update(t){
    this.checkKeys(t);
  }
  /*moveCamera(){
    this.lastCameraDistance = this.cameraDistance;
    this.camera.setPosition(vec3.fromValues(this.cameraDistance, this.cameraDistance, this.cameraDistance));
    this.camera.setTarget(vec3.fromValues(this.bird.position[0], this.bird.position[1], this.bird.position[2]));
  }*/
  checkKeys(t) {
    var text="Keys pressed: ";
    var keysPressed=false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
        text+=" W ";
        keysPressed=true;
        this.bird.updateSpeed(1);
    }
    if (this.gui.isKeyPressed("KeyS")) {
        text+=" S ";
        keysPressed=true;
        this.bird.updateSpeed(-1);
    }
    if (this.gui.isKeyPressed("KeyA")) {
        text+=" A ";
        keysPressed=true;
        this.bird.turn(-1);
    }
    if (this.gui.isKeyPressed("KeyD")) {
        text+=" D ";
        keysPressed=true;
        this.bird.turn(1);
    }
    if (this.gui.isKeyPressed("KeyR")) {
        text+=" R ";
        keysPressed=true;
        this.bird.resetPos();
    }
    if (this.gui.isKeyPressed("KeyP")) {
      text+=" P ";
      keysPressed=true;
      this.bird.catchEgg();
    }
    if (this.gui.isKeyPressed("KeyO")) {
      text+=" O ";
      keysPressed=true;
      this.bird.dropEgg();
    }
    if (this.gui.isKeyPressed("KeyU")) {
      text+=" U ";
      keysPressed=true;
      this.bird.goUP();
    }
    if (keysPressed){
        console.log(text);
    }
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.scale(0.4, 0.4, 0.4);
    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

    //TERRAIN
    this.pushMatrix();
    this.terrain.display();
    this.popMatrix();

    this.panorama.display(this.camera.position);

    //BIRD
    this.pushMatrix();
    this.bird.accelerate(this.speedFactor);
    this.bird.display();
    this.popMatrix();

    //NEST
    this.pushMatrix();
    this.nest.display();
    this.popMatrix();

    //EGGS
    for(var i = 0; i < this.nBranches; i++) {
        if (this.branches[i] != null) {
            this.pushMatrix();
            this.branches[i].display();
            this.popMatrix();
        }
      }

    //TreeRowPatch
    this.pushMatrix();
    this.treeRowPatch.display();
    this.popMatrix();

    //TreeGroupPatch
    this.pushMatrix();
    this.treeGroupPatch.display();
    this.popMatrix();


    this.popMatrix();
   
    // ---- END Primitive drawing section
  }
}
