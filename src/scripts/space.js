let c = document.querySelector("#main");
let ctx = c.getContext("2d");

//array of 100 dots to start 
    let dots = [];
    let dotspeed = 2;
    let wiggleX = 1000;
    let wiggler = 1;
    for(let i=0; i<5000; i+=5){
        //x
       
        
        dots[i+2] = (1-Math.random()*2)*(Math.random()*dotspeed+2);
        dots[i] = 1000 + dots[i+2]*200;
        dots[i+3] = (1-Math.random()*2)*(Math.random()*dotspeed+2);
        dots[i+1] = 500 + dots[i+3]*200;
        dots[i+4] = (Math.random()*100)/1000;
    }
   
    const assignDot = (loc) =>{
      
        dots[loc] = wiggleX;
        dots[loc+2] = (1-Math.random()*2)*(Math.random()*dotspeed+5);
  
        dots[loc+1] = 500;
        dots[loc+3] = (1-Math.random()*2)*(Math.random()*dotspeed+5);
        dots[loc+4] = 0;

        if(wiggleX>=1300){
            wiggler = -0.1;
        }
        if(wiggleX<=700){
            wiggler = 0.1;
        }
        wiggleX+=wiggler;
    }
    export const draw = ()=>{
        requestAnimationFrame(draw);
        ctx.clearRect(0,0,c.width,c.height);
        //update dots
        for(let i = 0; i<5000; i+=5){
            let x = dots[i];
            let y = dots[i+1];
            let xV = dots[i+2];
            let yV = dots[i+3];
            //increment the dots;
            x+=xV;
            y+=yV;
            
            
            dots[i] = x;
            dots[i+1] = y;
            //increment alpha
            //if alpha goes over.6 reassign
            if(dots[i+4] < 0.3){
            dots[i+4] += 0.001;
            }else{
                assignDot(i);
            }
            //if they are offscreen reassign;
            if((x>2000 || x<0 || y>1000 || y<0))
                assignDot(i);
            
            //draw them
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.globalAlpha = dots[i+4];
            ctx.arc(dots[i],dots[i+1],5,0,2*Math.PI);
            ctx.fill();
        }
    }