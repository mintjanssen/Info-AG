let kugel;


function setup() {
  createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES)
	
	kugel = {
		x : width * 0.5,
		y : height * 0.9,
		vel : 8,
		size : 20,
		direction : -50,
		changedirection : 2,
		rolling : false,
		
		
		update : function() {
			if(this.rolling == false) {
				this.x = mouseX;
				this.direction += this.changedirection;
			
				if (abs(this.direction) > 80)
					this.changedirection *= -1;
			}
			
			if(this.rolling == true) {
				this.x -= this.vel * cos(this.direction + 90);
				this.y -= this.vel * sin(this.direction + 90);
			
				if(this.x < this.size) {
					this.direction *= -1;
				}
				if(this.x > width - this.size) {
					this.direction *= -1;
				}
			}
		},
		
		render : function() {
			push();
			translate(this.x, this.y);
			rotate(this.direction);
			if (this.rolling == false) {
				triangle(-this.size, -this.size * 2, this.size, -this.size * 2, 0, -4 * this.size);
			}
			ellipse(0, 0, this.size * 2);
			pop();
		}
	}
}

function draw() {
	background(255);
	
	kugel.update();
	kugel.render();
	
	if (mouseIsPressed) {
		kugel.rolling = true;
	}
	
	text(kugel.direction, 10, 10);
}


function touchMoved() {
  return false;
}