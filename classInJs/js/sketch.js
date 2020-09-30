//*Create Bubbles:
/*
for (let i = 0; i<10;i++){
    let bubble+i.toString()
}
 
*/
let b = [];
for (let a = 0;a<50;a++){
    b.push(a);
}
//prompt(b.length);

function setup() {
  createCanvas(640, 480);
  bubble1 = new Bubble(61);
  bubble2 = new Bubble(60);
  for (let i = 0; i<b.length;i++){
      b[i]=new Bubble({NUM:i,MaxT:1});
  }
}

function draw(){
    background(0);
    bubble1.move();
    bubble1.show();    
    bubble2.move();
    bubble2.show();
    for(let i = 0; i<b.length;i++){
        b[i].move();
        b[i].show();
    }
}

function mousePressed(){
    for (let i = 0; i < b.length;i++){
        b[i].clicked(mouseX,mouseY);
    }
}

function touchStarted(){
    for (let i = 0; i < b.length;i++){
        b[i].clicked(mouseX,mouseY);
    }
}

class Bubble{
    constructor({NUM,MaxT=3}={}){
        this.x = random(20,620);
        this.y = random(20, 460);
        this.r = 24;
        this.color = [random(0,255),random(0,255),random(0,255)];
        this.col = color(255,150);
        this.nTouch = 0;
        this.num = NUM;
        this.maxTouches = MaxT;
    }

    show(){
        stroke(this.color[0],this.color[1],this.color[2]);
        strokeWeight(4);
        fill(this.col);
        ellipse(this.x,this.y,this.r,this.r); 
    }
    move(){
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
    }
    clicked(px,py){
        let d = dist(px,py,this.x, this.y);
        if(d<this.r){
            console.log("click works!");
            console.log(this.num);
            this.col = color(255,0,200);
            this.nTouch ++;
            if (this.nTouch > this.maxTouches){
                removeBubble(this.num);
            }
        }
    }
}


function removeBubble(n){
    for (let i = 0; i<b.length;i++){
        if (b[i].num == n){
            b.splice(i,1);
        }
    }
}




/*
function display(){
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(bubble.x,bubble.y,24,24);
}

function move(){
    bubble.x = bubble.x + random(-5, 5);
    bubble.y = bubble.y + random(-5, 5);
}
*/








/*

alert(typeof(bubble))

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
*/