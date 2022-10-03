import type { RaycasterManager } from '$three/labels/raycaster';
import { MOON_UNIT_RADIUS } from '$three/moon';
import type { Object3D, Scene } from 'three';
import { createMesh, Quake } from './quake';
import type { QuakeData } from './types';

interface EventsMap {
  'appear': (quake: Quake) => void,
  'hidden': () => void;
}

class QuakesManager {
  private scene: Scene;
  private rcManager: RaycasterManager;
  private baseQuakes: Quake[];
  public quakes: Quake[];
  private quakesVisibles: boolean;
  private currentQuake: number;
  private listeners: {
    [k in keyof EventsMap]: EventsMap[k][]
  };
  public labelsContainer: HTMLDivElement;
  private labels: Quake[];
  private addLabel: (quake: Quake) => void;
  private initilizeQuakes: (quakesData: QuakeData[]) => void;

  constructor(scene: Scene, raycasterManager: RaycasterManager, quakesData: QuakeData[]) {
    this.scene = scene;
    this.rcManager = raycasterManager;
    this.baseQuakes = [];
    this.quakes = [];
    this.quakesVisibles = false;
    this.currentQuake = 0;
    this.listeners = { 'appear': [], 'hidden': [] };
    this.labels = [];
    // this.labelsContainer

    const $ = this;

    this.addLabel = (quake: Quake) => {
      this.labelsContainer.innerHTML = '';
      console.log(quake.label.textContent);
      quake.showLabel();
      this.labels.push(quake);
      this.labelsContainer.appendChild(quake.label);
    };
    this.initilizeQuakes = (quakes: QuakeData[]) => {
      // const point = createMesh(MOON_UNIT_RADIUS,20,20,'M');
      // point.visible = true
      // scene.add(point)
      quakes.forEach(quakeData => {
        const quake = new Quake(quakeData);
        $.scene.add(quake.mesh);
        $.scene.add(quake.pulse);
        $.baseQuakes.push(quake);
      });
    };
    this.initilizeQuakes(quakesData);

    this.rcManager.addClickListener((element: Object3D) => {
      if (!element.userData.quake) return;
      $.addLabel(element.userData.quake);
    });
  }



  toggleQuakesVisualization() {
    this.quakesVisibles = !this.quakesVisibles;
    if (this.quakesVisibles) {
      this.quakes = [];
      this.baseQuakes.forEach(quake => {
        quake.setVisibility(true);
        this.quakes.push(quake);
      });
    }
    else {
      this.quakes.forEach(quake => quake.setVisibility(false));
    }
  }

  showNextQuake() {
    this.notifyQuakeHidden();
    this.baseQuakes[this.currentQuake].mesh.visible = false;
    this.currentQuake += 1;
    if (this.currentQuake > this.baseQuakes.length) this.currentQuake = 0;
    const quake = this.baseQuakes[this.currentQuake];
    quake.mesh.visible = true;
    this.notifyQuakeAppear(quake);
  }

  notifyQuakeHidden() {
    this.listeners['hidden'].forEach(callback => callback());
  }
  notifyQuakeAppear(quake: Quake) {
    this.listeners['appear'].forEach(callback => callback(quake));
  }

  addEventListener<K extends keyof EventsMap>(event: K, callback: EventsMap[K]) {
    this.listeners[event].push(callback);
  }

  filterBy(filter: (quake: Quake) => boolean, allQuakes = false) {
    if (allQuakes)
      this.quakes = this.baseQuakes.filter(filter);
    else
      this.quakes = this.quakes.filter(filter);
    return this;
  }
  shortBy(short: (quake1: Quake, quake2: Quake) => number, allQuakes = false) {
    if (allQuakes)
      this.quakes = this.baseQuakes.slice().sort(short);
    else
      this.quakes = this.quakes.sort(short);
    return this;
  }

  update() {
    this.quakes.forEach(quake => quake.update());
  }
}

export { QuakesManager };
