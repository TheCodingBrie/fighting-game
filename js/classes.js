class Sprite {
  constructor({ position, imageSrc, scale = 1, frames = 1 }) {
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
  }

  draw() {
    c.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frames),
      0,
      this.image.width / this.frames,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      this.frameCurrent < this.frames - 1
        ? this.frameCurrent++
        : (this.frameCurrent = 0);
    }
  }
}

class Fighter {
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

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
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
    if (this.position.y >= canvas.height - 95 - this.height) {
      this.velocity.y = -20;
    }
  }
}
