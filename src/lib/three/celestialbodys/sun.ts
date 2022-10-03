import * as CONST from '$three/constants';
import { Mesh, MeshBasicMaterial, SphereGeometry, TextureLoader } from 'three'

// from: https://en.wikipedia.org/wiki/Solar_radius
const SUN_ARITHMETIC_MEAN_RADIUS = 695_700

// Quality 1-8
const QUALITY = 4;

const radius = SUN_ARITHMETIC_MEAN_RADIUS * CONST.UNIT_TO_KM;
const sunOriginDistance = - (CONST.SUN_EARTH_UNITS - CONST.EARTH_MOON_UNITS)

const geometry = new SphereGeometry(
  radius,
  QUALITY * 8,
  QUALITY * 4
);

// from: https://www.solarsystemscope.com/textures/
const textureLoader = new TextureLoader();

const material = new MeshBasicMaterial({
  // color: `hsl(63, 100%, 50%)`,
  // wireframe: true,
  map: textureLoader.load(`assets/sun_low_res.jpg`)
});

const sun = new Mesh(geometry, material);

sun.position.set(
  sunOriginDistance,
  0,
  0
);

sun.visible = false;

export { sun };
