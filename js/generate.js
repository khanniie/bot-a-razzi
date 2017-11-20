let sky = document.getElementById('thesky');

  //container for all bots. All bots flock around its position
  //eventually animate this to make it kinda follow the back of the person
var numBots = 10;
var botContainer = document.getElementById('bot-container');
var botElems = new Array();
var sendToDatabase = new Array();
var botsIntialized = false;


// get random hex color
function getRandomColor() {
  let letters = '0123456789abcdef';
  let randomColor = '';
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }
  return randomColor;
}

// set sky values
sky.setAttribute('color', `#${getRandomColor()}`);
//sky.setAttribute('animation__color', `property: color; dir: alternate; dur: 2000; easing: easeInOutSine; loop: true; to: #${getRandomColor()}`);

function justABall() {
  let circleElement = document.createElement('a-entity');
      circleElement.setAttribute('id', `ball`);
      circleElement.setAttribute('material', `color:#fff000; metalness: 0; roughness: 0`);
      circleElement.setAttribute('geometry', `primitive: sphere; radius: 1`);
      botContainer.appendChild(circleElement);
}


//justABall()
function generateBots() {
  for (var i=0; i<numBots; i++) {
    var thisbot = document.createElement('a-entity');
    thisbot.setAttribute('id', `bot${i}`);
    thisbot.setAttribute('geometry', `primitive: sphere; radius: 1`);
    thisbot.setAttribute('material', `color:#${getRandomColor()}; metalness: 0; roughness: 0`);
    botContainer.appendChild(thisbot);
    botElems[i] = thisbot;
  }
}

generateBots();

//-------------------------- p5 portion --------------------------------

var bots = new Array();
var containerPos;
var personPos;

var maxV = 0.05;
var maxA = 0.01;
var range = 5;

function setup() {
  noCanvas();
  containerPos = createVector(0,0,0);
  personPos = createVector(0,0,0);
  for(var i=0; i<numBots; i++){
    bots[i] = new Bot();
  }
}


function draw() {
  if(!botsIntialized){
    setIntializeTrue();
    botsIntialized = true;
  }
  
  personPos.y = containerPos.y-8;
  for(var i=0; i<numBots; i++){
    bots[i].update();
    assignBotsPosition();
  }
  assignContainerPosition();
} 

function assignContainerPosition() {//write this later
  botContainer.setAttribute('position', '0 0 0');
}

function assignBotsPosition() {
  for(var i=0; i<numBots; i++) {
    var x = bots[i].coord.x;
    var y = bots[i].coord.y;
    var z = bots[i].coord.z;
    botElems[i].setAttribute('position', `${x} ${y} ${z}`);
    writeBotData(x, y, z, "bot" + i);
  }
}

class Bot {
  constructor() {
    this.coord = createVector(random(-range,range),random(-range,range),random(-range,range));
    this.velocity = createVector(0,0,0);
    this.acceleration = createVector(0,0,0);
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
    var steer = p5.Vector.sub(containerPos, this.coord);
    steer.mult(0.05);
    return steer;
  }

  repVector() {
    var steer = p5.Vector.sub(this.coord, personPos);
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

window.onbeforeunload = function(){
    setIntializeFalse();
}

