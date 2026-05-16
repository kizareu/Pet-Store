<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useSettings } from '../composables/useSettings'

const router = useRouter()
const { state, subtotal: subtotalRef, discountAmount: discountAmountRef, shipping, promoCode, applyPromo, shippingCost, clear, setDefaultShipping, createOrder } = useCart()
const settings = useSettings()

const promo = ref('')
const showShippingUnderItems = ref(false)

const toggleShippingUnderItems = () => {
  showShippingUnderItems.value = !showShippingUnderItems.value
}

const taxRate = computed(() => (settings.state.showTax ? 0.13 : 0))
const subtotal = computed(() => subtotalRef.value)
const gstAmount = computed(() => subtotal.value * taxRate.value)
const totalWithTax = computed(() => subtotal.value + gstAmount.value)
const discountAmount = computed(() => discountAmountRef.value)
const grandTotal = computed(() => Math.max(0, totalWithTax.value - discountAmount.value + shippingCost.amount))

const applyPromoLocal = () => {
  const code = promo.value.trim().toUpperCase()
  if (!code) return
  const res = applyPromo(code)
  if (!res.ok) alert(res.message || 'Invalid promo code')
}

const placeOrder = () => {
  if (!shipping.name || !shipping.address) {
    alert('Please complete shipping details')
    return
  }
  // Build order payload and save it via composable
  const itemsSnapshot = state.items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty }))
  const orderPayload = {
    items: itemsSnapshot,
    shipping: { ...shipping },
    subtotal: subtotal.value,
    tax: gstAmount.value,
    shippingCost: shippingCost.amount,
    discount: discountAmount.value,
    total: grandTotal.value,
    promo: promoCode.code || null,
  }
  createOrder(orderPayload)
  clear()
  router.push('/order-confirmation')
}
</script>

<template>
  <section class="checkout">
    <h2>Checkout</h2>

    <div v-if="state.items.length === 0">
      <p>Your cart is empty.</p>
    </div>

    <div v-else class="content">
      <div class="left">
        <div class="main-panel">
          <section>
            <h3>Items</h3>
            <ul class="items">
              <li v-for="item in state.items" :key="item.id">
                <div class="row">
                  <div class="name">{{ item.name }} x{{ item.qty }}</div>
                  <div class="price">{{ settings.state.currency }} {{ (item.price * item.qty).toFixed(2) }}</div>
                </div>
              </li>
            </ul>

            <div class="under-items-actions">
              <button class="small" @click="toggleShippingUnderItems">Shipping Details</button>
            </div>

            <div v-show="showShippingUnderItems" class="shipping-form">
              <h4>Shipping Details</h4>
              <label>Name</label>
              <input v-model="shipping.name" />
              <label>Address</label>
              <input v-model="shipping.address" />
              <label>City</label>
              <input v-model="shipping.city" />
              <label>Postal</label>
              <input v-model="shipping.postal" />
              <label>Country</label>
              <input v-model="shipping.country" />
              <div style="margin-top:.4rem">
                <label style="display:inline-flex;align-items:center;gap:.5rem"><input type="checkbox" v-model="shipping.isDefault" @change="setDefaultShipping(shipping.isDefault)"/> Use as default address</label>
              </div>
            </div>

            <div class="promo-under-items">
              <h4>Promo Code</h4>
              <div class="promo">
                <input v-model="promo" placeholder="Enter code (SAVE10, FREESHIP)" />
                <button class="btn" @click="applyPromoLocal">Apply</button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <aside class="summary">
        <h3>Order Summary</h3>
        <div class="line"><span>Subtotal</span><span>{{ settings.state.currency }} {{ subtotal.toFixed(2) }}</span></div>
        <div class="line"><span>GST</span><span>{{ settings.state.currency }} {{ gstAmount.toFixed(2) }}</span></div>
        <div v-if="promoCode.applied" class="line"><span>Discount</span><span>-{{ settings.state.currency }} {{ discountAmount.toFixed(2) }}</span></div>
        <div class="line"><span>Shipping</span><span>{{ settings.state.currency }} {{ shippingCost.amount.toFixed(2) }}</span></div>
        <hr />
        <div class="line total"><span>Total</span><span>{{ settings.state.currency }} {{ grandTotal.toFixed(2) }}</span></div>
        <button class="place btn-primary" @click="placeOrder">Place Order</button>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.checkout{padding:1.25rem;max-width:1100px;margin:0 auto}
.content{display:flex;gap:1.5rem;min-height:72vh}
.left{flex:1;display:flex}
.shipping-menu{width:160px;display:flex;flex-direction:column;gap:.5rem;margin-right:1rem}
.menu-item{padding:.6rem .8rem;border-radius:8px;border:1px solid var(--color-border);background:transparent;text-align:left}
.menu-item.active{background:var(--accent);color:white;border-color:transparent}
.main-panel{flex:1}
.under-items-actions{margin:0.5rem 0}
.small{background:transparent;border:1px solid var(--color-border);padding:.4rem .6rem;border-radius:6px}
.small:hover{background:var(--color-background-soft)}
.promo-under-items{margin-top:1rem}
.shipping-form h4{margin-top:0}
.promo input{width:60%}
.items{list-style:none;padding:0;margin:0 0 1rem}
.items li{padding:.4rem 0;border-bottom:1px solid var(--color-border)}
.row{display:flex;justify-content:space-between}
.summary{width:360px;padding:1rem;border:1px solid var(--color-border);border-radius:8px;background:var(--color-background-soft)}
.line{display:flex;justify-content:space-between;padding:.25rem 0}
.total{font-weight:800}
.promo{display:flex;gap:.5rem}
.promo input{flex:1}
.btn{background:var(--accent);color:white;padding:.5rem .8rem;border-radius:8px;border:none}
.btn-primary{background:green}
.shipping-form input{width:100%;padding:.45rem;border-radius:6px;border:1px solid var(--color-border);margin-top:.25rem;margin-bottom:.6rem}
</style>
