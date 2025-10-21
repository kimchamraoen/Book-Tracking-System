<template>
  <div class="info-block" :style="{ backgroundColor: blockColor }">
    <div class="info-content">
      <div class="info-header">
        <h3>{{ title }}</h3>
        <span class="count">{{ count }}</span>
      </div>
      <p class="description">{{ description }}</p>
    </div>
    <div class="info-icon" v-if="image">
      <img :src="image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibrarianInfo_Block',
  props: {
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    blockColor: {
      type: String,
      default: '#f8f9fa',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.info-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
  min-height: 120px;
}

.info-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.info-content {
  flex: 1;
}

.info-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
}

.info-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.count {
  font-size: 2rem;
  font-weight: 700;
  color: #007bff;
}

.description {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

.info-icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.8;
}

/* Responsive design */
@media (max-width: 768px) {
  .info-block {
    flex-direction: column;
    text-align: center;
    min-height: auto;
  }

  .info-header {
    flex-direction: column;
    gap: 5px;
  }

  .count {
    font-size: 1.8rem;
  }

  .info-icon {
    margin-top: 10px;
    width: 40px;
    height: 40px;
  }
}
</style>
