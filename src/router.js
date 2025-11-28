import { createRouter, createWebHistory } from 'vue-router'
import MovieList from './components/MovieList.vue'
import MovieDetails from './components/MovieDetails.vue'
import FavoritesList from './components/FavoritesList.vue'

const routes = [
  { path: '/', component: MovieList },
  { path: '/movie/:id', component: MovieDetails, props: true },
  { path: '/favorites', component: FavoritesList },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
