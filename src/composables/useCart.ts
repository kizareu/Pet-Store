import { reactive, computed } from 'vue'

type CartItem = {
  id: number | string
  name: string
  price: number
  image?: string
  qty: number
}

const state = reactive({ items: [] as CartItem[] })

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
  }

  const itemCount = computed(() => state.items.reduce((s, i) => s + i.qty, 0))
  const total = computed(() => state.items.reduce((s, i) => s + i.price * i.qty, 0))

  return { state, addItem, removeItem, updateQty, clear, itemCount, total }
}
