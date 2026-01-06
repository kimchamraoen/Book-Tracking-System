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
import Menu_dashboard from '@/components/admin/menu_dashboard.vue';
import searchSection from '@/components/admin/search-section.vue'
// import content_books from '@/components/admin/content_books.vue';
export default {
  name: 'AdminBooks',
  components: {
    Menu_dashboard,
    searchSection,
    // content_books,
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
