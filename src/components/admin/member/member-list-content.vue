<template>
  <div class="table-list-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Profile</th>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="9" class="table-loading">Loading members...</td>
        </tr>
        <tr v-else-if="error">
          <td colspan="9" class="table-error">
            {{ error }}
            <button @click="membersStore.fetchMembers()" class="retry-btn">Retry</button>
          </td>
        </tr>
        <tr
          v-else
          v-for="member in sortedMembers"
          :key="member.id"
          @click="goToMemberDetail(member)"
        >
          <td>
            <img :src="member.profileImage" alt="Member Profile" class="table-image" />
          </td>
          <td class="truncate-sm">{{ member.id }}</td>
          <td class="truncate">{{ member.firstname }}</td>
          <td class="truncate">{{ member.lastname }}</td>
          <td class="truncate">{{ member.email }}</td>
          <td class="truncate">{{ member.phone }}</td>
          <td class="truncate">{{ member.department }}</td>
          <td class="truncate">{{ member.role }}</td>
          <td>
            <span :class="['status-chip', statusClass(member.status)]">
              {{ member.status }}
            </span>
          </td>
          <td class="actions-cell">
            <div>
              <button
                @click.stop="viewMember(member.id)"
                class="action-buttons btn-view"
                title="View Details"
              >
                View
              </button>
              <button
                @click.stop="editMember(member.id)"
                class="action-buttons btn-edit"
                title="Edit"
              >
                Edit
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="!loading && !error && sortedMembers.length === 0">
          <td colspan="9" class="table-empty">No members found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { useMembersStore } from '../../../stores/members.js'

export default {
  name: 'MemberListContent',
  props: ['sortKey', 'sortOrder', 'filterValue', 'searchQuery'],
  data() {
    return {
      membersStore: useMembersStore(),
    }
  },
  async mounted() {
    // Fetch members when component mounts
    if (this.membersStore.members.length === 0) {
      await this.membersStore.fetchMembers()
    }
  },
  methods: {
    goToMemberDetail(member) {
      this.$router.push({ name: 'MemberDetails', params: { id: String(member.id) } })
    },
    statusClass(status) {
      const map = {
        Active: 'status-active',
        Inactive: 'status-inactive',
        Suspended: 'status-blocked',
        Expired: 'status-expired',
        Pending: 'status-pending',
        Blocked: 'status-blocked',
      }
      return map[status] || 'status-default'
    },
    viewMember(memberId) {
      this.$router.push({ name: 'MemberDetails', params: { id: String(memberId) } })
    },
    editMember(memberId) {
      this.$router.push({ name: 'EditMember', params: { id: String(memberId) } })
    },
  },
  computed: {
    members() {
      return this.membersStore.members
    },
    loading() {
      return this.membersStore.loading
    },
    error() {
      return this.membersStore.error
    },
    sortedMembers() {
      let result = [...this.members]

      // 1. Apply search filter first
      if (this.searchQuery && this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim()
        result = result.filter(
          (member) =>
            member.firstname.toLowerCase().includes(query) ||
            member.lastname.toLowerCase().includes(query) ||
            member.email.toLowerCase().includes(query) ||
            member.phone.toLowerCase().includes(query) ||
            member.department.toLowerCase().includes(query) ||
            member.role.toLowerCase().includes(query) ||
            String(member.id).toLowerCase().includes(query),
        )
      }

      // 2. Filter by value (e.g. only show "Computer Science" department)
      if (this.filterValue) {
        result = result.filter(
          (member) => String(member[this.sortKey]).toLowerCase() === this.filterValue.toLowerCase(),
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
/* All table styles are now in centralized table.css */
</style>
