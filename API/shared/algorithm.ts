// TypeScript definition of hypot inside Math.
interface MMath extends Math {
  hypot(p1: number, p2: number) : number;
}
declare const Math: MMath;

export module Algorithm {
  export function Distance(p1: {x:number, y: number}, p2: {x:number, y:number}) : number {
    return Math.hypot(p1.x-p2.x, p1.y-p2.y);
  }
}
