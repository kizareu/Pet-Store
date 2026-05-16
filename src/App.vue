<script setup>
import { ref, computed } from 'vue'
import pets from './data/pets.json'
import { useCart } from './composables/useCart'
import Toast from './components/Toast.vue'
import { useAuth } from './composables/useAuth'
import { useUI } from './composables/useUI'
import AuthLogin from './components/AuthLogin.vue'
import AuthSignup from './components/AuthSignup.vue'
import SettingsModal from './components/SettingsModal.vue'
import AccountPanel from './components/AccountPanel.vue'
import TabBar from './components/TabBar.vue'

const showInfo = ref(false)
const { itemCount } = useCart()
const petCount = pets.length
const { state: authState, logout } = useAuth()
const ui = useUI()
const anyPanelOpen = computed(() => ui.showLogin.value || ui.showSignup.value || ui.showSettings.value || ui.showAccount.value)

const closeAll = () => {
  ui.closeLogin()
  ui.closeSignup()
  ui.closeSettings()
  ui.closeAccount()
}
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
          <router-link to="/food" class="nav-link">Pet Food</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
          <router-link to="/cart" class="nav-link">Cart <span class="badge">{{ itemCount }}</span></router-link>
          <div style="display:flex;gap:.5rem;align-items:center">
            <template v-if="authState.current">
              <span class="nav-user">Hi, {{ authState.current.username }}</span>
              <button class="nav-link" @click.prevent="ui.openAccount">Account</button>
            </template>
            <template v-else>
              <button class="nav-link" @click.prevent="ui.openLogin">Account</button>
            </template>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <div class="container">
        <router-view />
      </div>
    </main>

    <div class="bottom-info" :class="{ open: showInfo }">
      <button class="toggle" @click="showInfo = !showInfo">Store Info</button>
      <div class="content">
        <h4>Pet Store</h4>
        <p>Phone: (555) 123-4567</p>
        <p>Location: 123 Demo Lane, Example City</p>
        <p>Hours: Mon–Fri 9:00–18:00</p>
        <p>Email: hello@petstore.example</p>
      </div>
    </div>
    <Toast />
    <div v-if="anyPanelOpen" class="backdrop" @click="closeAll"></div>
    <div v-if="ui.showLogin.value" class="panel-wrap">
      <div class="panel dialog"><AuthLogin /></div>
    </div>
    <div v-if="ui.showSignup.value" class="panel-wrap">
      <div class="panel dialog"><AuthSignup /></div>
    </div>
    <div v-if="ui.showSettings.value" class="panel-wrap">
      <div class="panel dialog"><SettingsModal /></div>
    </div>
    <div v-if="ui.showAccount.value" class="panel-wrap">
      <div class="panel dialog"><AccountPanel /></div>
    </div>
    <TabBar />
  </div>
</template>

<style scoped>
.site-header{position:fixed;top:0;left:0;right:0;background:linear-gradient(180deg,var(--color-background),var(--color-background-soft));border-bottom:1px solid var(--color-border);z-index:999;height:68px;display:flex;align-items:center}
.site-header .container{max-width:1100px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;justify-content:space-between;width:100%}
.brand{display:flex;flex-direction:column}
.logo{font-size:1.25rem;margin:0}
.tag{margin:0;font-size:0.75rem;color:#555}
.nav{display:flex;gap:1rem;align-items:center}
.nav-link{color:var(--accent);text-decoration:none;padding:8px 10px;border-radius:6px}
.nav-link.router-link-active{background:rgba(var(--accent-rgb),0.12)}
.badge{background:var(--accent);color:#fff;padding:2px 8px;border-radius:999px;font-size:0.8rem;margin-left:6px}
main{padding-top:88px;padding-bottom:2rem}
@media(min-width:1024px){.site-header .container{padding:0 2rem}}

.container{max-width:1100px;margin:0 auto}

.bottom-info{position:fixed;right:16px;bottom:16px;background:var(--card);border-radius:12px;box-shadow:0 8px 30px var(--shadow-color-strong);overflow:hidden;transition:transform .28s ease,opacity .28s ease;transform:translateY(90%);opacity:0}
.bottom-info.open{transform:translateY(0);opacity:1}
.bottom-info .toggle{display:block;background:var(--accent);color:#fff;padding:.5rem .8rem;border:none;border-radius:8px;margin:8px}
.bottom-info .content{padding:.6rem .8rem;font-size:0.9rem;color:var(--color-text)}

.backdrop{position:fixed;inset:0;background:var(--backdrop);backdrop-filter:blur(6px);z-index:2100}
.panel-wrap{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2200;display:flex;align-items:center;justify-content:center}
.panel{background:var(--card);padding:1.5rem;border-radius:14px;max-width:720px;width:92%;box-shadow:0 18px 60px var(--shadow-color-strong);position:relative;font-size:1.03rem}
.dialog{ /* keep compatibility for older class names */ }

</style>

