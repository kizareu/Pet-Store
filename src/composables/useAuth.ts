import { reactive, ref } from 'vue'

const STORAGE_USERS = 'petstore_users'
const STORAGE_CURRENT = 'petstore_current'

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]') } catch { return [] }
}

const state = reactive({ users: loadUsers(), current: null as any })

export function useAuth() {
  const validatePassword = (pw: string) => {
    // at least one uppercase, one digit, one symbol
    const re = /(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/ 
    return re.test(pw) && pw.length >= 6
  }

  const signup = (username: string, phoneOrEmail: string, password: string) => {
    if (!validatePassword(password)) throw new Error('Password must have uppercase, number and symbol and be >=6 chars')
    const raw = phoneOrEmail.trim()
    const hasAt = /@/.test(raw)
    const isDigitsOnly = /^\d+$/.test(raw)
    if (!hasAt && !isDigitsOnly) throw new Error('Enter a phone (digits only) or a valid email (contains @)')

    const normalizedEmail = hasAt ? raw.toLowerCase() : ''
    const existing = state.users.find((u: any) => u.username === username || u.phone === raw || (normalizedEmail && u.email && (u.email === normalizedEmail || u.email.toLowerCase() === normalizedEmail)))
    if (existing) throw new Error('User exists')
    const user: any = { username, password }
    if (isDigitsOnly) {
      if (raw.length < 8 || raw.length > 16) throw new Error('Phone must be 8-16 digits')
      user.phone = raw
    } else {
      // treat as email when contains @; store lowercase
      user.email = normalizedEmail
    }
    state.users.push(user)
    localStorage.setItem(STORAGE_USERS, JSON.stringify(state.users))
    state.current = { username: user.username, phone: user.phone, email: user.email }
    localStorage.setItem(STORAGE_CURRENT, JSON.stringify(state.current))
    return true
  }

  const login = (identifier: string, password: string) => {
    const id = identifier.trim()
    let user: any = null
    if (/@/.test(id)) {
      const idLower = id.toLowerCase()
      user = state.users.find((u: any) => u.email && (u.email === idLower || u.email.toLowerCase() === idLower) && u.password === password)
    } else if (/^\d+$/.test(id)) {
      user = state.users.find((u: any) => u.phone === id && u.password === password)
    } else {
      user = state.users.find((u: any) => u.username === id && u.password === password)
    }

    if (!user) throw new Error('Invalid credentials')
    state.current = { username: user.username, phone: user.phone, email: user.email }
    localStorage.setItem(STORAGE_CURRENT, JSON.stringify(state.current))
    return true
  }

  const logout = () => {
    state.current = null
    localStorage.removeItem(STORAGE_CURRENT)
  }

  const loadCurrent = () => {
    try { state.current = JSON.parse(localStorage.getItem(STORAGE_CURRENT) || 'null') } catch { state.current = null }
  }

  const linkEmail = (email: string) => {
    if (!/@/.test(email)) throw new Error('Invalid email')
    const normalized = email.trim().toLowerCase()
    if (!state.current) throw new Error('Not logged in')
    const user = state.users.find((u: any) => u.username === state.current.username)
    if (!user) throw new Error('User not found')
    user.email = normalized
    state.current.email = normalized
    localStorage.setItem(STORAGE_USERS, JSON.stringify(state.users))
    localStorage.setItem(STORAGE_CURRENT, JSON.stringify(state.current))
  }

  const linkPhone = (phone: string) => {
    if (!/^\d{8,16}$/.test(phone)) throw new Error('Phone must be 8-16 digits')
    if (!state.current) throw new Error('Not logged in')
    const user = state.users.find((u: any) => u.username === state.current.username)
    if (!user) throw new Error('User not found')
    user.phone = phone
    state.current.phone = phone
    localStorage.setItem(STORAGE_USERS, JSON.stringify(state.users))
    localStorage.setItem(STORAGE_CURRENT, JSON.stringify(state.current))
  }

  loadCurrent()

  return { state, signup, login, logout, validatePassword, linkEmail, linkPhone }
}
