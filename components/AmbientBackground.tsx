"use client";

import { useEffect, useRef } from "react";

interface AmbientBackgroundProps {
  showFlowers?: boolean;
}

export default function AmbientBackground({ showFlowers = true }: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frameId = 0;

    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      hue: number;
    }

    let particles: Particle[] = [];

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.35 + 0.08,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.35 + 0.1,
        hue: Math.random() > 0.5 ? 95 : 320,
      };
    }

    function seed() {
      const count = Math.min(80, Math.floor((width * height) / 18000));
      particles = Array.from({ length: count }, createParticle);
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 45%, 75%, ${p.opacity})`;
        ctx!.fill();

        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      }

      frameId = requestAnimationFrame(draw);
    }

    resize();
    seed();
    draw();

    const onResize = () => {
      resize();
      seed();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const flowers = ["🌸", "🌺", "🌼", "🌷", "✿", "🌿"];
  const positions = [
    "top-[12%] left-[8%] [animation-delay:0s]",
    "top-[22%] right-[12%] [animation-delay:-3s] text-2xl",
    "top-[55%] left-[5%] [animation-delay:-7s]",
    "top-[70%] right-[18%] [animation-delay:-11s]",
    "top-[38%] left-[42%] [animation-delay:-5s] opacity-20",
    "top-[82%] left-[35%] [animation-delay:-14s]",
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-55" />
      {showFlowers && (
        <div className="absolute inset-0">
          {flowers.map((flower, i) => (
            <span
              key={i}
              className={`absolute animate-float text-xl opacity-35 blur-[0.3px] ${positions[i]}`}
            >
              {flower}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
