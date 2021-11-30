const pathLimit = 200;
const speed = 10000;
const particleSize = 10;
const colors = ['tomato', 'dodgerblue', 'mediumseagreen', 'magenta', 'orange', 'slateblue'];

class Particle {
    constructor(posX, posY, velocityX, velocityY, readyToLaunch = true) {
        this.x = posX;
        this.y = -posY;
        this.vX = velocityX;
        this.vY = velocityY;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.readyToLaunch = readyToLaunch;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, particleSize, 0, Math.PI * 2, false);
        ctx.fill();

        // predict path
        let next = { x: this.x, y: this.y };
        let velocity = { x: this.vX, y: this.vY };
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < pathLimit; i++) {
            for (let planet of Planets) {
                let x1 = next.x;
                let y1 = next.y;
                let x2 = planet.x;
                let y2 = planet.y;
                let r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                let theta = Math.atan2(y2 - y1, x2 - x1);
                velocity.x += 1 / Math.pow(r, 2) * Math.cos(theta) * speed;
                velocity.y += 1 / Math.pow(r, 2) * Math.sin(theta) * speed;
            }

            next.x += velocity.x;
            next.y += velocity.y;
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
        }

    }
    update() {

        if (this.readyToLaunch) {

            for (let planet of Planets) {
                let x1 = this.x;
                let y1 = this.y;
                let x2 = planet.x;
                let y2 = planet.y;
                let r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                let theta = Math.atan2(y2 - y1, x2 - x1);
                this.vX += 1 / Math.pow(r, 2) * Math.cos(theta) * speed;
                this.vY += 1 / Math.pow(r, 2) * Math.sin(theta) * speed;
            }

            // bounce off surface
            // if (this.x + this.vX > innerWidth / 2 || this.x + this.vX < -innerWidth / 2) {
            //     this.vX *= -0.8;
            // } else {
            //     this.x += this.vX;
            // }
            // if (this.y + this.vY > innerHeight / 2 || this.y + this.vY < -innerHeight / 2) {
            //     this.vY *= -0.8;
            // } else {
            //     this.y += this.vY;
            // }

            this.x += this.vX;
            this.y += this.vY;

        }

        this.draw();
    }
}