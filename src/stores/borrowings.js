import { defineStore } from 'pinia'

export const useBorrowingStore = defineStore('borrowings', {
  state: () => ({
    borrowings: [],
    loading: false,
    error: null,
  }),

  getters: {
    getBorrowingById: (state) => {
      return (id) => state.borrowings.find((borrowing) => borrowing.id === parseInt(id))
    },
    getActiveBorrowings: (state) => {
      return state.borrowings.filter((borrowing) => borrowing.status === 'Active')
    },
    getOverdueBorrowings: (state) => {
      return state.borrowings.filter((borrowing) => borrowing.status === 'Overdue')
    },
    getBorrowingsByMember: (state) => {
      return (memberId) =>
        state.borrowings.filter((borrowing) => borrowing.memberId === parseInt(memberId))
    },
  },

  actions: {
    async fetchBorrowings() {
      this.loading = true
      this.error = null

      try {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        this.borrowings = [
          {
            id: 1,
            memberId: 101,
            memberName: 'John Smith',
            memberType: 'Student',
            bookId: 201,
            bookTitle: 'The Great Gatsby',
            bookAuthor: 'F. Scott Fitzgerald',
            borrowDate: '2024-10-01',
            dueDate: '2024-10-15',
            daysRemaining: 5,
            loanPeriodDays: 14,
            status: 'Active',
            renewalCount: 0,
          },
          {
            id: 2,
            memberId: 102,
            memberName: 'Emily Johnson',
            memberType: 'Faculty',
            bookId: 202,
            bookTitle: 'To Kill a Mockingbird',
            bookAuthor: 'Harper Lee',
            borrowDate: '2024-09-20',
            dueDate: '2024-10-10',
            daysRemaining: -2,
            loanPeriodDays: 21,
            status: 'Overdue',
            renewalCount: 1,
          },
          {
            id: 3,
            memberId: 103,
            memberName: 'Michael Brown',
            memberType: 'Staff',
            bookId: 203,
            bookTitle: '1984',
            bookAuthor: 'George Orwell',
            borrowDate: '2024-10-05',
            dueDate: '2024-10-22',
            daysRemaining: 0,
            loanPeriodDays: 17,
            status: 'Due Today',
            renewalCount: 0,
          },
          {
            id: 4,
            memberId: 104,
            memberName: 'Sarah Davis',
            memberType: 'Student',
            bookId: 204,
            bookTitle: 'Pride and Prejudice',
            bookAuthor: 'Jane Austen',
            borrowDate: '2024-09-25',
            dueDate: '2024-11-25',
            daysRemaining: 34,
            loanPeriodDays: 60,
            status: 'Extended',
            renewalCount: 1,
          },
          {
            id: 5,
            memberId: 105,
            memberName: 'David Wilson',
            memberType: 'Guest',
            bookId: 205,
            bookTitle: 'The Catcher in the Rye',
            bookAuthor: 'J.D. Salinger',
            borrowDate: '2024-10-08',
            dueDate: '2024-10-15',
            daysRemaining: 3,
            loanPeriodDays: 7,
            status: 'Active',
            renewalCount: 0,
          },
          {
            id: 6,
            memberId: 106,
            memberName: 'Lisa Anderson',
            memberType: 'Faculty',
            bookId: 206,
            bookTitle: 'Brave New World',
            bookAuthor: 'Aldous Huxley',
            borrowDate: '2024-09-15',
            dueDate: '2024-10-25',
            daysRemaining: 13,
            loanPeriodDays: 40,
            status: 'Renewed',
            renewalCount: 2,
          },
          {
            id: 7,
            memberId: 107,
            memberName: 'Robert Taylor',
            memberType: 'Student',
            bookId: 207,
            bookTitle: 'Lord of the Flies',
            bookAuthor: 'William Golding',
            borrowDate: '2024-10-12',
            dueDate: '2024-10-26',
            daysRemaining: 14,
            loanPeriodDays: 14,
            status: 'Active',
            renewalCount: 0,
          },
          {
            id: 8,
            memberId: 108,
            memberName: 'Jennifer Martinez',
            memberType: 'Staff',
            bookId: 208,
            bookTitle: 'Animal Farm',
            bookAuthor: 'George Orwell',
            borrowDate: '2024-09-30',
            dueDate: '2024-10-08',
            daysRemaining: -4,
            loanPeriodDays: 8,
            status: 'Overdue',
            renewalCount: 0,
          },
          {
            id: 9,
            memberId: 109,
            memberName: 'Christopher Lee',
            memberType: 'Student',
            bookId: 209,
            bookTitle: 'Fahrenheit 451',
            bookAuthor: 'Ray Bradbury',
            borrowDate: '2024-10-10',
            dueDate: '2024-10-24',
            daysRemaining: 12,
            loanPeriodDays: 14,
            status: 'Active',
            renewalCount: 0,
          },
          {
            id: 10,
            memberId: 110,
            memberName: 'Amanda Clark',
            memberType: 'Guest',
            bookId: 210,
            bookTitle: 'Of Mice and Men',
            bookAuthor: 'John Steinbeck',
            borrowDate: '2024-10-11',
            dueDate: '2024-10-18',
            daysRemaining: 6,
            loanPeriodDays: 7,
            status: 'Active',
            renewalCount: 0,
          },
        ]

        this.loading = false
      } catch (error) {
        this.error = 'Failed to fetch borrowing records'
        this.loading = false
        console.error('Error fetching borrowings:', error)
      }
    },

    async fetchBorrowingById(id) {
      this.loading = true
      this.error = null

      try {
        // If borrowings are not loaded, fetch them first
        if (this.borrowings.length === 0) {
          await this.fetchBorrowings()
        }

        const borrowing = this.getBorrowingById(id)
        if (!borrowing) {
          throw new Error(`Borrowing with id ${id} not found`)
        }

        this.loading = false
        return borrowing
      } catch (error) {
        this.error = error.message
        this.loading = false
        console.error('Error fetching borrowing:', error)
        throw error
      }
    },

    async extendLoan(borrowingId, extensionDays = 14) {
      try {
        const borrowing = this.getBorrowingById(borrowingId)
        if (!borrowing) {
          throw new Error('Borrowing record not found')
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Update the borrowing record
        const currentDueDate = new Date(borrowing.dueDate)
        const newDueDate = new Date(currentDueDate.getTime() + extensionDays * 24 * 60 * 60 * 1000)

        borrowing.dueDate = newDueDate.toISOString().split('T')[0]
        borrowing.daysRemaining = Math.ceil((newDueDate - new Date()) / (1000 * 60 * 60 * 24))
        borrowing.status = 'Extended'
        borrowing.renewalCount += 1
        borrowing.loanPeriodDays += extensionDays

        return borrowing
      } catch (error) {
        console.error('Error extending loan:', error)
        throw error
      }
    },

    async returnBook(borrowingId) {
      try {
        const index = this.borrowings.findIndex((b) => b.id === borrowingId)
        if (index === -1) {
          throw new Error('Borrowing record not found')
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Remove the borrowing record (or mark as returned)
        this.borrowings.splice(index, 1)

        return true
      } catch (error) {
        console.error('Error returning book:', error)
        throw error
      }
    },

    async createBorrowing(borrowingData) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const newBorrowing = {
          id: Math.max(...this.borrowings.map((b) => b.id)) + 1,
          ...borrowingData,
          borrowDate: new Date().toISOString().split('T')[0],
          status: 'Active',
          renewalCount: 0,
        }

        this.borrowings.unshift(newBorrowing)
        return newBorrowing
      } catch (error) {
        console.error('Error creating borrowing:', error)
        throw error
      }
    },

    updateBorrowingStatus(borrowingId, newStatus) {
      const borrowing = this.getBorrowingById(borrowingId)
      if (borrowing) {
        borrowing.status = newStatus
      }
    },
  },
})
