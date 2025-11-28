<template>
  <div class="container">
    <h2>Favoritos</h2>
    <div v-if="favorites.length" class="grid">
      <div v-for="m in favorites" :key="m.id" class="favcard">
        <img :src="m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : '/public/placeholder.png'"/>
        <h4>{{ m.title }}</h4>
        <div class="fav-actions">
          <router-link :to="`/movie/${m.id}`">Ver</router-link>
          <button @click="remove(m.id)">Quitar</button>
        </div>
      </div>
    </div>
    <div v-else>No hay favoritos aún.</div>
  </div>
</template>

<script>
import { ref } from 'vue'
const STORAGE_KEY = 'tp_movies_favs'
function readFavs(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]') }catch(e){return []} }
export default {
  setup() {
    const favorites = ref(readFavs())
    function remove(id) {
      const cur = favorites.value.filter(x => x.id !== id)
      favorites.value = cur
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cur))
    }
    return { favorites, remove }
  }
}
</script>
