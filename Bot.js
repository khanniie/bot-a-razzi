class Bot {
    constructor(num) {
        this.x = -2;
        this.y = 4;
        this.z = 4;
        $('#moving-box').append("<a-sphere class='bot' color='black' radius='0.3' id='bot" + num + "' position='" + this.x + " " + this.y + " " + this.z + "'></a-sphere>");
        this.id = "bot" + num;
        this.obj = document.getElementById(this.id);    
        this.obj.flushToDOM();

    }
    move(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.obj.setAttribute('position', {x: x, y: y, z:z});
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