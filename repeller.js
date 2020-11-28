class Repeller extends Attractor {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} mass
   */
  constructor (x, y, mass) {
    super(x, y, mass)

    this.forceDir = -1
  }

  draw () {
    noStroke()
    fill(255, 0, 0, 127)
    ellipse(this.x, this.y, this.mass / PI)

    return this
  }

  /** @param {Particle[]} particles */
  use (particles) {
    super.use(particles)

    return this
  }
}
