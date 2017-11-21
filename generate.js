
  //container for all bots. All bots flock around its position
  //eventually animate this to make it kinda follow the back of the person
var numBots = 6;
var person = document.getElementById('person');
var botContainer = document.getElementById('bot-container');
var distance;
var displacementY = 0.8;
var displacementZ = 2.4;
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
    var thisbot = document.createElement('a-entity');
    thisbot.setAttribute('id', `bot${i}`);
    thisbot.setAttribute('geometry', `primitive: cone; radius-top: 0; radius-bottom: 0.5; height: 4`);
    thisbot.setAttribute('color', `#${getRandomColor()}`);
    botContainer.appendChild(thisbot);
    botElems[i] = thisbot;
  }
}
generateBots();

//-------------------------- p5 portion --------------------------------

var bots = new Array();

var personPos;
var personRot;
var personPrev;
var jumped = false;

var maxV = 0.05;
var maxA = 0.01;
var range = 5;

function setup() {
  noCanvas();
  distance = Math.sqrt(sq(displacementY) + sq(displacementZ));
  for(var i=0; i<numBots; i++){
    bots[i] = new Bot();
  }
  personPrev = createVector(0,0,0);
  personPos = createVector(0,0,0);
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
  var xx = prev.x + (x-prev.x)*0.05;
  var yy = prev.y + (y-prev.y)*0.05;
  var zz = prev.z + (z-prev.z)*0.05;
  botContainer.setAttribute('position', `${xx} ${yy} ${zz}`);
}

function assignBotsPosition() {
  for(var i=0; i<numBots; i++) {
    var x = bots[i].coord.x;
    var y = bots[i].coord.y;
    var z = bots[i].coord.z;
    var xx = bots[i].rotation.x;
    var yy = bots[i].rotation.y;
    var zz = bots[i].rotation.z;
    botElems[i].setAttribute('position', `${x} ${y} ${z}`);
    botElems[i].setAttribute('rotation', `${xx} ${yy} ${zz}`)
    writeBotData(x*0.1, y*0.1, z*0.1, "bot" + i);
  }
}

class Bot {
  constructor() {
    this.coord = createVector(random(-range,range),random(-range,range),random(-range,range));
    this.velocity = createVector(0,0,0);
    this.acceleration = createVector(0,0,0);
    this.rotation = createVector(0,0,0);
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
    var z = 0;
    var y = personRot.y;
    var x = degrees(PI/2 + atan(displacementY/displacementZ));
    var zz = this.rotation.z + (z-this.rotation.z)*0.1;
    var yy = this.rotation.y + (y-this.rotation.y)*0.1;
    var xx = this.rotation.x + (x-this.rotation.x)*0.1;
    return createVector(xx, yy, zz);
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
/*
  repVector() {
    var steer = p5.Vector.sub(this.coord, personPos);
    steer.mult(0.05);
    return steer;
  }*/

  moveTo(target) {
    var difCoord = p5.Vector.sub(target, this.coord);
    difCoord.setMag(maxV);
    var steer = p5.Vector.sub(difCoord, this.velocity);
    steer.limit(maxA);
    return steer;
  }
}


