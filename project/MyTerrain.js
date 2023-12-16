import { CGFscene, CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";

export class MyTerrain extends CGFobject {

    constructor(scene){
        super(scene);
        this.scene = scene;
        this.initBuffers();
    }

    initBuffers() {
    
        this.plane = new MyPlane(this.scene,32);

        this.texTerrain = new CGFtexture(this.scene, "images/terrain.jpg");
        this.texTerrainMap = new CGFtexture(this.scene, "images/heightmap.jpeg");
        this.texTerrainColors= new CGFtexture(this.scene, "images/altimetry.png");

        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.shader.setUniformsValues(
            {heightScale: 0.3, altColorScale: 0.3, uSampler2: 1, uSampler3: 2});

    }
    display() {



        this.scene.pushMatrix();

        this.scene.setActiveShader(this.shader);
        this.texTerrain.bind(0);
        this.texTerrainMap.bind(1);
        this.texTerrainColors.bind(2);
        this.scene.rotate(0.5*Math.PI, 0, 1, 0);
        this.scene.translate(0, -90, 0);
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(400, 400, 400);
        this.plane.display();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
    }

}