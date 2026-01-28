import { defineStore } from 'pinia'
import { getUsersByRole } from '@/services/user-service.js' // make sure this exists

export const useMembersStore = defineStore('members', {
  state: () => ({
    members: [], // all members fetched
    users: [], // role === 'user'
    others: [], // role !== 'user'
    selectedMember: null,
    loading: false,
    error: null,
  }),

  actions: {
    // Fetch all members from backend
    async fetchMembers() {
      this.loading = true
      this.error = null
      try {
        const allMembers = await getUsersByRole() // fetch everything if backend doesn't filter by role
        this.members = allMembers

        // Split by role
        this.users = allMembers.filter((m) => m.role === 'user')
        this.others = allMembers.filter((m) => m.role !== 'user')

        this.loading = false
      } catch (err) {
        this.error = 'Failed to fetch members. Please try again.'
        this.loading = false
        console.error('Error fetching members:', err)
      }
    },

    // Fetch only users
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        // Backend supports query ?role=user
        this.users = await getUsersByRole('user')
        this.loading = false
      } catch (err) {
        this.error = 'Failed to fetch users. Please try again.'
        this.loading = false
        console.error('Error fetching users:', err)
      }
    },

    // Fetch others (librarian/admin)
    async fetchOthers() {
      this.loading = true
      this.error = null
      try {
        const allMembers = await getUsersByRole() // fetch all
        this.others = allMembers.filter((m) => m.role !== 'user')
        this.loading = false
      } catch (err) {
        this.error = 'Failed to fetch other members. Please try again.'
        this.loading = false
        console.error('Error fetching others:', err)
      }
    },

    async fetchMemberById(id) {
      this.loading = true
      this.error = null
      try {
        const allMembers = this.members.length ? this.members : await getUsersByRole()
        const member = allMembers.find((m) => m.id === String(id))
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
        // call backend API to update status if exists, e.g.
        // await api.patch(`/users/${id}`, { status: newStatus })

        const memberIndex = this.members.findIndex((m) => m.id === String(id))
        if (memberIndex !== -1) {
          this.members[memberIndex].status = newStatus
          if (this.selectedMember && this.selectedMember.id === String(id)) {
            this.selectedMember.status = newStatus
          }
          // Update users / others arrays if needed
          this.users = this.members.filter((m) => m.role === 'user')
          this.others = this.members.filter((m) => m.role !== 'user')
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
