/** @type {Particle[]} */
let particles = []
/** @type {Spring[]} */
let springs = []

function setup () {
  createCanvas(maxX, maxY)

  for (let i = 0; i < 36; i++) {
    particles.push(makeRandomParticle())
  }

  for (let i = 0; i < 6; i++) {
    let a = particles[Math.floor(random(0, particles.length))]
    let b = particles[Math.floor(random(0, particles.length))]

    if (a === b) i--
    else springs.push(new Spring(a, b, random(150, 300), 2e-5))
  }
}

function makeRandomParticle (pos) {
  let x = pos?.x || random(0, maxX)
  let y = pos?.y || random(0, maxY)
  let mass = random(PI * 50, PI * 100)

  if (random(0, 1) < 0.8) return new Particle(x, y, mass)
  else if (random(0, 1) < 0.5) return new Attractor(x, y, mass)
  else return new Repeller(x, y, mass)
}

function draw () {
  background(51)

  for (let i = 0; i < particles.length; i++) particles[i].use(particles)
  for (let i = 0; i < springs.length; i++) springs[i].use()

  for (let i = 0; i < particles.length; i++) particles[i].update().draw()
  for (let i = 0; i < springs.length; i++) springs[i].draw(true)
}

function mousePressed () {
  particles.push(makeRandomParticle(createVector(mouseX, mouseY)))
}
