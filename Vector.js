const length = 10;      // arrowHead's side length
const minDistance = 80;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = -y;
        this.angle = 0;
        this.head = {x: 0, y: 0};
        this.visible = true;
        this.distancesFromOtherPlanet = [];
        this.magnitude;
    }

    draw() {
        let hue = (Math.min(...this.distancesFromOtherPlanet) - 50) / Math.max(innerWidth/2, innerHeight/2) * 200;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.head.x, this.head.y);
        ctx.stroke();
        
        // add a pointing triangle at the head
        ctx.beginPath();
        ctx.moveTo(this.head.x, this.head.y);
        ctx.lineTo(this.head.x + length / 2 * Math.sin(this.angle),                  this.head.y - length / 2 * Math.cos(this.angle));
        ctx.lineTo(this.head.x + length * Math.sqrt(3) / 2 * Math.cos(this.angle),   this.head.y + length * Math.sqrt(3) / 2 * Math.sin(this.angle));
        ctx.lineTo(this.head.x - length / 2 * Math.sin(this.angle),                  this.head.y + length / 2 * Math.cos(this.angle));
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.head.x = this.x;
        this.head.y = this.y;
        this.distancesFromOtherPlanet = [];

        for (let i = 0; i < Planets.length; i++) {
            let x1 = Planets[i].x;
            let y1 = Planets[i].y;
            let x2 = this.x;
            let y2 = this.y;
            let r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            let theta = Math.atan2(y2 - y1, x2 - x1);
            

            this.head.x -= 1/Math.pow(r, 2) * Math.cos(theta) * 100000;
            this.head.y -= 1/Math.pow(r, 2) * Math.sin(theta) * 100000;

            this.distancesFromOtherPlanet.push(r);
        
        }

        this.angle = Math.atan2(this.head.y - this.y, this.head.x - this.x);
        

        // ECMAScript 6 introduces the Spread Operator (...iterable) :)
        if (Math.min(...this.distancesFromOtherPlanet) > minDistance) {
            this.draw();
        }
    }
}