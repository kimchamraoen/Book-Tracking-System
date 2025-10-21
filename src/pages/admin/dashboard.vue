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
.menu-dashboard {
  position: sticky;
  top: 0;
  flex-shrink: 0;
}
.content-dashboard {
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
}
</style>
