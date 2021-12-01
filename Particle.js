const pathLimit = 300;
const speed = 10000;
const particleSize = 5;
// const colors = ['tomato', 'dodgerblue', 'mediumseagreen', 'magenta', 'orange', 'slateblue'];
const colors = ['#ff6347', '#1e90ff', '#3cb371', '#ff00ff', '#ffa500', '#6a5acd'];

class Particle {
    constructor(posX, posY, velocityX, velocityY, readyToLaunch = true) {
        this.x = posX;
        this.y = -posY;
        this.vX = velocityX;
        this.vY = velocityY;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.readyToLaunch = readyToLaunch;
        this.firstTime = true;
    }
    draw() {
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, particleSize, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();

        // predict path
        let nextPos = { x: this.x, y: this.y };
        let nextVelocity = { x: this.vX, y: this.vY };
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < pathLimit; i++) {
            for (let planet of planets) {
                let x1 = nextPos.x;
                let y1 = nextPos.y;
                let x2 = planet.x;
                let y2 = planet.y;
                let r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                let theta = Math.atan2(y2 - y1, x2 - x1);
                nextVelocity.x += 1 / Math.pow(r, 2) * Math.cos(theta) * speed;
                nextVelocity.y += 1 / Math.pow(r, 2) * Math.sin(theta) * speed;
            }

            nextPos.x += nextVelocity.x;
            nextPos.y += nextVelocity.y;
            ctx.lineTo(nextPos.x, nextPos.y);
        }
        // ctx.strokeStyle = this.color + "cc";        //strokeStyle = fillStyle + alpha = 0.8
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();

    }
    update() {

        if (this.readyToLaunch) {

            if (this.firstTime) {
                console.log(this.x, this.y, this.vX, this.vY);
                this.firstTime = false;
            }

            for (let planet of planets) {
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