var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_collided;
var ground, invisibleGround, groundImage;

var conesGroup, coneImage;
var conesGroup, cone1, cone2, cone3, cone4, cone5, cone6;

var score=0;

var gameOver, restart;



function preload(){
  boy_running = loadAnimation("assets/boy1.png","assets/boy2.png")
  
  groundImage = loadImage("assets/ground2.png");
  
  coneImage = loadImage("assets/cone.png");
  
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  boy = createSprite(50,180,20,50);
  boy.addAnimation("running", boy_running);
  boy.scale = 0.3;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  conesGroup = new Group();

  score = 0;
}

function draw() {
  //boy.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

     gameOver.visible = false;
    restart.visible = false;
    
  
    if(keyDown("space") && boy.y >= 100) {
      boy.velocityY = -10;
    }
  
    boy.velocityY = boy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    boy.collide(invisibleGround);
    spawncones();
  
    if(conesGroup.isTouching(boy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    conesGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    conesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawncones() {
  if(frameCount % 60 === 0) {
    var cone = createSprite(600,165,10,40);
    //cone.debug = true;
    cone.velocityX = -(6 + 3*score/100);
    cone.addImage(coneImage);
    
    
    //assign scale and lifetime to the cone           
    cone.scale = 0.3;
    cone.lifetime = 300;
    //add each cone to the group
    conesGroup.add(cone);
  }
}

 


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  conesGroup.destroyEach();
  conesGroup.destroyEach();
  
  boy.changeAnimation("running",boy_running);
  
 
  
  score = 0;
  
}