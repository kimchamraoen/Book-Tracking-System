<template>
  <div class="base-list-container">
    <!-- Filter and Search Section -->
    <div class="filter-section" v-if="showFilters">
      <div class="filter-controls">
        <slot name="filters">
          <!-- Custom filters go here -->
        </slot>
      </div>
    </div>

    <!-- List Header -->
    <div class="list-header" v-if="showHeader">
      <slot name="header">
        <div class="default-header">
          <h3>{{ listTitle }}</h3>
          <span class="item-count">{{ itemCount }} items</span>
        </div>
      </slot>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <p>Loading {{ listTitle.toLowerCase() }}...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="$emit('retry')" class="retry-btn">Retry</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!items || items.length === 0" class="empty-container">
      <slot name="empty">
        <p>No {{ listTitle.toLowerCase() }} found</p>
      </slot>
    </div>

    <!-- List Content -->
    <div v-else class="list-content">
      <slot name="list" :items="items">
        <!-- Default list rendering -->
        <div class="default-list">
          <div
            v-for="(item, index) in items"
            :key="item.id || index"
            class="list-item"
            @click="$emit('item-click', item)"
          >
            <slot name="item" :item="item" :index="index">
              {{ item.name || item.title || 'Item ' + (index + 1) }}
            </slot>
          </div>
        </div>
      </slot>
    </div>

    <!-- Pagination -->
    <div class="pagination-section" v-if="showPagination">
      <slot name="pagination">
        <!-- Custom pagination goes here -->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
    listTitle: {
      type: String,
      default: 'Items',
    },
    showFilters: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showPagination: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    itemCount() {
      return this.items ? this.items.length : 0
    },
  },
  emits: ['retry', 'item-click'],
}
</script>

<style scoped>
.base-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filter-section {
  padding: 15px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.filter-controls {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.list-header {
  padding: 15px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 5;
}

.default-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.default-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.item-count {
  font-size: 0.9rem;
  color: #666;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  flex: 1;
}

.retry-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #c8efff;
  border: 1px solid #c1c1c1;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-btn:hover {
  background-color: deepskyblue;
}

.list-content {
  flex: 1;
  overflow-y: auto;
}

.default-list {
  padding: 20px;
}

.list-item {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.list-item:hover {
  background-color: #f8f9fa;
}

.list-item:last-child {
  border-bottom: none;
}

.pagination-section {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .filter-section,
  .list-header,
  .pagination-section {
    padding: 10px 15px;
  }

  .default-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
