<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import pets from '../data/pets.json'
import { useCart } from '../composables/useCart'
import { useUI } from '../composables/useUI'
import { useSettings } from '../composables/useSettings'

const { addItem } = useCart()
const { showToast } = useUI()
const settings = useSettings()

const displayPrice = (p: number) => {
  const taxRate = settings.state.showTax ? 0.13 : 0
  const taxed = p * (1 + taxRate)
  return `${settings.state.currency} ${taxed.toFixed(2)}`
}

const route = useRoute()
const id = route.params.id as string
const pet = computed(() => pets.find((p: any) => String(p.id) === String(id)))

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
  <section v-if="pet" class="detail">
    <div class="symbol large">{{ iconFor(pet.species) }}</div>
    <div class="info">
      <h2>{{ pet.name }}</h2>
      <p class="species">{{ pet.species }} — {{ pet.age }} years</p>
      <p class="desc">{{ pet.description }}</p>
      <p class="price">Price: {{ displayPrice(pet.price) }}</p>
      <div class="actions">
        <button class="btn" @click="() => { addItem({ id: pet.id, name: pet.name, price: pet.price, image: pet.image }); showToast(pet.name + ' added to cart') }">Add to Cart</button>
        <router-link class="btn secondary" to="/store">Back to Store</router-link>
      </div>
    </div>
  </section>
  <section v-else class="notfound">
    <p>Pet not found.</p>
    <router-link to="/store">Back to Store</router-link>
  </section>
</template>

<style scoped>
.detail{display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:start}
.symbol.large{font-size:6rem;display:flex;align-items:center;justify-content:center;height:320px;background:var(--color-background-soft);border-radius:10px}
.price{color:var(--accent);font-weight:700;margin-top:.6rem}
.btn{display:inline-block;margin-top:1rem;background:var(--accent);color:white;padding:.5rem .8rem;border-radius:8px}
@media(max-width:700px){.detail{grid-template-columns:1fr}}
</style>
