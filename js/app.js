
// Class for all game entities
class Entity {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

  update(dt) {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }

  checkCollisions(playerOrEnemy) {
    if (this.y >= playerOrEnemy.y - 0.5 && this.y <= playerOrEnemy.y + 0.5) {
      if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) {
        return true;
      }
    }
    else {
      return false;
    }
  }

}


// Player class
class Player extends Entity {
  constructor() {
    super();
    this.sprite += 'char-pink-girl.png';
  }

  render() {
    super.render();
  }

  update(dt) {
    super.update();
    // Show modal when game is won
    if (this.isOutOfBoundsY) {
      document.querySelector('.modal').classList.remove('hide');
      // Button to reload game
      document.querySelector('.replay').addEventListener('click', function() {
        location.reload();
      });
    }
  }


  // Prevent player from going off grid
  handleInput(input) {
    switch (input) {
      case 'left':
        this.x = this.x > 0 ? this.x - 1 : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y - 1 : this.y;
        break;
      case 'right':
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      case 'down':
        this.y = this.y < 5 ? this.y + 1 : this.y;
        break;
      default:
        break;
    }
  }
}


// Enemy class
class Enemy extends Entity {
  constructor(x, y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  update(dt) {
    super.update();
    if (this.isOutOfBoundsX) {
      this.x = -((Math.random() * 5) + 1);
    }
    else {
      this.x += (2 * dt);
    }
  }
}


// Create player
const player = new Player();
// Create enemies
const allEnemies = [...Array(3)].map((_, i) => new Enemy(-((Math.random() * 3) + 1), i + .75));


document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
