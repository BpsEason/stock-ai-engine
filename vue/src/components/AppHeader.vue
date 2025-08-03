<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const isDashboard = computed(() => router.currentRoute.value.name === 'Dashboard');
</script>

<template>
  <header class="bg-white shadow-md p-4">
    <div class="max-w-4xl mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold text-gray-800">iCHEF 預測服務</div>
      <nav class="flex items-center space-x-4">
        <router-link
          v-if="!isDashboard && authStore.isAuthenticated"
          to="/"
          class="text-blue-500 hover:text-blue-600 font-bold transition-colors duration-200"
        >
          儀表板
        </router-link>
        <button
          v-if="authStore.isAuthenticated"
          @click="authStore.logout"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
        >
          登出
        </button>
      </nav>
    </div>
  </header>
</template>
