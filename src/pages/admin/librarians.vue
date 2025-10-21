<template>
  <div class="admin-overall-page">
    <searchSection />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import searchSection from '@/components/admin/search-section.vue'

export default {
  name: 'AdminLibrarians',
  components: {
    searchSection,
  },
}
</script>

<style scoped>
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
