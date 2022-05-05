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

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/background.png",
});

const shop = new Sprite({
  position: {
    x: 610,
    y: 130,
  },
  imageSrc: "./assets/shop.png",
  scale: 2.75,
  frames: 6,
});

const player = new Fighter({
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
  imageSrc: "./assets/player/Idle.png",
  frames: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 155,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/player/Idle.png",
      frames: 8,
    },
    run: {
      imageSrc: "./assets/player/Run.png",
      frames: 8,
    },
    jump: {
      imageSrc: "./assets/player/Jump.png",
      frames: 2,
    },
    fall: {
      imageSrc: "./assets/player/Fall.png",
      frames: 2,
    },
    attack1: {
      imageSrc: "./assets/player/Attack1.png",
      frames: 6,
    },
    // idle: {
    //   imageSrc: "./assets/player/Idle.png",
    //   frames: 8,
    // },
  },
});

const enemy = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 5,
  },
  color: "blue",
});

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();

  player.update();
  // enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement

  if (KEYS.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprites("run");
  } else if (KEYS.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprites("run");
  } else {
    player.switchSprites("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprites("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprites("fall");
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
