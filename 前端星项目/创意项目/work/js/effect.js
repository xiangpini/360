let effect = {
  init(canvas){
var ctx = canvas.getContext("2d");
var body = [];

/*var mouse_pos_x = canvas.width/2;
var mouse_pos_y = canvas.height/2;*/
var mouse_pos_x = canvas.width;
var mouse_pos_y = canvas.height;
var delta = 1;
var step = 0;
var loop = 0;
var line = 0;
var lineMax = 20;
var lineMin = 5;
var TWO_PI = 2 * Math.PI;
var t = 0;
var animate = true;
var op = 1;

var bodyLength = 20;

var red = [];
var grn = [];
var blu = [];

center = 128;
width = 127;
frequency1 = 0.3;
frequency2 = 0.3;
frequency3 = 0.3;

phase1 = 0;
phase2 = 2;
phase3 = 4;

for (s = 0; s < bodyLength; s++) {
  red[s] = Math.round(Math.sin(frequency1*s + phase1) * width + center);
  grn[s] = Math.round(Math.sin(frequency2*s + phase2) * width + center);
  blu[s] = Math.round(Math.sin(frequency3*s + phase3) * width + center);
}

size = Math.min(canvas.width, canvas.height)/50;
//See below
var startX = canvas.width/2 + size * (16 * Math.sin(0) * Math.sin(0) * Math.sin(0));
var startY = canvas.height - (canvas.height/2 + ( size *( 13 * Math.cos(0)  - 5 * Math.cos(0) - 2 * Math.cos(0) - Math.cos(0))));

for (i = 0; i < bodyLength; i++) {
  var b = {
    x: startX,
    y: startY
  };
  body.push(b);
}

//****** DRAW ******//

function draw() {
  
  t += 0.08;
  t = t % TWO_PI;

    if(line <= lineMin){
      op = 1;
      line = lineMin+1;
    }
    if(line >= lineMax){
      op = -1;
      line = lineMax-1;
    }
    loop++;
    if(loop == 5){
      step++;
      step = step % bodyLength;
      loop = 0;
    }
  
  line = op + line;
  
  if(animate){
    size = Math.min(canvas.width, canvas.height)/50;
    //Heart curve from:
    mouse_pos_x = canvas.width/2 + size * (16 * Math.sin(t) * Math.sin(t) * Math.sin(t));
    mouse_pos_y = canvas.height - (canvas.height/2 + ( size * ( 13 * Math.cos(t)  - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))));
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (i = (body.length-1); i > 0; i--) {
    body[i].x = body[i-1].x;
    body[i].y = body[i-1].y;
  } 
  body[0].x = mouse_pos_x;
  body[0].y = mouse_pos_y;

  ctx.lineWidth = line; 
  ctx.strokeStyle = "rgb("+red[step]+","+grn[step]+","+blu[step]+")";
  ctx.fillStyle = "rgb("+red[step]+","+grn[step]+","+blu[step]+")";
  
  //Draw leading circle
  ctx.beginPath();
  ctx.arc((body[0].x), (body[0].y), line/2, 0, TWO_PI);
  ctx.fill();
  
  //Draw line
  ctx.beginPath();
  ctx.moveTo(body[0].x, body[0].y);

  for(s = 0; s < body.length - 2; s++){

    //Bezier curve along points taken from: 

    var xc = (body[s].x + body[s+1].x) / 2;
    var yc = (body[s].y + body[s+1].y) / 2;
    ctx.quadraticCurveTo(body[s].x, body[s].y, xc, yc);
  }
  ctx.stroke();
  
  //Draw trailing circle
  ctx.beginPath();
  ctx.arc(xc, yc, line/2, 0, TWO_PI);
  ctx.fill();

  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
  }
}