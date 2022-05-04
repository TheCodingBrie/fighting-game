const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// c = context for the canvas
// constants for gravity / sprite velocities?

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const GRAVITY = 0.7;

const KEYS = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

class Sprite {
  constructor({ position, velocity, color = "red", offset }) {
    this.color = color;
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.isAttacking;
    this.health = 100;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // attack box
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= 576) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += GRAVITY;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  jump() {
    if (this.position.y >= 576 - this.height) {
      this.velocity.y = -20;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 5,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
});

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#matchResult").style.display = "Flex";
  if (player.health === enemy.health) {
    document.querySelector("#matchResult").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector("#matchResult").innerHTML = "Player 1 Wins";
  } else {
    document.querySelector("#matchResult").innerHTML = "Player 2 Wins";
  }
}

let timer = 60;
let timerId;

function decreaseTimer() {
  if (timer > 0) {
    {
      timerId = setTimeout(decreaseTimer, 1000);
      timer--;
      document.querySelector("#timer").innerHTML = timer;
    }
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement

  if (KEYS.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (KEYS.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  // enemy movement

  if (KEYS.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (KEYS.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  // detect for collisions

  // player attacks

  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector("#enemyHealth").style.width = `${enemy.health}%`;
  }

  // enemy attacks

  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector("#playerHealth").style.width = `${player.health}%`;
  }

  // end game based on health

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();
decreaseTimer();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      KEYS.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      KEYS.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.jump();
      break;
    case " ":
      player.attack();
      break;
    case "ArrowRight":
      KEYS.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      KEYS.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.jump();
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      KEYS.d.pressed = false;
      break;
    case "a":
      KEYS.a.pressed = false;
      break;

    case "ArrowRight":
      KEYS.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      KEYS.ArrowLeft.pressed = false;
      break;
  }
});
