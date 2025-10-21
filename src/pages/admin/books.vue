<template>
  <div class="admin-overall-page">
    <searchSection />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <!-- <content_books /> -->
  </div>
</template>

<script>
import searchSection from '@/components/admin/search-section.vue'
// import content_books from '@/components/admin/content_books.vue';
export default {
  name: 'AdminBooks',
  components: {
    searchSection,
    // content_books,
  },
}
</script>

<style scoped>
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
