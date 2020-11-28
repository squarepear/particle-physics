class Attractor extends Particle {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} mass
   */
  constructor (x, y, mass) {
    super(x, y, mass)

    this.forceDir = 1
  }

  draw () {
    noStroke()
    fill(255, 255, 0, 127)
    ellipse(this.x, this.y, this.mass / TAU)

    return this
  }

  /** @param {Particle[]} particles */
  use (particles) {
    super.use(particles)

    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i]

      if (particle === this) continue

      let totalMass = this.mass + particle.mass
      let distance = this.dist(particle)

      if (distance <= 3) continue

      let forceDir = createVector(
        this.x - particle.x,
        this.y - particle.y
      ).normalize()

      let force = forceDir.setMag(
        (this.forceDir * (G * totalMass)) / (distance ^ 2)
      )

      particle.applyForce(force)
    }

    return this
  }
}
