import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the router to prevent errors
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  }),
  createRouter: () => ({
    beforeEach: () => {}
  }),
  createWebHistory: () => {}
}))

vi.mock('axios', () => ({
  default: {
    defaults: {
      baseURL: 'http://localhost:8080/api',
      headers: {
        common: {}
      }
    },
    post: vi.fn(),
    get: vi.fn()
  }
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('initial state is correct', () => {
    const authStore = useAuthStore()
    expect(authStore.user).toBeNull()
    expect(authStore.token).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
  })

  it('sets and removes token correctly', () => {
    const authStore = useAuthStore()
    const token = 'test-token'
    
    authStore.setToken(token)
    expect(authStore.token).toBe(token)
    expect(localStorage.getItem('jwt-token')).toBe(token)
    expect(authStore.isAuthenticated).toBe(true)

    authStore.removeToken()
    expect(authStore.token).toBeNull()
    expect(localStorage.getItem('jwt-token')).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
  })

  // Add more tests for login, logout, fetchUser, etc.
})
