<template>
  <div class="tracking-block">
    <div class="header">Reading Activity</div>
    <div class="activity-list">
      <img class="profile-avatar" src="@/assets/images/profile-avatar.jpg" alt="" />
      <div class="profile-info">
        <span class="username">{{ username }}</span>
        <span class="year-group">{{ yearGroup }}</span>
        <span class="table-number">Table: {{ tableNumber }}</span>
      </div>
      <img class="book-cover" src="@/assets/images/atomic-habit.jpg" alt="" />
      <span class="time-recorded">{{ timeRecorded }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DashboardTrackLocationActivityBlock',
  props: {
    username: {
      type: String,
      required: true,
    },
    yearGroup: {
      type: String,
      required: true,
    },
    tableNumber: {
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
.tracking-block {
  min-width: 200px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: aliceblue;
  margin: 10px;
}
.tracking-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #c8efff;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
