<template>
  <div class="container">
    <Menu_dashboard />
    <div class="admin-overall-page">
      <searchSection />
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Menu_dashboard from '@/components/admin/menu_dashboard.vue';
import searchSection from '@/components/admin/search-section.vue'

export default {
  name: 'AdminLibrarians',
  components: {
    searchSection,
    Menu_dashboard
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.admin-overall-page {
  width: 100%;
  height: 100%;
}

.router-view {
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
