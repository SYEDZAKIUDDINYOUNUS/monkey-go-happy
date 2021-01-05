

var ground;
var monkey , monkey_running
var banana ,bananaImage,bananaGroup, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime = 0;
 
function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,1500,10)
  ground.velocityX = -4;
  ground.X=ground.width/2;
  console.log(ground.x)
   foodGroup = createGroup();
   obstacleGroup = createGroup();
}
   
  
function draw() {
background("green");
  
  if(keyDown("SPACE") && monkey.y > 300) {
    monkey.velocityY =-15;
  }
  monkey.velocityY = monkey.velocityY +0.8;
    if(ground.x<0  ){
      ground.x = ground.width/2
    }
    if( monkey.isTouching(obstacleGroup)){
       reset();
       }
    monkey.collide(ground);
    food();
    obstacles();
  textSize(20);
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime :"+survivalTime,200,20);
  drawSprites()
}function food(){
 if (frameCount%80 === 0) {
    var banana = createSprite(300,Math.round(random(120,200)),40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    

    
    foodGroup.add(banana);
    }
}
function obstacles(){
   if (frameCount % 250 === 0){
   var obstacle = createSprite(400, 325, 20, 20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(6 + survivalTime/100);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}
function reset(){
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
}
