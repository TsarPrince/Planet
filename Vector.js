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
        ctxf.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctxf.fillStyle = `hsl(${hue}, 100%, 50%)`;

        ctxf.beginPath();
        ctxf.moveTo(this.x, this.y);
        ctxf.lineTo(this.head.x, this.head.y);
        ctxf.stroke();
        
        // add a pointing triangle at the head
        ctxf.beginPath();
        ctxf.moveTo(this.head.x, this.head.y);
        ctxf.lineTo(this.head.x + length / 2 * Math.sin(this.angle),                  this.head.y - length / 2 * Math.cos(this.angle));
        ctxf.lineTo(this.head.x + length * Math.sqrt(3) / 2 * Math.cos(this.angle),   this.head.y + length * Math.sqrt(3) / 2 * Math.sin(this.angle));
        ctxf.lineTo(this.head.x - length / 2 * Math.sin(this.angle),                  this.head.y + length / 2 * Math.cos(this.angle));
        ctxf.closePath();
        ctxf.fill();
    }

    update() {
        this.head.x = this.x;
        this.head.y = this.y;
        this.distancesFromOtherPlanet = [];

        for (let i = 0; i < planets.length; i++) {
            let x1 = planets[i].x;
            let y1 = planets[i].y;
            let x2 = this.x;
            let y2 = this.y;
            let r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            let theta = Math.atan2(y2 - y1, x2 - x1);
            

            this.head.x -= 1/Math.pow(r, 2) * Math.cos(theta);
            this.head.y -= 1/Math.pow(r, 2) * Math.sin(theta);

            
            this.distancesFromOtherPlanet.push(r);
            
        }
        // normalise vector
        let mag = Math.sqrt(Math.pow(this.head.x - this.x, 2) + Math.pow(this.head.y - this.y, 2));
        this.head.x = this.x + (this.head.x - this.x) / mag * 10;
        this.head.y = this.y + (this.head.y - this.y) / mag * 10;
        
        this.angle = Math.atan2(this.head.y - this.y, this.head.x - this.x);
        

        // ECMAScript 6 introduces the Spread Operator (...iterable) :)
        if (Math.min(...this.distancesFromOtherPlanet) > minDistance) {
            this.draw();
        }
    }
}