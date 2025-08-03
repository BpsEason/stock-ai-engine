<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import AppHeader from './components/AppHeader.vue';

const authStore = useAuthStore();

onMounted(() => {
  // 檢查是否有 token，若有則取得使用者資訊
  if (authStore.isAuthenticated) {
    authStore.fetchUser();
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <AppHeader />
    <main class="flex-grow">
      <router-view></router-view>
    </main>
  </div>
</template>
