<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import pets from '../data/pets.json'

const route = useRoute()
const id = route.params.id as string
const pet = computed(() => pets.find((p: any) => String(p.id) === String(id)))
</script>

<template>
  <section v-if="pet" class="detail">
    <img :src="pet.image" :alt="pet.name" />
    <div class="info">
      <h2>{{ pet.name }}</h2>
      <p class="species">{{ pet.species }} — {{ pet.age }} years</p>
      <p class="desc">{{ pet.description }}</p>
      <p class="price">Price: ${{ pet.price.toFixed(2) }}</p>
      <router-link class="btn" to="/store">Back to Store</router-link>
    </div>
  </section>
  <section v-else class="notfound">
    <p>Pet not found.</p>
    <router-link to="/store">Back to Store</router-link>
  </section>
</template>

<style scoped>
.detail{display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:start}
.detail img{width:100%;height:320px;object-fit:cover;border-radius:10px}
.price{color:var(--accent);font-weight:700;margin-top:.6rem}
.btn{display:inline-block;margin-top:1rem;background:var(--accent);color:white;padding:.5rem .8rem;border-radius:8px}
@media(max-width:700px){.detail{grid-template-columns:1fr}}
</style>
