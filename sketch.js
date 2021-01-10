//person defining
var person, personImage1, personImage2;
//student defining
var student, studentImage1, studentImage2;
//ground defining
var ground, groundImage, groundDanger, ground2, groundDangerImg, ground2Image;
//house defining
var house, house_1, house_2, house_3, house_4, houseGroup;
//defining school
var school, schoolImage, schoolGroup;
//cloud defining
var cloud, cloudImage, cloudGroup;
//defining bush
var bush, bushImage;
//obstacle defining - 1
var obstacle1, obstacleImage1;
//creating bus
var bus, busImage, playerBus;
//defining and creating groups
var personGroup, obstacle1Group, studentGroup, busGroup, backgroundImage2;
var playerBus2Group, obstacle3Group;
var gameState = 0;//////////////////////////////////////////////////////////    GAME STATE    /////////////////////////////////////////////
var index = 0;
var obstacle2, obstacle2Image, obstacle3;
var ground3, groundGroup; var obstacle2Group;
var groundDangerGroup, ground2Group;
var ob3Img, bridge, playerBus2Img;
var background2;
var sound_start, sound_end;
//loading Images...
function preload(){
    //sound_start = loadSound("1.mp3");
    //sound_end = loadSound("2.mp3");
    personImage1 = loadAnimation("character-0.png", "character-1.png", "character-2.png", "character-3.png", "character-4.png", "character-5.png", "character-6.png", "character-7.png", "character-8.png", "character-9.png", "character-10.png", 
"character-11.png", "character-12.png", "character-13.png", "character-14.png", "character-16.png", "character-17.png", "character-18.png");//person image loading
    personImage2 = loadAnimation("character-6.png");
    studentImage1 = loadAnimation("stu-0.png", "stu-1.png", "stu-2.png", "stu-3.png", "stu-4.png", "stu-5.png", "stu-6.png", "stu-7.png", "stu-8.png", "stu-9.png", "stu-10.png", "stu-11.png");//student image loading
    studentImage2 = loadAnimation("stu-3.png");
    groundImage = loadImage("ground.png");//ground image loading
    house_1 = loadImage("house1.png"); //loading house - 1
    house_2 = loadImage("house2.png");//loading house - 2
    house_3 = loadImage("house3.png");//loading house - 3
    house_4 = loadImage("house4.png");//loading house - 4
    schoolImage = loadImage("school.png");//loading the school
    cloudImage = loadImage("cloud.jpg");//loading cloud
    bushImage = loadImage("bush.png");//loading bush
    obstacleImage1 = loadImage("obstacle1.png");//loading obstacle - 1
    busImage = loadImage("bus.png")//loading bus
    obstacle2Image = loadImage("tree.png");
    backgroundImage = loadImage("background.jpg");
    backgroundImage2 = loadImage("track.jpg");
    bridge = loadImage("bridge.png");
    ob3Img = loadImage("ob3.png");
    playerBus2Img = loadImage("bus2.png");
}

function setup(){
    createCanvas(displayWidth, displayHeight);
    ground = createSprite(displayWidth/2, displayHeight-200, displayWidth, 12);
    //creating person
    person = createSprite(300, displayHeight-280);
    person.addAnimation("person image", personImage1);
    person.addAnimation("person image 2", personImage2);
    person.changeAnimation("person image 1", personImage1);
    person.scale = 0.4;
    person.depth = 1000;
    person.setCollider("rectangle", 0, 0, 200, 340);
    person.debug = false;    
    obstacle1Group = new Group();
    studentGroup = new Group();
    personGroup = new Group();
    houseGroup = new Group();
    cloudGroup = new Group();
    busGroup = new Group();
    playerBus2Group = new Group();
    obstacle3Group = new Group();
    schoolGroup = new Group();
    playerBus = createSprite(300, displayHeight-480);
    playerBus.visible = false;
    playerBus.addImage(busImage);
    playerBus.scale = 0.7;
    playerBus.setCollider("rectangle", 0, 0, 400, 170);
    playerBus.debug = false;
    groundGroup = new Group();
    obstacle2Group = new Group();
    groundDangerGroup = new Group();
    ground2 = createSprite(displayWidth/2, displayHeight-350, displayWidth-400, 20);
    ground2.shapeColor = "red";
    ground2.visible = false;
    groundGroup.add(ground2);
    playerBus2 = createSprite(displayWidth/2, displayHeight-450);
    playerBus2.addImage(playerBus2Img);
    playerBus2.scale = 0.5;
    playerBus2.setCollider("rectangle", 0, 0, 155, 450);
    playerBus2.debug = false;
    playerBus2.depth = 0;
    playerBus2Group.add(playerBus2);
    ground2Group = new Group();
    
    background2 = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
    background2.addImage(backgroundImage2);
    background2.scale = 2;
    background2.y = background2.height / 2;
    background2.visible = false;
}


