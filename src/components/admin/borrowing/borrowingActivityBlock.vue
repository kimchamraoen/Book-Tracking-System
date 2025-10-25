<template>
  <div class="activity-block">
    <div class="activity-header">
      <div class="activity-icon" :class="`icon-${activity.status}`">
        <span v-if="activity.status === 'success'">✅</span>
        <span v-else-if="activity.status === 'warning'">⚠️</span>
        <span v-else-if="activity.status === 'info'">ℹ️</span>
        <span v-else-if="activity.status === 'error'">❌</span>
        <span v-else>📋</span>
      </div>
      <div class="activity-title">
        <h4>{{ activity.action }}</h4>
        <span class="activity-time">{{ activity.date }} at {{ activity.time }}</span>
      </div>
    </div>

    <div class="activity-content">
      <p class="activity-description">{{ activity.description }}</p>
      <p class="activity-details">{{ activity.details }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BorrowingActivityBlock',
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.activity-block {
  min-width: 280px;
  width: 280px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #007bff;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  overflow-y: hidden;
}

.activity-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.activity-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 15px;
}

.activity-icon {
  font-size: 1.2rem;
  padding: 8px;
  border-radius: 50%;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-success {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.icon-warning {
  background-color: #fff3e0;
  color: #ef6c00;
}

.icon-info {
  background-color: #e3f2fd;
  color: #1565c0;
}

.icon-error {
  background-color: #ffebee;
  color: #c62828;
}

.activity-title h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.activity-time {
  font-size: 0.8rem;
  color: #666;
  font-weight: 400;
}

.activity-content {
  padding-left: 52px;
}

.activity-description {
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.activity-details {
  font-size: 0.8rem;
  color: #777;
  margin: 0;
  line-height: 1.3;
  font-style: italic;
}

/* Responsive design */
@media (max-width: 768px) {
  .activity-block {
    min-width: 250px;
    width: 250px;
    padding: 15px;
  }

  .activity-title h4 {
    font-size: 0.9rem;
  }

  .activity-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .activity-block {
    min-width: 220px;
    width: 220px;
    padding: 12px;
  }

  .activity-icon {
    min-width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .activity-content {
    padding-left: 47px;
  }

  .activity-title h4 {
    font-size: 0.85rem;
  }

  .activity-time {
    font-size: 0.75rem;
  }

  .activity-description {
    font-size: 0.8rem;
  }

  .activity-details {
    font-size: 0.75rem;
  }
}
</style>
