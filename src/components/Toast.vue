<template>
  <div v-if="ui.toast.show" class="toast">{{ ui.toast.message }}</div>
</template>

<script setup lang="ts">
import { useUI } from '../composables/useUI'
const ui = useUI()
</script>

<style scoped>
.toast{position:fixed;left:50%;transform:translateX(-50%);bottom:24px;background:var(--accent);color:#fff;padding:.6rem 1rem;border-radius:999px;z-index:2000;box-shadow:0 8px 20px var(--shadow-color-strong)}
</style>
