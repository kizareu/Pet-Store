import { reactive, computed, ref } from 'vue'

type CartItem = {
  id: number | string
  name: string
  price: number
  image?: string
  qty: number
}

const state = reactive({ items: [] as CartItem[] })

const storageKey = 'petstore:defaultShipping'
const shipping = reactive({ name: '', address: '', city: '', postal: '', country: '', isDefault: false })
const promoCode = reactive({ code: '', applied: false, discount: 0 })
const shippingCost = reactive({ amount: 5.0 })

// restore default shipping from localStorage if present
try {
  const raw = localStorage.getItem(storageKey)
  if (raw) {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      shipping.name = parsed.name || ''
      shipping.address = parsed.address || ''
      shipping.city = parsed.city || ''
      shipping.postal = parsed.postal || ''
      shipping.country = parsed.country || ''
      shipping.isDefault = true
    }
  }
} catch (e) {
  // ignore storage errors
}

export function useCart() {
  const addItem = (item: { id: number | string; name: string; price: number; image?: string }, qty = 1) => {
    const existing = state.items.find(i => String(i.id) === String(item.id))
    if (existing) {
      existing.qty += qty
    } else {
      state.items.push({ ...item, qty })
    }
  }

  const removeItem = (id: number | string) => {
    const idx = state.items.findIndex(i => String(i.id) === String(id))
    if (idx > -1) state.items.splice(idx, 1)
  }

  const updateQty = (id: number | string, qty: number) => {
    const it = state.items.find(i => String(i.id) === String(id))
    if (it) it.qty = Math.max(0, qty)
    // remove if zero
    const idx = state.items.findIndex(i => i.qty === 0)
    if (idx > -1) state.items.splice(idx, 1)
  }

  const clear = () => {
    state.items.splice(0, state.items.length)
    // also clear checkout-related transient state
    promoCode.code = ''
    promoCode.applied = false
    promoCode.discount = 0
    // keep default saved address unless explicitly cleared
    shipping.name = ''
    shipping.address = ''
    shipping.city = ''
    shipping.postal = ''
    shipping.country = ''
  }

  const itemCount = computed(() => state.items.reduce((s, i) => s + i.qty, 0))
  const total = computed(() => state.items.reduce((s, i) => s + i.price * i.qty, 0))

  const subtotal = total
  const discountAmount = computed(() => (promoCode.applied ? subtotal.value * promoCode.discount : 0))
  const totalBeforeTax = computed(() => Math.max(0, subtotal.value - discountAmount.value + shippingCost.amount))

  const applyPromo = (code: string) => {
    const c = (code || '').trim().toUpperCase()
    if (!c) return { ok: false, message: 'Empty code' }
    if (c === 'SAVE10') {
      promoCode.code = c
      promoCode.applied = true
      promoCode.discount = 0.10
      return { ok: true }
    }
    if (c === 'FREESHIP') {
      promoCode.code = c
      promoCode.applied = true
      promoCode.discount = 0
      shippingCost.amount = 0
      return { ok: true }
    }
    return { ok: false, message: 'Invalid promo code' }
  }

  const setShipping = (s: { name?: string; address?: string; city?: string; postal?: string; country?: string }) => {
    if (s.name !== undefined) shipping.name = s.name
    if (s.address !== undefined) shipping.address = s.address
    if (s.city !== undefined) shipping.city = s.city
    if (s.postal !== undefined) shipping.postal = s.postal
    if (s.country !== undefined) shipping.country = s.country
  }

  const setShippingCost = (amount: number) => { shippingCost.amount = amount }

  const setDefaultShipping = (enabled: boolean) => {
    shipping.isDefault = !!enabled
    try {
      if (enabled) {
        localStorage.setItem(storageKey, JSON.stringify({
          name: shipping.name,
          address: shipping.address,
          city: shipping.city,
          postal: shipping.postal,
          country: shipping.country,
        }))
      } else {
        localStorage.removeItem(storageKey)
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  // last placed order
  const lastOrder = ref<any>(null)

  const createOrder = (order: any) => {
    const id = String(Date.now())
    const createdAt = new Date().toISOString()
    const est = new Date()
    est.setDate(est.getDate() + 5) // estimated delivery in 5 days
    lastOrder.value = {
      id,
      createdAt,
      estimatedDelivery: est.toISOString(),
      ...order,
    }
    // clear cart items but keep saved default shipping
    state.items.splice(0, state.items.length)
    return lastOrder.value
  }

  return {
    state,
    addItem,
    removeItem,
    updateQty,
    clear,
    itemCount,
    total,
    subtotal,
    discountAmount,
    totalBeforeTax,
    promoCode,
    applyPromo,
    shipping,
    setShipping,
    shippingCost,
    setShippingCost,
    setDefaultShipping,
    lastOrder,
    createOrder,
  }
}
