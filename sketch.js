const symbolSize=26;
const fadeInterval=1.6;
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
    textFont('Consolas');
    textSize(symbolSize);
}

function draw() {
    //opacity default set to 255 ( fully opaque) and 0 is transparent entirely
    background(0,150);
//   mySymbol.renderMatrix();
//   stream.renderingMatrix();

    streams.forEach((stream)=>{
        stream.renderingMatrix();
    })

}

class RedPill{
    constructor(x, y, speed, first, opacity){
        this.x=x;
        this.y=y;
        this.value;

        this.speed=speed;
        this.first=first;
        this.opacity=opacity;
        
        this.switchInterval=round(random(2,20));

    }
  
  
  // frameCount: A Number variable that tracks the number of frames drawn since the sketch started.
  // frameCount's value is 0 inside setup(). It increments by 1 each time the code in draw() finishes executing.
  // reset the value every nth frame, nth being the switchInterval
  // if switchInterval is 10, every1 10th frame this func gets executed.
  
    setValueRandom(){
        var charType=round(random(0,5));
        if(frameCount % this.switchInterval == 0){  
            if(charType>1){
                //set it to Katakana
                this.value=String.fromCharCode(
                    0x30A0 + round(random(0, 96))
                );
            }
            else{
                //set it as numeric
                this.value=floor(random(0,10));
            }
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
        this.totalSymbols=round(random(5,35));
        this.speed=random(5,22);
    }

    generateSymbols(x,y){

        // var first=true;
        // instead of setting it to true for every single line
        var first = round(random(0,4)) == 1; // evaluate if num =1 if it is, then it gets evaluated to true
        var opacity=255;
        for(var i = 0; i <= this.totalSymbols; i++){
            var symbol = new RedPill(x,y,this.speed,first,opacity);
            symbol.setValueRandom();
            this.symbols.push(symbol);

            opacity -= (255 / this.totalSymbols) / fadeInterval;

            //we want to decrement y by the symbol size to sort of set the next symbol directly above it instead of the the same place, theyre stacked
            y-=symbolSize;
            first=false;
        }
    }

    //there is more than 1 way to skin a cat 
    renderingMatrix(){
        this.symbols.forEach((symbol)=>{
            if(symbol.first){
                fill(140,255,170,symbol.opacity);
            }
            else{
                fill(0,255,70,symbol.opacity);
            }
            text(symbol.value,symbol.x,symbol.y)
            symbol.rain();
            symbol.setValueRandom();    
        });
    }

}


