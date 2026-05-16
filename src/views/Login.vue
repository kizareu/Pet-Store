<template>
  <section class="auth">
    <h2>Log In</h2>
    <form @submit.prevent="doLogin">
      <label>Username or Phone</label>
      <input v-model="identifier" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <div class="actions">
        <button class="btn" type="submit">Log in</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { login } = useAuth()
const router = useRouter()

const identifier = ref('')
const password = ref('')
const error = ref('')

const doLogin = () => {
  error.value = ''
  try {
    login(identifier.value, password.value)
    router.push('/home')
  } catch (e: any) {
    error.value = e.message
  }
}
</script>

<style scoped>
.auth{padding:1rem;max-width:420px}
label{display:block;margin-top:.6rem}
input{width:100%;padding:.5rem;border-radius:8px;border:1px solid var(--color-border)}
.error{color:#b91c1c;margin-top:.6rem}
.actions{margin-top:.8rem}
.btn{background:var(--accent);color:#fff;padding:.5rem .9rem;border-radius:8px;border:none}
</style>
