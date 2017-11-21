// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8B8P-Bejr47q3FzLG7KO3EF-CvHp6028",
    authDomain: "bot-a-razzi.firebaseapp.com",
    databaseURL: "https://bot-a-razzi.firebaseio.com",
    projectId: "bot-a-razzi",
    storageBucket: "",
    messagingSenderId: "24375466887"
};

firebase.initializeApp(config);
var database = firebase.database();
database.ref('bots').remove();

function writeBotData(x, y, z, botid) {

    database.ref('bots/' + botid).set({
        x: x,
        y: y,
        z: z
    });
}

var numbots = 10;

database.ref('info').set({
    numbots: numbots,
    botsinitialized: false,
    activecamera: "NA"
});

var setIntializeTrue = function(){
    database.ref("info/botsinitialized").set(true);
}

var setIntializeFalse = function(){
    database.ref("info/botsinitialized").set(false);
}
