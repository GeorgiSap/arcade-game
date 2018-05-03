class Char {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = sprite;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
    }


}

const initialEnemyPositionX = -100;

function randomEnemyPositionY() {
    return 60 +  (Math.floor(Math.random() * 3) * 83);
}

function randomEnemySpeed() {
    return Math.floor(Math.random() * 250) + 150;
}

// Enemies our player must avoid
class Enemy extends Char {
    constructor() {
        super(initialEnemyPositionX, randomEnemyPositionY(), 'images/enemy-bug.png');
        this.speed = randomEnemySpeed();
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // Multiplies any movement by the dt parameter
        // to ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.reset();
        }
    }

    reset() {
        super.reset(initialEnemyPositionX, randomEnemyPositionY());
        this.speed = randomEnemySpeed();
    }


}

const playerSpeedX = 101;
const playerSpeedY = 83;
const maxPlayerPosition = 404;
const minPlayerPosition = 0;
const initialPlayerPositionX = 202;
const initialPlayerPositionY = 406;

class Player extends Char {

    constructor() {
        super(initialPlayerPositionX, initialPlayerPositionY, 'images/char-boy.png');
    }

    update() {
        for (const enemy of allEnemies) {
            if (Math.abs(enemy.x - this.x) < 65 && Math.abs(enemy.y - this.y) < 50) {
                this.reset();
            }
        }
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
                    if (this.y <= minPlayerPosition) {
                        setTimeout(() => this.reset(), 200);
                    }
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
        super.reset(initialPlayerPositionX, initialPlayerPositionY);
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3];
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
