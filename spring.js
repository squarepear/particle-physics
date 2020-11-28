class Spring {
  /**
   * @param {Particle} a Particle A
   * @param {Particle} b Particle B
   * @param {number} length Spring length of equillibrium
   * @param {number} k Spring constant
   */
  constructor (a, b, length, k) {
    this.a = a
    this.b = b
    this.length = length
    this.k = k
  }

  get distance () {
    return p5.Vector.dist(this.a, this.b) - this.length
  }

  get centerOfMass () {
    return p5.Vector.sub(this.a, this.b).setMag(
      ((this.a.mass / this.b.mass) * p5.Vector.dist(this.a, this.b)) / 2
    )
  }

  draw (showCenter) {
    stroke(0, 255, 0, 127)
    strokeWeight((norm(Math.abs(this.distance), 0, this.length) + 1) * 5)
    line(this.a.x, this.a.y, this.b.x, this.b.y)

    if (!showCenter) return

    stroke(0, 255, 255, 127)
    let centerOfMass = p5.Vector.add(this.b, this.centerOfMass)
    point(centerOfMass.x, centerOfMass.y)
  }

  use () {
    let forceDir = createVector(
      this.b.x - this.a.x,
      this.b.y - this.a.y
    ).normalize()

    let force = forceDir.setMag(this.k * this.distance)

    this.a.applyForce(force)
    this.b.applyForce(p5.Vector.mult(force, -1))
  }
}
