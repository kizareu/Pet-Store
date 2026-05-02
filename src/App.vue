

<script setup>
import pets from './data/pets.json'
const petCount = pets.length
</script>

<template>
  <div id="app">
    <header class="site-header">
      <div class="container">
        <div class="brand">
          <h1 class="logo">Pet Store</h1>
          <p class="tag">A small virtual adoption demo</p>
        </div>

        <nav class="nav">
          <router-link to="/home" class="nav-link">Home</router-link>
          <router-link to="/store" class="nav-link">Store <span class="badge">{{ petCount }}</span></router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </nav>
      </div>
    </header>

    <main>
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
:root{--accent:#16a34a;--card:#ffffff}
.site-header{position:fixed;top:0;left:0;right:0;background:linear-gradient(180deg,#ffffff,rgba(255,255,255,0.98));border-bottom:1px solid rgba(0,0,0,0.06);z-index:999;height:68px;display:flex;align-items:center}
.site-header .container{max-width:1100px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;justify-content:space-between;width:100%}
.brand{display:flex;flex-direction:column}
.logo{font-size:1.25rem;margin:0}
.tag{margin:0;font-size:0.75rem;color:#555}
.nav{display:flex;gap:1rem;align-items:center}
.nav-link{color:var(--accent);text-decoration:none;padding:8px 10px;border-radius:6px}
.nav-link.router-link-active{background:rgba(22,163,74,0.12)}
.badge{background:var(--accent);color:#fff;padding:2px 8px;border-radius:999px;font-size:0.8rem;margin-left:6px}
main{padding-top:88px;padding-bottom:2rem}
@media(min-width:1024px){.site-header .container{padding:0 2rem}}

.container{max-width:1100px;margin:0 auto}
</style>

