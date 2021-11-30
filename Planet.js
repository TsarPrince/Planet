const ripples = 4;
const rippleSpacing = 20;

class Planet {
    constructor (x, y) {
        this.x = x;
        this.y = -y;
        this.radius = 50;
        this.rippleRadius = 50;
    }

    draw() {
        ctx.fillStyle = '#384858';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();


        // draw ripples
        for (let i = 0; i < ripples; i++) {
            ctx.strokeStyle = `rgba(56, 72, 88, ${1 - clamp01(this.rippleRadius + i * rippleSpacing, this.radius, this.radius + (ripples - 1) * rippleSpacing)})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.rippleRadius + i * rippleSpacing, 0, Math.PI * 2);
            ctx.stroke();
        }
        this.rippleRadius += 0.1;
        if (this.rippleRadius > this.radius + rippleSpacing) {
            this.rippleRadius = this.radius;
        }
    }
}

function clamp01 (input, min, max) {
    return (input - min) / (max - min);
}

