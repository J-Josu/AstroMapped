import * as THREE from 'three';
import CameraControls from 'camera-controls';
import { MOON_UNIT_RADIUS } from './moon';
import { orientation, type DeviceOrientation } from '$lib/stores/orientationStore';
import type { PerspectiveCamera } from 'three';

CameraControls.install({ THREE: THREE });

export let cameraControls: CameraControls;

export function initControls(camera: PerspectiveCamera, domElement: HTMLCanvasElement) {
  cameraControls = new CameraControls(camera, domElement);
  cameraControls.minDistance = MOON_UNIT_RADIUS + 0.1;
  cameraControls.minZoom = 1;
  cameraControls.dollySpeed = 0.25;
  cameraControls.mouseButtons.wheel = CameraControls.ACTION.DOLLY;
  cameraControls.polarRotateSpeed = 0.1;
  cameraControls.azimuthRotateSpeed = 0.1;
  cameraControls.mouseButtons.right = CameraControls.ACTION.NONE
  cameraControls.touches.two = CameraControls.ACTION.TOUCH_ZOOM
  cameraControls.touches.three = CameraControls.ACTION.NONE

  cameraControls.addEventListener('update', () => {
    // const speedFactor = cameraControls.distance / (MOON_UNIT_RADIUS * 8)
    // cameraControls.polarRotateSpeed = speedFactor;
    // cameraControls.azimuthRotateSpeed = speedFactor;
    if (cameraControls.distance < MOON_UNIT_RADIUS * 1.1) {
      cameraControls.polarRotateSpeed = 0.01;
      cameraControls.azimuthRotateSpeed = 0.01;
    }
    else if (cameraControls.distance < MOON_UNIT_RADIUS * 1.5) {
      cameraControls.polarRotateSpeed = 0.1;
      cameraControls.azimuthRotateSpeed = 0.1;
    }
    else {
      cameraControls.polarRotateSpeed = 0.5;
      cameraControls.azimuthRotateSpeed = 0.5;
    }
  });
}

type RotationDirection = 'up' | 'down' | 'left' | 'right';

interface RotationState {
  isRotating: boolean,
  up: boolean,
  right: boolean,
  down: boolean,
  left: boolean;
}

class ControlManager {
  control: CameraControls;
  rotation: RotationState;
  rotationDeg: number;
  orientationState: DeviceOrientation;
  mediaQueryOrientation: MediaQueryList;
  resetOrientation: () => void;
  setRotation: (directions: RotationDirection[]) => void;
  unsetRotation: (directions: RotationDirection[]) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
  handleKeyUp: (event: KeyboardEvent) => void;
  handleMediaOrientation: (event: MediaQueryListEvent) => void;
  handleDeviceOrientation: (event: DeviceOrientationEvent) => void;
  toggleGiroscopic: () => boolean;

