function GameObject(name, img, health) {
    this.name = name;
    this.img = image;
    this.health = health;
    this.x = 0;
    this.y = 0;
}

var image = new Image();
image.src = "./rubberboy.png";

var image2 = new Image();
image2.src = "./rubberboy2.png";


var canvas = document.getElementById("the_canvas");

var context = canvas.getContext("2d");

function GamerInput(input) {
    this.action = input;
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var player = new GameObject("Player", "./rubberboy.png", 100);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [player, new GameObject("NPC", "./rubberboy2.png", 100)];

// Process keyboard input event
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);
    console.log("keycode " + event.keycode);

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37:
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None"); //No Input
    }
    // console.log("Gamer Input :" + gamerInput.action);
}

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");

    for (i = 0; i < gameobjects.length; i++) {

        if (gamerInput.action === "Up") {
            gameobjects[i].health = 100;
            console.log("Up");
        }

        if (gamerInput.action === "down") {
            gameobjects[i].health = 100;
            console.log("down");
        }


        if (gamerInput.action === "right") {
            gameobjects[i].health = 100;
            console.log("right");
        }

        if (gamerInput.action === "left") {
            gameobjects[i].health = 100;
            console.log("left");
        }


        if (gameobjects[i].health >= 1) {
            //gameobjects[i].health = gameobjects[i].health - 1;
            // console.log("Health :" + gameobjects[i].health);

            gameobjects[1].x = 600;
            gameobjects[1].y = 400;

            if (gameobjects[0].y == gameobjects[1].y) {
               gameobjects[0].y = 0;
               gameobjects[0].health -= 5;
            }

            if (gameobjects[0].x == gameobjects[1].x ) {
                gameobjects[0].x = 0;
                gameobjects[0].health -= 5;
            }
            
            
            
            if (gamerInput.action === "Right") {
                gameobjects[0].x += 1.5;
                //gameobjects[0].y += 1;
                //console.log("Down");
            }

            if (gamerInput.action === "Left") {
                gameobjects[0].x -= 1.5;
                //gameobjects[0].y += 1;
                //console.log("Down");
            }

            if (gamerInput.action === "Down") {
                //gameobjects[0].x += 1;
                gameobjects[0].y += 1.5;
                //console.log("Down");
            }

            if (gamerInput.action === "Up") {
                //gameobjects[0].x += 1;
                gameobjects[0].y -= 1.5;
                //console.log("Down");
            }

        } else {
            console.log(gameobjects[i].name + " at X: " + gameobjects[i].x + "  Y: " + gameobjects[i].y + " looks like its not alive :'(");
        }
    }
}

function npcmove(){
    gameobjects[1].y += 1;
}

var frames = 6;
var currentFrame = 0;
var initial = new Date().getTime();
var current;

function animate() {
    current = new Date().getTime();
    if (current - initial >= 100) {
        currentFrame = (currentFrame + 1) % frames;
        initial = current;
    }
}

function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for (i = 0; i < gameobjects.length; i++) {

        context.drawImage(image,(image.width/6) * currentFrame ,0 ,200 ,200 ,gameobjects[i].x, gameobjects[i].y ,200 ,200);
        animate();
    }
}

function gameloop() {
    update();
    draw();
    animate();
    npcmove();
    window.requestAnimationFrame(gameloop);
}

window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);
window.addEventListener('keyright', input);
window.addEventListener('keyleft', input);