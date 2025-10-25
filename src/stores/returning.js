import { defineStore } from 'pinia'

export const useReturningStore = defineStore('returning', {
  state: () => ({
    returns: [],
    loading: false,
    error: null,
  }),

  getters: {
    getReturnById: (state) => (id) => {
      return state.returns.find((returning) => returning.id === parseInt(id))
    },

    totalReturns: (state) => state.returns.length,

    onTimeReturns: (state) => state.returns.filter((r) => r.status === 'On Time').length,

    lateReturns: (state) =>
      state.returns.filter((r) => r.status === 'Late' || r.status === 'Very Late').length,

    damagedReturns: (state) => state.returns.filter((r) => r.condition === 'Damaged').length,
  },

  actions: {
    async fetchReturns() {
      this.loading = true
      this.error = null

      try {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        this.returns = [
          {
            id: 1,
            memberName: 'John Smith',
            memberId: 'M001',
            bookTitle: 'JavaScript: The Good Parts',
            bookId: 'B001',
            borrowDate: '2024-10-01',
            dueDate: '2024-10-15',
            returnDate: '2024-10-14',
            condition: 'Good',
            status: 'On Time',
            memberType: 'Student',
          },
          {
            id: 2,
            memberName: 'Sarah Johnson',
            memberId: 'M002',
            bookTitle: 'Clean Code',
            bookId: 'B002',
            borrowDate: '2024-09-20',
            dueDate: '2024-10-05',
            returnDate: '2024-10-08',
            condition: 'Fair',
            status: 'Late',
            memberType: 'Faculty',
          },
          {
            id: 3,
            memberName: 'Mike Brown',
            memberId: 'M003',
            bookTitle: 'Design Patterns',
            bookId: 'B003',
            borrowDate: '2024-09-15',
            dueDate: '2024-09-30',
            returnDate: '2024-10-22',
            condition: 'Damaged',
            status: 'Very Late',
            memberType: 'Staff',
          },
          {
            id: 4,
            memberName: 'Emily Davis',
            memberId: 'M004',
            bookTitle: 'Vue.js Guide',
            bookId: 'B004',
            borrowDate: '2024-10-10',
            dueDate: '2024-10-22',
            returnDate: '2024-10-22',
            condition: 'Good',
            status: 'On Time',
            memberType: 'Student',
          },
          {
            id: 5,
            memberName: 'Robert Wilson',
            memberId: 'M005',
            bookTitle: 'Advanced CSS',
            bookId: 'B005',
            borrowDate: '2024-09-25',
            dueDate: '2024-10-10',
            returnDate: '2024-10-12',
            condition: 'Good',
            status: 'Late',
            memberType: 'Researcher',
          },
        ]
      } catch (error) {
        this.error = 'Failed to fetch return records'
        console.error('Error fetching returns:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchReturnById(id) {
      this.loading = true
      this.error = null

      try {
        // If we already have the return in our state, return it
        const existingReturn = this.getReturnById(id)
        if (existingReturn) {
          // Add additional fields that might not be in the list view
          return {
            ...existingReturn,
            bookAuthor: this.getMockAuthor(existingReturn.bookId),
            daysLate: this.calculateDaysLate(existingReturn.dueDate, existingReturn.returnDate),
            fineAmount: this.calculateFine(existingReturn.dueDate, existingReturn.returnDate),
            notes: existingReturn.notes || 'No special notes',
          }
        }

        // Otherwise fetch from API (simulate)
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock detailed return data based on ID
        const mockReturns = {
          1: {
            id: 1,
            memberName: 'John Smith',
            memberId: 'M001',
            memberType: 'Student',
            bookTitle: 'JavaScript: The Good Parts',
            bookId: 'B001',
            bookAuthor: 'Douglas Crockford',
            borrowDate: '2024-10-01',
            dueDate: '2024-10-15',
            returnDate: '2024-10-14',
            condition: 'Good',
            status: 'On Time',
            daysLate: 0,
            fineAmount: 0,
            notes: 'Book returned in excellent condition',
          },
          2: {
            id: 2,
            memberName: 'Sarah Johnson',
            memberId: 'M002',
            memberType: 'Faculty',
            bookTitle: 'Clean Code',
            bookId: 'B002',
            bookAuthor: 'Robert C. Martin',
            borrowDate: '2024-09-20',
            dueDate: '2024-10-05',
            returnDate: '2024-10-08',
            condition: 'Fair',
            status: 'Late',
            daysLate: 3,
            fineAmount: 15.0,
            notes: 'Book returned with minor wear',
          },
          3: {
            id: 3,
            memberName: 'Mike Brown',
            memberId: 'M003',
            memberType: 'Staff',
            bookTitle: 'Design Patterns',
            bookId: 'B003',
            bookAuthor: 'Gang of Four',
            borrowDate: '2024-09-15',
            dueDate: '2024-09-30',
            returnDate: '2024-10-22',
            condition: 'Damaged',
            status: 'Very Late',
            daysLate: 22,
            fineAmount: 110.0,
            notes: 'Book has water damage on pages 45-50',
          },
          4: {
            id: 4,
            memberName: 'Emily Davis',
            memberId: 'M004',
            memberType: 'Student',
            bookTitle: 'Vue.js Guide',
            bookId: 'B004',
            bookAuthor: 'Evan You',
            borrowDate: '2024-10-10',
            dueDate: '2024-10-22',
            returnDate: '2024-10-22',
            condition: 'Good',
            status: 'On Time',
            daysLate: 0,
            fineAmount: 0,
            notes: 'Perfect condition return',
          },
          5: {
            id: 5,
            memberName: 'Robert Wilson',
            memberId: 'M005',
            memberType: 'Researcher',
            bookTitle: 'Advanced CSS',
            bookId: 'B005',
            bookAuthor: 'Lea Verou',
            borrowDate: '2024-09-25',
            dueDate: '2024-10-10',
            returnDate: '2024-10-12',
            condition: 'Good',
            status: 'Late',
            daysLate: 2,
            fineAmount: 10.0,
            notes: 'Returned in good condition despite being late',
          },
        }

        const returnDetail = mockReturns[parseInt(id)]
        if (!returnDetail) {
          throw new Error(`Return record with ID ${id} not found`)
        }

        return returnDetail
      } catch (error) {
        this.error = 'Failed to fetch return details'
        console.error('Error fetching return details:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    getMockAuthor(bookId) {
      const authors = {
        B001: 'Douglas Crockford',
        B002: 'Robert C. Martin',
        B003: 'Gang of Four',
        B004: 'Evan You',
        B005: 'Lea Verou',
      }
      return authors[bookId] || 'Unknown Author'
    },

    calculateDaysLate(dueDate, returnDate) {
      const due = new Date(dueDate)
      const returned = new Date(returnDate)
      const diffTime = returned - due
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return Math.max(0, diffDays)
    },

    calculateFine(dueDate, returnDate) {
      const daysLate = this.calculateDaysLate(dueDate, returnDate)
      return daysLate * 5.0 // $5 per day fine
    },

    async reportDamage(returnId, damageReport) {
      this.loading = true
      this.error = null

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Update the return record
        const returnIndex = this.returns.findIndex((r) => r.id === returnId)
        if (returnIndex !== -1) {
          this.returns[returnIndex].condition = 'Damaged'
          this.returns[returnIndex].notes = damageReport
        }

        return { success: true, message: 'Damage report submitted successfully' }
      } catch (error) {
        this.error = 'Failed to submit damage report'
        console.error('Error reporting damage:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
