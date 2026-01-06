<template>
  <div class="container">
    <Menu_dashboard />
    <div class="admin-overall-page">
      <searchSection />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu_dashboard from '@/components/admin/menu_dashboard.vue';
import searchSection from '@/components/admin/search-section.vue'
export default {
  name: 'BorrowingPage',
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
</style>
