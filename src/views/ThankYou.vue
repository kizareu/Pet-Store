<script setup lang="ts">
import { computed } from 'vue'
import { useCart } from '../composables/useCart'
import { useSettings } from '../composables/useSettings'
import { useRouter } from 'vue-router'

const router = useRouter()
const { lastOrder } = useCart()
const settings = useSettings()

const order = computed(() => lastOrder.value)

const goHome = () => router.push('/store')
</script>

<template>
  <section class="thankyou">
    <div v-if="!order">
      <p>No recent order found.</p>
      <button class="btn" @click="goHome">Continue shopping</button>
    </div>
    <div v-else>
      <h2>Thank you for your purchase!</h2>
      <p>Order #: {{ order.id }}</p>
      <p>Placed: {{ new Date(order.createdAt).toLocaleString() }}</p>
      <h3>Items</h3>
      <ul>
        <li v-for="it in order.items" :key="it.id">{{ it.name }} x{{ it.qty }} — {{ settings.state.currency }} {{ (it.price * it.qty).toFixed(2) }}</li>
      </ul>
      <h3>Shipping</h3>
      <p>{{ order.shipping.name }}</p>
      <p>{{ order.shipping.address }}, {{ order.shipping.city }} {{ order.shipping.postal }}</p>
      <p>{{ order.shipping.country }}</p>
      <h3>Summary</h3>
      <p>Subtotal: {{ settings.state.currency }} {{ order.subtotal.toFixed(2) }}</p>
      <p>GST: {{ settings.state.currency }} {{ order.tax.toFixed(2) }}</p>
      <p>Shipping: {{ settings.state.currency }} {{ order.shippingCost.toFixed(2) }}</p>
      <p>Total: <strong>{{ settings.state.currency }} {{ order.total.toFixed(2) }}</strong></p>
      <p>Estimated delivery: {{ new Date(order.estimatedDelivery).toDateString() }}</p>
      <div style="margin-top:1rem">
        <button class="btn" @click="goHome">Back to store</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.thankyou{padding:1rem;max-width:720px;margin:0 auto}
.btn{background:var(--accent);color:white;padding:.5rem .8rem;border-radius:8px;border:none}
</style>
