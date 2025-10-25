import { defineStore } from 'pinia'

export const useLibrariansStore = defineStore('librarians', {
  state: () => ({
    librarians: [],
    selectedLibrarian: null,
    loading: false,
    error: null,
  }),

  getters: {
    getLibrarianById: (state) => (id) => {
      return state.librarians.find((librarian) => String(librarian.id) === String(id))
    },
  },

  actions: {
    async fetchLibrarians() {
      this.loading = true
      this.error = null

      try {
        // Simulate API call - replace with actual API endpoint
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Sample librarian data - replace with actual API response
        this.librarians = [
          {
            id: 1,
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice.johnson@library.com',
            department: 'Reference',
            role: 'Senior Librarian',
            status: 'Active',
            joinDate: '2020-01-15',
            employeeId: 'LIB001',
            avatar: '/src/assets/images/profile-avatar.jpg',
            assignedSections: 'Reference, Digital Collections',
          },
          {
            id: 2,
            firstName: 'Bob',
            lastName: 'Williams',
            email: 'bob.williams@library.com',
            department: 'Circulation',
            role: 'Head Librarian',
            status: 'Active',
            joinDate: '2018-03-20',
            employeeId: 'LIB002',
            avatar: '/src/assets/images/profile-avatar.jpg',
            assignedSections: 'Circulation, General Collection',
          },
          {
            id: 3,
            firstName: 'Carol',
            lastName: 'Davis',
            email: 'carol.davis@library.com',
            department: 'Technical Services',
            role: 'Librarian',
            status: 'Active',
            joinDate: '2021-06-10',
            employeeId: 'LIB003',
            avatar: '/src/assets/images/profile-avatar.jpg',
            assignedSections: 'Cataloging, Technical Processing',
          },
          {
            id: 4,
            firstName: 'David',
            lastName: 'Brown',
            email: 'david.brown@library.com',
            department: 'Digital Collections',
            role: 'Assistant Librarian',
            status: 'Part-time',
            joinDate: '2022-09-05',
            employeeId: 'LIB004',
            avatar: '/src/assets/images/profile-avatar.jpg',
            assignedSections: 'Digital Archives, Multimedia',
          },
          {
            id: 5,
            firstName: 'Eva',
            lastName: 'Miller',
            email: 'eva.miller@library.com',
            department: 'Special Collections',
            role: 'Library Technician',
            status: 'On Leave',
            joinDate: '2019-11-18',
            employeeId: 'LIB005',
            avatar: '/src/assets/images/profile-avatar.jpg',
            assignedSections: 'Rare Books, Manuscripts',
          },
        ]

        this.loading = false
        return true
      } catch (error) {
        this.error = 'Failed to fetch librarians'
        this.loading = false
        console.error('Error fetching librarians:', error)
        return false
      }
    },

    async fetchLibrarianById(id) {
      this.loading = true
      this.error = null
      this.selectedLibrarian = null

      try {
        // If librarians not loaded yet, fetch them first
        if (this.librarians.length === 0) {
          await this.fetchLibrarians()
        }

        // Find the librarian by ID
        const librarian = this.getLibrarianById(id)
        
        if (librarian) {
          this.selectedLibrarian = librarian
          this.loading = false
          return true
        } else {
          this.error = `Librarian with ID ${id} not found`
          this.loading = false
          return false
        }
      } catch (error) {
        this.error = 'Failed to fetch librarian details'
        this.loading = false
        console.error('Error fetching librarian by ID:', error)
        return false
      }
    },

    async updateLibrarianStatus(id, newStatus) {
      try {
        // Simulate API call for status update
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Update local state
        const librarian = this.getLibrarianById(id)
        if (librarian) {
          librarian.status = newStatus
          
          // Update selected librarian if it's the same one
          if (this.selectedLibrarian && String(this.selectedLibrarian.id) === String(id)) {
            this.selectedLibrarian.status = newStatus
          }
        }

        return true
      } catch (error) {
        console.error('Error updating librarian status:', error)
        return false
      }
    },

    clearError() {
      this.error = null
    },

    clearSelectedLibrarian() {
      this.selectedLibrarian = null
    },
  },
})