<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useSettings } from '../composables/useSettings'
const router = useRouter()
const { state, removeItem, updateQty, clear, total } = useCart()
const settings = useSettings()

const taxRate = computed(() => (settings.state.showTax ? 0.13 : 0))
const taxAmount = computed(() => total.value * taxRate.value)
const totalWithTax = computed(() => total.value + taxAmount.value)

const startCheckout = () => {
  if (state.items.length === 0) {
    alert('Your cart is empty')
    return
  }
  router.push('/checkout')
}
</script>

<template>
  <section class="cart">
    <h2>Your Cart</h2>
    <div v-if="state.items.length === 0">
      <p>Your cart is empty.</p>
    </div>

    <div v-else>
      <ul class="items">
        <li v-for="item in state.items" :key="item.id" class="item">
          <img v-if="item.image" :src="item.image" :alt="item.name" @error="(e)=>{(e.target as HTMLImageElement).src='https://picsum.photos/seed/placeholder/800/600'}" />
          <div class="meta">
            <h3>{{ item.name }}</h3>
            <p class="price">${{ item.price.toFixed(2) }}</p>
            <div class="qty">
              <label>Qty</label>
              <input type="number" min="0" v-model.number="item.qty" @change="updateQty(item.id, item.qty)" />
              <button class="remove" @click="removeItem(item.id)">Remove</button>
            </div>
          </div>
        </li>
      </ul>

      <div class="checkout">
        <p class="total">Total: {{ settings.state.currency }} {{ total.toFixed(2) }}</p>
        <p v-if="settings.state.showTax" class="tax">Tax (13%): {{ settings.state.currency }} {{ taxAmount.toFixed(2) }}</p>
        <p v-if="settings.state.showTax" class="totalWithTax">Total incl. tax: {{ settings.state.currency }} {{ totalWithTax.toFixed(2) }}</p>
        <button class="btn" @click="startCheckout">Continue</button>
      </div>
    </div>
    
  </section>
</template>
<style scoped>
.cart{padding:1rem}
.items{list-style:none;padding:0;margin:0}
.item{display:flex;gap:1rem;padding:.6rem 0;border-bottom:1px solid var(--color-border)}
.item img{width:100px;height:80px;object-fit:cover;border-radius:8px}
.meta{flex:1}
.price{color:var(--accent);font-weight:700}
.qty{display:flex;align-items:center;gap:.5rem;margin-top:.6rem}
.qty input{width:64px;padding:.25rem}
.remove{background:transparent;border:1px solid var(--color-border);padding:.3rem .6rem;border-radius:6px}
.checkout{display:flex;align-items:center;justify-content:space-between;margin-top:1rem}
.total{font-weight:700}
.btn{background:var(--accent);color:white;padding:.6rem 1rem;border-radius:8px;border:none}
.shipping input{width:100%;padding:.4rem;border-radius:6px;border:1px solid var(--color-border);margin-top:.25rem}
.thanks{margin-top:1rem;padding:1rem;background:var(--color-background-soft);border-radius:8px}
</style>
