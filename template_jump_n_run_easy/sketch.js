const GRAVITY = 0.8;	// Erdanziehung
const FRICTION = 0.85;	// Reibung verlangsamt die Bewegung in x-Richtung. Kleiner Werte = hohe Reinung
const JUMP = 17;	// Legt die Höhe des Sprungs fest.

let player;	// Objekt player
let enemy; // Objekt enemy
let plattforms = [];
let ground;	// Höhe des Bodens


function setup() {
  createCanvas(windowWidth, windowHeight);
	
	strokeWeight(10);
  
	ground = height * 0.7;
	
	player = {	// Das Objekt player wird erstellt.
		x : width * 0.5,
		y : 0,
		velx : 0,
		vely : 0,
		w : width * 0.07,
		h : height * 0.07,
		jumping : false,
		onground : false,
		
		// Die Position wird berechnet.
		update : function() {
			// Geschwindigkeiten werden geändert.
			this.velx *= FRICTION;
			this.vely += GRAVITY;
			
			// Position wird durch die Geschwindigkeiten verändert.
			this.x += this.velx;
			this.y += this.vely;
			
			// Stößt die Spielfigur an den Rand des Bildschirms, wird die Geschwindigkeit umgekehrt.
			if(this.x > width - this.w * 0.5) {
				this.velx *= -1;
				this.x = width - this.w * 0.5;
			}
			if(this.x < this.w * 0.5) {
				this.velx *= -1;
				this.x = this.w * 0.5;
			}
			
			// Fällt die Spielfigur auf den Boden, wird die Geschwindigkeitin y-Richtung auf null gesetzt und der Zustand des Springens in jumping gespeichert.
			if(this.y > ground - this.h * 0.5) {
				this.y = ground - this.h * 0.5;
				this.vely = 0;
				this.jumping = false;
				this.onground = true;
			}
		},
		
		// Beim Springen wird die Geschwindigkeit in y-Richtung auf JUMP gesetzt und der Zustand des Springens in jumping gespeichert.
		jump : function() {
			if(this.jumping == false && this.onground == true) {
				this.vely = -JUMP;
				this.jumping = true;
				
				for(plf of plattforms)
					plf.holding_player = false;
			}
		},
		
		// Beim Bewegen wird die Geschwindigkeit in x-Richtung um direction erhöht.
		move : function(direction) {
			this.velx += direction;
		},
		
		plattformCheck : function(pf) {
			let left = this.x - this.w * 0.5;
			let right = this.x + this.w * 0.5;
			let left_pf = pf.x - pf.w * 0.5;
			let right_pf = pf.x + pf.w * 0.5;

			let bottom = this.y + this.h * 0.5;
			let top = this.y - this.h * 0.5;
			let bottom_pf = pf.y + pf.h * 0.5;
			let top_pf = pf.y - pf.h * 0.5;

			if(left < right_pf && right > left_pf) {
				if(top < top_pf && bottom >= top_pf && bottom < bottom_pf) {
					if(!(this.jumping == true && this.vely < 0)) {
						this.y = pf.y - (pf.h + this.h) * 0.5;
						this.vely = 0;
						this.jumping = false;
						this.onground = true;
						pf.holding_player = true;
					}
				}
			} else if(pf.holding_player == true) {
				pf.holding_player = false;
				this.onground = false;
			}
		},
		
		reset : function() {
			this.x = width * 0.5;
			this.y = ground - this.h * 0.5;
			this.velx = 0;
			this.vely = 0;
			this.jumping = false;
			this.onground = true;
			for(plf of plattforms)
				plf.holding_player = false;
		},
		
		// Die Spielfigur wird gezeichnet.
		render : function() {
			push();
			rectMode(CENTER);
			fill(0, 200, 0);
			noStroke();
			rect(this.x, this.y, this.w, this.h);
			pop();
		}
	}
	
	enemy = {
		x : width * 0.7,
		y : ground * 0.8,
		velx : -3,
		vely : -2,
		w : width * 0.1,
		h : width * 0.1,
		
		update : function() {
			// Geschwindigkeiten werden geändert.
// 			this.velx *= FRICTION;
// 			this.vely += GRAVITY;
			
			// Position wird durch die Geschwindigkeiten verändert.
			this.x += this.velx;
			this.y += this.vely;
			
			// Stößt der Gegner an den Rand des Bildschirms, wird die Geschwindigkeit umgekehrt.
			if(this.x > width - this.w * 0.5) {
				this.velx *= -1;
				this.x = width - this.w * 0.5;
			}
			if(this.x < this.w * 0.5) {
				this.velx *= -1;
				this.x = this.w * 0.5;
			}
			
			if(this.y > ground - this.h * 0.5) {
				this.vely *= -1;
				this.y = ground - this.h * 0.5;
			}
			if(this.y < this.h * 0.5) {
				this.vely *= -1;
				this.y = this.h * 0.5;
			}
		},
		
		reset : function() {
			this.x = width * 0.7;
			this.y = ground * 0.8;
			this.velx = -3;
			this.vely = -2;
		},
		
		render : function() {
			push();
			rectMode(CENTER);
			angleMode(DEGREES);
			fill(180 + 70 * sin(frameCount % 90 * 4), 0, 0);
			noStroke();
			rect(this.x, this.y, this.w, this.h);
			pop();
		}
	}
	
	for(let i = 0; i < 3; i++) {
		plattforms[i] = {
			x : width * 0.3 + i * width * 0.3,
			y: ground * 0.7 - i * ground * 0.3,

			w : width * 0.3,
			h : width * 0.07,

			holding_player : false,

			render : function() {
				push();
				rectMode(CENTER);
				fill(0, 0, 200);
				noStroke();
				rect(this.x, this.y, this.w, this.h);
				pop();
			}
		}
	}

}

function draw() {
	if(checkColission(player, enemy) == true) {
		background(220, 0, 0);
		player.reset();
		enemy.reset();
	} else {
		background(255);
	}
	
	// Steuerung:
	if(mouseIsPressed && mouseY > ground) {
		if(mouseX > width * 0.66) {
			if(player.jumping == 0) {
				player.move(1.5);
			} else {
				player.move(1);
			}
		}
		else if(mouseX < width * 0.33) {
			if(player.jumping == 0) {
				player.move(-1.5);
			} else {
				player.move(-1);
			}
		}
	
		if(mouseY < ground + (height - ground) * 0.5) {
			player.jump();
		}
	}

	for(plf of plattforms) {
		plf.render();
	}

	for(plf of plattforms)
		player.plattformCheck(plf);
	
	player.update();	// Position der Spielfigur wird berechnet.
	player.render();	// Die Spielfigur wird gezeichnet.
	
	enemy.update();	// Position des Gegners wird berechnet.
	enemy.render();	// Der Gegner wird gezeichnet.
	
	// der Boden wird gezeichnet.
	line(0, ground + 5, width, ground + 5);
	
}


function checkColission(object_a, object_b) {
	let left_a = object_a.x - object_a.w * 0.5;
	let right_a = object_a.x + object_a.w * 0.5;
	let left_b = object_b.x - object_b.w * 0.5;
	let right_b = object_b.x + object_b.w * 0.5;
	
	let bottom_a = object_a.y + object_a.h * 0.5;
	let top_a = object_a.y - object_a.h * 0.5;
	let bottom_b = object_b.y + object_b.h * 0.5;
	let top_b = object_b.y - object_b.h * 0.5;
	
	if(left_a < right_b && right_a > left_b) {
		if(top_a < bottom_b && bottom_a > top_b) {
 			return true;
		}
	}
}