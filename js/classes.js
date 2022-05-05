class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    frames = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frames = frames;
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 7;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frames),
      0,
      this.image.width / this.frames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      this.frameCurrent < this.frames - 1
        ? this.frameCurrent++
        : (this.frameCurrent = 0);
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    frames = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      position,
      imageSrc,
      scale,
      frames,
      offset,
    });
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.color = color;
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
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 7;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    this.animateFrames();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Gravity function

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
      this.velocity.y = 0;
      this.position.y = 331;
    } else {
      this.velocity.y += GRAVITY;
    }
  }

  attack() {
    this.switchSprites("attack1");
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  jump() {
    if (this.position.y >= canvas.height - 95 - this.height) {
      this.velocity.y = -20;
    }
  }

  switchSprites(sprite) {
    if (
      this.image === this.sprites.attack1.image &&
      this.frameCurrent < this.sprites.attack1.frames - 1
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.frames = this.sprites.idle.frames;
          this.frameCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.frames = this.sprites.run.frames;
          this.frameCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.frames = this.sprites.jump.frames;
          this.frameCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.frames = this.sprites.fall.frames;
          this.frameCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.frames = this.sprites.attack1.frames;
          this.frameCurrent = 0;
        }
        break;
    }
  }
}
