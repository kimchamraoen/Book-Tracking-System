<template>
  <div class="circulation-block">
    <div class="header" :style="{ backgroundColor: title_color }">
      {{ title_activity }} Activity
    </div>
    <div class="activity-list">
      <img class="profile-avatar" src="@/assets/images/profile-avatar.jpg" alt="" />
      <div class="profile-info">
        <span class="username">{{ username }}</span>
        <span class="year-group">{{ yearGroup }}</span>
        <span class="activity">{{ activity }}</span>
      </div>
      <img class="book-cover" src="@/assets/images/atomic-habit.jpg" alt="" />
      <span class="time-recorded">{{ timeRecorded }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCirculationActivityBlock',
  props: {
    title_color: {
      type: String,
      default: '#c8efff', // Default color if not provided
    },
    title_activity: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    yearGroup: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    timeRecorded: {
      type: String,
      default: 'Just now', // Default value if not provided
    },
  },
}
</script>

<style scoped>
.circulation-block {
  min-width: 200px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: aliceblue;
  margin: 10px;
}
.circulation-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
