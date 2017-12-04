//container for all bots. All bots flock around its position
  //eventually animate this to make it kinda follow the back of the person
var numBots = 6;
var person = document.getElementById('person');
var botContainer = document.getElementById('bot-container');
var distance;
var displacementY = 0.6;
var displacementZ = 2;
var botElems = new Array();
var botsIntialized = false;

InitializeWithNumBots(numBots);
//var sendToDatabase = new Array();


// get random hex color
function getRandomColor() {
  let letters = '0123456789abcdef';
  let randomColor = '';
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }
  return randomColor;
}

function generateBots() {
  for (var i=0; i<numBots; i++) {
    
    var thisbot = document.createElement('a-collada-model');
    thisbot.setAttribute('id', `bot${i}`);
    thisbot.setAttribute('src', `#bot-dae`);
    thisbot.setAttribute('look-at', `#person`)
    // thisbot.setAttribute('src', `#bot-obj`);
    // thisbot.setAttribute('mtl', `#bot-mtl`);

    // var thisbot = document.createElement('a-entity');
    // thisbot.setAttribute('id', `bot${i}`);
    // thisbot.setAttribute('geometry',"primitive: cone; radius-top:0; radius-bottom: 0.5; height:1;");
    //thisbot.setAttribute('color', `#${getRandomColor()}`);
    botContainer.appendChild(thisbot);
    botElems[i] = thisbot;
  }
}

//-------------------------- p5 portion --------------------------------

var bots = new Array();

var personPos;
var personRot;
var personPrev;
var jumped = false;

var maxV = 0.01;
var maxA = 0.002;
var range = 2.5;

var sounds;

function preload() {
  generateBots();
  sounds = new Array();
  sounds[0] = loadSound('sound/sound1.mp3');
  sounds[1] = loadSound('sound/sound2.mp3');
  sounds[2] = loadSound('sound/sound3.mp3');
  sounds[3] = loadSound('sound/sound4.mp3');
  sounds[4] = loadSound('sound/sound5.mp3');
}

function setup() {
  noCanvas();
  distance = Math.sqrt(sq(displacementY) + sq(displacementZ));
  for(var i=0; i<numBots; i++){
    bots[i] = new Bot(botElems[i]);
  }
  personPrev = createVector(0,0,0);
  personPos = createVector(0,0,0);

  var playDelay = function (sound) {
    setInterval(sound.play(), random(500, 5000));
  }
  for(var i=0; i<sounds.length; i++) {
    var thissound = sounds[i];
    thissound.onended(function(thissound){setInterval(thissound.play(), random(500, 3000))});
  }
  for(var i=0; i<sounds.length; i++) {
    sounds[i].play();
  }
}

function draw() {
  if(!botsIntialized){
    setIntializeTrue();
    botsIntialized = true;
  }

  personPrev = personPos;
  personRot = getRotation(person);
  personPos = getPosition(person);
  if(personPos.z>personPrev.z) jumped = true;
  else jumped = false;
  for(var i=0; i<numBots; i++){
    bots[i].update();
  }
  assignContainerPosition();
  assignBotsPosition();
} 

function getPosition(obj) {
  var pos = obj.getAttribute('position');
  if(pos==null) return createVector(0,0,0);
  else return createVector(pos.x, pos.y, pos.z);
}

function getRotation(obj) {
  var rot = obj.getAttribute('rotation');
  if(rot==null) return createVector(0,0,0);
  else return createVector(rot.x, rot.y);
}

function assignContainerPosition() {
  var prev = getPosition(botContainer);
  if(jumped) prev.z+=8;
  var thetaY = radians(personRot.y);
  var x = personPos.x -distance*sin(thetaY);
  var y = personPos.y + displacementY; //-distance*sin(thetaX);
  var z = personPos.z /*-distance*cos(thetaX)*/ -distance*cos(thetaY);
  var rotx = prev.x + (x-prev.x)*0.04;
  var roty = prev.y + (y-prev.y)*0.04;
  var rotz = prev.z + (z-prev.z)*0.04;
  botContainer.setAttribute('position', `${rotx} ${roty} ${rotz}`);
  writeBotData(x, y, z, rotx, roty, rotz, 'bot-container');
}

