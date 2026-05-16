<template>
  <div v-if="ui.modal.show" class="overlay">
    <div class="modal">
      <h3>{{ ui.modal.title }}</h3>
      <slot />
      <div class="actions">
        <button class="btn" @click="$emit('confirm')">{{ ui.modal.okText }}</button>
        <button class="cancel" @click="ui.modal.show = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUI } from '../composables/useUI'
const ui = useUI()
</script>

<style scoped>
.overlay{position:fixed;inset:0;background:var(--backdrop);display:flex;align-items:center;justify-content:center;z-index:1500}
.modal{background:var(--card);padding:1rem;border-radius:10px;max-width:520px;width:100%}
.actions{display:flex;gap:.6rem;justify-content:flex-end;margin-top:.6rem}
.cancel{background:transparent;border:1px solid var(--color-border);padding:.4rem .6rem;border-radius:8px}
.btn{background:var(--accent);color:#fff;padding:.4rem .8rem;border-radius:8px;border:none}
</style>
