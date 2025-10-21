<script setup>
import menu_dashboard from './components/admin/menu_dashboard.vue';
</script>

<template>
  <div class="system_content">
    <menu_dashboard/>
     <router-view />
  </div>
</template>

<style scoped>
.system_content {
  display: flex;
  background-color: #f0f0f0;
  /* overflow: hidden; */
  height: 100vh;
}
router-view {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
