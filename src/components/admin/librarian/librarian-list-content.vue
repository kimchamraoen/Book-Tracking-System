<template>
  <div class="librarian-list-content">
    <div class="list-header">
      <div class="search-section">
        <div class="search-bar">
          <img src="@/assets/icons/search-logo.svg" alt="Search" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search librarians by name, email, or department..."
            class="search-input"
          />
        </div>
      </div>
    </div>

    <div class="librarian-table">
      <div class="table-header">
        <div class="header-cell">Photo</div>
        <div class="header-cell">Name</div>
        <div class="header-cell">Email</div>
        <div class="header-cell">Department</div>
        <div class="header-cell">Role</div>
        <div class="header-cell">Status</div>
        <div class="header-cell">Join Date</div>
        <div class="header-cell">Actions</div>
      </div>

      <div class="table-body">
        <div
          v-for="librarian in filteredLibrarians"
          :key="librarian.id"
          class="table-row"
          @click="goToLibrarianDetail(librarian.id)"
        >
          <div class="table-cell photo-cell">
            <img :src="librarian.avatar" :alt="librarian.firstName" class="librarian-avatar" />
          </div>
          <div class="table-cell name-cell">
            <div class="librarian-name">{{ librarian.firstName }} {{ librarian.lastName }}</div>
            <div class="employee-id">ID: {{ librarian.employeeId }}</div>
          </div>
          <div class="table-cell">{{ librarian.email }}</div>
          <div class="table-cell">{{ librarian.department }}</div>
          <div class="table-cell">{{ librarian.role }}</div>
          <div class="table-cell">
            <span :class="['status-chip', librarian.status.toLowerCase().replace(' ', '-')]">
              {{ librarian.status }}
            </span>
          </div>
          <div class="table-cell">{{ formatDate(librarian.joinDate) }}</div>
          <div class="table-cell actions-cell">
            <button @click.stop="editLibrarian(librarian.id)" class="action-btn edit-btn">
              <img src="@/assets/icons/create-logo.svg" alt="Edit" />
            </button>
            <button @click.stop="viewLibrarian(librarian.id)" class="action-btn view-btn">
              <img src="@/assets/icons/profile-logo.svg" alt="View" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredLibrarians.length === 0" class="no-results">
      <img src="@/assets/icons/search-logo.svg" alt="No results" class="no-results-icon" />
      <h3>No librarians found</h3>
      <p>Try adjusting your search criteria or filters</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibrarianListContent',
  props: {
    sortKey: {
      type: String,
      default: 'None',
    },
    sortOrder: {
      type: String,
      default: 'asc',
    },
    filterValue: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      searchQuery: '',
      librarians: [
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
        },
      ],
    }
  },
  computed: {
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

      // Apply sorting
      if (this.sortKey !== 'None' && !this.filterValue) {
        filtered.sort((a, b) => {
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
              aValue = a.joinDate
              bValue = b.joinDate
              break
            default:
              aValue = `${a.firstName} ${a.lastName}`
              bValue = `${b.firstName} ${b.lastName}`
          }

          if (this.sortOrder === 'asc') {
            return aValue.localeCompare(bValue)
          } else {
            return bValue.localeCompare(aValue)
          }
        })
      }

      return filtered
    },
  },
  methods: {
    goToLibrarianDetail(librarianId) {
      this.$router.push(`/admin/librarians/${librarianId}`)
    },
    editLibrarian(librarianId) {
      // Handle edit action
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
  },
}
</script>

<style scoped>
.librarian-list-content {
  width: 100%;
}

.list-header {
  margin-bottom: 20px;
}

.search-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  opacity: 0.6;
}

.search-input {
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.librarian-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 80px 200px 250px 150px 150px 120px 120px 100px;
  background: linear-gradient(135deg, #007bff, #28a745);
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.header-cell {
  padding: 15px 10px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.header-cell:last-child {
  border-right: none;
}

.table-body {
  max-height: 600px;
  overflow-y: auto;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 200px 250px 150px 150px 120px 120px 100px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #f0f0f0;
}

.table-cell:last-child {
  border-right: none;
}

.photo-cell {
  justify-content: center;
}

.librarian-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e0e0;
}

.name-cell {
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.librarian-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.employee-id {
  font-size: 12px;
  color: #666;
}

.status-chip {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-chip.active {
  background-color: #d4edda;
  color: #155724;
}

.status-chip.part-time {
  background-color: #fff3cd;
  color: #856404;
}

.status-chip.on-leave {
  background-color: #f8d7da;
  color: #721c24;
}

.status-chip.training {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-chip.inactive {
  background-color: #f6f6f6;
  color: #6c757d;
}

.actions-cell {
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.edit-btn {
  background-color: #ffc107;
  color: white;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.view-btn {
  background-color: #17a2b8;
  color: white;
}

.view-btn:hover {
  background-color: #138496;
}

.action-btn img {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.no-results-icon {
  width: 64px;
  height: 64px;
  opacity: 0.3;
  margin-bottom: 20px;
}

.no-results h3 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  color: #333;
}

.no-results p {
  margin: 0;
  font-size: 1rem;
}

/* Responsive design */
@media (max-width: 1200px) {
  .table-header,
  .table-row {
    grid-template-columns: 60px 180px 200px 120px 120px 100px 100px 80px;
  }
}

@media (max-width: 768px) {
  .librarian-table {
    display: block;
  }

  .table-header {
    display: none;
  }

  .table-row {
    display: block;
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
  }

  .table-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border: none;
    text-align: left;
  }

  .table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: #333;
    min-width: 120px;
  }

  .photo-cell {
    justify-content: flex-start;
  }

  .name-cell {
    align-items: flex-end;
  }

  .actions-cell {
    justify-content: flex-end;
  }
}
</style>
