// https://adventofcode.com/2021/day/17

const NUM_STEPS = 1000;
const VELOCITY_BOUND = 300;

export function part1(target: ITarget): number {
  const res = getMaxVelocity(target);
  return res[0];
}
export function part2(target: ITarget): number {
  const res = getMaxVelocity(target);
  return res.length;
}

function getMaxVelocity(target: ITarget) {
  const hits = [];

  for (let y = -VELOCITY_BOUND; y < VELOCITY_BOUND; y++) {
    for (let x = -VELOCITY_BOUND; x < VELOCITY_BOUND; x++) {
      const projectile = new Projectile(x, y);
      const maxY = projectile.run(NUM_STEPS, target);
      if (maxY !== -1) {
        hits.push(maxY);
      }
    }
  }

  return hits.sort((a, b) => b - a);
}

class Projectile {
  x = 0;
  y = 0;
  step = 0;
  xVelocity: number;
  yVelocity: number;
  maxY = 0;

  constructor(xVelocity: number, yVelocity: number) {
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
  }

  run(n: number, target: ITarget) {
    for (let i = 0; i < n; i++) {
      this.nextStep();
      if (this.isIn(target)) {
        return this.maxY;
      }
      if (this.y < target.y1) {
        return -1;
      }
    }
    return -1;
  }

  nextStep() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.xVelocity =
      this.xVelocity === 0
        ? 0
        : (this.xVelocity / Math.abs(this.xVelocity)) *
          (Math.abs(this.xVelocity) - 1);
    this.yVelocity--;
    this.maxY = Math.max(this.y, this.maxY);
  }

  isIn(target: ITarget) {
    return (
      this.x >= target.x1 &&
      this.x <= target.x2 &&
      this.y >= target.y1 &&
      this.y <= target.y2
    );
  }
}

interface ITarget {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

function fire(vx: number, vy: number, target: ITarget) {
  let x = 0;
  let y = 0;
  let maxY = 0;

  for (let i = 0; i < NUM_STEPS; i++) {
    x += vx;
    y += vy;
    vx -= Number(vx > 0) - Number(vx < 0);
    vy--;
    maxY = Math.max(y, maxY);
    if (x >= target.x1 && x <= target.x2 && y >= target.y1 && y <= target.y2) {
      return maxY;
    }
    if (y < target.y1) {
      return -1;
    }
  }
  return -1;
}
