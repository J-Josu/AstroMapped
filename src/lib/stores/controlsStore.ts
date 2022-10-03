import { writable } from 'svelte/store';

interface ControlsParameters {
  rotateSpeed: number;
  zoomSpeed: number;
  keys: string[];
  maxDistance: number;
  minDistance: number;
  enablePan: boolean;
}
export const controlsParameters = writable<ControlsParameters>({
  rotateSpeed: 1.5,
  zoomSpeed: 1,
  keys: [],
  maxDistance: 50,
  minDistance: 5,
  enablePan: false
});
