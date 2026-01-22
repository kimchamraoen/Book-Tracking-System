<template>
  <div class="table-list-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Borrowing ID</th>
          <th>Member</th>
          <th>Book</th>
          <th>Borrow Date</th>
          <th>Due Date</th>
          <th>Days Remaining</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="8" class="table-loading">Loading borrowing records...</td>
        </tr>
        <tr v-else-if="error">
          <td colspan="8" class="table-error">
            {{ error }}
            <button @click="borrowingStore.fetchBorrowings()" class="retry-btn">Retry</button>
          </td>
        </tr>
        <tr
          v-else
          v-for="borrowing in sortedBorrowings"
          :key="borrowing.id"
          @click="goToBorrowingDetail(borrowing)"
        >
          <td class="truncate-sm">{{ borrowing.id }}</td>
          <td class="truncate">{{ borrowing.memberName }}</td>
          <td class="truncate">{{ borrowing.bookTitle }}</td>
          <td class="truncate-sm">{{ formatDate(borrowing.borrowDate) }}</td>
          <td class="truncate-sm">{{ formatDate(borrowing.dueDate) }}</td>
          <td class="truncate-sm" :class="daysRemainingClass(borrowing.daysRemaining)">
            {{ formatDaysRemaining(borrowing.daysRemaining) }}
          </td>
          <td>
            <span :class="['status-chip', statusClass(borrowing.status)]">
              {{ borrowing.status }}
            </span>
          </td>
          <td class="actions-cell">
            <div>
              <button
                v-if="borrowing.status === 'Active'"
                @click.stop="extendLoan(borrowing)"
                class="action-buttons btn-extend"
                title="Extend Loan"
              >
                Extend
              </button>
              <button
                v-if="borrowing.status === 'Active' || borrowing.status === 'Overdue'"
                @click.stop="returnBook(borrowing)"
                class="action-buttons btn-return"
                title="Return Book"
              >
                Return
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="!loading && !error && sortedBorrowings.length === 0">
          <td colspan="8" class="table-empty">No borrowing records found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { useBorrowingStore } from '../../../stores/borrowings.js'

export default {
  name: 'BorrowingListContent',
  props: ['sortKey', 'sortOrder', 'filterValue', 'searchQuery'],
  data() {
    return {
      borrowingStore: useBorrowingStore(),
    }
  },
  computed: {
    borrowings() {
      return this.borrowingStore.borrowings
    },
    loading() {
      return this.borrowingStore.loading
    },
    error() {
      return this.borrowingStore.error
    },
    filteredBorrowings() {
      let filtered = this.borrowings

      // Apply search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (borrowing) =>
            borrowing.memberName.toLowerCase().includes(query) ||
            borrowing.bookTitle.toLowerCase().includes(query) ||
            borrowing.id.toString().includes(query) ||
            borrowing.status.toLowerCase().includes(query),
        )
      }

      // Apply filter value
      if (this.filterValue) {
        if (this.sortKey === 'status') {
          filtered = filtered.filter((borrowing) => borrowing.status === this.filterValue)
        } else if (this.sortKey === 'memberType') {
          filtered = filtered.filter((borrowing) => borrowing.memberType === this.filterValue)
        } else if (this.sortKey === 'dueDate') {
          filtered = this.filterByDueDate(filtered, this.filterValue)
        } else if (this.sortKey === 'loanPeriod') {
          filtered = this.filterByLoanPeriod(filtered, this.filterValue)
        }
      }

      return filtered
    },
    sortedBorrowings() {
      const sorted = [...this.filteredBorrowings]

      if (this.sortKey && this.sortKey !== 'None') {
        sorted.sort((a, b) => {
          let aValue, bValue

          switch (this.sortKey) {
            case 'status':
              aValue = a.status
              bValue = b.status
              break
            case 'memberType':
              aValue = a.memberType
              bValue = b.memberType
              break
            case 'dueDate':
              aValue = new Date(a.dueDate)
              bValue = new Date(b.dueDate)
              break
            case 'loanPeriod':
              aValue = a.loanPeriodDays
              bValue = b.loanPeriodDays
              break
            default:
              aValue = a.memberName
              bValue = b.memberName
          }

          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase()
            bValue = bValue.toLowerCase()
          }

          if (this.sortOrder === 'desc') {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
          } else {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
          }
        })
      }

      return sorted
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
    formatDaysRemaining(days) {
      if (days < 0) {
        return `${Math.abs(days)} days overdue`
      } else if (days === 0) {
        return 'Due today'
      } else {
        return `${days} days left`
      }
    },
    daysRemainingClass(days) {
      if (days < 0) return 'overdue'
      if (days === 0) return 'due-today'
      if (days <= 3) return 'due-soon'
      return 'normal'
    },
    statusClass(status) {
      const statusMap = {
        Active: 'status-active',
        Overdue: 'status-overdue',
        Extended: 'status-extended',
        Renewed: 'status-renewed',
        'Due Today': 'status-due-today',
      }
      return statusMap[status] || 'status-default'
    },
    filterByDueDate(borrowings, filterValue) {
      const today = new Date()
      const todayStr = today.toDateString()

      return borrowings.filter((borrowing) => {
        const dueDate = new Date(borrowing.dueDate)

        switch (filterValue) {
          case 'Today':
            return dueDate.toDateString() === todayStr
          case 'This Week': {
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
            return dueDate >= today && dueDate <= weekFromNow
          }
          case 'Next Week': {
            const nextWeekStart = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
            const nextWeekEnd = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
            return dueDate >= nextWeekStart && dueDate <= nextWeekEnd
          }
          case 'This Month':
            return (
              dueDate.getMonth() === today.getMonth() &&
              dueDate.getFullYear() === today.getFullYear()
            )
          case 'Overdue':
            return dueDate < today
          default:
            return true
        }
      })
    },
    filterByLoanPeriod(borrowings, filterValue) {
      return borrowings.filter((borrowing) => {
        const days = borrowing.loanPeriodDays

        switch (filterValue) {
          case '1-3 days':
            return days >= 1 && days <= 3
          case '4-7 days':
            return days >= 4 && days <= 7
          case '1-2 weeks':
            return days >= 8 && days <= 14
          case '2-4 weeks':
            return days >= 15 && days <= 28
          case '1+ months':
            return days > 28
          default:
            return true
        }
      })
    },
    goToBorrowingDetail(borrowing) {
      this.$router.push({
        name: 'BorrowingDetails',
        params: { id: borrowing.id },
      })
    },
    extendLoan(borrowing) {
      // Implementation for extending loan
      this.borrowingStore
        .extendLoan(borrowing.id)
        .then(() => {
          // Show success message
          console.log('Loan extended successfully')
        })
        .catch((error) => {
          console.error('Failed to extend loan:', error)
        })
    },
    returnBook(borrowing) {
      // Implementation for returning book
      this.borrowingStore
        .returnBook(borrowing.id)
        .then(() => {
          // Show success message
          console.log('Book returned successfully')
        })
        .catch((error) => {
          console.error('Failed to return book:', error)
        })
    },
  },
  mounted() {
    this.borrowingStore.fetchBorrowings()
  },
}
</script>

<style scoped>
button {
  background: none;
  border: 1px solid #3730a3;
}
tr th{
  color: aliceblue;
  background-color: #3730a3;
}
</style>
