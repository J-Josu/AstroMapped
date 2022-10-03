<script lang="ts">
  import { orientation } from '$lib/stores/orientationStore';
</script>

<div>
  <button on:click={orientation.toggle}>Toggle Giroscopic</button>
  <p>a:<span>{$orientation.actual.alpha.toPrecision(6)}</span></p>
  <p>a:<span>{$orientation.base.alpha.toPrecision(6)}</span></p>
  <p>b:<span>{$orientation.actual.beta.toPrecision(6)}</span></p>
  <p>b:<span>{$orientation.base.beta.toPrecision(6)}</span></p>
  <p>g:<span>{$orientation.actual.gamma.toPrecision(6)}</span></p>
  <p>g:<span>{$orientation.base.gamma.toPrecision(6)}</span></p>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.25rem;
  }
  p {
    display: flex;
    font-family: consolas;
    font-size: 1.25rem;
    color: blanchedalmond;
    margin-left: 1rem;
  }
  span {
    font-family: consolas;
    font-size: 1.25rem;
    color: blanchedalmond;
    font-weight: 100;
    width: 10ch;
    text-align: end;
  }
</style>
