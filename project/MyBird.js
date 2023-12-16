import {CGFobject, CGFappearance, CGFshader} from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";
import {MyUnitCubeQuad} from "./MyUnitCubeQuad.js";
import {MyCone} from "./MyCone.js";
import {MyDiamond} from "./MyDiamond.js";
import {MyTriangle} from "./MyTriangle.js";
import {MyWingR} from "./MyWingR.js";
import {MyWingL} from "./MyWingL.js";
export class MyBird extends CGFobject {

    constructor(scene, fps, orientation, speed, birdposx, birdposy, birdposz) {
        super(scene);
        this.scene = scene;
        this.fps = fps; //frame rate
        this.orientation = orientation;
        this.speed = speed;
        this.birdposx = birdposx;
        this.birdposy = birdposy;
        this.birdposz = birdposz;
        this.initBuffers();
    }
    egg = null;
    eggCatch = false;
    h = 3;
    state = -this.h;

    degToRad(deg){
        return deg * Math.PI / 180.0;
    }

    initBuffers() {
        this.maxSpeed = 35/this.fps;
        this.acceleration = 2/this.fps;

        //this.fragment = new CGFshader(this.gl, "shaders/texture1.vert", "shaders/fragment_shader.frag");

        this.sphere = new MySphere(this.scene, 36, 15, false);
        
        this.feather1 = new CGFappearance(this.scene);
        this.feather1.setAmbient(0.66,0.67,0.66,1.0);
        this.feather1.loadTexture("images/feathers.png");

        this.feather2 = new CGFappearance(this.scene);
        this.feather2.setEmission(0.66,0.67,0.66,1.0);
        this.feather2.loadTexture("images/feathers.png");
        
        this.eye = new CGFappearance(this.scene);
        this.eye.setEmission(1.0,1.0,1.0,1.0);
        this.eye.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.eye.loadTexture("images/bird_eye.jpeg");
        
        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(0.0,0.0,0.0,1.0);

        this.grey = new CGFappearance(this.scene);
        this.grey.setAmbient(0.66,0.67,0.66,1.0);

        this.cube = new MyUnitCubeQuad(this.scene);
        this.cone = new MyCone(this.scene, 30, 1);
        this.triangle = new MyTriangle(this.scene);
        this.diamond = new MyDiamond(this.scene);
        this.wingR = new MyWingR(this.scene);
        this.wingL = new MyWingL(this.scene);

        this.position = [this.birdposx, this.birdposy, this.birdposz];

        this.lastIterationTime = (new Date()).getTime() % 1000;

        this.scale = 1;
    }

    accelerate(v){
        this.acceleration = v/this.fps;
    }

    catchEgg(){
        let targetY = -25;
        let duration = 2; // in seconds
        let startY = this.position[1];
        let progress = 0;
        let lastTimestamp = null;

        function updatePosition(currentTimestamp) {
            let deltaTime = (currentTimestamp - lastTimestamp) / 1000; // convert to seconds
            lastTimestamp = currentTimestamp;

            progress += deltaTime / duration;
            this.position[1] = startY + (targetY - startY) * progress;
            
            if (progress < 1) {
                requestAnimationFrame(updatePosition.bind(this));
            } else {
                if(this.eggCatch == false){
                    for(let i=0; i<this.scene.branches.length; i++){
                        if(this.scene.branches[i].pos[0] <= this.position[0]+3 && this.scene.branches[i].pos[0] >= this.position[0]-3 && this.scene.branches[i].pos[2] <= this.position[2]+3 && this.scene.branches[i].pos[2] >= this.position[2]-3){
                            console.log("catched");
                            this.eggCatch = true;
                            this.egg = this.scene.branches[i];
                            this.scene.branches.splice(i, 1);
                        }
                    }
                }
                
            }
        }

        lastTimestamp = performance.now();
        requestAnimationFrame(updatePosition.bind(this));   
    }

    goUP(){
        let targetY = 3;
        let duration = 2; // in seconds
        let startY = this.position[1];
        let progress = 0;
        let lastTimestamp = null;

        function updatePosition(currentTimestamp) {
            let deltaTime = (currentTimestamp - lastTimestamp) / 1000; // convert to seconds
            lastTimestamp = currentTimestamp;

            progress += deltaTime / duration;
            this.position[1] = startY - (startY - targetY) * progress;
            
            if (progress < 1) {
                requestAnimationFrame(updatePosition.bind(this));
            } 
        }

        lastTimestamp = performance.now();
        requestAnimationFrame(updatePosition.bind(this));   
    }

    dropEgg(){
        if(this.eggCatch == true){
            var margem = 3;
            var dist = Math.pow(Math.abs(this.scene.nest.pos[0] - this.position[0]), 2) + Math.pow(Math.abs(this.scene.nest.pos[2] - this.position[2]), 2);
            if ( dist < margem * margem && this.position[1] <= -23) {
                console.log("dropped");
                this.eggCatch = false;

                var x = (Math.random() * 4.6) - 2.3;
                var z = (Math.random() * 4.6) - 2.3;
                this.egg.pos[0] = x;
                this.egg.pos[1] = 0.5;
                this.egg.pos[2] = z;
                this.scene.nest.addBranch(this.egg);

                this.egg = null;
            }
        }
    }

