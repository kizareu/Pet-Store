<script setup lang="ts">
import { computed } from 'vue'
import { useCart } from '../composables/useCart'
import { useSettings } from '../composables/useSettings'
import { useRouter } from 'vue-router'

const router = useRouter()
const { lastOrder } = useCart()
const settings = useSettings()

const order = computed(() => lastOrder.value)

const statuses = [
  { label: 'Purchased', date: computed(() => order.value?.createdAt) },
  { label: 'Shipped', date: computed(() => {
    if (!order.value) return null
    const d = new Date(order.value.createdAt)
    d.setDate(d.getDate() + 1)
    return d.toISOString()
  }) },
  { label: 'Out for Delivery', date: computed(() => {
    if (!order.value) return null
    const d = new Date(order.value.createdAt)
    d.setDate(d.getDate() + 4)
    return d.toISOString()
  }) },
  { label: 'Delivered', date: computed(() => order.value?.estimatedDelivery) },
]

const getStatusProgress = () => {
  if (!order.value) return 0
  const now = new Date()
  const created = new Date(order.value.createdAt)
  const est = new Date(order.value.estimatedDelivery)
  const totalTime = est.getTime() - created.getTime()
  const elapsed = now.getTime() - created.getTime()
  return Math.min(100, Math.max(0, (elapsed / totalTime) * 100))
}

const getCurrentStatusIndex = () => {
  if (!order.value) return 0
  const now = new Date()
  const created = new Date(order.value.createdAt)
  const daysSince = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  if (daysSince < 1) return 0
  if (daysSince < 4) return 1
  if (daysSince < 5) return 2
  return 3
}

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
      <p class="order-id">Order #: <strong>{{ order.id }}</strong></p>
      <p class="order-date">Placed: {{ new Date(order.createdAt).toLocaleString() }}</p>

      <div class="status-timeline">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: getStatusProgress() + '%' }"></div>
        </div>
        <div class="statuses">
          <div v-for="(status, idx) in statuses" :key="idx" class="status">
            <div :class="['status-dot', { active: idx <= getCurrentStatusIndex() }]"></div>
            <div class="status-content">
              <p class="status-label">{{ status.label }}</p>
              <p class="status-date">{{ status.date.value ? new Date(status.date.value).toDateString() : '' }}</p>
            </div>
          </div>
        </div>
      </div>

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
.order-id{font-size:1.1rem;margin:.5rem 0}
.order-date{color:var(--color-text);font-size:0.9rem;margin-bottom:1.5rem}
.status-timeline{margin:1.5rem 0 2rem 0}
.progress-bar{height:4px;background:var(--color-border);border-radius:2px;margin-bottom:1.5rem;overflow:hidden}
.progress-fill{height:100%;background:var(--accent);transition:width 0.3s ease}
.statuses{display:flex;justify-content:space-between;position:relative}
.status{display:flex;flex-direction:column;align-items:center;flex:1}
.status-dot{width:24px;height:24px;border-radius:50%;border:3px solid var(--color-border);background:white;transition:all 0.3s ease;margin-bottom:.5rem}
.status-dot.active{background:var(--accent);border-color:var(--accent);box-shadow:0 0 0 2px rgba(0,0,0,0.1)}
.status-content{text-align:center;width:100%}
.status-label{font-weight:500;font-size:0.85rem;margin:0}
.status-date{font-size:0.75rem;color:var(--color-text);margin:0.2rem 0 0 0}
</style>
