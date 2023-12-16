import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

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

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.smallTriangle1 = new MyTriangleSmall(this);
    this.smallTriangle2 = new MyTriangleSmall(this);
    this.bigTriangle1 = new MyTriangleBig(this);
    this.bigTriangle2 = new MyTriangleBig(this);
    this.tangram = new MyTangram(this);
    this.myUnitCube = new MyUnitCube(this);
    this.myQuad = new MyUnitCubeQuad(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.showDiamond = false;
    this.showTriangle = false;
    this.showParallelogram = false;
    this.showSmallTriangle1 = false;
    this.showSmallTriangle2 = false;
    this.showBigTriangle1 = false;
    this.showBigTriangle2 = false;
    this.showTangram = true;
    this.showCube = false;
    this.showQuad = false;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
    
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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
    
    this.setDefaultAppearance();
    

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    if(this.showDiamond) this.diamond.display();
    if(this.showTriangle) this.triangle.display();
    if(this.showParallelogram) this.parallelogram.display();
    if(this.showSmallTriangle1) this.smallTriangle1.display();
    if(this.showSmallTriangle2) this.smallTriangle2.display();
    if(this.showBigTriangle1) this.bigTriangle1.display();
    if(this.showBigTriangle2) this.bigTriangle2.display();
    

    

    this.pushMatrix();
      this.translate(3,0,6.2);
      this.rotate(-90*Math.PI/180,1,0,0);
      if (this.showTangram) this.tangram.display();
      
      this.pushMatrix();
        this.translate(0.7,2.2,-0.5);
        this.scale(7.4,8,1);
        if (this.showCube) this.myUnitCube.display();
        if (this.showQuad) this.myQuad.display();
      this.popMatrix();
    this.popMatrix();

    // ---- BEGIN Primitive drawing section

    

    // ---- END Primitive drawing section
  }
}
