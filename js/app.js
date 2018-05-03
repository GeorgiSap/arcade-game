// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = 60 +  (Math.floor(Math.random() * 3) * 83);
    this.speed = Math.floor(Math.random() * 250) + 150;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplies any movement by the dt parameter
    // to ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = 60 +  (Math.floor(Math.random() * 3) * 83);
    this.speed = Math.floor(Math.random() * 200) + 150;
};

const playerSpeedX = 101;
const playerSpeedY = 83;
const maxPlayerPosition = 404;
const minPlayerPosition = 0;
const initialPlayerPositionX = 202;
const initialPlayerPositionY = 406;

class Player {

    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = initialPlayerPositionX;
        this.y = initialPlayerPositionY;
    }

    update() {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(pressedkey) {
        switch(pressedkey) {
            case 'left':
                if (this.x > minPlayerPosition) {
                    this.x -= playerSpeedX;
                }
                break;
            case 'up':
                if (this.y > minPlayerPosition) {
                    this.y -= playerSpeedY;
                }
                break;
            case 'right':
                if (this.x < maxPlayerPosition) {
                    this.x += playerSpeedX;
                }
                break;
            case 'down':
                if (this.y < maxPlayerPosition) {
                    this.y += playerSpeedY;
                }
                break;
        }
    }

    reset() {
        this.x = initialPlayerPositionX;
        this.y = initialPlayerPositionY;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();
let allEnemies = [enemy1, enemy2, enemy3];
var delayedEnemies = 0;
var intervalID = setInterval(function () {
 let enemy = new Enemy();
 allEnemies.push(enemy);
 if (++delayedEnemies === 2) {
     window.clearInterval(intervalID);
 }
}, 500);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
