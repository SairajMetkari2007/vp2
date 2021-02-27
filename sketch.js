var dog, dogHappy, dogSad;
var database, foodS, foodStock;
var fedTime, lastFed, feed, addFood, foodObj;

function preload(){
    dogImg = loadImage("Dog.png");
    dogImg2 = loadImage("happydog.png");
}
function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  foodObj = new Food();
  dog = createSprite(800, 200, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  feed = createButton("FEED");
  feed.position(600, 30);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(700, 30);
  addFood.mousePressed(addFoods);

foodStock = database.ref('Food');
foodStock.on("value", readStock);
}

function draw() {  
  background(140, 210, 144);
foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on('value', function(data){
  lastFed = data.val();
})

fill (255,255,254);
textSize(15);
if(lastFed >=12){
  text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
} else if(lastFed === 0){
  text("LAST FEED : 12 am", 350, 30);
}else {
  text("LAST FEED :"+ lastFed+'am', 350, 30);
}
  drawSprites();
  
} 
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(dogImg2)
  if (foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else {
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}