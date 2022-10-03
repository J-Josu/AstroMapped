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
<div class="tools" style:bottom={0}>
  <button on:click={orientation.toggle}>Toggle Giroscopic</button>
  <button on:click={controlManager.resetOrientation}>reset</button>
  <div class="rotation-container">
    <button style="top:-4rem"
      on:pointerdown={() => controlManager.setRotation(['down'])}
      on:pointerup={() => controlManager.unsetRotation(['down'])}>⇧</button
    >
    <button style="right:-4rem"
      on:pointerdown={() => controlManager.setRotation(['right'])}
      on:pointerup={() => controlManager.unsetRotation(['right'])}>⇨</button
    ><button style="bottom:-3rem"
      on:pointerdown={() => controlManager.setRotation(['up'])}
      on:pointerup={() => controlManager.unsetRotation(['up'])}>⇩</button
    ><button style="left:-3rem"
      on:pointerdown={() => controlManager.setRotation(['left'])}
      on:pointerup={() => controlManager.unsetRotation(['left'])}>⇦</button
    >
  </div>
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
    gap: 0.25rem;
    position: absolute;
    left: 0;
    padding: 0.25rem;
    width: 100%;
  }
  button {
    padding: 0.5ch;
    background: none;
    font-weight: 500;
    color: hsl(0, 0%, 70%);
    border: 1px solid hsl(0, 0%, 70%);
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
  }
  .rotation-container {
    margin-left: auto;
    margin-right: 5rem;
    margin-bottom: 4rem;
    position: relative;
  }
  .rotation-container button {
    position: absolute;
    padding: 0.25rem;
    font-size: 2rem;
  }
</style>
