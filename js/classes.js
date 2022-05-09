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
    c.fillStyle = "black";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
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
    imageSrc,
    scale = 1,
    frames = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = {
      offset: {},
      width: undefined,
      height: undefined,
    },
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
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.isAttacking;
    this.health = 100;
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;
    this.isDead = false;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    if (!this.isDead) {
      this.animateFrames();
    }

    // attack boxes

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // uncomment to see attack boxes

    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

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
  }

  jump() {
    if (this.position.y >= canvas.height - 95 - this.height) {
      this.velocity.y = -20;
    }
  }

  takeHit() {
    this.health -= 20;

    if (this.health <= 0) {
      this.switchSprites("death");
    } else {
      this.switchSprites("takeHit");
    }
  }

  switchSprites(sprite) {
    // overrides other animations when attacking

    if (
      this.image === this.sprites.attack1.image &&
      this.frameCurrent < this.sprites.attack1.frames - 1
    )
      return;

    // overrides other animations when taking damage

    if (
      this.image === this.sprites.takeHit.image &&
      this.frameCurrent < this.sprites.takeHit.frames - 1
    )
      return;

    // permadeath

    if (this.image === this.sprites.death.image) {
      if (this.frameCurrent === this.sprites.death.frames - 1) {
        this.isDead = true;
      }
      return;
    }
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
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.frames = this.sprites.takeHit.frames;
          this.frameCurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.frames = this.sprites.death.frames;
          this.frameCurrent = 0;
        }
        break;
    }
  }
}
