<svelte:head>
  <title>AstroMapped | SPACE APPS 2022</title>
  <meta
    name="description"
    content="Welcome to AstroMapped a place to explore space events on celestial bodies. At this moment the main focus is the Moon Quakes events."
  />
</svelte:head>
<script lang='ts'>
  let carrouselIndex = 0
  const astros = [
      {source: '/img/earth.png', href: '/earth'}, 
      {source: '/img/moon.png', href: '/moon'}, 
      {source: '/img/sun.png', href: '/sun'}
    ]
  const handleCarrousel = (direction:string) => {
    if (direction === "left") {
      carrouselIndex = carrouselIndex > 0 ? carrouselIndex - 1 : 2;
    } else {
      carrouselIndex = carrouselIndex < 2 ? carrouselIndex + 1 : 0;
    }
  };
  $: console.log(astros[carrouselIndex])
</script>
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
    <section>
      <a href='/earth'>click</a>
    <button class='arrow--left' on:click={() => handleCarrousel('left')}>Previous </button>
      <a class='image_container' href={astros[carrouselIndex].href}>
        <img src={astros[carrouselIndex].source} alt='earth'/>
      </a>
    <button class='arrow--right' on:click={() => handleCarrousel('right')}>Next</button>
  </section>
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
  section {
    width: 100%;
    height: 40vh;
    display: flex;
    position: relative;
    overflow: hidden;
  }
  button {
    height: 50px;
    width: 50px;
    padding: 2rem;
    background-color: #fff7f7;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.7;
    z-index: 2;
    cursor: pointer;
  }
  .image_container {
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  .arrow--right {
    right:10px
  }

  .arrow--left{
    left: 10px;
  }
</style>
