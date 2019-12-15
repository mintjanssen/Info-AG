const GRAVITY = 0.5;

let player1;
let player2;
let balls1 = [];
let balls2 = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES)
	
	player1 = {
		x : width * 0.5,
		y : height * 0.5,
		size : width * 0.05,
		velx : 0,
		vely : 0, 
		friction : 0.9,
		direction : 360,
		moving : false,
		carryball : true,

		render : function() {
			push();
			translate(this.x, this.y);
			rotate(this.direction);
			let sizetri = this.size * 0.6;
			triangle(-sizetri, sizetri, sizetri, sizetri, 0, -sizetri * 2.8);
			ellipse(0, 0, this.size * 2);
			pop();
		},

		update : function() {
			this.velx *= this.friction;
			this.vely *= this.friction;
			
			if(abs(this.velx) < 0.1) 
				this.velx = 0;
			
			if(abs(this.vely) < 0.1) 
				this.vely = 0;
			
			if(this.velx == 0 && this.vely == 0) 
				this.moving = false;
			else
				this.moving = true;
			
			this.x += this.velx;
			this.y += this.vely;
			
			if(this.x < this.size) {
				this.velx *= -1;
				this.x = this.size;
			}
			
			if(this.x > width - this.size) {
				this.velx *= -1;
				this.x = width - this.size;
			}
			
			if(this.y < this.size) {
				this.vely *= -1;
				this.y = this.size;
			}
			
			if(this.y > height - this.size) {
				this.vely *= -1;
				this.y = height - this.size;
			}
			
			if(dist(this.x, this.y, player2.x, player2.y) < (this.size + player2.size)) {
				this.velx *= -1;
				this.vely *= -1;
			}
			
			if(this.moving) {
				let new_direction = atan2(this.vely, this.velx) + 90;
				new_direction %= 360;
				if(new_direction < 0)
					new_direction += 360;
				
				let direction_difference = new_direction - this.direction;

				if(direction_difference < -180)
					direction_difference += 360;

				if(direction_difference > 180)
					direction_difference -= 360;

				this.direction += direction_difference * 0.07;
				
				this.direction %= 360;
				if(this.direction < 0)
					this.direction += 360;
			}
			
			
		},

		move : function(pushx, pushy) {
			this.velx += pushx;
			this.vely += pushy;
		},

		throwBall : function() {
			if(this.carryball) {
				ball = new Ball(this.x, this.y, sqrt(this.velx * this.velx + this.vely * this.vely) + random(8, 12), this.size * 0.4, this.direction, 50);
				balls1.push(ball);
				this.carryball = false;
			}
		},
		
		checkHit : function(_ball) {
			if(dist(this.x, this.y, _ball.x, _ball.y) < (this.size + _ball.size))
				return true;
		}
	}

	player2 = {
		x : width * 0.5,
		y : height * 0.8,
		size : width * 0.05,
		velx : 0,
		vely : 0, 
		friction : 0.9,
		direction : 0,
		moving : false,
		carryball : true,

		render : function() {
			push();
			translate(this.x, this.y);
			rotate(this.direction);
			let sizetri = this.size * 0.6;
			triangle(-sizetri, sizetri, sizetri, sizetri, 0, -sizetri * 2.8);
			ellipse(0, 0, this.size * 2);
			pop();
		},

		update : function() {
			this.velx *= this.friction;
			this.vely *= this.friction;
			
			if(abs(this.velx) < 0.1) 
				this.velx = 0;
			
			if(abs(this.vely) < 0.1) 
				this.vely = 0;
			
			if(this.velx == 0 && this.vely == 0) 
				this.moving = false;
			else
				this.moving = true;
			
			this.x += this.velx;
			this.y += this.vely;
			
			if(this.x < this.size) {
				this.velx *= -1;
				this.x = this.size;
			}
			
			if(this.x > width - this.size) {
				this.velx *= -1;
				this.x = width - this.size;
			}
			
			if(this.y < this.size) {
				this.vely *= -1;
				this.y = this.size;
			}
			
			if(this.y > height - this.size) {
				this.vely *= -1;
				this.y = height - this.size;
			}
			
			if(dist(this.x, this.y, player1.x, player1.y) < (this.size + player1.size)) {
				this.velx *= -1;
				this.vely *= -1;
			}
			
			if(this.moving) {
				let new_direction = atan2(this.vely, this.velx) + 90;
				new_direction %= 360;
				if(new_direction < 0)
					new_direction += 360;
				
				let direction_difference = new_direction - this.direction;

				if(direction_difference < -180)
					direction_difference += 360;

				if(direction_difference > 180)
					direction_difference -= 360;

				this.direction += direction_difference * 0.07;
				
				this.direction %= 360;
				if(this.direction < 0)
					this.direction += 360;
			}
		},

		move : function(pushx, pushy) {
			this.velx += pushx;
			this.vely += pushy;
		},

		throwBall : function() {
			if(this.carryball) {
				ball = new Ball(this.x, this.y, sqrt(this.velx * this.velx + this.vely * this.vely) + random(8, 12), this.size * 0.4, this.direction, 50);
				balls2.push(ball);
				this.carryball = false;
			}
		},
		
		checkHit : function(_ball) {
			if(dist(this.x, this.y, _ball.x, _ball.y) < (this.size + _ball.size))
				return true;
		}
	}
}

