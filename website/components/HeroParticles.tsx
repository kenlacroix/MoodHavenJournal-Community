"use client";
import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = 400;

    class Raindrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.length = Math.random() * 25 + 10;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.2 + 0.05;
      }

      update() {
        this.y += this.speed;
        if (this.y > height) {
          this.y = 0 - this.length;
          this.x = Math.random() * width;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();
      }
    }

    const drops: Raindrop[] = Array.from({ length: 80 }, () => new Raindrop());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drops.forEach((drop) => {
        drop.update();
        drop.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = 400;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
    />
  );
}
