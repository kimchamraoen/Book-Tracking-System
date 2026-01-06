<template>
  <div class="container">
    <Menu_dashboard />
    <div class="admin-overall-page">
      <searchSection />
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <!-- <content_books /> -->
    </div>
  </div>
</template>

<script>
import searchSection from '@/components/admin/search-section.vue'
import Menu_dashboard from '@/components/admin/menu_dashboard.vue';
export default {
  name: 'AdminMembers',
  components: {
    searchSection,
    // content_books,
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
