<script setup lang="ts">
import pets from '../data/pets.json'
import { computed } from 'vue'
import { useCart } from '../composables/useCart'
import { useUI } from '../composables/useUI'
import { useSettings } from '../composables/useSettings'
const petList = computed(() => pets)
const { addItem } = useCart()
const { showToast } = useUI()
const settings = useSettings()

const displayPrice = (p: number) => {
  const taxRate = settings.state.showTax ? 0.13 : 0
  const taxed = p * (1 + taxRate)
  return `${settings.state.currency} ${taxed.toFixed(2)}`
}
const onImgError = (e: Event) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/800/600' }
const iconFor = (species: string) => {
  const s = String(species).toLowerCase()
  if (s.includes('cat')) return '🐱'
  if (s.includes('dog')) return '🐶'
  if (s.includes('rabbit')) return '🐰'
  if (s.includes('turtle')) return '🐢'
  if (s.includes('parrot') || s.includes('budgie') || s.includes('bird')) return '🦜'
  if (s.includes('fish')) return '🐟'
  if (s.includes('guinea') || s.includes('pig')) return '🐹'
  if (s.includes('snake')) return '🐍'
  if (s.includes('hamster')) return '🐹'
  if (s.includes('hedgehog')) return '🦔'
  return '🐾'
}
</script>

<template>
  <section class="store">
    <h2>Available Pets</h2>
    <div class="grid">
      <article v-for="pet in petList" :key="pet.id" class="card">
        <div class="symbol">{{ iconFor(pet.species) }}</div>
        <div class="meta">
          <h3>{{ pet.name }}</h3>
          <p class="species">{{ pet.species }} — {{ pet.age }} yrs</p>
            <p class="price">{{ displayPrice(pet.price) }}</p>
          <div class="actions">
            <router-link class="details" :to="`/pet/${pet.id}`">View</router-link>
            <button class="btn" @click="()=>{ addItem({ id: pet.id, name: pet.name, price: pet.price, symbol: iconFor(pet.species) }); showToast(pet.name + ' added to cart') }">Add to Cart</button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.store{padding:1rem}
.grid{display:grid;gap:1rem;grid-template-columns:1fr}
.card{background:var(--card);border-radius:10px;overflow:hidden;box-shadow:0 6px 18px var(--shadow-color)}
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
