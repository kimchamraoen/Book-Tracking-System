import { defineStore } from 'pinia'

export const useMembersStore = defineStore('members', {
  state: () => ({
    members: [],
    selectedMember: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMembers() {
      this.loading = true
      this.error = null
      try {
        // Simulate API call - replace with real API endpoint
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample member data
        this.members = [
          {
            id: 'e20210944',
            profileImage: '/src/assets/images/profile-avatar.jpg',
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1-234-567-8901',
            role: 'Student',
            department: 'Computer Science',
            status: 'Active',
            joinDate: '2023-01-15',
            booksIssued: 3,
            maxBooks: 5,
          },
          {
            id: 'p20210876',
            profileImage: '/src/assets/images/profile-avatar.jpg',
            firstname: 'Jane',
            lastname: 'Smith',
            email: 'jane.smith@example.com',
            phone: '+1-234-567-8902',
            role: 'Professor',
            department: 'Literature',
            status: 'Active',
            joinDate: '2023-02-20',
            booksIssued: 1,
            maxBooks: 3,
          },
          {
            id: 'e20211022',
            profileImage: '/src/assets/images/profile-avatar.jpg',
            firstname: 'Mike',
            lastname: 'Johnson',
            email: 'mike.johnson@example.com',
            phone: '+1-234-567-8903',
            role: 'Student',
            department: 'Mathematics',
            status: 'Suspended',
            joinDate: '2022-11-10',
            booksIssued: 0,
            maxBooks: 5,
          },
          {
            id: 'e20211023',
            profileImage: '/src/assets/images/profile-avatar.jpg',
            firstname: 'Sarah',
            lastname: 'Wilson',
            email: 'sarah.wilson@example.com',
            phone: '+1-234-567-8904',
            role: 'Student',
            department: 'Physics',
            status: 'Active',
            joinDate: '2023-03-05',
            booksIssued: 2,
            maxBooks: 2,
          },
          {
            id: 'p20210789',
            profileImage: '/src/assets/images/profile-avatar.jpg',
            firstname: 'David',
            lastname: 'Brown',
            email: 'david.brown@example.com',
            phone: '+1-234-567-8905',
            role: 'Professor',
            department: 'Engineering',
            status: 'Active',
            joinDate: '2020-08-12',
            booksIssued: 4,
            maxBooks: 10,
          },
          {
            id: 'e20211024',
            profileImage: '/src/assets/images/profile-avatar.jpg',
            firstname: 'Emily',
            lastname: 'Davis',
            email: 'emily.davis@example.com',
            phone: '+1-234-567-8906',
            role: 'Professor',
            department: 'Biology',
            status: 'Expired',
            joinDate: '2022-05-18',
            booksIssued: 1,
            maxBooks: 3,
          },
        ]
        this.loading = false
      } catch (err) {
        this.error = 'Failed to fetch members. Please try again.'
        this.loading = false
        console.error('Error fetching members:', err)
      }
    },

    async fetchMemberById(id) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const member = this.members.find((m) => m.id === String(id))
        if (member) {
          this.selectedMember = member
        } else {
          this.error = 'Member not found'
        }
        this.loading = false
      } catch (err) {
        this.error = 'Failed to fetch member details. Please try again.'
        this.loading = false
        console.error('Error fetching member:', err)
      }
    },

    async updateMemberStatus(id, newStatus) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const memberIndex = this.members.findIndex((m) => m.id === String(id))
        if (memberIndex !== -1) {
          this.members[memberIndex].status = newStatus
          if (this.selectedMember && this.selectedMember.id === String(id)) {
            this.selectedMember.status = newStatus
          }
          return true
        }
        return false
      } catch (err) {
        this.error = 'Failed to update member status. Please try again.'
        console.error('Error updating member status:', err)
        return false
      }
    },

    clearError() {
      this.error = null
    },
  },
})
