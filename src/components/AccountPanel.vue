<template>
  <div class="account">
    <button class="close-x" @click="close">✕</button>
    <h3>Account</h3>
    <p v-if="auth.state.current">Username: <strong>{{ auth.state.current.username }}</strong></p>
    <div v-if="auth.state.current" class="linked">
      <div class="field">
        <label>Email</label>
        <div class="value">{{ auth.state.current.email || 'none' }}</div>
        <div v-if="!auth.state.current.email">
          <input v-model="linkValueEmail" placeholder="Enter email to link" />
          <button class="btn" @click="doLinkEmail">Link</button>
          <div v-if="linkErrorEmail" class="error">{{ linkErrorEmail }}</div>
        </div>
      </div>
      <div class="field">
        <label>Phone</label>
        <div class="value">{{ auth.state.current.phone || 'none' }}</div>
        <div v-if="!auth.state.current.phone">
          <input v-model="linkValuePhone" placeholder="Enter phone to link (8-16 digits)" />
          <button class="btn" @click="doLinkPhone">Link</button>
          <div v-if="linkErrorPhone" class="error">{{ linkErrorPhone }}</div>
        </div>
      </div>
      <div class="actions" >
        <button class="btn" @click="logout">Logout</button>
      </div>
    </div>
    <div v-else>
      <p>You are not signed in.</p>
      <div class="actions">
        <button class="btn" @click="openLogin">Log in</button>
        <button class="btn" @click="openSignup">Sign up</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useUI } from '../composables/useUI'
const auth = useAuth()
const ui = useUI()
const close = () => ui.closeAccount()
const logout = () => { auth.logout(); ui.showToast('Logged out'); close() }
const openLogin = () => { ui.openLogin(); ui.closeAccount() }
const openSignup = () => { ui.openSignup(); ui.closeAccount() }

const linkValueEmail = ref('')
const linkErrorEmail = ref('')
const linkValuePhone = ref('')
const linkErrorPhone = ref('')

const doLinkEmail = () => {
  linkErrorEmail.value = ''
  try {
    auth.linkEmail(linkValueEmail.value.trim())
    ui.showToast('Email linked')
    linkValueEmail.value = ''
  } catch (e: any) {
    linkErrorEmail.value = e.message
  }
}

const doLinkPhone = () => {
  linkErrorPhone.value = ''
  try {
    auth.linkPhone(linkValuePhone.value.trim())
    ui.showToast('Phone linked')
    linkValuePhone.value = ''
  } catch (e: any) {
    linkErrorPhone.value = e.message
  }
}
</script>

<style scoped>
.account{padding:1rem;min-width:320px}
.field{margin-top:.6rem}
.value{margin-top:.25rem;font-weight:600}
.error{color:#b91c1c;margin-top:.4rem}
.close-x{position:absolute;right:.8rem;top:.6rem;background:transparent;border:none;font-size:1.1rem}
.actions{margin-top:1rem;display:flex;gap:.6rem}
.btn{background:var(--accent);color:#fff;padding:.5rem .9rem;border-radius:8px;border:none}
input{width:100%;padding:.45rem;border-radius:8px;border:1px solid var(--color-border);margin-top:.3rem}
</style>
