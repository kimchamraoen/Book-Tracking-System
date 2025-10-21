<template>
  <div class="base-detail-page">
    <div class="heading-section">
      <h1>{{ title }}</h1>
      <button class="back-btn" @click="$emit('back')">Back</button>
    </div>

    <div v-if="loading" class="loading-container">
      <p>Loading {{ entityType }}...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="$emit('retry')" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="!item" class="error-container">
      <p>{{ entityType }} not found</p>
      <button @click="$emit('back')" class="back-btn">Go Back</button>
    </div>

    <div v-else class="detail-content">
      <!-- Main Details and Actions Row -->
      <div class="detail-row">
        <div class="detail-card main-details">
          <slot name="main-details" :item="item">
            <!-- Main detail content goes here -->
          </slot>
        </div>

        <div class="detail-card actions-section" v-if="hasActions">
          <h2>Actions</h2>
          <slot name="actions" :item="item">
            <!-- Action buttons go here -->
          </slot>
        </div>
      </div>

      <!-- Additional Content (like activities, history, etc.) -->
      <div class="additional-content" v-if="hasAdditionalContent">
        <slot name="additional-content" :item="item">
          <!-- Additional content like activities, history, etc. -->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDetail',
  props: {
    item: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: 'Detail',
    },
    entityType: {
      type: String,
      default: 'item',
    },
    hasActions: {
      type: Boolean,
      default: true,
    },
    hasAdditionalContent: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['back', 'retry'],
}
</script>

<style scoped>
.base-detail-page {
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.heading-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.heading-section h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.retry-btn,
.back-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #c8efff;
  border: 1px solid #c1c1c1;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
}

.retry-btn:hover,
.back-btn:hover {
  background-color: deepskyblue;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
}

.detail-row {
  display: flex;
  gap: 20px;
}

.detail-card {
  border-radius: 16px;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.main-details {
  flex: 1;
}

.actions-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  min-width: 200px;
}

.actions-section h2 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.additional-content {
  width: 100%;
}

@media (max-width: 768px) {
  .detail-content {
    padding: 0 15px;
    gap: 15px;
  }

  .detail-row {
    flex-direction: column;
  }

  .detail-card {
    padding: 20px;
  }

  .actions-section {
    min-width: auto;
  }

  .heading-section {
    padding: 15px;
  }

  .heading-section h1 {
    font-size: 1.5rem;
  }
}
</style>
