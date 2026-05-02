<template>
  <section class="home">
    <h2>Welcome to the Virtual Pet Store</h2>
    <p>Browse friendly pets, learn more about them, and adopt!</p>
    <router-link class="btn" to="/store">Visit Store</router-link>
  </section>
</template>

<style scoped>
.home{padding:1rem}
.btn{display:inline-block;margin-top:1rem;background:var(--accent);color:white;padding:.6rem 1rem;border-radius:8px}
</style>