  readonly ANGLE_DIFF = 10;
  constructor(cameraControls: CameraControls) {
    this.control = cameraControls;
    this.control.saveState();
    this.rotation = {
      isRotating: false,
      up: false,
      right: false,
      down: false,
      left: false
    };
    this.rotationDeg = 0.005;
    this.orientationState = {
      enabled: false,
      wasDisabled: true,
      landscape: false,
      base: {
        alpha: 0,
        beta: 0,
        gamma: 0
      },
      actual: {
        alpha: 0,
        beta: 0,
        gamma: 0
      }
    };

    const $ = this;

    this.resetOrientation = () => {
      $.rotation.isRotating = false;
      $.rotation.up = false;
      $.rotation.right = false;
      $.rotation.down = false;
      $.rotation.left = false;
      $.control.reset(true);
    };

    this.setRotation = (directions: RotationDirection[]) => {
      $.rotation.isRotating = true;
      directions.forEach(direction => $.rotation[direction] = true);
    };
    this.unsetRotation = (directions: RotationDirection[]) => {
      directions.forEach(direction => $.rotation[direction] = false);
      $.rotation.isRotating = $.rotation.up || $.rotation.right || $.rotation.down || $.rotation.left;
    };

    this.handleKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW':
          $.rotation.up = true;
          $.rotation.down = false;
          break;
        case 'KeyS':
          $.rotation.up = false;
          $.rotation.down = true;
          break;
        case 'KeyD':
          $.rotation.right = false;
          $.rotation.left = true;
          break;
        case 'KeyA':
          $.rotation.right = true;
          $.rotation.left = false;
          break;
        default:
          return;
      }
      $.rotation.isRotating = $.rotation.up || $.rotation.right || $.rotation.down || $.rotation.left;
    };
    this.handleKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
          $.rotation.up = false;
          break;
        case 'KeyS':
          $.rotation.down = false;
          break;
        case 'KeyD':
          $.rotation.left = false;
          break;
        case 'KeyA':
          $.rotation.right = false;
          break;
        default:
          return;
      }
      $.rotation.isRotating = $.rotation.up || $.rotation.right || $.rotation.down || $.rotation.left;
    };

    this.handleMediaOrientation = (event: MediaQueryListEvent) => {
      $.orientationState.landscape = event.matches;
    };
    this.handleDeviceOrientation = (event) => {

      const { alpha, beta, gamma } = event;

      if (alpha === null || beta === null || gamma === null) return;
      if (alpha === 0 && beta === 0 && gamma === 0) return;

      const crrAlpha = alpha!, crrBeta = beta!, crrGamma = gamma!;

      $.orientationState.actual.alpha = alpha;
      $.orientationState.actual.beta = beta;
      $.orientationState.actual.gamma = gamma;

      if ($.orientationState.wasDisabled) {
        $.orientationState.wasDisabled = false;
        $.orientationState.base.alpha = alpha;
        $.orientationState.base.beta = beta;
        $.orientationState.base.gamma = gamma;
        $.rotation.isRotating = false;
        $.rotation.up = false;
        $.rotation.right = false;
        $.rotation.down = false;
        $.rotation.left = false;
        orientation.set($.orientationState);
        return;
      }

      let needsUpdate = false;

      // if (($.orientationState.base.beta - crrBeta) > $.ANGLE_DIFF) {
      //   needsUpdate = true;
      //   $.rotation.up = true
      //   $.rotation.down = false
      // }
      // else if (($.orientationState.base.beta - crrBeta) < -$.ANGLE_DIFF) {
      //   needsUpdate = true;
      //   $.rotation.up = false
      //   $.rotation.down = true
      // }
      // if (($.orientationState.base.gamma - crrGamma) > $.ANGLE_DIFF) {
      //   needsUpdate = true;
      //   $.rotation.right = true
      //   $.rotation.left = false
      // }
      // else if (($.orientationState.base.gamma - crrGamma) < -$.ANGLE_DIFF) {
      //   needsUpdate = true;
      //   $.rotation.right = false
      //   $.rotation.left = true
      // }
      const alphaDelta = Math.abs(Math.abs($.orientationState.base.alpha) - Math.abs(crrAlpha));
      const betaDelta = Math.abs(Math.abs($.orientationState.base.beta) - Math.abs(crrBeta));
      const gammaDelta = Math.abs(Math.abs($.orientationState.base.gamma) - Math.abs(crrGamma));

      if (!$.orientationState.landscape) {
        if (betaDelta > $.ANGLE_DIFF) {
          needsUpdate = true;
          const up = crrBeta > $.orientationState.base.beta;
          $.rotation.up = up;
          $.rotation.down = !up;
        }
        if (gammaDelta > $.ANGLE_DIFF) {
          needsUpdate = true;
          const right = crrGamma < $.orientationState.base.gamma;
          $.rotation.right = right;
          $.rotation.left = !right;
        }
      }
      else {
        if (gammaDelta > $.ANGLE_DIFF) {
          needsUpdate = true;
          const up = crrGamma > $.orientationState.base.gamma;
          $.rotation.up = up;
          $.rotation.down = !up;
        }
        // if (crrAlpha > $.ANGLE_DIFF) {
        //   needsUpdate = true;
        //   // let a = crrAlpha > 180? (crrAlpha-360)*-1: crrAlpha - 180
        //   // let b = $.orientationState.base.alpha > 180? ($.orientationState.base.alpha-360)*-1:($.orientationState.base.alpha - 180);
        //   const right = crrAlpha < $.orientationState.base.alpha;
        //   $.rotation.right = right
        //   $.rotation.left = !right
        // }
        const factor = crrAlpha > 180 ? 360 : 0;
        const a = Math.abs(Math.abs($.orientationState.base.alpha + factor) - Math.abs(crrAlpha));

        if (a > $.ANGLE_DIFF) {
          needsUpdate = true;
          const aux = (crrAlpha - $.orientationState.base.alpha);
          const right = $.orientationState.base.alpha < 180 ? aux > 0 : aux < 0;
          $.rotation.right = right;
          $.rotation.left = !right;
        }
      }

      if (!needsUpdate) {
        $.rotation.up = false;
        $.rotation.right = false;
        $.rotation.down = false;
        $.rotation.left = false;
      }
      $.rotation.isRotating = needsUpdate;
      orientation.set($.orientationState);
    };

    this.toggleGiroscopic = () => {
      $.orientationState.enabled = !$.orientationState.enabled;
      if ($.orientationState.enabled) {
        $.orientationState.wasDisabled = true;
        $.rotation.isRotating = false;
        window.addEventListener('deviceorientation', $.handleDeviceOrientation);
      }
      else {
        $.orientationState.wasDisabled = true;
        $.rotation.isRotating = false;
        $.rotation.up = false;
        $.rotation.right = false;
        $.rotation.down = false;
        $.rotation.left = false;
        window.removeEventListener('deviceorientation', $.handleDeviceOrientation);
      }
      return $.orientationState.enabled;
    };

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    this.mediaQueryOrientation = window.matchMedia("(orientation:landscape)");
    this.mediaQueryOrientation.addEventListener("change", this.handleMediaOrientation);
    this.orientationState.landscape = this.mediaQueryOrientation.matches;
  }

  update() {
    // const deg = cameraControls.distance / (MOON_UNIT_RADIUS * 2) * 0.01
    if (!this.rotation.isRotating) return;

    let azimuthAngle = 0, polarAngle = 0;
    if (this.rotation.up)
      polarAngle = -this.rotationDeg;
    else if (this.rotation.down)
      polarAngle = this.rotationDeg;

    if (this.rotation.right)
      azimuthAngle = -this.rotationDeg;
    else if (this.rotation.left)
      azimuthAngle = this.rotationDeg;

    this.control.rotate(azimuthAngle, polarAngle);
  }
}

export { ControlManager };
