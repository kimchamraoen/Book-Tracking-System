<template>
  <div class="table-list-container">
    <table class="data-table" style="max-width: 75rem;">
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
            <div style="display: flex; gap: 10px;">
              <button
                @click.stop="viewReturn(returning)"
                title="View Details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="width: 18px;height: 18px;"><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>
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

  button {
  background: none;
  border: none;
}
tr th{
  color: aliceblue;
  background-color: #3730a3;
}
</style>
