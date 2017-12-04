class Bot {
    constructor(num) {
        var thisbot = document.createElement('a-obj-model');
        thisbot.setAttribute('id', `bot${num}`);
        thisbot.setAttribute('bot', "");
        thisbot.setAttribute('src', `#eyeball-obj`);
        thisbot.setAttribute('mtl', `#eyeball-mtl`);
        $('#bot-container').append(thisbot);

        this.id = "bot" + num;
        this.obj = document.getElementById(this.id);    
        this.obj.flushToDOM();
        this.currentCamera = false;
    }
}
