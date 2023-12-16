import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'showDiamond').name('Show Diamond');
        this.gui.add(this.scene, 'showTriangle').name('Show Triangle');
        this.gui.add(this.scene, 'showParallelogram').name('Show Parallelogram');
        this.gui.add(this.scene, 'showSmallTriangle1').name('Small Triangle 1');
        this.gui.add(this.scene, 'showSmallTriangle2').name('Small Triangle 2');
        this.gui.add(this.scene, 'showBigTriangle1').name('Big Triangle 1');
        this.gui.add(this.scene, 'showBigTriangle2').name('Big Triangle 2');
        this.gui.add(this.scene, 'showTangram').name('Show Tangram');
        this.gui.add(this.scene, 'showCube').name('Show UnitCube');
        this.gui.add(this.scene, 'showQuad').name('Show Quad');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}