export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function distance(
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const dx = bx - ax;
  const dy = by - ay;
  return Math.sqrt(dx * dx + dy * dy);
}

export function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function angleBetween(
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  return Math.atan2(by - ay, bx - ax);
}
