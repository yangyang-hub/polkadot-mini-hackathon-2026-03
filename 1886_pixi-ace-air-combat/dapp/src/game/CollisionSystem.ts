import type { Entity } from "./types";

function intersects(a: Entity, b: Entity): boolean {
  return (
    Math.abs(a.position.x - b.position.x) < (a.width + b.width) / 2 &&
    Math.abs(a.position.y - b.position.y) < (a.height + b.height) / 2
  );
}

export class CollisionSystem {
  checkAABB(a: Entity, b: Entity): boolean {
    return intersects(a, b);
  }
}
