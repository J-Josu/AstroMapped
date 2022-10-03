import { Color, Scene } from 'three';
import { addHelpers } from './helpers';

const BACKGROUND_COLOR = 'hsl(255, 25%, 1%)';

function setupScene() {
  const scene = new Scene();
  scene.background = new Color(BACKGROUND_COLOR);
  addHelpers(scene);
  return scene;
}

export const scene = setupScene();
