import type { EnemyData, EnemyType } from "./types";
import { Bullet } from "./Bullet";

interface EnemyConfig {
  width: number;
  height: number;
  hp: number;
  speed: number;
  score: number;
  shootInterval: number;
  color: string;
}

const ENEMY_CONFIGS: Record<EnemyType, EnemyConfig> = {
  normal: {
    width: 36,
    height: 36,
    hp: 2,
    speed: 1.5,
    score: 100,
    shootInterval: 2,
    color: "#ff6600",
  },
  fast: {
    width: 28,
    height: 28,
    hp: 1,
    speed: 3,
    score: 150,
    shootInterval: 1.5,
    color: "#ff0066",
  },
  boss: {
    width: 70,
    height: 70,
    hp: 20,
    speed: 0.8,
    score: 1000,
    shootInterval: 0.8,
    color: "#8800ff",
  },
};

export class Enemy implements EnemyData {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  width: number;
  height: number;
  active: boolean;
  type: EnemyType;
  hp: number;
  maxHp: number;
  score: number;
  shootTimer: number;
  shootInterval: number;
  color: string;
  private time: number = 0;
  private canvasWidth: number;
  private sineAmplitude: number;
  private sineFreq: number;

  constructor(x: number, canvasWidth: number, type: EnemyType, waveFactor = 1) {
    this.canvasWidth = canvasWidth;
    const cfg = ENEMY_CONFIGS[type];
    this.type = type;
    this.width = cfg.width;
    this.height = cfg.height;
    this.hp = cfg.hp * Math.ceil(waveFactor);
    this.maxHp = this.hp;
    this.score = cfg.score;
    this.color = cfg.color;
    this.shootInterval = Math.max(0.4, cfg.shootInterval / waveFactor);
    this.shootTimer = Math.random() * this.shootInterval;
    this.active = true;

    const speed = cfg.speed * (0.8 + waveFactor * 0.2);
    this.position = { x, y: -this.height };
    this.velocity = { x: 0, y: speed };
    this.sineAmplitude = type === "boss" ? 80 : type === "fast" ? 30 : 50;
    this.sineFreq = type === "fast" ? 2 : 1;
  }

  update(delta: number, playerX: number): Bullet[] {
    const bullets: Bullet[] = [];

    this.time += delta;
    const vy = this.velocity.y;

    // Sinusoidal horizontal movement
    const vx = Math.sin(this.time * this.sineFreq) * this.sineAmplitude * delta;

    this.position.y += vy * delta * 60;
    this.position.x += vx;

    // Clamp horizontal
    const hw = this.width / 2;
    if (this.position.x < hw) this.position.x = hw;
    if (this.position.x > this.canvasWidth - hw)
      this.position.x = this.canvasWidth - hw;

    // Shooting
    this.shootTimer -= delta;
    if (this.shootTimer <= 0) {
      this.shootTimer = this.shootInterval;
      const dx = playerX - this.position.x;
      const dist = Math.sqrt(dx * dx + 400);
      const norm = 1 / dist;
      const speed = this.type === "boss" ? 5 : 4;

      if (this.type === "boss") {
        // Spread shot
        for (let a = -2; a <= 2; a++) {
          const angle = (a * Math.PI) / 8;
          bullets.push(
            new Bullet(
              this.position.x + Math.sin(angle) * 20,
              this.position.y + this.height / 2,
              Math.sin(angle) * speed,
              Math.cos(angle) * speed,
              "enemy",
              2,
              "#ff00ff",
            ),
          );
        }
      } else {
        bullets.push(
          new Bullet(
            this.position.x,
            this.position.y + this.height / 2,
            dx * norm * speed,
            Math.sqrt(400) * norm * speed,
            "enemy",
            1,
            this.color,
          ),
        );
      }
    }

    return bullets;
  }

  takeDamage(amount: number): boolean {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
      this.active = false;
      return true;
    }
    return false;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;

    const { x, y } = this.position;
    const hw = this.width / 2;
    const hh = this.height / 2;

    ctx.save();
    ctx.translate(x, y);

    if (this.type === "boss") {
      this.renderBoss(ctx, hw, hh);
    } else if (this.type === "fast") {
      this.renderFast(ctx, hw, hh);
    } else {
      this.renderNormal(ctx, hw, hh);
    }

