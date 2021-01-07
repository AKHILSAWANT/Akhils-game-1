var player;
var playerimg;
var playerreverseimg;
var playerjumpimg;
var playercrouchimg;
var playersprintimg;
var playerded;
var playerdedimg;
var playerfartimg;

var virus;
var virusimg;

var vb;
var vb2;
var sv;
var svGroup;
var svcount = 1;
var svimg;

var gameover;

var tun11img;
var tun2img;
var tun3img;
var tun1;
var tun2;
var tun3;

var backimg;
var back;

var ground;
var groundimg;
var invisibleground;

var sprint;
var next;

var sprintvalue = 0;
var jumpstate = 0;

var gameState = 1;

var gobacktext = 1;

function preload(){
groundimg = loadImage("ground.png")
playerimg  = loadImage("playerinv.png")
playerreverseimg = loadImage("playerinv1.png")
playerjumpimg = loadImage("player2.png")
playerdedimg = loadImage("ded.png")
playersprintimg = loadImage("playersprint.png")
playercrouchimg = loadImage("playercrouch2.png")
playerfartimg = loadImage("playerfartimg.png")
virusimg = loadImage("virus.png")
svimg = loadImage("spikeimg.png")
tun1img = loadImage("TUN1.png")

var backimg = loadImage("whiteback.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ground = createSprite(width/2, height/2+350, 10, 10)
  ground.addImage(groundimg)
  ground.scale = 1.8

  invisibleground = createSprite(width/2-500, height/2+300, 10000, 185)
  invisibleground.visible = false;
  
  sprint = createButton("SPRINT")
  sprint.position(width/2-450, height/2+250)

  next = createButton("NEXT")
  next.position(width/2, height/2+100)
  next.hide()

  back = createButton("BACK")
  back.position(width/2, height/2+100)
  back.hide()

  player = createSprite(width/2-500 , height/2+130, 10, 10)
  player.addImage(playerimg)
  player.scale = 0.7

  virus = createSprite(width/2+500, height/2, 10, 10)
  virus.addImage(virusimg)
  virus.scale = 0.2
  virus.velocityY = -3

  vb = createSprite(width/2+500, height/2-90, 10,10)
  vb.visible = false;
  vb2 = createSprite(width/2+500, height/2+160, 10,10)
  vb2.visible = false; 

  svGroup = new Group();

  tun1 = createSprite(width/2-50, height/2, 10, 10)
  tun1.addImage(tun1img)
  tun1.visible = false;
}

function draw() {
  background(255,255,255);  
if (gameState === 1){
  ground.velocityX = -7

  virus.bounceOff(vb)
  virus.bounceOff(vb2)

  if (World.frameCount % 60 === 0){
    sv = createSprite(virus.x-10, virus.y, 10, 10)
    sv.addImage(svimg)
    sv.scale = 0.2
    sv.velocityX = -5;
    svGroup.add(sv)
  }

  if (player.isTouching(svGroup)){
    player.destroy()
    gobacktext = 2
  }

  if (World.frameCount % 60 === 0){
  svcount = svcount+1
}
  if (invisibleground.x < 350){
    invisibleground.x = invisibleground.width/2;
  }

  if (ground.x < 350){
    ground.x = ground.width/2;
  }

  if (player.isTouching(virus)){
    player.visible = false;
    playerded = createSprite(width/2+500, height/2+200)
    playerded.addImage(playerdedimg)
    playerded.scale = 0.3
    player.position
    gobacktext = 2;
  }

  if (player.x === 0){
    player.destroy();
    gobacktext = 2
  }

  if (keyDown("a")){
    player.addImage(playerreverseimg)
    player.x = player.x-4
    player.velocityX = 0;
  }

  if (keyDown("d")){
    player.addImage(playerimg)
    player.x = player.x+4
    player.velocityX = 0;
  }

  if (keyDown("shift")){
    player.addImage(playercrouchimg)
    player.velocityX  = -2
    player.scale = 0.5
  }
  else{
    player.scale = 0.7
  }

  sprint.mousePressed(()=>{
    player.addImage(playersprintimg)
    player.x = player.x+200
    sprintvalue = sprintvalue+1
  })

  if (sprintvalue === 1){
    sprint.hide()
  }


  if (keyDown("space") && player.y >= height/2+50){
    player.addImage(playerjumpimg)
    player.velocityY = -12
  }

  if (player.collide(invisibleground)){
    player.addImage(playerimg)
  }

  if (player.y < height/2-55){
    player.velocityY = 10
  }

  player.collide(invisibleground) 

  if (svcount === 10){
    textSize(25)
    fill("yellow")
    text("YOU WON! PRESS NEXT")
    next.show()
  }

  next.mousePressed(()=>{
  gameState = 2;
  })
}

if (gobacktext === 2){
  textSize(25)
  textFont("cooper black")
  fill("red")
  text("YOU LOST. PRESS BACK TO RESTART", width/2-250, height/2)
  back.show()
  svcount.destroy()
}

back.mousePressed(()=>{
  gameState = 1;
})

if (gameState === 2){
   sprint.destroy();

  
   tun1.visible = true;
  }
  drawSprites()
}