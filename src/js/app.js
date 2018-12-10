// get my level and highest level and store them in variables
let level = document.querySelector("h1");
let highestLevel = document.querySelector("h3");
// Enemies our player must avoid
// Variables applied to each of our instances go here,
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'src/images/enemy-bug.png';
};
// random function for the speed of enemies 
function random(min, max) {
    var speed = Math.floor(Math.random() * (max - min)) + min;
    return speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//  multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 580) {
        this.x = 0
    }
    //collision between player and enemies according to there positions on x and //y axis
    if (this.x + 60 > player.x && this.x < player.x + 60 && this.y + 60 > player.y && this.y < player.y + 60) {
        player.x = 200, player.y = 400;
        //reset to level  1 after collison
        player.counter = 1;
        level.textContent = `LEVEL ${player.counter}`;
        // i use sweet alert2 to alert when player die
        swal(
            "oops! you are dead ",
            " Be carefull!! Play again",
            "warning",
        )
    }
}

// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// i make my own player class
// This class have an update(), render() and
// a handleInput() method
//it has a counter to count levels.
//and a highest level for setting highest level
class Player {
    constructor(x, y, speed, counter, highestLevel) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'src/images/char-cat-girl.png';
        this.counter = 1;
        this.highestLevel = 1;
    }
    // if and else if statememts for player that palyer do not go out of the canvas

    update() {
        if (this.x > 406) {
            this.x = 406;
        } else if (this.x < 0) {
            this.x = 0;
        } else if (this.y > 400) {
            this.y = 400;
            //  increasing the speed of eniemies by each next level
        } else if (this.y < 0) {
            player.x = 200
            player.y = 400

            enemy1.speed = random(100, this.counter * 100);
            enemy2.speed = random(130, this.counter * 150);
            enemy3.speed = random(150, this.counter * 200);
            // swet alert when player complete the level
            swal(
                "Good job!",
                "You Win!!! Play next level",
                "success",
            );
            level.textContent = `LEVEL ${++this.counter}`;
            highestLevel.textContent = `Highest Level${this.counter}`;
        }

    }

    // Draw my player on the screen.
    render(){

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //if and else if statements for moving player
    handleInput(direction) {
        if (direction == 'left') {
            this.x -= 100;
        } else if (direction == 'up') {
            this.y -= 90;
        } else if (direction == 'right') {
            this.x += 100;
        } else if (direction == 'down') {
            this.y += 90;
        }
    }
}
// instantiate  player object
let player = new Player(200, 400);
//instantiatations  enemy object
let allEnemies = [];
let enemy1 = new Enemy(0, 70, random(90, 200));
allEnemies.push(enemy1);
let enemy2 = new Enemy(0, 140, random(120, 120));
allEnemies.push(enemy2);
let enemy3 = new Enemy(0, 220, random(150, 170));
allEnemies.push(enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
