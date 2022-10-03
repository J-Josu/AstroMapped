<svelte:head>
  <title>AstroMapped | SPACE APPS 2022</title>
  <meta
    name="description"
    content="Welcome to AstroMapped a place to explore space events on celestial bodies. At this moment the main focus is the Moon Quakes events."
  />
</svelte:head>

<main>
  <article>
    <header>
      <h1>Welcome to AstroMapped</h1>
      <p>
        An interactive web application for displaying data for a wide range of
        events meassured and investigated all throughout our Solar System
      </p>
    </header>
    <a href="/moon">GO TO MOON</a>
  </article>
</main>

<style>
  a,
  a:any-link {
    color: var(--primary-color);
    margin-top: 2rem;
    font-size: 4rem;
  }
  main {
    height: 100vh;
    padding-inline: 1%;
    background-image: radial-gradient(
      ellipse at bottom,
      hsl(212, 33%, 16%) 0%,
      hsl(228, 22%, 5%) 100%
    );
  }
  @media screen and (min-width: 688px) {
    main {
      padding-inline: 2.5vw;
    }
  }
  @media screen and (min-width: 992px) {
    main {
      padding-inline: 7.5vw;
    }
  }
  @media screen and (min-width: 1312px) {
    main {
      padding-inline: 15vw;
    }
  }

  article {
    width: 100%;
  }
  article,
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  header {
    margin-top: 10vh;
    max-width: 80vw;
  }
  h1 {
    font-size: 3rem;
    color: var(--accent-color);
  }
  header p {
    margin-top: 1.5rem;
    font-size: 1.5rem;
    padding-block: 0.25rem;
    text-align: center;
  }
  h2 {
    margin-top: 1rem;
  }
</style>