function assignBotsPosition() {
  for(var i=0; i<numBots; i++) {
    var x = bots[i].coord.x;
    var y = bots[i].coord.y;
    var z = bots[i].coord.z;
    var rotx = bots[i].rotation.x;
    var roty = bots[i].rotation.y;
    var rotz = bots[i].rotation.z;
    //if(i==0 && frameCount%10==0){console.log(rotx); console.log(botElems[i])}
    botElems[i].setAttribute('position', `${x} ${y} ${z}`);
    writeBotData(x, y, z, rotx, roty, rotz, "bot" + i);
  }
}

class Bot {
  constructor(ref) {
    this.coord = createVector(random(-range,range),random(-range,range),random(-range,range));
    this.velocity = createVector(0,0,0);
    this.acceleration = createVector(0,0,0);
    this.rotation = createVector(0,0,0);
    this.ref3d = ref.object3D;
    bots[bots.length] = this;
  }

  update() {
    //this.acceleration.add(this.cohVector());
    this.acceleration.add(p5.Vector.mult(this.aliVector(), 0.04));
    this.acceleration.add(p5.Vector.mult(this.sepVector(), 0.5));
    this.acceleration.add(p5.Vector.mult(this.folVector(), 0.02));
    //this.acceleration.add(p5.Vector.mult(this.repVector(), 0.01));
    this.velocity.add(this.acceleration);
    //this.velocity.limit(maxV);
    this.coord.add(this.velocity);
    this.acceleration.mult(0);
    this.rotation = this.calcRotation();
  }

  calcRotation() {
    var x = degrees(this.ref3d.rotation.x);
    var y = degrees(this.ref3d.rotation.y);
    var z = degrees(this.ref3d.rotation.z);
    // var z = 0;
    // var y = personRot.y;
    // var x = degrees(-PI + atan((displacementY)/(displacementZ)));
    return createVector(x, y, z);
  }

  aliVector() {
    //get avg velocity of all bots
    var avgV = createVector(0,0,0);
    var count = 0;
    for(var i=0; i<numBots; i++) {
      avgV.add(bots[i].velocity);
      count++;
    }
    if(count>0) {
      avgV.div(count);
      avgV.setMag(maxV);
      var steer = p5.Vector.sub(avgV, this.velocity);
      steer.limit(maxA);
      return steer;
    } else return createVector(0,0,0);//should never get here though.
  }

  cohVector() {
    var avg = this.avgPos();
    if(avg.mag()>0) {
      return this.moveTo(avg);
    } else return createVector(0,0,0);
  }

  avgPos() {
    var avgCoord = createVector(0,0,0);
    var count = 0;
    for(var i=0; i<numBots; i++) {
      var d = p5.Vector.dist(this.coord, bots[i].coord);
      if(d>0 && d<range) {
        avgCoord.add(bots[i].coord);
        count++;
      }
    }
    if(count>0) {
      avgCoord.div(count);
      return avgCoord;
    } else return createVector(0,0,0);
  }

  sepVector() {
    var steer = createVector(0,0,0);
    var count = 0;
    for( var i=0; i<numBots; i++) {
      var d = p5.Vector.dist(this.coord, bots[i].coord);
      if(d>0 && d<range) {
        var away = p5.Vector.sub(this.coord, bots[i].coord);
        away.normalize();
        away.div(d);
        steer.add(away);
        count++;
      }
    }
    if(count>0) steer.div(count);
    if(steer.mag()>0) {
      steer.setMag(maxV);
      steer.sub(this.velocity);
      //steer.mult(sq(d)*0.1);
      steer.limit(maxA);
    } 
    return steer;
  }

  folVector() {
    var steer = p5.Vector.sub(createVector(0,0,0), this.coord);
    steer.mult(0.05);
    return steer;
  }

  moveTo(target) {
    var difCoord = p5.Vector.sub(target, this.coord);
    difCoord.setMag(maxV);
    var steer = p5.Vector.sub(difCoord, this.velocity);
    steer.limit(maxA);
    return steer;
  }
}