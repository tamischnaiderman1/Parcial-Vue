<template>
  <div id="app">

    <header class="cine-header hero">
      <nav class="navbar">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/favorites">Favoritos</RouterLink>
      </nav>

      <div class="hero-content">
        <h1>CineClásico</h1>
        <p>Explorá las mejores películas de todos los tiempos</p>
      </div>
      <img src="/src/assets/img/si.png" class="pegaso">

    </header>

    <main class="main">
        
              <h2 class="section-title">Encontrá las mejores películas</h2>
              
      <router-view />
      <h2 class="section-title">Tres Momentos Clave del Cine</h2>
      <section class="history-section container">
        <div class="history-card">
          <h3>1. El Origen: Captura del Movimiento (1895)</h3>
          <p>
            El cine nació oficialmente con la invención del **Cinematógrafo** por los **hermanos Lumière**. Su primera proyección pública fue en París en 1895. Su invento podía grabar, copiar y proyectar, resolviendo el desafío técnico de la imagen en movimiento.
          </p>
        </div>

        <div class="history-card">
          <h3>2. La Invención del Lenguaje (Cine Mudo)</h3>
          <p>
            Durante la era silenciosa (1900s - 1920s), cineastas como **Griffith** y **Eisenstein** desarrollaron el **lenguaje cinematográfico**. Inventaron técnicas como el **montaje** y el uso de diferentes planos para contar historias, transformando los simples documentos en narrativas complejas.
          </p>
        </div>
        
        <div class="history-card">
          <h3>3. La Conversión: La Llegada del Sonido (1927)</h3>
          <p>
            La última gran revolución fue el sonido sincronizado. La película ***El cantor de Jazz*** (1927) introdujo los diálogos, eliminando la necesidad de subtítulos y consolidando el formato moderno del cine. Esto dio inicio a la **Edad Dorada de Hollywood**.
          </p>
        </div>
        
      </section>
    </main>

    <footer class="footer">
    </footer>
<button v-if="showScrollButton" @click="scrollToTop" class="scroll-to-top">
      Volver a arriba
    </button>
  </div>
</template>

<script>
export default { 
  name: 'App',
  data() { 
    return {
      showScrollButton: false 
    }
  },
  mounted() { 
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() { 
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: { 
    handleScroll() {
      this.showScrollButton = window.scrollY > 200; 
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>
