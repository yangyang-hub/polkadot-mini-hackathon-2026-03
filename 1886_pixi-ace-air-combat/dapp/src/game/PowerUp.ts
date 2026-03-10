import type { PowerUpData, PowerUpType } from "./types";

const POWER_UP_SIZE = 24;

const POWER_UP_COLORS: Record<PowerUpType, string> = {
  health: "#00ff88",
  rapidfire: "#ffdd00",
  shield: "#00ccff",
};

export class PowerUp implements PowerUpData {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  width: number;
  height: number;
  active: boolean;
  type: PowerUpType;
  private time: number = 0;

  constructor(x: number, y: number, type: PowerUpType) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 1.2 };
    this.width = POWER_UP_SIZE;
    this.height = POWER_UP_SIZE;
    this.active = true;
    this.type = type;
  }

  update(delta: number, canvasHeight: number) {
    this.time += delta;
    this.position.y += this.velocity.y * delta * 60;
    if (this.position.y > canvasHeight + POWER_UP_SIZE) {
      this.active = false;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;

    const { x, y } = this.position;
    const r = this.width / 2;
    const color = POWER_UP_COLORS[this.type];
    const pulse = 0.7 + 0.3 * Math.sin(this.time * 4);

    ctx.save();
    ctx.translate(x, y);

    // Outer glow ring
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = pulse;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(0, 0, r + 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Background circle
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    // Icon
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.font = `bold ${Math.floor(r * 1.2)}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const icons: Record<PowerUpType, string> = {
      health: "♥",
      rapidfire: "⚡",
      shield: "⬡",
    };
    ctx.fillText(icons[this.type], 0, 1);

    ctx.shadowBlur = 0;
    ctx.restore();
  }
}
