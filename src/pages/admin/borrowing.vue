<template>
  <div class="admin-overall-page">
    <searchSection />
    <router-view></router-view>
  </div>
</template>

<script>
import searchSection from '@/components/admin/search-section.vue'
export default {
  name: 'BorrowingPage',
  components: {
    searchSection,
  },
}
</script>

<style scoped>
/* Inherits styles from main.css */
</style>
