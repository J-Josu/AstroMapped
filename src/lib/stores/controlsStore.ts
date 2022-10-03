import { writable } from 'svelte/store'
// controls.addEventListener('change', () => console.log("Controls Change"))
// controls.addEventListener('start', () => console.log("Controls Start Event"))
// controls.addEventListener('end', () => console.log("Controls End Event"))
// controls.enabled = false
// controls.rotateSpeed = 1.0
// controls.zoomSpeed = 1.2
// controls.panSpeed = 0.8
// controls.keys = ['KeyA', 'KeyS', 'KeyD']
// controls.noPan = true //default false
// controls.noRotate = true //default false
// controls.noZoom = true //default false
// controls.staticMoving = true //default false
// controls.dynamicDampingFactor = 0.1
// controls.maxDistance = 20
// controls.minDistance = 2

interface ControlsParameters {
  rotateSpeed: number
  zoomSpeed: number
  keys: string[]
  maxDistance: number
  minDistance: number
  enablePan: boolean
}
export const controlsParameters = writable<ControlsParameters>({
  rotateSpeed: 1.5,
  zoomSpeed: 1,
  keys: [],
  maxDistance: 50,
  minDistance: 5,
  enablePan: false
})
