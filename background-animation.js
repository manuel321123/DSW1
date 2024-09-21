const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Graph {
    constructor(equation, color, width = 2) {
        this.equation = equation;
        this.color = color;
        this.width = width;
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
            const y = this.equation(x / canvas.width) * canvas.height;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
}

const graphs = [
    new Graph(x => Math.sin(x * 2 * Math.PI) * 0.4 + 0.5, 'red'),
    new Graph(x => Math.cos(x * 2 * Math.PI) * 0.4 + 0.5, 'blue'),
    new Graph(x => Math.tan(x * 2 * Math.PI) * 0.1 + 0.5, 'green')
];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graphs.forEach(graph => graph.draw());
    requestAnimationFrame(animate);
}

animate();
