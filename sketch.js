var database;
var dog,dogI, happyDogI, foodS, foodStock,bg;

function preload()
{
	dogI=loadImage('images/dogImg.png')
  happyDogI=loadImage('images/dogImg1.png')
  bg=loadImage('images/bg.jpg')
}

function setup() {
	createCanvas(800, 700);
  dog=createSprite(width/2,500,10,10),
  dog.addImage('dog1',dogI)
  dog.addImage('dog2',happyDogI)
  dog.scale=0.3
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on('value',readStock);
  
}


function draw() {  
    background(bg)

    if(keyWentDown(UP_ARROW)){
        writeStock(foodS);
        dog.changeImage('dog2',happyDogI)
        
    }
  console.log(foodS)
  drawSprites();
  fill('white')
  textSize(55)
  stroke(6)
  text('food left  -  '+foodS,200,200)

}

function readStock(data){
   foodS=data.val()
}

function writeStock(x){
    if(x<=0){
        x=0
    }else{
        x=x-1
    }


    database.ref('/').update({
        Food:x
    })
}
