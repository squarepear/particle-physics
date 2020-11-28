class Particle extends p5.Vector {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} mass
   */
  constructor (x, y, mass) {
    super(x, y)

    this.mass = mass
    this.acceleration = createVector(0, 0)
    this.velocity = createVector(0, 0)
  }

  applyForce (force) {
    this.acceleration.add(p5.Vector.div(force, this.mass))
  }

  draw () {
    noStroke()
    fill(0, 0, 255, 127)
    ellipse(this.x, this.y, this.mass / PI)

    return this
  }

  /** @param {Particle[]} particles */
  use (particles) {
    return this
  }

  update () {
    this.velocity.set(
      this.velocity.add(p5.Vector.mult(this.acceleration, deltaTime))
    )

    this.acceleration.set(0, 0)

    let newPos = this.add(p5.Vector.mult(this.velocity, deltaTime))

    if (screenWrap) {
      if (newPos.x > maxX) newPos.x = 0
      else if (newPos.x < 0) newPos.x = maxX
      if (newPos.y > maxY) newPos.y = 0
      else if (newPos.y < 0) newPos.y = maxY
    }

    this.x = newPos.x
    this.y = newPos.y

    return this
  }
}
