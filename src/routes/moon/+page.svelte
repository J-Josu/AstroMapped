<script lang="ts">
  import { orientation } from '$lib/stores/orientationStore';
  import { toggleMoonInterior, toggleMoonWireframe } from '$three/moon';
  import { onMount } from 'svelte';
  import {
    animate,
    init,
    onWindowResize,
    toggleExternalBodys,
    toggleAllQuakes,
    quakesManager,
    controlManager,
  } from './setup';

  let initilized = false;
  let enableContext = false;
  let viewQuakes = false;
  let labels: HTMLDivElement;

  function toggleContext() {
    enableContext = !enableContext;
    toggleExternalBodys(enableContext);
  }
  function toggleQuakes() {
    viewQuakes = !viewQuakes;
    toggleAllQuakes();
  }

  onMount(() => {
    animate();
    quakesManager.labelsContainer = labels;
  });
  function initilize(node: HTMLElement) {
    init(node, () => (initilized = true));
  }
</script>

<svelte:window on:resize={onWindowResize} />

<main use:initilize />
<div id="labels" bind:this={labels} />

<div class="tools" style:top={0}>
  <button on:click={toggleMoonWireframe}>Toggle wireframe</button>
  <button on:click={toggleMoonInterior}>Toggle interior</button>
  <button on:click={toggleContext}>Enable context</button>
  <button on:click={toggleQuakes}>Show quakes</button>
</div>
<div class="left-bottom">
  <button on:click={orientation.toggle}>Toggle Giroscopic</button>
  <button on:click={controlManager.resetOrientation}>reset</button>
</div>
<div class="rotation">
  <button
    style="top:-3.5rem"
    on:pointerdown={() => controlManager.setRotation(['down'])}
    on:pointerup={() => controlManager.unsetRotation(['down'])}>-</button
  >
  <button
    style="top:-3.5rem"
    on:pointerdown={() => controlManager.setRotation(['down'])}
    on:pointerup={() => controlManager.unsetRotation(['down'])}>UP</button
  >
  <button
    style="top:-3.5rem"
    on:pointerdown={() => controlManager.setRotation(['down'])}
    on:pointerup={() => controlManager.unsetRotation(['down'])}>+</button
  >
  <button
    style="right:-4rem"
    on:pointerdown={() => controlManager.setRotation(['right'])}
    on:pointerup={() => controlManager.unsetRotation(['right'])}>LEFT</button
  ><button
    style="left:-2.5rem"
    on:pointerdown={() => controlManager.setRotation(['up'])}
    on:pointerup={() => controlManager.unsetRotation(['up'])}>DOWN</button
  ><button
    style="left:-6rem"
    on:pointerdown={() => controlManager.setRotation(['left'])}
    on:pointerup={() => controlManager.unsetRotation(['left'])}>LEFT</button
  >
</div>

<style>
  #labels {
    display: hidden;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    color: hsl(0, 0%, 70%);
  }
  .tools {
    display: flex;
    width: fit-content;
    gap: 0.25rem;
    position: absolute;
    left: 0;
    padding: 0.25rem;
    width: 100%;
  }
  button {
    padding: 0.5ch;
    height: fit-content;
    background: none;
    font-weight: 600;
    color: hsl(0, 0%, 70%);
    border: 1px solid hsl(0, 0%, 70%);
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    background-color: hsl(0, 0%, 25%, 0.1);
  }
  .rotation {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    display: grid;
    grid-template-columns: repeat(3, 2.75rem);
    grid-template-rows: repeat(2, 2.75rem);
    gap: 0.5rem;
  }
  .rotation button {
    width: 100%;
    height: 100%;
    font-family: monospace;
  }
  .left-bottom {
    position: absolute;
    left: 0.5rem;
    bottom: 0.5rem;
  }
</style>
