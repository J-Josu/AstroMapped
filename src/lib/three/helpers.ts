import { AxesHelper, CameraHelper, GridHelper, type Scene } from 'three';
import { camera } from './camera';
import { HELPER_GENERAL_SIZE } from './constants';

const axisHelper = new AxesHelper(HELPER_GENERAL_SIZE);
axisHelper.visible = false;

const GRID_SIZE = HELPER_GENERAL_SIZE * 2;
const GRID_DIVISIONS_FACTOR = 2;

const gridHelper = new GridHelper(
  GRID_SIZE,
  GRID_SIZE * GRID_DIVISIONS_FACTOR,
  'hsl(0, 0%, 50%)',
  'hsl(0, 0%, 25%)'
);
gridHelper.visible = false;

const cameraHelper = new CameraHelper(camera);
cameraHelper.visible = false;

export function addHelpers(scene: Scene) {
  scene.add(gridHelper);
  scene.add(axisHelper);
  scene.add(cameraHelper);
}

export function toggleAxisHelper() {
  axisHelper.visible = !axisHelper.visible;
}
export function toggleGridHelper() {
  gridHelper.visible = !gridHelper.visible;
}
export function toggleCameraHelper() {
  cameraHelper.visible = !cameraHelper.visible;
}
