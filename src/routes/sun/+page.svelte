<script lang="ts">
  import { animate, init, onWindowResize } from './setup';

  let initilized = false;

  $: if (initilized) animate()
  
  function initilize(node: HTMLElement) {
    init(node, () => {
      console.log('inited');
      initilized = true;
    });
  }
</script>

<svelte:head>
  <title>Sun</title>
  <meta
    name="description"
    content="Now viewing the sun. This can be extended with more content"
  />
</svelte:head>

<svelte:window on:resize={onWindowResize} />

<main use:initilize />

<style>
</style>
