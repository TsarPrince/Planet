const ripples = 3;
const rippleSpacing = 20;

class Planet {
    constructor (x, y) {
        this.x = x;
        this.y = -y;
        this.radius = 50;
        this.rippleRadius = this.radius;
    }

    draw() {
        ctx.fillStyle = '#384858';      // rgba(56, 72, 88, 1)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();


        // draw ripples
        for (let i = 0; i < ripples; i++) {
            let alpha = 1 - clamp01(this.rippleRadius + i * rippleSpacing, this.radius, this.radius + ripples * rippleSpacing);
            ctx.fillStyle = `rgba(56, 72, 88, ${alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.rippleRadius + i * rippleSpacing, 0, Math.PI * 2);
            ctx.fill();
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

