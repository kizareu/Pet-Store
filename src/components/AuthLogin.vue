<template>
  <div class="auth-modal">
    <button class="close-x" @click="close">✕</button>
    <h3>Log In</h3>
    <form @submit.prevent="doLogin">
      <label>Email / Phone</label>
      <input v-model="identifier" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <p class="hint">Enter your account email or phone and password.</p>
      <p v-if="error" class="error">{{ error }}</p>
      <div class="actions">
        <button class="btn" type="submit">Log in</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useUI } from '../composables/useUI'

const { login } = useAuth()
const ui = useUI()

const identifier = ref('')
const password = ref('')
const error = ref('')

const close = () => ui.closeLogin()

const doLogin = () => {
  error.value = ''
  try {
    login(identifier.value, password.value)
    ui.showToast('Logged in')
    close()
  } catch (e: any) {
    error.value = e.message
  }
}
</script>

<style scoped>
.auth-modal{padding:1rem}
label{display:block;margin-top:.6rem}
input{width:100%;padding:.5rem;border-radius:8px;border:1px solid var(--color-border)}
.hint{font-size:0.85rem;color:var(--color-text);margin-top:.25rem}
.error{color:#b91c1c;margin-top:.6rem}
.actions{margin-top:.8rem;display:flex;gap:.5rem}
.btn{background:var(--accent);color:#fff;padding:.5rem .9rem;border-radius:8px;border:none}
.close-x{position:absolute;right:.8rem;top:.6rem;background:transparent;border:none;font-size:1.1rem}
</style>
