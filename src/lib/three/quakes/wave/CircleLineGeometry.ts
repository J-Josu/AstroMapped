import { BufferGeometry, Vector3 } from 'three';

export default function CircleLineGeometry(
  radius: number,
  segments: number,
  thetaStart: number=0,
  thetaLength: number=2 * Math.PI
) {
  const args = {
    radius: radius || 50,
    segments: segments || 8,
    thetaStart: thetaStart || 0,
    thetaLength: thetaLength || (2 * Math.PI),
  };
  const vertices = [];
  const delta = ((args.thetaStart + args.thetaLength) - args.thetaStart) / args.segments;
  for (let i = 0; i <= args.segments; i += 1) {
    const angle = args.thetaStart + (delta * i);
    const x = args.radius * Math.cos(angle);
    const y = args.radius * Math.sin(angle);
    vertices.push(new Vector3(x, y, 0));
  }
  const geometry = new BufferGeometry().setFromPoints(vertices);
  return geometry;
}
