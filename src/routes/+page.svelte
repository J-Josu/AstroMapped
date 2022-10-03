<svelte:head>
  <title>AstroMapped | SPACE APPS 2022</title>
  <meta
    name="description"
    content="Welcome to AstroMapped a place to explore space events on celestial bodies. At this moment the main focus is the Moon Quakes events."
  />
</svelte:head>

<main>
  <div class="container-standar-GlobalStyle">
    <h1>Welcome to AstroMapped</h1>
    <h3>
      Aplicacion web dedicada a la dibulgacion cientifica de informacion sobre
      los diferentes susesos, eventos o fenomenos naturales ocurridos en los
      cuerpos celestes de nuestro sistema solar
    </h3>
    <p>
      Aplicacion desarrollada en colaboracion co la UNLP, la NASA, y spaceApp
    </p>
    <br />
    <a class="button-standar-GlobalStyle" href="/sun"
      >Sun</a
    >
  </div>
</main>

<style>
  main {
    height: 100vh;
    padding: 5%;
    background-color: var(--background-atenation);
    background-image: url('assets/space_background.png');
    background-repeat: repeat;
    background-attachment: fixed;
    background-size: 100%;
  }
</style>
