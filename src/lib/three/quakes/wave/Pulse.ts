import { CircleGeometry, DoubleSide, Line, LineBasicMaterial, Mesh, MeshLambertMaterial, Object3D } from 'three';
import CircleLineGeometry from './CircleLineGeometry';

export class Pulse extends Object3D {
  duration: number;
  disc: Mesh;
  line: Line;
  started: Date | null;
  constructor(radius: number, color: string, duration = 4000, autoStart = false) {
    super();
    this.duration = duration;
    const segments = 32;

    const discGeometry = new CircleGeometry(radius, segments);
    const discMaterial = new MeshLambertMaterial({
      side: DoubleSide,
      color: color,
      transparent: true,
      opacity: 0,
    });
    this.disc = new Mesh(discGeometry, discMaterial);
    this.add(this.disc);

    const lineGeometry = CircleLineGeometry(radius, segments);
    const lineMaterial = new LineBasicMaterial({
      color: color,
      linewidth: 1,
      transparent: true,
      opacity: 0,
    });
    this.line = new Line(lineGeometry, lineMaterial);
    this.add(this.line);

    if (autoStart) {
      this.start();
    }
    this.started = null;
    this.visible = false;
    this.lookAt(0,0,0)
  }

  start() {
    this.visible = true;
    this.started = new Date();
  }

  stop() {
    this.visible = false;
    this.started = null;
  }

  update() {
    if (!this.started) {
      return;
    }
    const now = new Date().getTime();
    const timeElapsed = now - this.started.getTime();
    let percentElapsed = timeElapsed / this.duration;
    if (percentElapsed >= 1) {
      percentElapsed -= Math.floor(percentElapsed);
    }

    const opacity = 1 - percentElapsed;

    let scale = percentElapsed;
    if (scale <= 0) {
      scale = 0.001;
    }

    // I was getting an error:
    //  Matrix3.getInverse(): can't invert matrix, determinant is 0
    //
    // From SO:
    //  Matrix3.getInverse(): can't invert matrix, determinant is 0
    //  usually happens when either the scale.x, scale.y or scale.z are 0.
    //  Make sure you're not scaling the object to 0.
    //
    // Ref:
    //  http://stackoverflow.com/questions/19150120/scaling-an-object-in-three-js

    this.scale.set(scale, scale, scale);
    this.line.material.opacity = opacity;
    this.disc.material.opacity = opacity * 0.5;
  }
}

