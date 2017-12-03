class Bot {
    constructor(num) {
        this.x = -2;
        this.y = 4;
        this.z = 4;
        this.rotx = 0;
        this.roty = 0;
        this.rotz = 0;
        //$('#moving-box').append("<a-sphere class='bot' color='black' radius='0.3' id='bot" + num + "' position='" + this.x + " " + this.y + " " + this.z + "'></a-sphere>");
        var thisbot = document.createElement('a-obj-model');
        thisbot.setAttribute('id', `bot${num}`);
        thisbot.setAttribute('src', `#eyeball-obj`);
        thisbot.setAttribute('mtl', `#eyeball-mtl`);
        $('#bot-container').append(thisbot);

        this.id = "bot" + num;
        this.obj = document.getElementById(this.id);    
        this.obj.flushToDOM();
        this.currentCamera = false;

    }
    move(x, y, z, rotx, roty, rotz) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotx = rotx;
        this.roty = roty;
        this.rotz = rotz;
        //this.obj.setAttribute('position', {x: x, y: y, z: z - 4});
        this.obj.setAttribute('position', {x: x, y: y, z: z});
        this.obj.setAttribute('rotation', {x: rotx, y: roty, z: rotz});
        this.obj.flushToDOM();
        if(this.currentCamera){
             var cam = document.getElementById("active-camera");
            cam.setAttribute("position", { x: x, y: y, z: z + 0.2});
            cam.flushToDOM(); 
        }
    }
}

class BotContainer{
        constructor() {
        this.id = "bot-container";
        this.obj = document.getElementById(this.id);  
        console.log(this.obj);
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotx = 0;
        this.roty = 0;
        this.rotz = 0;
        this.obj.flushToDOM();
    }
    move(x, y, z, rotx, roty, rotz) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotx = rotx;
        this.roty = roty;
        this.rotz = rotz;
        this.obj.setAttribute('position', {x: x , y: y + 1.5, z: z- 1});
        this.obj.setAttribute('rotation', {x: rotx, y: roty, z: rotz});
        this.obj.flushToDOM();
    }
}