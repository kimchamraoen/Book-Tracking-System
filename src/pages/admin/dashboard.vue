<template>
  <div class="container">
    <!-- LEFT SIDEBAR -->
    <Menu_dashboard />

    <!-- RIGHT CONTENT -->
    <div class="admin-overall-page">
      <SearchSection class="search-section" />
      <content_dashboard />
    </div>
  </div>
</template>


<script>
import content_dashboard from '@/components/admin/dashboard/content_dashboard.vue'
import Menu_dashboard from '@/components/admin/menu_dashboard.vue';
import SearchSection from '@/components/admin/search-section.vue'

export default {
  name: 'AdminDashboard',
  components: {
    content_dashboard,
    SearchSection,
    Menu_dashboard,
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* overflow: hidden; */
  width: 100%;
}

.search-section {
  position: sticky;
  top: 0;
  flex-shrink: 0;
  z-index: 1000;
}

.system_content {
  display: flex;
  background-color: #f0f0f0;
  /* overflow: hidden; */
  height: 100vh;
}
</style>
