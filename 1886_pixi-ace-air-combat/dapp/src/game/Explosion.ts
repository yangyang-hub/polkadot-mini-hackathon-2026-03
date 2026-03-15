import type { ParticleData } from "./types";

const PARTICLE_COLORS = [
  "#ff8800",
  "#ffcc00",
  "#ff4400",
  "#ffffff",
  "#ffee88",
  "#ff2200",
  "#ffdd00",
];

export class Explosion {
  private particles: ParticleData[] = [];
  active: boolean = true;
  private x: number;
  private y: number;

  constructor(x: number, y: number, scale = 1) {
    this.x = x;
    this.y = y;
    this.createParticles(scale);
  }

  private createParticles(scale: number) {
    const count = Math.floor(20 * scale);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (1 + Math.random() * 3) * scale;
      const life = 0.4 + Math.random() * 0.6;
      this.particles.push({
        position: { x: this.x, y: this.y },
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        life,
        maxLife: life,
        color:
          PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        size: (2 + Math.random() * 4) * scale,
        active: true,
      });
    }

    // Larger debris pieces
    const debrisCount = Math.floor(6 * scale);
    for (let i = 0; i < debrisCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (2 + Math.random() * 4) * scale;
      const life = 0.3 + Math.random() * 0.4;
      this.particles.push({
        position: { x: this.x, y: this.y },
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        life,
        maxLife: life,
        color: "#ff6600",
        size: (4 + Math.random() * 6) * scale,
        active: true,
      });
    }
  }

  update(delta: number) {
    let anyActive = false;
    for (const p of this.particles) {
      if (!p.active) continue;
      p.life -= delta;
      if (p.life <= 0) {
        p.active = false;
        continue;
      }
      anyActive = true;
      p.position.x += p.velocity.x * delta * 60;
      p.position.y += p.velocity.y * delta * 60;
      // Gravity
      p.velocity.y += 0.05 * delta * 60;
      // Drag
      p.velocity.x *= 1 - 0.02 * delta * 60;
    }
    this.active = anyActive;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;

    for (const p of this.particles) {
      if (!p.active) continue;

      const alpha = p.life / p.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.position.x, p.position.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}
