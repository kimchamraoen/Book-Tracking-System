<template>
  <div class="table-list-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Return ID</th>
          <th>Member</th>
          <th>Book</th>
          <th>Borrow Date</th>
          <th>Due Date</th>
          <th>Return Date</th>
          <th>Condition</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="9" class="table-loading">Loading return records...</td>
        </tr>
        <tr v-else-if="error">
          <td colspan="9" class="table-error">
            {{ error }}
            <button @click="returningStore.fetchReturns()" class="retry-btn">Retry</button>
          </td>
        </tr>
        <tr
          v-else
          v-for="returning in sortedReturns"
          :key="returning.id"
          @click="goToReturningDetail(returning)"
        >
          <td class="truncate-sm">{{ returning.id }}</td>
          <td class="truncate">{{ returning.memberName }}</td>
          <td class="truncate">{{ returning.bookTitle }}</td>
          <td class="truncate-sm">{{ formatDate(returning.borrowDate) }}</td>
          <td class="truncate-sm">{{ formatDate(returning.dueDate) }}</td>
          <td class="truncate-sm">{{ formatDate(returning.returnDate) }}</td>
          <td class="truncate-sm">
            <span :class="['condition-chip', conditionClass(returning.condition)]">
              {{ returning.condition }}
            </span>
          </td>
          <td>
            <span :class="['status-chip', statusClass(returning.status)]">
              {{ returning.status }}
            </span>
          </td>
          <td class="actions-cell">
            <div>
              <button
                @click.stop="viewReturn(returning)"
                class="action-buttons btn-view"
                title="View Details"
              >
                View
              </button>
              <button
                v-if="returning.condition === 'Damaged'"
                @click.stop="reportDamage(returning)"
                class="action-buttons btn-report"
                title="Report Damage"
              >
                Report
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="!loading && !error && sortedReturns.length === 0">
          <td colspan="9" class="table-empty">No return records found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useReturningStore } from '../../../stores/returning.js'

export default {
  name: 'ReturningListContent',
  props: ['sortKey', 'sortOrder', 'filterValue', 'searchQuery'],
  data() {
    return {
      returningStore: useReturningStore(),
    }
  },
  async mounted() {
    // Fetch returns when component mounts
    if (this.returningStore.returns.length === 0) {
      await this.returningStore.fetchReturns()
    }
  },
  methods: {
    goToReturningDetail(returning) {
      this.$router.push({ name: 'ReturningDetails', params: { id: String(returning.id) } })
    },
    viewReturn(returning) {
      this.goToReturningDetail(returning)
    },
    reportDamage(returning) {
      console.log('Report damage for:', returning.id)
      // Implement damage reporting logic
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
    statusClass(status) {
      const map = {
        'On Time': 'status-on-time',
        Late: 'status-late',
        'Very Late': 'status-very-late',
        Processed: 'status-processed',
      }
      return map[status] || 'status-unknown'
    },
    conditionClass(condition) {
      const map = {
        Good: 'condition-good',
        Fair: 'condition-fair',
        Damaged: 'condition-damaged',
        Lost: 'condition-lost',
      }
      return map[condition] || 'condition-unknown'
    },
  },
  computed: {
    returns() {
      return this.returningStore.returns
    },
    loading() {
      return this.returningStore.loading
    },
    error() {
      return this.returningStore.error
    },
    sortedReturns() {
      let result = [...this.returns]

      // 1. Apply search filter first
      if (this.searchQuery && this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim()
        result = result.filter(
          (returning) =>
            returning.memberName.toLowerCase().includes(query) ||
            returning.bookTitle.toLowerCase().includes(query) ||
            returning.id.toString().toLowerCase().includes(query) ||
            returning.condition.toLowerCase().includes(query) ||
            returning.status.toLowerCase().includes(query),
        )
      }

      // 2. Filter by value (e.g. only show "Late")
      if (this.filterValue) {
        result = result.filter(
          (returning) =>
            String(returning[this.sortKey]).toLowerCase() === this.filterValue.toLowerCase(),
        )
      }

      // 3. Sort alphabetically
      if (this.sortKey && this.sortKey !== 'none') {
        result.sort((a, b) => {
          const valA = String(a[this.sortKey] || '').toLowerCase()
          const valB = String(b[this.sortKey] || '').toLowerCase()
          if (this.sortOrder === 'asc') return valA.localeCompare(valB)
          if (this.sortOrder === 'desc') return valB.localeCompare(valA)
          return 0
        })
      }

      return result
    },
  },
}
</script>

<style scoped>
/* Additional condition chip styling */
.condition-chip {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}

.condition-good {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.condition-fair {
  background-color: #fff3e0;
  color: #ef6c00;
}

.condition-damaged {
  background-color: #ffebee;
  color: #c62828;
}

.condition-lost {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.condition-unknown {
  background-color: #f5f5f5;
  color: #666;
}

/* Additional status chip styles for returning */
.status-on-time {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.status-late {
  background-color: #fff3e0;
  color: #ef6c00;
}

.status-very-late {
  background-color: #ffebee;
  color: #c62828;
}

.status-processed {
  background-color: #e3f2fd;
  color: #1565c0;
}

/* Report button styling */
.btn-report {
  background-color: #ff9800;
  color: white;
  border: 1px solid #ff9800;
}

.btn-report:hover:not(:disabled) {
  background-color: #f57c00 !important;
  border-color: #ef6c00 !important;
  transform: translateY(-1px) !important;
}
</style>
