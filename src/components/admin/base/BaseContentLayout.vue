<template>
  <div class="content-page">
    <div class="heading-section">
      <h1>{{ title }}</h1>
      <div class="heading-buttons">
        <slot name="actions">
          <!-- Default action buttons can go here -->
        </slot>
      </div>
    </div>

    <!-- Main content area -->
    <div class="content-body">
      <slot name="content">
        <!-- Main content goes here -->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseContentLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.content-page {
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-x: hidden;
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

.heading-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.content-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .heading-section {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  .heading-section h1 {
    font-size: 1.5rem;
  }

  .content-body {
    padding: 15px;
  }
}
</style>
