// character select
// Add music / sound effects

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let isPaused = false;

// c = context for the canvas
// constants for gravity / sprite velocities?

canvas.width = 1024;
canvas.height = 576;

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

let player = new Fighter(fighters.samurai);

let enemy = new Fighter(fighters.enemy);

function animate() {
  if (!isPaused) {
    window.requestAnimationFrame(animate);

    c.fillStyle = "black";

    background.update();
    shop.update();

    c.fillStyle = "rgba(255,255,255, 0.15";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement

    if (KEYS.a.pressed && player.lastKey === "a" && player.position.x >= 0) {
      player.velocity.x = -5;
      player.switchSprites("run");
    } else if (
      KEYS.d.pressed &&
      player.lastKey === "d" &&
      player.position.x <= 1024 - player.width
    ) {
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

    if (
      KEYS.ArrowLeft.pressed &&
      enemy.lastKey === "ArrowLeft" &&
      enemy.position.x >= 0
    ) {
      enemy.velocity.x = -5;
      enemy.switchSprites("run");
    } else if (
      KEYS.ArrowRight.pressed &&
      enemy.lastKey === "ArrowRight" &&
      enemy.position.x <= 1024 - enemy.width
    ) {
      enemy.velocity.x = 5;
      enemy.switchSprites("run");
    } else {
      enemy.switchSprites("idle");
    }

    if (enemy.velocity.y < 0) {
      enemy.switchSprites("jump");
    } else if (enemy.velocity.y > 0) {
      enemy.switchSprites("fall");
    }

    // detect for collisions

    // player attacks

    if (
      rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
      player.isAttacking &&
      player.frameCurrent === 4
    ) {
      player.isAttacking = false;
      enemy.takeHit();
      gsap.to("#enemyHealth", {
        width: `${enemy.health}%`,
      });
      document.querySelector("#enemyHealth").style.borderRadius = "0px";
    }

    // player misses

    if (player.isAttacking && player.frameCurrent === 4) {
      player.isAttacking = false;
    }

    // enemy attacks

    if (
      rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
      enemy.isAttacking &&
      enemy.frameCurrent === 2
    ) {
      enemy.isAttacking = false;
      player.takeHit();
      gsap.to("#playerHealth", {
        width: `${player.health}%`,
      });
      document.querySelector("#playerHealth").style.borderRadius = "0px";
    }

    // enemy misses

    if (enemy.isAttacking && enemy.frameCurrent === 2) {
      enemy.isAttacking = false;
    }

    // end game based on health

    if (enemy.health <= 0 || player.health <= 0) {
      determineWinner({ player, enemy, timerId });
    }
  }
}

animate();
decreaseTimer();

window.addEventListener("keydown", (event) => {
  // player and enemy action controls

  if (!player.isDead && !enemy.isDead) {
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

// Pauses the game and the timer

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !player.isDead && !enemy.isDead) {
    isPaused = !isPaused;
    animate();
    decreaseTimer();
  }
});

// Restart the game to it's initial state
document.querySelector("#restart").addEventListener("click", () => {
  document.querySelector("#matchResult").style.display = "none";
  document.querySelector("#restart").style.display = "none";

  // reset the timer for a new game
  timer = 60;
  decreaseTimer();

  // Create new fighter instances

  player = new Fighter(fighters.knight);

  enemy = new Fighter(fighters.enemy);
});
