<template>
  <div class="detail">
    <button @click="$router.back()">← Volver</button>

    <div v-if="movie" class="detail-inner">
      <img :src="posterUrl" alt="poster"/>
      <div class="info">
        <h2>{{ movie.title }} <small>({{ year }})</small></h2>
        <p class="tagline" v-if="movie.tagline">{{ movie.tagline }}</p>
        <p class="overview">{{ movie.overview }}</p>
        <p>Duración: {{ movie.runtime ? movie.runtime + ' min' : 'N/D' }}</p>
        <p>Géneros: <span v-for="g in movie.genres" :key="g.id">{{ g.name }} </span></p>
        <p>Rating: ⭐ {{ movie.vote_average }}</p>

        <div class="actions">
          <button @click="toggleFav">{{ isFav ? 'Quitar de favoritos' : 'Agregar a favoritos' }}</button>
          <a :href="imdbUrl" target="_blank" rel="noopener">Ver en IMDB</a>
        </div>
      </div>
    </div>

    <div v-else> Cargando... </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { getMovieDetails } from '../api/tmdb'

const STORAGE_KEY = 'tp_movies_favs'

function readFavs() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch(e){ return [] }
}

export default {
  props: ['id'],
  setup(props) {
    const movie = ref(null)
    const isFav = ref(false)

    function saveFavs(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) }

    function isFavorite(id) {
      return readFavs().some(f => f.id === id)
    }

    function addFavorite(m) {
      const cur = readFavs()
      if (!cur.some(x => x.id === m.id)) {
        cur.push({ id: m.id, title: m.title, poster_path: m.poster_path, release_date: m.release_date })
        saveFavs(cur)
      }
    }

    function removeFavorite(id) {
      const cur = readFavs().filter(x => x.id !== id)
      saveFavs(cur)
    }

    async function load() {
      movie.value = await getMovieDetails(props.id)
      isFav.value = isFavorite(Number(props.id))
    }

    function toggleFav() {
      if (!movie.value) return
      if (isFav.value) removeFavorite(movie.value.id)
      else addFavorite(movie.value)
      isFav.value = !isFav.value
    }

    const posterUrl = computed(() => movie.value && movie.value.poster_path ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}` : '/public/placeholder.png')
    const year = computed(() => (movie.value && movie.value.release_date) ? movie.value.release_date.split('-')[0] : 'N/D')
    const imdbUrl = computed(() => movie.value && movie.value.imdb_id ? `https://www.imdb.com/title/${movie.value.imdb_id}/` : '#')

    onMounted(load)

    return { movie, toggleFav, isFav, posterUrl, year, imdbUrl }
  }
}
</script>
