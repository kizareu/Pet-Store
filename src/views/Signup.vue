<template>
  <section class="auth">
    <h2>Sign Up</h2>
    <form @submit.prevent="doSignup">
      <label>Username</label>
      <input v-model="username" />
      <label>Phone</label>
      <input v-model="phone" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <p class="hint">Password must include an uppercase letter, a number, and a symbol, and be at least 6 characters.</p>
      <label>Confirm Password</label>
      <input type="password" v-model="confirm" />
      <div class="actions">
        <button class="btn" type="submit">Create account</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { signup, validatePassword } = useAuth()
const router = useRouter()

const username = ref('')
const phone = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')

const doSignup = () => {
  error.value = ''
  if (password.value !== confirm.value) { error.value = 'Passwords do not match'; return }
  if (!validatePassword(password.value)) { error.value = 'Password must include uppercase, number and symbol and be >=6 chars'; return }
  try {
    signup(username.value, phone.value, password.value)
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
.hint{font-size:0.85rem;color:var(--color-text);margin-top:.25rem}
.error{color:#b91c1c;margin-top:.6rem}
.actions{margin-top:.8rem}
.btn{background:var(--accent);color:#fff;padding:.5rem .9rem;border-radius:8px;border:none}
</style>
