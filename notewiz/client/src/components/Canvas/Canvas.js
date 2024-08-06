// useCanvasBackground.js
import { useEffect, useRef } from 'react';

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Point {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.r = 6;
        this.x = getRandom(0, canvas.width - this.r / 2);
        this.y = getRandom(0, canvas.height - this.r / 2);
        this.xSpeed = getRandom(-50, 50);
        this.ySpeed = getRandom(-50, 50);
        this.lastDrawTime = null;
    }

    draw() {
        if (this.lastDrawTime) {
            const duration = (Date.now() - this.lastDrawTime) / 1000;
            const xDis = this.xSpeed * duration;
            const yDis = this.ySpeed * duration;
            let x = this.x + xDis;
            let y = this.y + yDis;
            if (x > this.canvas.width - this.r / 2) {
                x = this.canvas.width - this.r;
                this.xSpeed = -this.xSpeed;
            } else if (x < 0) {
                x = 0;
                this.xSpeed = -this.xSpeed;
            }

            if (y > this.canvas.height - this.r / 2) {
                y = this.canvas.height - this.r;
                this.ySpeed = -this.ySpeed;
            } else if (y < 0) {
                y = 0;
                this.ySpeed = -this.ySpeed;
            }
            this.x = x;
            this.y = y;
        }
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'rgb(52,42,42)';
        this.ctx.fill();
        this.lastDrawTime = Date.now();
    }
}

class Graph {
    constructor(canvas, pointNumber = 30, maxDis = 500) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.points = new Array(pointNumber).fill(0).map(() => new Point(canvas));
        this.maxDis = maxDis;
    }

    draw() {
        requestAnimationFrame(() => this.draw());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i];
            p1.draw();
            for (let j = i + 1; j < this.points.length; j++) {
                const p2 = this.points[j];
                const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                if (d > this.maxDis) {
                    continue;
                }
                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y);
                this.ctx.lineTo(p2.x, p2.y);
                this.ctx.closePath();
                this.ctx.strokeStyle = `rgba(52, 42, 42, ${1 - d / this.maxDis})`;
                this.ctx.stroke();
            }
        }
    }
}

export default function useCanvasBackground(canvasRef) {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth * devicePixelRatio;
            canvas.height = window.innerHeight * devicePixelRatio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const graph = new Graph(canvas);
        graph.draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [canvasRef]);
}
