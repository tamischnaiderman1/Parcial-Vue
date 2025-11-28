<template>
  <div class="container">
    <div class="controls">
      <SearchBar @search="onSearch" />
      <div class="filters">
        <select v-model="genreId" @change="applyFilter">
          <option value="">Todos los géneros</option>
          <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
        </select>

        <select v-model="minRating" @change="applyFilter">
          <option value="">Cualquier rating</option>
          <option v-for="r in [9,8,7,6,5]" :key="r" :value="r">>= {{ r }}</option>
        </select>
      </div>
    </div>

    <section class="grid">
      <MovieCard v-for="m in filtered" :key="m.id" :movie="m" />
    </section>

    <div class="loadmore">
      <button @click="loadMore">Cargar más</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { getPopular, searchMovies, getGenres } from "../api/tmdb";

import MovieCard from "./MovieCard.vue";
import SearchBar from "./SearchBar.vue";

export default {
  components: { MovieCard, SearchBar },

  setup() {
    const movies = ref([]);
    const page = ref(1);
    const query = ref("");
    const genreId = ref("");
    const minRating = ref("");
    const genres = ref([]);

    async function loadPopular() {
      const data = await getPopular(page.value);
      movies.value.push(...data.results);
    }

    async function onSearch(q) {
      query.value = q;
      page.value = 1;
      movies.value = [];

      if (!q) {
        await loadPopular();
        return;
      }

      const data = await searchMovies(q, page.value);
      movies.value = data.results;
    }

    async function loadGenres() {
      genres.value = await getGenres();
    }

    function applyFilter() {
    }

    function loadMore() {
      page.value++;

      if (query.value) {
        searchMovies(query.value, page.value).then((d) =>
          movies.value.push(...d.results)
        );
      } else {
        getPopular(page.value).then((d) =>
          movies.value.push(...d.results)
        );
      }
    }

    const filtered = computed(() => {
      return movies.value.filter((m) => {
        if (genreId.value) {
          if (!m.genre_ids || !m.genre_ids.includes(Number(genreId.value)))
            return false;
        }

        if (minRating.value) {
          if ((m.vote_average || 0) < Number(minRating.value)) return false;
        }

        return true;
      });
    });

    onMounted(async () => {
      await loadGenres();
      await loadPopular();
    });

    return {
      movies,
      onSearch,
      loadMore,
      filtered,
      genres,
      genreId,
      minRating,
      applyFilter,
    };
  },
};
</script>
