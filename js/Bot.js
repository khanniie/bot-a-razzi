class Bot {
    constructor(num) {
        this.x = -2;
        this.y = 4;
        this.z = 4;
        //$('#moving-box').append("<a-sphere class='bot' color='black' radius='0.3' id='bot" + num + "' position='" + this.x + " " + this.y + " " + this.z + "'></a-sphere>");
        var thisbot = document.createElement('a-obj-model');
        thisbot.setAttribute('id', `bot${num}`);
        thisbot.setAttribute('src', `#eyeball-obj`);
        thisbot.setAttribute('mtl', `#eyeball-mtl`);
        $('#moving-box').append(thisbot);

        this.id = "bot" + num;
        this.obj = document.getElementById(this.id);    
        this.obj.flushToDOM();
        this.currentCamera = false;

    }
    move(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.obj.setAttribute('position', {x: x, y: y, z: z - 4});
        this.obj.flushToDOM();
        if(this.currentCamera){
             var cam = document.getElementById("active-camera");
            cam.setAttribute("position", { x: x, y: y - 1.2 , z: z - 4});
            cam.flushToDOM(); 
        }
    }
    updateX(x) {
        this.x = x;
    }
    updateY(y) {
        this.y = y;
    }
    updateZ(z) {
        this.z = z;
    }
}