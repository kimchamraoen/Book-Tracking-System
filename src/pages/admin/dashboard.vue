<template>
  <div class="admin-overall-page">
    <SearchSection class="search-section" />
    <content_dashboard />
  </div>
</template>

<script>
import content_dashboard from '@/components/admin/dashboard/content_dashboard.vue'
import SearchSection from '@/components/admin/search-section.vue'
export default {
  name: 'AdminDashboard',
  components: {
    content_dashboard,
    SearchSection,
  },
}
</script>

<style scoped>
.admin-overall-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 100%;
}

.search-section {
  position: sticky;
  top: 0;
  flex-shrink: 0;
  z-index: 1000;
}
</style>