function draw() {
	background(255);
	
	player1.update();
	player1.render();
	player2.update();
	player2.render();
	
	let force = 0.5;
	if(keyIsDown(RIGHT_ARROW))
		player1.move(force, 0);
	if(keyIsDown(LEFT_ARROW))
		player1.move(-force, 0);
	if(keyIsDown(UP_ARROW))
		player1.move(0, -force);
	if(keyIsDown(DOWN_ARROW))
		player1.move(0, force);	
	if(keyIsDown(ENTER))		
		player1.throwBall();

	if(keyIsDown(68))
		player2.move(force, 0);
	if(keyIsDown(65))
		player2.move(-force, 0);
	if(keyIsDown(87))
		player2.move(0, -force);
	if(keyIsDown(83))
		player2.move(0, force);	
	if(keyIsDown(32))		
		player2.throwBall();
	
	let player2_hit = false;
	
	for(let i = 0; i < balls1.length; i++) {
		balls1[i].update();
		balls1[i].render();
		if(player2.checkHit(balls1[i])){
			player2_hit = true;
			balls1.splice(i, 1);
		} else if(balls1[i].h < 0) {
			balls1.splice(i, 1);
		}
	}
	
	let player1_hit = false;
	
	for(let i = 0; i < balls2.length; i++) {
		balls2[i].update();
		balls2[i].render();
		if(player1.checkHit(balls2[i])){
			player1_hit = true;
			balls2.splice(i, 1);
		} else if(balls2[i].h < 0) {
			balls2.splice(i, 1);
		}
	}
	
	if(player1_hit || player2_hit)
		text("Treffer", 10, 50);
}



class Ball {
	constructor(_x, _y, _vel, _size, _direction, _h) {
		this.x = _x;
		this.y = _y;
		this.vel = _vel;
		this.size = _size;
		this.direction = _direction;
		this.h = _h;
		this.velh = random(8, 12);
	}
	
	
	update() {
		this.x -= this.vel * cos(this.direction + 90);
		this.y -= this.vel * sin(this.direction + 90);
		this.velh -= GRAVITY;
		this.h += this.velh;
		if (this.h < 0)
			this.h = -1;
	}
	
	render() {
		push();
		translate(this.x, this.y);
		rotate(this.direction);
		let scale = map(this.h, 0, 250, 1, 2);
		ellipse(0, 0, this.size * 2 * scale);
		pop();
		text(this.h, 10, 30)
	}
}



function keyReleased(){
	player1.carryball = true;
	player2.carryball = true;
}