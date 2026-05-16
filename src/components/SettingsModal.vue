<template>
  <div class="settings">
    <button class="close-x" @click="close">✕</button>
    <h3>Settings</h3>
    <p v-if="auth.state.current">Signed in as {{ auth.state.current.username }}</p>

    <div class="row">
      <label>Appearance</label>
      <select v-model="theme.current">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>

    <div class="row">
      <label>Animations</label>
      <input type="checkbox" v-model="settings.state.animations" @change="save" />
    </div>

    <div class="row">
      <label>Compact Mode</label>
      <input type="checkbox" v-model="settings.state.compact" @change="save" />
    </div>

    <div class="row">
      <label>Show prices with tax</label>
      <input type="checkbox" v-model="settings.state.showTax" @change="save" />
    </div>

    <div class="row">
      <label>Currency</label>
      <select v-model="settings.state.currency" @change="save">
        <option>CAD</option>
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>
    </div>

    <div class="row">
      <label>Notifications</label>
      <input type="checkbox" v-model="settings.state.notifications" @change="save" />
    </div>

    <div class="actions">
      <button class="btn" @click="saveAndClose">Save</button>
      <button class="btn" style="background:transparent;color:var(--color-text);border:1px solid var(--color-border)" @click="close">Cancel</button>
      <button class="btn" @click="logoutAndClose">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
import { useUI } from '../composables/useUI'
import { useTheme } from '../composables/useTheme'
import { useSettings } from '../composables/useSettings'

const auth = useAuth()
const ui = useUI()
const theme = useTheme()
const settings = useSettings()

const close = () => ui.closeSettings()
const logoutAndClose = () => { auth.logout(); ui.showToast('Logged out'); close() }
const save = () => {
  localStorage.setItem('petstore_settings', JSON.stringify({
    animations: settings.state.animations,
    compact: settings.state.compact,
    currency: settings.state.currency,
    showTax: settings.state.showTax,
    notifications: settings.state.notifications,
  }))
}
const saveAndClose = () => {
  save()
  // ensure theme applied and persisted
  try { theme.setTheme(theme.current.value) } catch (e) {}
  ui.showToast('Settings saved')
  close()
}
</script>

<style scoped>
.settings{padding:1rem}
.row{display:flex;align-items:center;gap:.6rem;margin-top:.6rem}
.select{padding:.4rem}
.actions{margin-top:1rem;display:flex;gap:.6rem}
.btn{background:var(--accent);color:#fff;padding:.5rem .9rem;border-radius:8px;border:none}
.close-x{position:absolute;right:.8rem;top:.6rem;background:transparent;border:none;font-size:1.1rem}
</style>
