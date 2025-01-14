var mySymbol;
const symbolSize=50;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  mySymbol=new RedPill(
    width/2,
    0,
    random(1,5));
  mySymbol.setValueRandom();
  textSize(symbolSize);
}

function draw() {
  background(0);
  mySymbol.renderMatrix();
}

class RedPill{
  constructor(x,y,speed){
    this.x=x;
    this.y=y;
    this.value='yo';
    this.speed=speed;
    this.switchInterval=round(random(2,20));
  }
  
  
  // frameCount: A Number variable that tracks the number of frames drawn since the sketch started.
  // frameCount's value is 0 inside setup(). It increments by 1 each time the code in draw() finishes executing.
  // reset the value every nth frame, nth being the switchInterval
  // if switchInterval is 10, every1 10th frame this func gets executed.
  
  setValueRandom(){
    if(frameCount % this.switchInterval == 0){  
      this.value=String.fromCharCode(
        0x30A0 + round(random(0, 96)));
    }
    
  }
  
  renderMatrix(){
    fill(0,255,70);
    text(this.value,this.x,this.y)
    this.rain();
    this.setValueRandom();
    
  }
  
  rain(){
      // if(this.y>=height){
      //   this.y=0;
      // }
      // this.y+=this.speed;
      
      //we in da big leagues now
      this.y=(this.y>=height)? 0: this.y+=this.speed;
  }
  
  
  
  
}