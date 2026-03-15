import type { StarData } from "./types";

const STAR_COUNT = 150;

export class Background {
  private stars: StarData[] = [];
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.initStars();
  }

  private initStars() {
    this.stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      this.stars.push(this.createStar(true));
    }
  }

  private createStar(randomY = false): StarData {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -2,
      speed: 0.5 + Math.random() * 2,
      size: 0.5 + Math.random() * 2,
      brightness: 0.3 + Math.random() * 0.7,
    };
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.initStars();
  }

  update(delta: number) {
    for (const star of this.stars) {
      star.y += star.speed * delta * 60;
      if (star.y > this.height) {
        Object.assign(star, this.createStar(false));
        star.x = Math.random() * this.width;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#000005";
    ctx.fillRect(0, 0, this.width, this.height);

    for (const star of this.stars) {
      const alpha = star.brightness;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
