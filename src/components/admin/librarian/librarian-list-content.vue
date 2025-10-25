<template>
  <div class="table-list-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name & ID</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Role</th>
          <th>Join Date</th>
          <th>Experience</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="10" class="table-loading">Loading librarians...</td>
        </tr>
        <tr v-else-if="error">
          <td colspan="10" class="table-error">
            {{ error }}
            <button @click="librariansStore.fetchLibrarians()" class="retry-btn">Retry</button>
          </td>
        </tr>
        <tr
          v-else
          v-for="librarian in sortedLibrarians"
          :key="librarian.id"
          @click="goToLibrarianDetail(librarian.id)"
        >
          <td>
            <img
              :src="librarian.profileImage || '/src/assets/images/profile-avatar.jpg'"
              alt="Librarian Profile"
              class="table-avatar"
            />
          </td>
          <td class="name-cell">
            <span class="table-name">{{ librarian.firstName }} {{ librarian.lastName }}</span>
            <span class="table-id">{{ librarian.employeeId }}</span>
          </td>
          <td class="truncate">{{ librarian.email }}</td>
          <td class="truncate-sm">{{ librarian.phone }}</td>
          <td class="truncate">{{ librarian.department }}</td>
          <td class="truncate">{{ librarian.role }}</td>
          <td class="truncate-sm">{{ formatDate(librarian.joinDate) }}</td>
          <td class="truncate-sm">{{ getExperienceRange(librarian.joinDate) }}</td>
          <td>
            <span :class="['status-chip', statusClass(librarian.status)]">
              {{ librarian.status }}
            </span>
          </td>
          <td class="actions-cell">
            <div>
              <button
                @click.stop="viewLibrarian(librarian.id)"
                class="action-buttons btn-view"
                title="View Details"
              >
                View
              </button>
              <button
                @click.stop="editLibrarian(librarian.id)"
                class="action-buttons btn-edit"
                title="Edit"
              >
                Edit
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="!loading && !error && sortedLibrarians.length === 0">
          <td colspan="10" class="table-empty">No librarians found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLibrariansStore } from '../../../stores/librarians.js'

export default {
  name: 'LibrarianListContent',
  props: ['sortKey', 'sortOrder', 'filterValue', 'searchQuery'],
  data() {
    return {
      librariansStore: useLibrariansStore(),
    }
  },
  computed: {
    librarians() {
      return this.librariansStore.librarians
    },
    loading() {
      return this.librariansStore.loading
    },
    error() {
      return this.librariansStore.error
    },
    filteredLibrarians() {
      let filtered = [...this.librarians]

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (librarian) =>
            librarian.firstName.toLowerCase().includes(query) ||
            librarian.lastName.toLowerCase().includes(query) ||
            librarian.email.toLowerCase().includes(query) ||
            librarian.department.toLowerCase().includes(query) ||
            librarian.role.toLowerCase().includes(query) ||
            librarian.employeeId.toLowerCase().includes(query),
        )
      }

      // Apply facet filter
      if (this.filterValue && this.sortKey !== 'None') {
        filtered = filtered.filter((librarian) => {
          switch (this.sortKey) {
            case 'department':
              return librarian.department === this.filterValue
            case 'role':
              return librarian.role === this.filterValue
            case 'status':
              return librarian.status === this.filterValue
            case 'experience':
              return this.getExperienceRange(librarian.joinDate) === this.filterValue
            default:
              return true
          }
        })
      }

      return filtered
    },
    sortedLibrarians() {
      const sorted = [...this.filteredLibrarians]

      if (this.sortKey && this.sortKey !== 'None') {
        sorted.sort((a, b) => {
          let aValue, bValue

          switch (this.sortKey) {
            case 'department':
              aValue = a.department
              bValue = b.department
              break
            case 'role':
              aValue = a.role
              bValue = b.role
              break
            case 'status':
              aValue = a.status
              bValue = b.status
              break
            case 'experience':
              aValue = this.getExperienceRange(a.joinDate)
              bValue = this.getExperienceRange(b.joinDate)
              break
            default:
              aValue = `${a.firstName} ${a.lastName}`
              bValue = `${b.firstName} ${b.lastName}`
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
    goToLibrarianDetail(librarianId) {
      this.$router.push({ name: 'LibrarianDetails', params: { id: String(librarianId) } })
    },
    editLibrarian(librarianId) {
      console.log('Edit librarian:', librarianId)
    },
    viewLibrarian(librarianId) {
      this.goToLibrarianDetail(librarianId)
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
    getExperienceRange(joinDate) {
      const years = new Date().getFullYear() - new Date(joinDate).getFullYear()
      if (years <= 2) return '0-2 years'
      if (years <= 5) return '3-5 years'
      if (years <= 10) return '6-10 years'
      if (years <= 15) return '11-15 years'
      return '15+ years'
    },
    statusClass(status) {
      const statusMap = {
        Active: 'status-active',
        Inactive: 'status-inactive',
        'On Leave': 'status-pending',
        'Part-time': 'status-extended',
        Training: 'status-renewed',
      }
      return statusMap[status] || 'status-default'
    },
  },
  mounted() {
    this.librariansStore.fetchLibrarians()
  },
}
</script>

<style scoped>
/* All table styles are now in centralized table.css */
</style>
