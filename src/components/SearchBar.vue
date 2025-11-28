<template>
  <form @submit.prevent="onSubmit" class="searchbar">
    <input v-model="q" placeholder="Buscar título..." aria-label="Buscar" />
    <button>Buscar</button>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['search'],
  setup(_, { emit }) {
    const q = ref('')
    function onSubmit() {
      emit('search', q.value.trim())
    }
    return { q, onSubmit }
  }
}
</script>
