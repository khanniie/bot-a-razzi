class WireBot {
    constructor(num) {
        this.x = -2;
        this.y = 4;
        this.z = 4;
        $('#bot-container').append("<a-obj-model class='bot' src='#sphere-obj' id='bot" + num + "' position='" + this.x + " " + this.y + " " + this.z + "'></a-obj-model>");
        // thisbot.setAttribute('color', `#${getRandomColor()}`);
        //$('#bot-container').append(thisbot);
        this.id = "bot" + num;
        this.obj = document.getElementById(this.id);    
        this.obj.flushToDOM();

    }
    move(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.obj.setAttribute('position', {x: 0.5*x, y: 0.5*y, z:0.5*z});
        this.obj.flushToDOM();
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