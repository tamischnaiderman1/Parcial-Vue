<template>
  <div class="home">

    <section class="hero">
      <h1>Bienvenido</h1>
      <p>Películas personalizadas para vos</p>
    </section>

    <section>
      <h2>Tendencias en tu país</h2>
      <Carousel />
    </section>

    <section>
      <h2>Sigue viendo</h2>
      <Carousel />
    </section>

    <section>
      <h2>Recomendado para vos</h2>
      <Carousel />
    </section>

  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";

export default {
  components: { Carousel }
}
</script>

<style scoped>
.home { padding: 20px; color: white; }

.hero {
  height: 300px;
  background: url("https://images4.alphacoders.com/936/936378.jpg") center/cover;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 40px;
}
.hero h1 { font-size: 48px; }
.hero p { font-size: 18px; opacity: .8; }
</style>
