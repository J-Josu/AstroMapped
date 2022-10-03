import { AmbientLight, DirectionalLight, DirectionalLightHelper, Scene } from 'three';
import { SUN_MOON_UNITS } from './constants';


const ambientLight = new AmbientLight('hsl(0, 0%, 100%)', 0.75);

const directionalLight = new DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-SUN_MOON_UNITS * 1.1, 0, 0);
directionalLight.lookAt(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.visible = false;

const directionalLightHelper = new DirectionalLightHelper(directionalLight, 5);
directionalLightHelper.visible = false;

export function addLights(scene: Scene) {
  scene.add(ambientLight);
  scene.add(directionalLight);
  scene.add(directionalLightHelper);
}

export function toSimulationMode() {
  ambientLight.intensity = 0.05;
  directionalLight.visible = true;
  // directionalLightHelper.visible = true;
}

export function toNormalMode() {
  ambientLight.intensity = 0.75;
  directionalLight.visible = false;
  // directionalLightHelper.visible = false;
}
