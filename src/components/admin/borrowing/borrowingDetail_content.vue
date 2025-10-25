<template>
  <div class="borrowing-page">
    <div class="heading-section">
      <h1>Borrowing Details</h1>
      <button class="back-btn" @click="$router.back()">Back</button>
    </div>

    <div v-if="loading" class="loading-container">
      <p>Loading borrowing details...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="retryFetch" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="!borrowing" class="error-container">
      <p>Borrowing record not found</p>
      <button @click="$router.back()" class="back-btn">Go Back</button>
    </div>

    <div v-else class="borrowing-content">
      <!-- Borrowing Details and Actions Row -->
      <div class="borrowing-detail">
        <div class="borrowing-card" style="flex: 1">
          <div class="borrowing-header">
            <div class="borrowing-title">
              <h1 class="name">Borrowing #{{ borrowing.id }}</h1>
              <span :class="['status-chip', statusClass]">
                {{ borrowing.status }}
              </span>
            </div>
          </div>

          <div class="borrowing-details-grid">
            <div class="detail-section">
              <h3>Member Information</h3>
              <table class="member-detail-table">
                <tbody>
                  <tr>
                    <th><strong>Member ID:</strong></th>
                    <td>{{ borrowing.memberId }}</td>
                  </tr>
                  <tr>
                    <th><strong>Member Name:</strong></th>
                    <td>{{ borrowing.memberName }}</td>
                  </tr>
                  <tr>
                    <th><strong>Member Type:</strong></th>
                    <td>{{ borrowing.memberType }}</td>
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
                    <td>{{ borrowing.bookId }}</td>
                  </tr>
                  <tr>
                    <th><strong>Title:</strong></th>
                    <td>{{ borrowing.bookTitle }}</td>
                  </tr>
                  <tr>
                    <th><strong>Author:</strong></th>
                    <td>{{ borrowing.bookAuthor }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="detail-section">
              <h3>Borrowing Information</h3>
              <table class="member-detail-table">
                <tbody>
                  <tr>
                    <th><strong>Borrow Date:</strong></th>
                    <td>{{ formatDate(borrowing.borrowDate) }}</td>
                  </tr>
                  <tr>
                    <th><strong>Due Date:</strong></th>
                    <td>{{ formatDate(borrowing.dueDate) }}</td>
                  </tr>
                  <tr>
                    <th><strong>Duration:</strong></th>
                    <td>{{ borrowing.loanPeriodDays }} days</td>
                  </tr>
                  <tr>
                    <th><strong>Days Remaining:</strong></th>
                    <td :class="daysRemainingClass">
                      {{ formatDaysRemaining(borrowing.daysRemaining) }}
                    </td>
                  </tr>
                  <tr>
                    <th><strong>Renewals:</strong></th>
                    <td>{{ borrowing.renewalCount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Action Buttons in separate div aligned horizontally -->
        <div class="borrowing-card actions-div">
          <h2 style="margin: 0">Actions</h2>
          <button
            v-if="borrowing.status === 'Active'"
            @click="extendLoan"
            class="action-btn"
            :disabled="actionLoading"
          >
            Extend
          </button>
          <button
            v-if="borrowing.status === 'Active' || borrowing.status === 'Overdue'"
            @click="returnBook"
            class="action-btn"
            :disabled="actionLoading"
          >
            Return
          </button>
          <button
            v-if="borrowing.status === 'Active'"
            @click="renewLoan"
            class="action-btn"
            :disabled="actionLoading || borrowing.renewalCount >= 3"
          >
            Update
          </button>
        </div>
      </div>

      <!-- Activity Section -->
      <!-- <div class="section-block">
        <div class="header">
          <h2>Borrowing Activity</h2>
          <div class="line"></div>
        </div>
        <div class="activity-list-container">
          <div class="activity-scrollable">
            <BorrowingActivityBlock
              v-for="(activity, index) in borrowingActivities"
              :key="index"
              :activity="activity"
            />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useBorrowingStore } from '../../../stores/borrowings.js'
// import BorrowingActivityBlock from './borrowingActivityBlock.vue'

export default {
  name: 'BorrowingDetailContent',
  components: {
    // BorrowingActivityBlock,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      borrowingStore: useBorrowingStore(),
      borrowing: null,
      loading: false,
      error: null,
      actionLoading: false,
      borrowingActivities: [
        {
          id: 1,
          action: 'Book Borrowed',
          date: '2024-10-01',
          time: '09:30 AM',
          description: 'Member successfully borrowed the book',
          status: 'success',
          details: 'Initial borrowing transaction completed',
        },
        {
          id: 2,
          action: 'Due Date Reminder',
          date: '2024-10-13',
          time: '08:00 AM',
          description: 'Automated reminder sent to member',
          status: 'info',
          details: 'Email notification sent 2 days before due date',
        },
        {
          id: 3,
          action: 'Loan Extended',
          date: '2024-10-14',
          time: '02:15 PM',
          description: 'Member requested loan extension',
          status: 'warning',
          details: 'Extended for additional 7 days',
        },
      ],
    }
  },
  computed: {
    statusClass() {
      if (!this.borrowing) return ''

      const statusMap = {
        Active: 'status-active',
        Overdue: 'status-overdue',
        Extended: 'status-extended',
        Renewed: 'status-renewed',
        'Due Today': 'status-due-today',
      }
      return statusMap[this.borrowing.status] || 'status-default'
    },
    daysRemainingClass() {
      if (!this.borrowing) return ''

      const days = this.borrowing.daysRemaining
      if (days < 0) return 'days-overdue'
      if (days === 0) return 'days-due-today'
      if (days <= 3) return 'days-due-soon'
      return 'days-normal'
    },
  },
  methods: {
    async fetchBorrowingDetails() {
      this.loading = true
      this.error = null

      try {
        this.borrowing = await this.borrowingStore.fetchBorrowingById(this.id)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async retryFetch() {
      await this.fetchBorrowingDetails()
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    formatDaysRemaining(days) {
      if (days < 0) {
        return `${Math.abs(days)} days overdue`
      } else if (days === 0) {
        return 'Due today'
      } else {
        return `${days} days remaining`
      }
    },
    async extendLoan() {
      this.actionLoading = true
      try {
        await this.borrowingStore.extendLoan(this.borrowing.id)
        // Update the local borrowing data
        await this.fetchBorrowingDetails()

        // Add activity record
        this.borrowingActivities.unshift({
          id: Date.now(),
          action: 'Loan Extended',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          description: 'Loan period extended by librarian',
          status: 'warning',
          details: 'Extended for additional 14 days',
        })
      } catch (error) {
        console.error('Failed to extend loan:', error)
        alert('Failed to extend loan. Please try again.')
      } finally {
        this.actionLoading = false
      }
    },
    async returnBook() {
      if (confirm('Are you sure you want to mark this book as returned?')) {
        this.actionLoading = true
        try {
          await this.borrowingStore.returnBook(this.borrowing.id)
          // Navigate back to borrowing list
          this.$router.push({ name: 'BorrowingContent' })
        } catch (error) {
          console.error('Failed to return book:', error)
          alert('Failed to return book. Please try again.')
        } finally {
          this.actionLoading = false
        }
      }
    },
    async renewLoan() {
      this.actionLoading = true
      try {
        await this.borrowingStore.extendLoan(this.borrowing.id, 14)
        await this.fetchBorrowingDetails()

        // Add activity record
        this.borrowingActivities.unshift({
          id: Date.now(),
          action: 'Loan Renewed',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          description: 'Loan renewed by member request',
          status: 'info',
          details: `Renewal #${this.borrowing.renewalCount}`,
        })
      } catch (error) {
        console.error('Failed to renew loan:', error)
        alert('Failed to renew loan. Please try again.')
      } finally {
        this.actionLoading = false
      }
    },
  },
  async mounted() {
    await this.fetchBorrowingDetails()
  },
}
</script>

<style scoped>
.borrowing-page {
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
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

.borrowing-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.borrowing-detail {
  display: flex;
  align-items: flex-start;
}

.borrowing-card {
  background: white;
  border-radius: 10px;
  padding: 40px;
  margin: 0 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

/* Actions div styling - similar to member detail */
.actions-div {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 200px;
  max-width: 250px;
}

.borrowing-card.actions-div {
  margin-left: 0;
}

.actions-div h2 {
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 2px solid #007bff;
}

.borrowing-title {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.borrowing-details-grid {
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

.days-overdue {
  color: #c62828;
  font-weight: bold;
}

.days-due-today {
  color: #ef6c00;
  font-weight: bold;
}

.days-due-soon {
  color: #f57c00;
  font-weight: 500;
}

.days-normal {
  color: #2e7d32;
}

/* Action button styling - similar to member detail */

.activity-list-container {
  margin-top: 20px;
}

.activity-scrollable {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
  scroll-behavior: smooth;
}

.activity-scrollable::-webkit-scrollbar {
  height: 8px;
}

.activity-scrollable::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.activity-scrollable::-webkit-scrollbar-thumb {
  background: #8ecae6;
  border-radius: 4px;
}

.activity-scrollable::-webkit-scrollbar-thumb:hover {
  background: #219ebc;
}

/* Responsive design */
@media (max-width: 768px) {
  .borrowing-detail {
    flex-direction: column;
  }

  .borrowing-details-grid {
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
  .borrowing-page {
    padding: 10px;
  }

  .borrowing-card {
    padding: 15px;
  }

  .title {
    font-size: 1.4rem;
  }

  .borrowing-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
