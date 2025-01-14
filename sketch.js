const symbolSize=26;
// var mySymbol;
// var stream;
var streams=[];

function setup() {
    createCanvas(windowWidth,windowHeight);
    background(0);
  
//   mySymbol=new RedPill(
//     width/2,
//     0,
//     random(1,5));
//   mySymbol.setValueRandom();

    var x = 0;
    var y = random(-1500,0);
    for (var i = 0; i <= width/symbolSize; i++){
        var stream = new Stream();
        stream.generateSymbols(x,y);
        streams.push(stream);
        x+=symbolSize;
    }

    // stream=new Stream();
    // stream.generateSymbols();
    textSize(symbolSize);
}

function draw() {
    //opacity default set to 255 ( fully opaque) and 0 is transparent entirely
    background(0,100);
//   mySymbol.renderMatrix();
//   stream.renderingMatrix();

    streams.forEach((stream)=>{
        stream.renderingMatrix();
    })

}

class RedPill{
  constructor(x, y, speed){
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
  
//   renderMatrix(){
//     fill(0,255,70);
//     text(this.value,this.x,this.y)
//     this.rain();
//     this.setValueRandom();
    
//   }
  
  rain(){
      // if(this.y>=height){
      //   this.y=0;
      // }
      // this.y+=this.speed;

      //we in da big leagues now
      this.y=(this.y>=height)? 0: this.y+=this.speed;
  }
    
  
  
}

class Stream{
    constructor(){
        this.symbols=[];
        this.totalSymbols=round(random(5,30));
        this.speed=random(5,20);
    }

    generateSymbols(x,y){
        var first=true;
        for(var i = 0; i <= this.totalSymbols; i++){

            var symbol = new RedPill(x,y,this.speed,first);
            symbol.setValueRandom();
            this.symbols.push(symbol);

            //we want to decrement y by the symbol size to sort of set the next symbol directly above it instead of the the same place, theyre stacked
            y-=symbolSize;
            first=false;

        }

    }


    //there is more than 1 way to skin a cat 
    renderingMatrix(){
        this.symbols.forEach((symbol)=>{
            fill(0,255,70);
            text(symbol.value,symbol.x,symbol.y)
            symbol.rain();
            symbol.setValueRandom();
            
        });
    }

}


