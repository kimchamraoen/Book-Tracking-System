<template>
  <div class="returning-page">
    <div class="heading-section">
      <h1>Return Details</h1>
      <button class="back-btn" @click="$router.back()">Back</button>
    </div>

    <div v-if="loading" class="loading-container">
      <p>Loading return details...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="retryFetch" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="!returning" class="error-container">
      <p>Return record not found</p>
      <button @click="$router.back()" class="back-btn">Go Back</button>
    </div>

    <div v-else class="returning-content">
      <div class="returning-detail">
        <div class="returning-card" style="flex: 1">
          <div class="returning-header">
            <div class="returning-title">
              <h1 class="title">Return #{{ returning.id }}</h1>
              <span :class="['status-chip', statusClass]">
                {{ returning.status }}
              </span>
            </div>
          </div>

          <div class="returning-details-grid">
            <div class="detail-section">
              <h3>Returner Information</h3>
              <table class="member-detail-table">
                <tbody>
                  <tr>
                    <th><strong>Member ID:</strong></th>
                    <td>{{ returning.memberId }}</td>
                  </tr>
                  <tr>
                    <th><strong>Member Name:</strong></th>
                    <td>{{ returning.memberName }}</td>
                  </tr>
                  <tr>
                    <th><strong>Member Type:</strong></th>
                    <td>{{ returning.memberType }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="detail-section">
              <h3>Book Information</h3>
              <table class="member-detail-table">
                <tbody>
                  <tr>
                    <th><strong>Book ID:</strong></th>
                    <td>{{ returning.bookId }}</td>
                  </tr>
                  <tr>
                    <th><strong>Title:</strong></th>
                    <td>{{ returning.bookTitle }}</td>
                  </tr>
                  <tr>
                    <th><strong>Author:</strong></th>
                    <td>{{ returning.bookAuthor }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="detail-section">
              <h3>Return Information</h3>
              <table class="member-detail-table">
                <tbody>
                  <tr>
                    <th><strong>Borrow Date:</strong></th>
                    <td>{{ formatDate(returning.borrowDate) }}</td>
                  </tr>
                  <tr>
                    <th><strong>Due Date:</strong></th>
                    <td>{{ formatDate(returning.dueDate) }}</td>
                  </tr>
                  <tr>
                    <th><strong>Return Date:</strong></th>
                    <td>{{ formatDate(returning.returnDate) }}</td>
                  </tr>
                  <tr>
                    <th><strong>Days Late:</strong></th>
                    <td :class="daysLateClass">
                      {{ formatDaysLate(returning.daysLate) }}
                    </td>
                  </tr>
                  <tr>
                    <th><strong>Condition:</strong></th>
                    <td>
                      <span :class="['condition-chip', conditionClass]">
                        {{ returning.condition }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th><strong>Fine Amount:</strong></th>
                    <td :class="fineClass">${{ returning.fineAmount.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Action Buttons in separate div aligned horizontally -->
        <div class="returning-card actions-div">
          <h2 style="margin: 0">Actions</h2>
          <button
            v-if="returning.condition === 'Damaged'"
            @click="viewDamageReport"
            class="action-btn"
            :disabled="actionLoading"
          >
            File Complaint
          </button>
          <button
            v-if="returning.fineAmount > 0"
            @click="processFine"
            class="action-btn"
            :disabled="actionLoading"
          >
            Process Fine
          </button>
          <button @click="printReceipt" class="action-btn" :disabled="actionLoading">
            Print Receipt
          </button>
        </div>
      </div>

      <!-- Notes Section -->
      <!-- <div class="section-block" v-if="returning.notes">
        <div class="header">
          <h2>Return Notes</h2>
          <div class="line"></div>
        </div>
        <div class="notes-content">
          <p>{{ returning.notes }}</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useReturningStore } from '../../../stores/returning.js'

export default {
  name: 'ReturningDetailContent',
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      returning: null,
      loading: false,
      error: null,
      actionLoading: false,
    }
  },
  computed: {
    returningStore() {
      return useReturningStore()
    },
    statusClass() {
      if (!this.returning) return ''

      const statusMap = {
        'On Time': 'status-on-time',
        Late: 'status-late',
        'Very Late': 'status-very-late',
        Processed: 'status-processed',
      }
      return statusMap[this.returning.status] || 'status-default'
    },
    conditionClass() {
      if (!this.returning) return ''

      const conditionMap = {
        Good: 'condition-good',
        Fair: 'condition-fair',
        Damaged: 'condition-damaged',
        Lost: 'condition-lost',
      }
      return conditionMap[this.returning.condition] || 'condition-default'
    },
    daysLateClass() {
      if (!this.returning) return ''

      const days = this.returning.daysLate
      if (days === 0) return 'days-on-time'
      if (days <= 3) return 'days-slightly-late'
      if (days <= 7) return 'days-late'
      return 'days-very-late'
    },
    fineClass() {
      if (!this.returning) return ''

      return this.returning.fineAmount > 0 ? 'fine-amount' : 'no-fine'
    },
  },
  methods: {
    async fetchReturningDetails() {
      this.loading = true
      this.error = null

      try {
        this.returning = await this.returningStore.fetchReturnById(this.id)
      } catch (error) {
        console.error('Error fetching returning details:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async retryFetch() {
      await this.fetchReturningDetails()
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    formatDaysLate(days) {
      if (days === 0) {
        return 'On time'
      } else if (days === 1) {
        return '1 day late'
      } else {
        return `${days} days late`
      }
    },
    async viewDamageReport() {
      this.actionLoading = true
      try {
        // Navigate to damage report view or show modal
        console.log('View damage report for return:', this.returning.id)
        alert('Damage report functionality would be implemented here')
      } catch (error) {
        console.error('Failed to view damage report:', error)
        alert('Failed to view damage report. Please try again.')
      } finally {
        this.actionLoading = false
      }
    },
    async processFine() {
      this.actionLoading = true
      try {
        // Process fine payment
        console.log('Process fine for return:', this.returning.id)
        alert('Fine processing functionality would be implemented here')
      } catch (error) {
        console.error('Failed to process fine:', error)
        alert('Failed to process fine. Please try again.')
      } finally {
        this.actionLoading = false
      }
    },
    async printReceipt() {
      this.actionLoading = true
      try {
        // Generate and print receipt
        console.log('Print receipt for return:', this.returning.id)
        alert('Receipt printing functionality would be implemented here')
      } catch (error) {
        console.error('Failed to print receipt:', error)
        alert('Failed to print receipt. Please try again.')
      } finally {
        this.actionLoading = false
      }
    },
  },
  async mounted() {
    await this.fetchReturningDetails()
  },
}
</script>

<style scoped>
.returning-page {
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

.returning-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.returning-detail {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.returning-card {
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.returning-card.actions-div {
  margin: 0;
}

.returning-header {
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.returning-title {
  display: flex;
  align-items: center;
  gap: 15px;
}

.title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.condition-chip {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}

.returning-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.detail-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

/* Member detail table styling - matching member component */
.member-detail-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #808080;
}

.member-detail-table td {
  padding: 10px 16px;
  border: 1px solid #ccc;
  color: #555;
  vertical-align: middle;
}

.member-detail-table th {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  text-align: left;
  padding: 10px 16px;
  color: #333;
  width: 200px;
}

.days-on-time {
  color: #2e7d32;
  font-weight: 500;
}

.days-slightly-late {
  color: #f57c00;
  font-weight: 500;
}

.days-late {
  color: #ef6c00;
  font-weight: bold;
}

.days-very-late {
  color: #c62828;
  font-weight: bold;
}

.fine-amount {
  color: #c62828;
  font-weight: bold;
}

.no-fine {
  color: #2e7d32;
  font-weight: 500;
}

.notes-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.notes-content p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

/* Responsive design */
@media (max-width: 768px) {
  .returning-detail {
    flex-direction: column;
  }

  .returning-details-grid {
    grid-template-columns: 1fr;
  }

  .actions-div {
    min-width: unset;
    max-width: unset;
  }

  .actions-div .action-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .returning-page {
    padding: 10px;
  }

  .returning-card {
    padding: 15px;
  }

  .title {
    font-size: 1.4rem;
  }

  .returning-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