    resetPos(){
        this.speed = 0;
        this.orientation = 0;
        this.position = [0, 3, 0];
    }

    getPos(){
        return this.position;
    }

    moveVerticaly(){
        this.state = this.h;
    }

    display(){

        //Animação de Oscilação
        var ms = (new Date()).getTime() % 1000;
        var t = parseInt("" + (ms) / 100);

        var oscilacao;

        if(t < 5){
            oscilacao = - t / 10.0 + 0.25;
        }
        else{
            oscilacao = -(10 - t) / 10.0 + 0.25;
        }

        if(this.state > -this.h) {

            var s = Math.sign(this.state);
            if(s == 0) s = -1;
                this.position[1] -= s / 20;
            if(this.position[1] + oscilacao < 0.75) this.position[1] = 0.75 - oscilacao;
                this.state -= 1 / 20;
        }
        if(ms < this.lastIterationTime){
            ms += 1000;
        }
        var elapsedTime = ms - this.lastIterationTime;

        this.lastIterationTime = ms % 1000;

        this.move(elapsedTime);

        //Animação de Bater as Asas
        var ang = -oscilacao * 5 * (this.acceleration * this.fps) * ((5 * Math.abs(this.speed) * 10 / (this.fps * 2) ) + 0.5);

        oscilacao *= 1.5;

        //Componentes do Pássaro
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        //Cabeça
        this.scene.pushMatrix();
            this.feather1.apply();
            this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
            this.sphere.display();
        this.scene.popMatrix();

        //Bico
        this.scene.pushMatrix();
            this.black.apply();
            this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
            this.scene.scale(0.3,0.3,1);
            this.scene.rotate(90*Math.PI/180,1,0,0);
            this.scene.translate(0,0.9,0);
            this.cone.display();
        this.scene.popMatrix();

        //Olho Esquerdo
        this.scene.pushMatrix();
            this.eye.apply();
            this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
            this.scene.scale(0.3,0.3,0.3);
            this.scene.translate(2.5,1,1.5);
            this.scene.rotate(120*Math.PI/180,0,1,0);
            this.sphere.display();
        this.scene.popMatrix();

        //Olho Direito
        this.scene.pushMatrix();
            this.eye.apply();
            this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
            this.scene.scale(0.3,0.3,0.3);
            this.scene.translate(-2.5,1,1.5);
            this.scene.rotate(60*Math.PI/180,0,1,0);
            this.sphere.display();
        this.scene.popMatrix();

        //Corpo
        this.scene.pushMatrix();
            this.feather2.apply();
            this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
            this.scene.scale(1.2,1,2);
            this.scene.translate(0,-1.2,-0.8);
            this.sphere.display();
        this.scene.popMatrix();

        //Cauda
        this.scene.pushMatrix();
            this.grey.apply();
            this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
            this.scene.scale(1,1,1.5);
            this.scene.translate(0,-1,-2.5);
            this.scene.rotate(90*Math.PI/180,1,0,0);
            this.diamond.display();
        this.scene.popMatrix();

        //Aplicação da animação de bater as Asas
        this.scene.pushMatrix();
            this.grey.apply();
            this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);

            this.scene.rotate(this.degToRad(-ang*10), 0, 0, 1);
            this.scene.translate(1.3, 0, -3);
            this.scene.rotate(0, 0, 1, 0);
            this.scene.rotate(this.degToRad(-2.5*ang*2), 0, 0, 1);
            this.scene.scale(1.5, 1, 1);
            this.scene.rotate(Math.PI, 0, 1, 0);

            this.wingL.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.grey.apply();
            this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);

            this.scene.rotate(this.degToRad(ang*10), 0, 0, 1);
            this.scene.translate(-1.3, 0, -3);
            this.scene.rotate(0, 0, 1, 0);
            this.scene.rotate(this.degToRad(2.5*ang*2), 0, 0, 1);
            this.scene.scale(1.5, 1, 1);
            this.scene.rotate(Math.PI, 0, 1, 0);

            this.wingR.display();
        this.scene.popMatrix();
        if(this.eggCatch){
            this.egg.pos[0] = this.position[0];
            this.egg.pos[1] = this.position[1]-3;
            this.egg.pos[2] = this.position[2];
            this.egg.display();
        }
        

        this.scene.popMatrix();
    }

    move(time){
        this.position[2] -= Math.cos(-this.degToRad(this.orientation % 360)) * (this.speed * time / (1000/this.fps));
        this.position[0] += Math.sin(-this.degToRad(this.orientation % 360)) * (this.speed * time / (1000/this.fps));
    }

    updateSpeed(dir){
        if(dir < 0){
            this.speed += this.acceleration;
            if(this.speed > this.maxSpeed){
                this.speed = this.maxSpeed;
            }
        }
        else{
            this.speed -= this.acceleration;
            if(this.speed < -this.maxSpeed){
                this.speed = -this.maxSpeed;
            }
        }

    }

    turn(v){
        this.orientation += ((this.acceleration * this.fps ) * 100 + 200) / this.fps * Math.sign(-v);
    }
}