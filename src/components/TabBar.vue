<template>
  <nav class="tabbar">
    <div class="left">
      <button @click="$router.push('/home')" class="tb">Home</button>
      <button @click="$router.push('/store')" class="tb">Pets</button>
      <button @click="$router.push('/food')" class="tb">Food</button>
      <button @click="$router.push('/cart')" class="tb">Cart</button>
    </div>

    <div class="icons">
      <template v-if="!auth.state.current">
        <button title="Log in" class="icon" @click.prevent="ui.openLogin">🔒</button>
        <button title="Sign up" class="icon" @click.prevent="ui.openSignup">🧾</button>
      </template>
      <template v-else>
        <button title="Account" class="icon" @click.prevent="ui.openAccount">👤</button>
      </template>
      <button title="Settings" class="icon" @click.prevent="ui.openSettings">⚙️</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUI } from '../composables/useUI'
import { useAuth } from '../composables/useAuth'
const ui = useUI()
const auth = useAuth()
</script>

<style scoped>
.tabbar{position:fixed;left:50%;transform:translateX(-50%);bottom:12px;background:var(--card);padding:.4rem;border-radius:999px;display:flex;gap:.4rem;box-shadow:0 10px 30px var(--shadow-color-strong);z-index:2100;align-items:center}
.tabbar .left{display:flex;gap:.4rem}
.icons{display:flex;gap:.25rem;margin-left:.6rem}
.tb{background:transparent;border:none;padding:.45rem .7rem;border-radius:999px;color:var(--color-text);cursor:pointer}
.tb:hover{background:var(--hover-bg)}
.icon{background:transparent;border:none;padding:.35rem .5rem;border-radius:8px;font-size:1rem}
.icon:hover{background:var(--hover-bg)}
</style>
