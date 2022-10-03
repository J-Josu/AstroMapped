import { PerspectiveCamera } from 'three';
import { SUN_MOON_UNITS } from './constants';
import { MOON_UNIT_RADIUS } from './moon';

const DISTANCE = MOON_UNIT_RADIUS * 2;
const MAX_RENDER_DISTANCE = (SUN_MOON_UNITS * 1.5);

function setupCamera() {
  const camera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    MAX_RENDER_DISTANCE
  );

  // default initialization
  camera.zoom = 1;
  camera.position.set(DISTANCE, DISTANCE, DISTANCE);
  camera.lookAt(0, 0, 0);

  return camera;
}

export const camera = setupCamera();

// on window rezize event
function resizeCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}
