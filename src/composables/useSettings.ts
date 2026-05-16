import { reactive } from 'vue'

const KEY = 'petstore_settings'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}

const state = reactive({
  animations: true,
  compact: false,
  currency: 'CAD',
  showTax: false,
  notifications: true,
  ...load(),
})

function save() {
  localStorage.setItem(KEY, JSON.stringify({
    animations: state.animations,
    compact: state.compact,
    currency: state.currency,
    showTax: state.showTax,
    notifications: state.notifications,
  }))
}

export function useSettings() {
  const toggle = (k: keyof typeof state) => {
    // @ts-ignore
    state[k] = !state[k]
    save()
  }
  const set = (k: keyof typeof state, v: any) => {
    // @ts-ignore
    state[k] = v
    save()
  }
  return { state, toggle, set }
}
