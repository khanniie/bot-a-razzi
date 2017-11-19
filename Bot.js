class Bot {
    constructor(num) {
        this.obj = document.createElement("div");
        document.getElementById("container").appendChild(this.obj);
        console.log("new element", this.obj);
        this.obj.id = "bot" + num;
        this.id = this.obj.id;
        this.obj.classList.add("bot");
        this.x = 50;
        this.y = 50;
        this.z = 50;
    }
    move(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.obj.style.left = x;
        this.obj.style.top = y;
        this.obj.style.width = z;
        this.obj.style.height = z;
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