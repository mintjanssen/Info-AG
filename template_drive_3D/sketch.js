let stripes = [];
const stripes_w = 50;
const stripes_h = 150;
const stripes_d = 1;
const stripes_count = 8;

let speed = 5;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(255);
	angleMode(DEGREES)
	for(let i = 0; i < stripes_count; i++) {
		stripes[i] = -height + i * stripes_h * 2;
	}
}

function draw() {
	background(255);
	rotateX(75);
	translate(-width * 0.5, -height * 2, 0);
	fill(230);
	rect(width * 0, 0, width * 1, 4 * height);
	rotateX(-90)
	fill(179, 220, 255);
	rect(-500, -600, width+1000, 600);
	rotateX(90)
	fill(240);
	
	for(let i = 0; i < stripes_count; i++) {
		push();
		translate(width * 0.5, stripes[i], 0);
		box(stripes_w, stripes_h, stripes_d);
		stripes[i] += speed;
		if(stripes[i] > stripes_h * (stripes_count * 1.5)) {
			stripes[i] = -height;
		}
		pop();
	}
	
	fill(0, 200, 0);
	translate(width * 0.5 + sin(frameCount % 360) * (width * 0.5 - 80), height * 2.5, 0)
	box(80, 120, 80);
}