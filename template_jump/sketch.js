const GRAVITY = 0.9;	// Erdanziehung
const FRICTION = 0.85;	// Reibung verlangsamt die Bewegung in x-Richtung. Kleiner Werte = hohe Reinung
const JUMP = 25;	// Legt die Höhe des Sprungs fest.

let player;	// Objekt player
let ground;	// Höhe des Bodens

let arrows;	// Speicherplatz für das Bild der Steuerpfeile


function preload() {	// Diese Funktion wird noch vor Setup() einmal ausgeführt.
	arrows = loadImage("arrows.jpg");	// Das Bild der Steuerpfeile wird geladen.
}


function setup() {
  createCanvas(windowWidth, windowHeight);
	
	strokeWeight(10);
  
	ground = height * 0.7;
	
	player = {	// Das Objekt player wird erstellt.
		x : 100,
		y : 0,
		velx : 0,
		vely : 0,
		pwidth : 40,
		pheight : 90,
		jumping : 0,
		
		// Die Position wird berechnet.
		update : function() {
			// Geschwindigkeiten werden geändert.
			this.velx *= FRICTION;
			this.vely += GRAVITY;
			
			// Position wird durch die Geschwindigkeiten verändert.
			this.x += this.velx;
			this.y += this.vely;
			
			// Stößt die Spielfigur an den Rand des Bildschirms, wird die Geschwindigkeit umgekehrt.
			if(this.x > width - this.pwidth * 0.5) {
				this.velx *= -1;
				this.x = width - this.pwidth * 0.5;
			}
			if(this.x < this.pwidth * 0.5) {
				this.velx *= -1;
				this.x = this.pwidth * 0.5;
			}
			
			// Fällt die Spielfigur auf den Boden, wird die Geschwindigkeitin y-Richtung auf null gesetzt und der Zustand des Springens in jumping gespeichert.
			if(this.y > ground - this.pheight * 0.5) {
				this.y = ground - this.pheight * 0.5;
				this.vely = 0;
				this.jumping = 0;
			}
		},
		
		// Beim Springen wird die Geschwindigkeit in y-Richtung auf JUMP gesetzt und der Zustand des Springens in jumping gespeichert.
		jump : function() {
			if(this.jumping == 0) {
				this.vely = -JUMP;
				this.jumping = 1;
			}
		},
		
		// Beim Bewegen wird die Geschwindigkeit in x-Richtung um direction erhöht.
		move : function(direction) {
			this.velx += direction;
		},
		
		// Die Spielfigur wird gezeichnet.
		render : function() {
			push();
			rectMode(CENTER);
			fill(200, 0, 0);
			noStroke();
			rect(this.x, this.y, this.pwidth, this.pheight);
			pop();
		}
	}
}

function draw() {
	background(255);
	
	line(0, ground, width, ground);
	
	// Steuerung:
	if(mouseIsPressed && mouseY > ground) {
		if(mouseX > width * 0.66) {
			if(player.jumping == 0) {
				player.move(2);
			} else {
				player.move(1);
			}
		}
		else if(mouseX < width * 0.33) {
			if(player.jumping == 0) {
				player.move(-2);
			} else {
				player.move(-1);
			}
		}
	
		if(mouseY < ground + (height - ground) * 0.5) {
			player.jump();
		}
	}
	
	player.update();	// Position der Spielfigur wird berechnet.
	player.render();	// Die Spielfigur wird gezeichnet.
	
	image(arrows, 0, ground, width, height - ground);	// Die Steuerelemente werden dargestellt.
}


function touchMoved() {
  return false;	// Auf dem Touchscreens wird das Verschieben des Fensters deaktiviert.
}