    // HP bar (for boss and damaged enemies)
    if (this.type === "boss" || this.hp < this.maxHp) {
      const barW = this.width + 10;
      const barH = 4;
      const barX = -barW / 2;
      const barY = hh + 6;
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(barX, barY, barW, barH);
      const ratio = this.hp / this.maxHp;
      ctx.fillStyle =
        ratio > 0.5 ? "#00ff44" : ratio > 0.25 ? "#ffaa00" : "#ff2222";
      ctx.fillRect(barX, barY, barW * ratio, barH);
    }

    ctx.restore();
  }

  private renderNormal(ctx: CanvasRenderingContext2D, hw: number, hh: number) {
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;

    // Body
    ctx.fillStyle = "#3a1000";
    ctx.beginPath();
    ctx.moveTo(0, hh); // nose (pointing down)
    ctx.lineTo(6, hh - 15);
    ctx.lineTo(8, -hh + 10);
    ctx.lineTo(0, -hh);
    ctx.lineTo(-8, -hh + 10);
    ctx.lineTo(-6, hh - 15);
    ctx.closePath();
    ctx.fill();

    // Wings
    ctx.fillStyle = "#7a2200";
    ctx.beginPath();
    ctx.moveTo(6, hh - 15);
    ctx.lineTo(hw + 8, -hh + 15);
    ctx.lineTo(hw, -hh + 5);
    ctx.lineTo(8, -hh + 10);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-6, hh - 15);
    ctx.lineTo(-hw - 8, -hh + 15);
    ctx.lineTo(-hw, -hh + 5);
    ctx.lineTo(-8, -hh + 10);
    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = "#ff4400";
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.ellipse(0, -hh + 12, 4, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Exhaust
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, -hh - 3, 3, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  private renderFast(ctx: CanvasRenderingContext2D, hw: number, hh: number) {
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;

    // Sleek delta-wing body
    ctx.fillStyle = "#3a0020";
    ctx.beginPath();
    ctx.moveTo(0, hh);
    ctx.lineTo(hw, -hh);
    ctx.lineTo(-hw, -hh);
    ctx.closePath();
    ctx.fill();

    // Glow core
    ctx.fillStyle = "#ff0066";
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.ellipse(0, 0, hw / 3, hh / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Exhaust
    ctx.fillStyle = "#ff99cc";
    ctx.beginPath();
    ctx.ellipse(0, -hh - 4, 3, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  private renderBoss(ctx: CanvasRenderingContext2D, hw: number, hh: number) {
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;

    // Main body
    ctx.fillStyle = "#1a0033";
    ctx.beginPath();
    ctx.moveTo(0, hh);
    ctx.lineTo(12, hh - 20);
    ctx.lineTo(15, 0);
    ctx.lineTo(10, -hh);
    ctx.lineTo(-10, -hh);
    ctx.lineTo(-15, 0);
    ctx.lineTo(-12, hh - 20);
    ctx.closePath();
    ctx.fill();

    // Wide wings
    ctx.fillStyle = "#330066";
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(hw, hh - 10);
    ctx.lineTo(hw - 5, hh);
    ctx.lineTo(12, hh - 20);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.lineTo(-hw, hh - 10);
    ctx.lineTo(-hw + 5, hh);
    ctx.lineTo(-12, hh - 20);
    ctx.closePath();
    ctx.fill();

    // Front wings
    ctx.fillStyle = "#440088";
    ctx.beginPath();
    ctx.moveTo(10, -hh);
    ctx.lineTo(hw + 5, -hh + 25);
    ctx.lineTo(hw - 5, -hh + 15);
    ctx.lineTo(15, 0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-10, -hh);
    ctx.lineTo(-hw - 5, -hh + 25);
    ctx.lineTo(-hw + 5, -hh + 15);
    ctx.lineTo(-15, 0);
    ctx.closePath();
    ctx.fill();

    // Energy core
    const pulse = 0.6 + 0.4 * Math.sin(this.time * 4);
    const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 18);
    coreGrad.addColorStop(0, `rgba(255,255,255,${pulse})`);
    coreGrad.addColorStop(0.4, `rgba(180,0,255,${pulse * 0.8})`);
    coreGrad.addColorStop(1, "rgba(80,0,120,0)");
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();

    // Multi-exhaust
    const eColors = ["#aa00ff", "#cc44ff", "#aa00ff"];
    const eXs = [-10, 0, 10];
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = eColors[i];
      ctx.beginPath();
      ctx.ellipse(eXs[i], -hh - 5, 4, 8, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }
}
