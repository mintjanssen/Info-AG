let box;


function setup() {
  createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES)
	
	box = {
		direction : 4,
		right_rotation : false,
		left_rotation : false,
		angle: 360,
		size : 80,
		speed : 3,
		
		update : function() {
			if(this.right_rotation) {
				this.angle += this.speed;
				if(this.angle >= this.direction * 90) {
					this.right_rotation = false;
					this.angle = this.direction * 90;
				}
			} else if(this.left_rotation) {
				this.angle -= this.speed;
				if(this.angle <= this.direction * 90) {
					this.left_rotation = false;
					this.angle = this.direction * 90;
				}
			} else {
				if(mouseIsPressed && mouseX > width * 0.5) {
					this.right_rotation = true;
					this.direction += 1;
					if(this.direction > 4) {
						this.direction = 1;
						this.angle -= 360;
					}
				} else if(mouseIsPressed && mouseX < width * 0.5) {
					this.left_rotation = true;
					this.direction -= 1;
					if(this.direction < 1) {
						this.direction = 4;
						this.angle += 360;
					}
				}
			}
		},
		
		render : function() {
			push();
			translate(width * 0.5, height * 0.5);
			rotate(this.angle);
			fill(230, 0, 0);
			triangle(0, 0, -this.size, -this.size, this.size, -this.size);
			fill(0, 230, 0);
			triangle(0, 0, this.size, -this.size, this.size, this.size);
			fill(0, 0, 230);
			triangle(0, 0, -this.size, this.size, this.size, this.size);
			fill(230, 230, 0);
			triangle(0, 0, -this.size, -this.size, -this.size, this.size);
			pop();
		}
	}
}

function draw() {
	background(255);
	
	box.update();
	box.render();
	
	text(box.direction, 10, 10);
}
