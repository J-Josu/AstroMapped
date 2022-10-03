import { Camera, EdgesGeometry, Group, LineBasicMaterial, LineSegments, Mesh, MeshStandardMaterial, SphereGeometry, Texture, TextureLoader, WebGLRenderer, type Scene } from 'three';
import { HELPER_LINES_COLOR } from './constants';

const HALF_PI = Math.PI / 2;
const QUALITY = 4;

const textureLoader = new TextureLoader();

function createFace(texture: Texture, radius: number, y: number, x: number) {
  const geometry = new SphereGeometry(
    radius,
    QUALITY * 8,
    QUALITY * 4,
    x * HALF_PI,
    HALF_PI,
    y * HALF_PI,
    HALF_PI
  );
  const material = new MeshStandardMaterial({
    // color: `hsl(${(x + 1) * 30 * (y * 2 + 1)}, 100%, 50%)`,
    map: texture,
  });
  return new Mesh(geometry, material);
}

function createComplete(texture: Texture, radius: number) {
  const geometry = new SphereGeometry(
    radius,
    QUALITY * 8,
    QUALITY * 4
  );
  const material = new MeshStandardMaterial({
    map: texture,
  });
  return new Mesh(geometry, material);
}

export function createBody(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  radius: number,
  ySections: number,
  xSections: number,
  filePath: string,
  onComplete: () => void
) {
  const bodyGroup = new Group();
  scene.add(bodyGroup);

  const isComplete = ySections === 1 && xSections === 1;
  if (isComplete) {
    setTimeout(async function () {
      const texture = await textureLoader.loadAsync(filePath);
      renderer.initTexture(texture);
      bodyGroup.add(createComplete(texture, radius));
      setTimeout(onComplete, 0);
    }, 0);

    return bodyGroup;
  }

  const maxIndex = ySections * xSections;
  let i = 0;

  function myLoop() {
    setTimeout(async function () {
      const iY = Math.floor(i / xSections), iX = i % xSections;
      const imageSrc = filePath.replace('{y}', `${iY}`).replace('{x}', `${iX}`);
      const texture = await textureLoader.loadAsync(imageSrc);
      renderer.initTexture(texture);
      bodyGroup.add(createFace(texture, radius, iY, iX));
      i++;
      if (i < maxIndex) {
        myLoop();
      }
      else {
        renderer.render(scene, camera);
        setTimeout(onComplete, 0);
      }
    }, 0);
  }
  setTimeout(myLoop, 0);

  return bodyGroup;
}

export function createBodyEdges(radius: number, quality: number, startsVisible: boolean) {
  const edges = new LineSegments(
    new EdgesGeometry(new SphereGeometry(
      // radius * 1.005,
      radius * 0.995,
      // quality * 4,
      36,
      18
    )),
    new LineBasicMaterial({ color: HELPER_LINES_COLOR })
  );
  edges.visible = startsVisible;
  return edges;
}
