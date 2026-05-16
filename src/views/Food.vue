<script setup lang="ts">
import foods from '../data/foods.json'
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
const onImgError = (e: Event) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/800/600' }
</script>

<template>
  <section class="food">
    <h2>Pet Food</h2>
    <div class="grid">
      <article v-for="f in foods" :key="f.id" class="card">
        <img :src="f.image" :alt="f.name" @error="onImgError" />
        <div class="meta">
          <h3>{{ f.name }}</h3>
          <p class="for">For: {{ f.for }}</p>
          <p class="price">{{ displayPrice(f.price) }}</p>
          <div class="nutrition">
            <strong>Nutrition:</strong>
            <ul>
              <li>Calories: {{ f.nutrition.calories }} kcal</li>
              <li>Protein: {{ f.nutrition.protein_g }} g</li>
              <li>Fat: {{ f.nutrition.fat_g }} g</li>
              <li>Fiber: {{ f.nutrition.fiber_g }} g</li>
            </ul>
          </div>
          <button class="btn" @click="() => { addItem({ id: f.id, name: f.name, price: f.price, image: f.image }); showToast(f.name + ' added to cart') }">Add to Cart</button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.food{padding:1rem}
.grid{display:grid;gap:1rem;grid-template-columns:1fr}
.card{background:var(--card);border-radius:10px;overflow:hidden;box-shadow:0 6px 18px var(--shadow-color)}
.card img{width:100%;height:160px;object-fit:cover}
.meta{padding:.8rem}
.price{color:var(--accent);font-weight:700;margin-top:.4rem}
.btn{display:inline-block;margin-top:.6rem;background:var(--accent);color:white;padding:.4rem .8rem;border-radius:8px;border:none}

@media(min-width:640px){.grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.grid{grid-template-columns:repeat(3,1fr)}.card img{height:180px}}
</style>
