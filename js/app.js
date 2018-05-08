/**
* @description Represents a Character
* @constructor
* @param {number} x - The initial position of the character on the x-axis
* @param {number} y - The initial position of the character on the y-axis
* @param {string} sprite - The sprite for the character
*/
class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    /**
    * @description Draws the character on the screen
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    }

    /**
    * @description Resets character position
    * @param {number} x - character position on the x-axis
    * @param {number} y - character position on the y-axis
    */
    reset(x, y) {
        this.x = x;
        this.y = y;
    }


}

const initialEnemyPositionX = -100;

/**
* @description Generates a random enemy starting position on the y-axis
* @returns {number} random enemy starting position on the y-axis
*/
function randomEnemyPositionY() {
    return 60 +  (Math.floor(Math.random() * 3) * 83);
}

/**
* @description Generates a random enemy speed 
* @returns {number} random enemy speed
*/
function randomEnemySpeed() {
    return Math.floor(Math.random() * 250) + 150;
}

/**
* @description Represents an Enemy
* @extends Character
*/
class Enemy extends Character {
    constructor() {
        super(initialEnemyPositionX, randomEnemyPositionY(), 'images/enemy-bug.png');
        this.speed = randomEnemySpeed();
    }

    /**
    * @description Update the enemy's position
    * @param {number} dt - time delta between ticks
    */
    update(dt) {
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

let score = 0;

const playerSpeedX = 101;
const playerSpeedY = 83;
const maxPlayerPosition = 404;
const minPlayerPosition = 0;
const initialPlayerPositionX = 202;
const initialPlayerPositionY = 406;

/**
* @description Represents a Player
* @extends Character
*/
class Player extends Character {

    constructor() {
        super(initialPlayerPositionX, initialPlayerPositionY, 'images/char-boy.png');
    }

    /**
    * @description Detects collisions with an enemy
    */
    update() {
        for (const enemy of allEnemies) {
            if (Math.abs(enemy.x - this.x) < 65 && Math.abs(enemy.y - this.y) < 50) {
                score = 0;
                this.reset();
            }
        }
    }

    /**
    * @description Handles player movement based on pressed key
    */
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
                        setTimeout(() => {
                            score++;
                            this.reset();
                        }, 200);
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

// Player and enemies instantiation
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
       clearInterval(intervalID);
   }
}, 500);


// Listens for key presses and sends the keys to Player.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});