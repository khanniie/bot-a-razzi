class Bot {
    constructor(num) {
        var thisbot = document.createElement('a-collada-model');
        thisbot.setAttribute('id', `bot${num}`);
        thisbot.setAttribute('bot', "");
        thisbot.setAttribute('src', `#bot-dae`);
        $('#bot-container').append(thisbot);

        this.id = "bot" + num;
        this.obj = document.getElementById(this.id);    
        this.obj.flushToDOM();
        this.currentCamera = false;
    }
}
