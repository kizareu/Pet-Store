import { ref, watch } from 'vue'

const KEY = 'petstore_theme'
const current = ref<'light'|'dark'|'system'>(() => (localStorage.getItem(KEY) as any) || 'light')

function applyTheme(value: string) {
  const el = document.documentElement
  el.classList.remove('theme-light','theme-dark')
  if (value === 'light') el.classList.add('theme-light')
  else if (value === 'dark') el.classList.add('theme-dark')
  else if (value === 'system') {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    el.classList.add(prefersDark ? 'theme-dark' : 'theme-light')
  }
}

watch(current, (val) => {
  localStorage.setItem(KEY, val)
  applyTheme(val)
})

// initialize
applyTheme(current.value)

function setTheme(value: 'light'|'dark'|'system') {
  current.value = value
  // applyTheme will be invoked by the watcher, but call explicitly to be safe
  applyTheme(value)
}

export function useTheme() { return { current, setTheme } }
