//keyboard events
//capturing key presses and mouse buttons once
//press x and z or mouse left and right

let player;
let platform;

let GRAVITY = 1.0;
let JUMP = 4;

let stop_jump;



function preload() {
	
}

function setup() {
  createCanvas(windowWidth, windowHeight - 200);

  m_pressed = false;
  
  
  player = createSprite(width/2, height/2, 70, 94);
  
  player.addAnimation('normal', 'assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');

  
  player.addAnimation('jump', 'assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');


  //if defined, the collider will be used for mouse events
  player.setCollider('circle', 0, 0, 64);

  platform = createSprite(width/2, height - 50);
  platform.addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');
}

function draw() {
  background(10, 20, 255);

  player.velocity.y += GRAVITY;

  if(player.collide(platform)) {
    player.velocity.y = 0;
    player.changeAnimation('normal');
    if (!mouseIsPressed) {
    	stop_jump = false;
    }
  }

  if(mouseIsPressed && player.velocity.y > -20 && !stop_jump)
  {
    player.changeAnimation('jump');
    player.animation.rewind();
    player.velocity.y -= JUMP;
  }

	if (player.velocity.y < -20)
    	stop_jump = true;


  drawSprites();
}

function mouseReleased() {
		stop_jump = true;
}


function touchMoved() {
	return false;
}
