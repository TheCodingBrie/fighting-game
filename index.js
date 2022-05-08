// character select
// reset button

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let isPaused = false;

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
    x: 100,
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
    takeHit: {
      imageSrc: "./assets/player/TakeHit2.png",
      frames: 4,
    },
    death: {
      imageSrc: "./assets/player/Death.png",
      frames: 6,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 150,
    height: 80,
  },
});

const enemy = new Fighter({
  position: {
    x: 850,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 5,
  },
  imageSrc: "./assets/enemy/Idle.png",
  frames: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 165,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/enemy/Idle.png",
      frames: 4,
    },
    run: {
      imageSrc: "./assets/enemy/Run.png",
      frames: 8,
    },
    jump: {
      imageSrc: "./assets/enemy/Jump.png",
      frames: 2,
    },
    fall: {
      imageSrc: "./assets/enemy/Fall.png",
      frames: 2,
    },
    attack1: {
      imageSrc: "./assets/enemy/Attack1.png",
      frames: 4,
    },
    takeHit: {
      imageSrc: "./assets/enemy/TakeHit.png",
      frames: 3,
    },
    death: {
      imageSrc: "./assets/enemy/Death.png",
      frames: 7,
    },
  },
  attackBox: {
    offset: {
      x: -160,
      y: 40,
    },
    width: 150,
    height: 80,
  },
});

function animate() {
  if (!isPaused) {
    window.requestAnimationFrame(animate);

    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    shop.update();

    c.fillStyle = "rgba(255,255,255, 0.15";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    enemy.update();

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
      enemy.switchSprites("run");
    } else if (KEYS.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
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
  if (event.key === "Escape") {
    isPaused = !isPaused;
    animate();
    decreaseTimer();
  }
});