function draw(){
    background("white");
    person.collide(ground);
    sound_start.play();
    if (gameState === 0){
        person.visible = false;
        playerBus2.visible =false;
        playerBus.visible = false;
        background("white");
        textSize(40);
        fill("red");
        strokeWeight(2);
        stroke("black");
        text("Complete the game in order to fight for the right of Students", 60, 150);
        noStroke();
        textSize(25);
        fill("black");
        text("Hello Fighter, You are a child of this country and you have to fight for the development of this country.", 50, 400);
        text("In your country the children don't get the proper right of education.", 50, 500);
        text("So you have to help every child reaching the school, perfectly.", 50, 570);
        text("You will be a great example of patriotism for every person, so help students for the sake of the country.", 50, 640);
        fill("green");
        text("Press ''space'' to start", displayWidth/3, 700);
        if (keyDown("space")){
            gameState = 1;
            console.log("Activating gameState 1.");
        }

    }

    else if (gameState === 1){
        fill("black");
        stroke("green");
        strokeWeight(2);
        textSize(40);
        text("Number of Student: " + index, 200, displayHeight/3);
        person.visible = true;
        background2.visible = false;
        ground.visible = true;
        playerBus.visible = false;
        spawnCloud();
        playerBus2.visible = false;
        createhouse();//spawning house
        createObstacle();//spawning obstacle
        children();//spawning students at the gate
        spawnBus();//spawning the bus for level 2
        //sound_start.play();
        person.collide(ground);
        if (keyDown("space") && person.y > displayHeight-290){
            person.velocityY = -24;
        }
        person.velocityY += 0.9;
    
        if(person.isTouching(busGroup) && index >= 5){
            console.log("gamestate is changing....");
            gameState = 2;
        } 
        if(person.isTouching(busGroup) && index < 5){
            console.log("You have not taken at least 5 students and thats very bad.");
            gameState = 4;
        }

        if (person.isTouching(obstacle1Group)){
            gameState = 4;//game over
	        student.changeAnimation("student image 2", studentImage2);
            person.changeAnimation("person image 2", studentImage2);
        }
        if (person.isTouching(studentGroup)){
            index += 1;
            studentGroup.destroyEach();
        }
    }
    else if (gameState === 2){
        background2.visible = false;
        playerBus2.visible = false;
        spawnCloud();
        // sound_start.play();
        //destroying everything of gameState - 1
	    background(backgroundImage);
        ground.visible = false;
        person.destroy();
        personGroup.destroyEach();
        studentGroup.destroyEach()
        obstacle1Group.destroyEach();
        busGroup.destroyEach();
        houseGroup.destroyEach();
        var groundDanger = createSprite(displayWidth/2, displayHeight-200, displayWidth, 20);
        // groundDanger.addImage("ground danger image", groundDangerImg);
        // groundDanger.scale = 0.2;
        groundDanger.shapeColor = "green";
        groundDangerGroup.add(groundDanger);
        playerBus.visible = true;
        if (keyDown("space")){playerBus.velocityY = -22;}
        playerBus.velocityY += 0.9;
        ground2.velocityX = -7;
        ground2.visible = true;
        ground2Group.add(ground2);
        playerBus.collide(groundDangerGroup);
        playerBus.collide(ground2);
        playerBus.collide(groundGroup);
        createGround();
        createObstacle2();
        console.log(playerBus.y);
        if (keyDown("space")){
            playerBus.velocityY = -5;
        }
        playerBus.velocityY += 0.9;
        if (playerBus.y === 594.5 || playerBus.isTouching(obstacle2Group) || playerBus.x < 0){
            gameState = 4;
            console.log("ended");
        }
        if (frameCount % 2500 === 0){
            gameState = 3;/////////////////level 3
        }
        fill("black");
        stroke("green");
        strokeWeight(2);
        textSize(40);
        text("Number of Stu. picked: " + index, 200, displayHeight/3-200);
        
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ///gameState - 3 starts
    else if (gameState === 3){
        //sound_start.play();
        playerBus.visible = false;
        background2.visible = true;
        ground2Group.destroyEach();
        cloudGroup.destroyEach();
        groundDangerGroup.destroyEach();
        playerBus.destroy();
        person.visible = false;
        playerBus2.visible = true;
        obstacle2Group.destroyEach();
        ground2.visible = false;
        ground.visible = false;
        background2.velocityY = 7;
        if (background2.y > displayWidth){
            background2.y = background2.width / 2;
        }
        playerBus2.depth = background2.depth;
        playerBus2.depth += 1;
        playerBus2.velocityX = 0;
        if (keyDown(RIGHT_ARROW) && playerBus2.x !== displayWidth/2+500){playerBus2.velocityX = 4.5;}
        else if (keyDown(LEFT_ARROW) && playerBus2.x !== displayWidth/2-500){playerBus2.velocityX = -4.5;}
        if (frameCount % 60 === 0){
            obstacle3 = createSprite(random(250, displayWidth-250), -50);
            obstacle3.addImage(ob3Img);
            obstacle3.scale = 0.2;
            obstacle3.velocityY = 9.5;
            obstacle3.lifetime = 150;
            obstacle3.depth = playerBus2.depth;
            obstacle3.depth += 1;
            obstacle3Group.add(obstacle3);
        }
        if (playerBus2Group.isTouching(obstacle3Group)){gameState = 4;}
        if (frameCount % 2000 === 0){
            school = createSprite(500, -400);
            school.addImage(schoolImage);
            school.scale = 0.3;
            school.velocityY = 9.5;
            school.depth = playerBus2.depth;
            school.depth += 1 ;
            schoolGroup.add(school);
        }
        if (playerBus2Group.isTouching(schoolGroup)){
            gameState = 5;
        }
    }
    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //gameState - 4 starts
    else if (gameState === 4){
        sound_start.end();
        sound_end.play();
        background2.destroy();
        background("red");
        person.velocityY = 0;
        personGroup.setVelocityYEach(0);
        person.changeAnimation("person image 2", personImage2);
        playerBus2Group.setVelocityXEach(0);
        obstacle3Group.setVelocityYEach(0);
        obstacle3Group.destroyEach();
        studentGroup.setVelocityXEach(0);
        studentGroup.setVelocityYEach(0);
        houseGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        obstacle1Group.setVelocityXEach(0);
        obstacle1Group.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
        houseGroup.setLifetimeEach(-1);
        playerBus.velocityY = 0;
        obstacle2Group.destroyEach();
        groundGroup.destroyEach();
        textSize(55);
        fill("black");
        noStroke();
        text("GAME OVER", displayWidth/2-60, displayHeight/2- 165);
        fill("black");
        stroke("green");
        strokeWeight(2);
        textSize(40);
        text("Number of Student: " + index, 200, displayHeight/3);
        text("Press ''r'' to restart", displayWidth/3, displayHeight-100);
        if (keyDown("r")){
            gameState = 0;
            houseGroup.destroyEach();
            studentGroup.destroyEach();
            obstacle1Group.destroyEach();
            person.changeAnimation("person image", personImage1);
            cloudGroup.destroyEach();
            index = 0;
        }
    }
    else if (gameState === 5){
        sound_start.end();
        sound_end.play();
        background2.destroy();
        person.visible = false;
        playerBus2.visible = false;
        schoolGroup.destroyEach();
        obstacle3Group.destroyEach();
        textSize(40);
        strokeWeight(2);
        stroke("black");
        fill("blue");
        text("YOU WON!", displayWidth/2-150, displayHeight/3+100);
        textSize(25);
        noStroke();
        fill("black");
        text("1> You did a great job by helping the students of this country.",50, 110);
        text("2> Every Student should have the right to education.",50, 140);
        text("3> Children are the future of the world, so we need to be very careful about their rights.",50, 170);
        text("4> Education is the topmost right of every children.",50, 200);
        text("5> We shoud take proper care of the children's right.",50, 230);
        text("6> Every children should have the right to go to school.School is a part of heaven.",50, 260);
        text("7> Every people should understand the importance of school. More school should be established.",50, 290);
        text("8> We should have proper maintainance of every children reaching school. Transportation should be increased.",50, 320);
        text("9> When student's are educated then the whole country can become enriched.",50, 350);
        fill("green");
        text("Press ''R/r'' to restart the game", displayWidth/3, displayHeight-300);
        if (keyDown("r")){
            gameState = 0;
            cloudGroup.destroyEach();
            index = 0;
        }
    }

    drawSprites();
    
}

function createhouse(){
    if (frameCount % 140 === 0){
        house = createSprite(displayWidth+20, displayHeight-400, 20, 20);
        var rand = Math.round(random(1,4));
        switch(rand){
            case 1: house.addImage(house_1);
                    house.scale = 1.55;
                    break;
            case 2: house.addImage(house_2);
                    house.scale = 0.2; 
                    break;
            case 3: house.addImage(house_3);
                    house.scale = 1;
                    break;
            case 4: house.addImage(house_4);
                    house.scale = 1.1;
                    break;
            default: break;
        }
        house.velocityX = -5;  
        house.lifetime = 350;
	house.depth = 0; 
	houseGroup.add(house);
    }
    return house;
}

function createObstacle(){
    if (frameCount % 90 === 0){
        obstacle1 = createSprite(displayWidth+15, displayHeight-250, 10, 10);
        obstacle1.addImage(obstacleImage1);
        obstacle1.scale = 0.04;
        obstacle1.velocityX = -5;
        obstacle1.depth = 2;
        obstacle1.setCollider("rectangle", 0, 0, obstacle1.width, obstacle1.height);
        obstacle1.debug = true;
        obstacle1.lifetime = 350;
        obstacle1Group.add(obstacle1);
    }

    return obstacle1;
}

function children(){
    if (frameCount % 280 === 0){
        student = createSprite(displayWidth+20, displayHeight-260, 30, 30);
        student.addAnimation("student image",studentImage1);
        student.addAnimation("student image 2", studentImage2);
        student.changeAnimation("student image", studentImage1);
        student.scale = 0.15;
        student.depth = obstacle1.depth;
        student.depth += 1;
        student.depth = 2;
        student.velocityX = -5;
        studentGroup.add(student);
    }
    return student;
}

function spawnCloud(){
    if (frameCount % 60 === 0){
        cloud = createSprite(displayWidth+15, 55, 10, 10);
        cloud.addImage(cloudImage);
        cloud.scale = 0.2;
        cloud.velocityX = -3.5;
        cloud.lifetime = 400;
	    cloudGroup.add(cloud);
    }
    return cloud;
}

function spawnBus(){
    if (frameCount % 3000 === 0){
        bus = createSprite(displayWidth+20, displayHeight-315, 30, 30);
        bus.addImage(busImage);
        bus.velocityX = -5;
	    bus.depth = 5;
        bus.scale = 1;
        busGroup.add(bus);
    }
    return bus;
}

function createGround(){
    if (frameCount % 100 === 0){
        ground3 = createSprite(displayWidth+20, random(displayHeight-350, displayHeight -470), 300, 20);
        ground3.velocityX = -7;
        ground3.shapeColor = "blue";
        ground3.lifetime = 200;
        groundGroup.add(ground3);
    }
    return ground3;
}

function createObstacle2(){
    if (frameCount % 200 === 0){
        obstacle2 = createSprite(displayWidth+20, displayHeight-660);
        obstacle2.addImage(obstacle2Image);
        obstacle2.scale = 0.07;
        obstacle2.velocityX = -7;
        obstacle2.lifetime = 200;
        obstacle2.setCollider("rectangle", 0, 0, 300, 100);
        obstacle2Group.add(obstacle2);
    }
    return obstacle2;
}




/*
var delayInMilliseconds = 1000; 
setTimeout(function() { 
    //your code to be executed after 1 second 
}, delayInMilliseconds
);
*/
