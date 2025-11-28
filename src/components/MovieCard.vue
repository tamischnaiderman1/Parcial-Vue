<template>
  <div class="card">
    <img :src="posterUrl" :alt="movie.title"/>
    <div class="card-body">
      <h3>{{ movie.title }}</h3>
      <p class="year">{{ year }}</p>
      <div class="card-footer">
        <router-link :to="`/movie/${movie.id}`">Ver</router-link>
        <span>⭐ {{ movie.vote_average }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie'],
  computed: {
    posterUrl() {
      return this.movie.poster_path ? `https://image.tmdb.org/t/p/w342${this.movie.poster_path}` : '/public/placeholder.png'
    },
    year() {
      return (this.movie.release_date || '').split('-')[0] || 'N/D'
    }
  }
}
</script>
