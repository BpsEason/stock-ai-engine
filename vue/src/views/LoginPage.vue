<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const credentials = ref({ email: 'test@example.com', password: 'password' });
const loginError = ref(null);

const handleLogin = async () => {
    loginError.value = null;
    try {
        await authStore.login(credentials.value);
    } catch (e) {
        loginError.value = '登入失敗，請檢查帳號密碼。';
        console.error('Login failed:', e);
    }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="p-8 max-w-sm w-full bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">歡迎回來</h2>
      <p class="text-center text-gray-600 mb-8">請使用預設帳號登入以繼續</p>
      
      <div v-if="loginError" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <p class="font-bold">錯誤</p>
        <p>{{ loginError }}</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="credentials.email" 
            placeholder="test@example.com"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">密碼</label>
          <input 
            type="password" 
            id="password" 
            v-model="credentials.password" 
            placeholder="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
        </div>
        <button 
          type="submit" 
          class="w-full py-3 px-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          登入
        </button>
      </form>
    </div>
  </div>
</template>
