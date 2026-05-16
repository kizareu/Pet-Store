import { reactive, ref } from 'vue'

const toast = reactive({ show: false, message: '' })
let toastTimeout: any = null
const showLogin = ref(false)
const showSignup = ref(false)
const showSettings = ref(false)
const showAccount = ref(false)
const modal = reactive({ show: false, title: '', okText: 'OK' as string })

export function useUI() {
  const showToast = (message: string, ms = 2000) => {
    toast.message = message
    toast.show = true
    if (toastTimeout) clearTimeout(toastTimeout)
    toastTimeout = setTimeout(() => (toast.show = false), ms)
  }

  // simple modal state
  const openModal = (title = '', okText = 'OK') => {
    modal.title = title
    modal.okText = okText
    modal.show = true
  }
  const closeModal = () => {
    modal.show = false
  }

  // auth/settings modal flags (module-scope refs)
  const openLogin = () => { showLogin.value = true }
  const closeLogin = () => { showLogin.value = false }
  const openSignup = () => { showSignup.value = true }
  const closeSignup = () => { showSignup.value = false }
  const openSettings = () => { showSettings.value = true }
  const closeSettings = () => { showSettings.value = false }
  const openAccount = () => { showAccount.value = true }
  const closeAccount = () => { showAccount.value = false }
  // ensure only one panel open at a time
  const openOnly = (which: 'login'|'signup'|'settings'|'account') => {
    showLogin.value = which === 'login'
    showSignup.value = which === 'signup'
    showSettings.value = which === 'settings'
    showAccount.value = which === 'account'
  }
  const openLoginOnly = () => openOnly('login')
  const openSignupOnly = () => openOnly('signup')
  const openSettingsOnly = () => openOnly('settings')
  const openAccountOnly = () => openOnly('account')

  return { toast, showToast, modal, openModal, closeModal,
    showLogin, showSignup, showSettings, showAccount,
    openLogin: openLoginOnly, closeLogin, openSignup: openSignupOnly, closeSignup, openSettings: openSettingsOnly, closeSettings,
    openAccount: openAccountOnly, closeAccount }
}
