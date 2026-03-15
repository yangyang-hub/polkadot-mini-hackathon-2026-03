import type { BulletData, BulletOwner } from "./types";

export class Bullet implements BulletData {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  width: number;
  height: number;
  active: boolean;
  owner: BulletOwner;
  damage: number;
  color: string;

  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    owner: BulletOwner,
    damage = 1,
    color?: string,
  ) {
    this.position = { x, y };
    this.velocity = { x: vx, y: vy };
    this.width = owner === "player" ? 4 : 6;
    this.height = owner === "player" ? 12 : 10;
    this.active = true;
    this.owner = owner;
    this.damage = damage;
    this.color = color ?? (owner === "player" ? "#00ffff" : "#ff4444");
  }

  update(delta: number, canvasHeight: number) {
    this.position.x += this.velocity.x * delta * 60;
    this.position.y += this.velocity.y * delta * 60;

    // Deactivate if out of bounds
    if (
      this.position.y < -this.height ||
      this.position.y > canvasHeight + this.height ||
      this.position.x < -50 ||
      this.position.x > 2000
    ) {
      this.active = false;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;

    const { x, y } = this.position;

    if (this.owner === "player") {
      // Player bullet: bright cyan energy bolt
      const gradient = ctx.createLinearGradient(x, y, x, y + this.height);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.3, this.color);
      gradient.addColorStop(1, "rgba(0,200,255,0)");
      ctx.fillStyle = gradient;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fillRect(
        x - this.width / 2,
        y - this.height / 2,
        this.width,
        this.height,
      );
      ctx.shadowBlur = 0;
    } else {
      // Enemy bullet: red energy ball
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(x, y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Core
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(x, y, this.width / 4, this.height / 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}
