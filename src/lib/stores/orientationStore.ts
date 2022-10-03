import { controlManager } from '../../routes/moon/setup';
import { writable } from 'svelte/store';

interface RotationAnlges {
  alpha: number,
  beta: number,
  gamma: number;
}

export interface DeviceOrientation {
  enabled: boolean,
  wasDisabled: boolean,
  landscape: boolean,
  base: RotationAnlges,
  actual: RotationAnlges;
}

const createOrientationStore = () => {
  const { subscribe, set, update } = writable<DeviceOrientation>({
    enabled: false,
    wasDisabled: true,
    landscape: false,
    base: {
      alpha: 0,
      beta: 0,
      gamma: 0
    },
    actual: {
      alpha: 0,
      beta: 0,
      gamma: 0
    }
  });

  let onDisableCallback: () => void;

  function enable() {
    update(state => {
      state.enabled = true;
      state.wasDisabled = true;
      window.addEventListener('deviceorientation', controlManager.handleDeviceOrientation);
      return state;
    });
  }
  function disable() {
    update(state => {
      state.enabled = false;
      window.removeEventListener('deviceorientation', controlManager.handleDeviceOrientation);
      onDisableCallback();
      return state;
    });
  }
  function toggle() {
    update(state => {
      state.enabled = controlManager.toggleGiroscopic();
      return state;
    });
  }
  function onDisable(callback: () => void) {
    onDisableCallback = callback;
  }

  return {
    subscribe,
    set,
    update,
    disable,
    enable,
    toggle,
    onDisable
  };
};

export const orientation = createOrientationStore();
