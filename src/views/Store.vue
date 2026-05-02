<script setup lang="ts">
import pets from '../data/pets.json'
import { computed } from 'vue'
const petList = computed(() => pets)
</script>

<template>
  <section class="store">
    <h2>Available Pets</h2>
    <div class="grid">
      <article v-for="pet in petList" :key="pet.id" class="card">
        <img :src="pet.image" :alt="pet.name" />
        <div class="meta">
          <h3>{{ pet.name }}</h3>
          <p class="species">{{ pet.species }} — {{ pet.age }} yrs</p>
          <p class="price">${{ pet.price.toFixed(2) }}</p>
          <router-link class="details" :to="`/pet/${pet.id}`">View</router-link>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.store{padding:1rem}
.grid{display:grid;gap:1rem;grid-template-columns:1fr}
.card{background:var(--card);border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.06)}
.card img{width:100%;height:160px;object-fit:cover}
.meta{padding:.8rem}
.price{color:var(--accent);font-weight:700;margin-top:.4rem}
.details{display:inline-block;margin-top:.6rem;color:var(--accent)}

@media(min-width:640px){
  .grid{grid-template-columns:repeat(2,1fr)}
}

@media(min-width:1024px){
  .grid{grid-template-columns:repeat(4,1fr)}
  .card img{height:180px}
}
</style>
