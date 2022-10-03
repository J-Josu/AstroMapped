import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({
    antialias: true
  });

  // default initialization
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
}

export const renderer = createRenderer();

// on window rezize event
function resizeRenderer() {
  renderer.setSize(window.innerWidth, window.innerHeight);
}
