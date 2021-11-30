let canvas = document.getElementById("scribble");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let vectors = [];
let Planets = [];
let Particles = [];
const vectorSpacing = 30;

ctx.translate(innerWidth / 2, innerHeight / 2);

for (let i = -innerWidth / 2; i < innerWidth / 2; i += vectorSpacing) {
    for (let j = -innerHeight / 2; j < innerHeight / 2; j += vectorSpacing) {
        vectors.push(new Vector(i, j));
    }
}

Planets.push(new Planet(-innerWidth / 5, 0));
Planets.push(new Planet(innerWidth / 5, 0));
Planets.push(new Planet(0, innerHeight / 4));
Planets.push(new Planet(0, -innerHeight / 4));

Particles.push(new Particle(0, 0, 10, -10));

let movingPlanet = false;
let creatingNewParticle = false;
let currentPlanet;
let newParticle, newParticleInitialX, newParticleInitialY, newParticleFinalX, newParticleFinalY;

let shiftDown = false;
document.addEventListener("keydown", (event) => {
    if (event.code == "ShiftLeft") {
        shiftDown = true;
    }
})
document.addEventListener("keyup", (event) => {
    if (event.code == "ShiftLeft") {
        shiftDown = false;
    }
})

document.addEventListener("mousedown", (event) => {
    for (planet of Planets) {
        let x1 = event.clientX - innerWidth / 2;
        let y1 = event.clientY - innerHeight / 2;
        let x2 = planet.x;
        let y2 = planet.y;
        if (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) < planet.radius) {
            movingPlanet = true;
            currentPlanet = planet;
        }
    }

    if (!movingPlanet && !shiftDown) {
        creatingNewParticle = true;
        newParticleInitialX = event.clientX - innerWidth / 2;
        newParticleInitialY = -(event.clientY - innerHeight / 2);
        newParticle = new Particle(newParticleInitialX, newParticleInitialY, 0, 0, false);
        Particles.push(newParticle);
    }

    if (shiftDown) {
        Planets.push(new Planet(event.clientX - innerWidth / 2, -(event.clientY - innerHeight / 2)));
    }

})
document.addEventListener("mousemove", (event) => {
    if (movingPlanet) {
        currentPlanet.x = event.clientX - innerWidth / 2;
        currentPlanet.y = event.clientY - innerHeight / 2;
    }
    if (creatingNewParticle) {
        newParticleFinalX = event.clientX - innerWidth / 2;
        newParticleFinalY = -(event.clientY - innerHeight / 2);
        newParticle.vX = (newParticleInitialX - newParticleFinalX) / 10;
        newParticle.vY = -(newParticleInitialY - newParticleFinalY) / 10;
    }
})
document.addEventListener("mouseup", (event) => {
    if (creatingNewParticle) {
        newParticle.readyToLaunch = true;
        creatingNewParticle = false;
    }

    movingPlanet = false;
})






function animate() {
    ctx.clearRect(-innerWidth / 2, -innerHeight / 2, innerWidth, innerHeight);

    for (let i = 0; i < Planets.length; i++) {
        Planets[i].draw();
    }

    if (movingPlanet) {

        for (let i = 0; i < vectors.length; i++) {
            vectors[i].update();
        }
    }


    for (particle of Particles) {
        particle.update();
    }

    requestAnimationFrame(animate);
}
animate();


