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

function writeBotData(x, y, z, rotx, roty, rotz, botid) {

    database.ref('bots/' + botid).set({
        x: x,
        y: y,
        z: z,
        rotx: rotx,
        roty: roty,
        rotz: rotz
    });
}

// function writeBotData(x, y, z, botid) {

//     database.ref('bots/' + botid).set({
//         x: x,
//         y: y,
//         z: z
//     });
// }

var InitializeWithNumBots = function(num){
database.ref('info').set({
    numbots: num,
    botsinitialized: false,
    activecamera: "NA"
});
}



var setIntializeTrue = function(){
    database.ref("info/botsinitialized").set(true);
}

var setIntializeFalse = function(){
    database.ref("info/botsinitialized").set(false);
}