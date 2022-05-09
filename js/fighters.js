// list of available fighters and the enemy

const fighters = {
  samurai: {
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
    imageSrc: "./assets/samurai/Idle.png",
    frames: 8,
    scale: 2.5,
    offset: {
      x: 215,
      y: 155,
    },
    sprites: {
      idle: {
        imageSrc: "./assets/samurai/Idle.png",
        frames: 8,
      },
      run: {
        imageSrc: "./assets/samurai/Run.png",
        frames: 8,
      },
      jump: {
        imageSrc: "./assets/samurai/Jump.png",
        frames: 2,
      },
      fall: {
        imageSrc: "./assets/samurai/Fall.png",
        frames: 2,
      },
      attack1: {
        imageSrc: "./assets/samurai/Attack1.png",
        frames: 6,
      },
      takeHit: {
        imageSrc: "./assets/samurai/TakeHit2.png",
        frames: 4,
      },
      death: {
        imageSrc: "./assets/samurai/Death.png",
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
  },
  huntress: {
    position: {
      x: 100,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 10,
    },
    imageSrc: "./assets/huntress/Idle.png",
    frames: 8,
    scale: 2.5,
    offset: {
      x: 160,
      y: 92,
    },
    sprites: {
      idle: {
        imageSrc: "./assets/huntress/Idle.png",
        frames: 8,
      },
      run: {
        imageSrc: "./assets/huntress/Run.png",
        frames: 8,
      },
      jump: {
        imageSrc: "./assets/huntress/Jump.png",
        frames: 2,
      },
      fall: {
        imageSrc: "./assets/huntress/Fall.png",
        frames: 2,
      },
      attack1: {
        imageSrc: "./assets/huntress/Attack2.png",
        frames: 5,
      },
      takeHit: {
        imageSrc: "./assets/huntress/Take hit.png",
        frames: 3,
      },
      death: {
        imageSrc: "./assets/huntress/Death.png",
        frames: 8,
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
  },
  knight: {
    position: {
      x: 100,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 10,
    },
    imageSrc: "./assets/knight/Idle.png",
    frames: 10,
    scale: 2.5,
    offset: {
      x: 160,
      y: 92,
    },
    sprites: {
      idle: {
        imageSrc: "./assets/knight/Idle.png",
        frames: 10,
      },
      run: {
        imageSrc: "./assets/knight/Run.png",
        frames: 8,
      },
      jump: {
        imageSrc: "./assets/knight/Jump.png",
        frames: 3,
      },
      fall: {
        imageSrc: "./assets/knight/Fall.png",
        frames: 3,
      },
      attack1: {
        imageSrc: "./assets/knight/Attack2.png",
        frames: 7,
      },
      takeHit: {
        imageSrc: "./assets/knight/Take hit.png",
        frames: 3,
      },
      death: {
        imageSrc: "./assets/knight/Death.png",
        frames: 7,
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
  },
  enemy: {
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
  },
};
