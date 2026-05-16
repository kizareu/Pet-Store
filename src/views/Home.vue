<template>
  <section class="home">
    <h2>Welcome to the Virtual Pet Store</h2>
    <p>Browse friendly pets, learn more about them, and adopt! Use the tabs to quickly navigate.</p>

    <nav class="home-tabs">
      <router-link to="/store" class="tab">Pets</router-link>
      <router-link to="/food" class="tab">Pet Food</router-link>
      <router-link to="/cart" class="tab">Cart</router-link>
      <router-link to="/about" class="tab">About</router-link>
    </nav>

    <div class="hero">
      <p>We offer a small curated selection of pets and high-quality food. Click a tab to get started.</p>
      <router-link class="btn" to="/store">Visit Store</router-link>
    </div>
  </section>
</template>

<style scoped>
.home{padding:1rem}
.home-tabs{display:flex;gap:.6rem;margin:1rem 0}
.tab{padding:.5rem .8rem;border-radius:8px;background:var(--color-background-soft);color:var(--color-text);text-decoration:none}
.hero{margin-top:1rem}
.btn{display:inline-block;margin-top:1rem;background:var(--accent);color:white;padding:.6rem 1rem;border-radius:8px;border:none}
</style>
