<template>
  <div class="librarian-page">
    <div class="heading-section">
      <h1>Librarian Details</h1>
      <button class="back-btn" @click="$router.back()">Back</button>
    </div>

    <div v-if="loading" class="loading-container">
      <p>Loading librarian details...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="retryFetch" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="!librarian" class="error-container">
      <p>Librarian not found</p>
      <button @click="$router.back()" class="back-btn">Go Back</button>
    </div>

    <div v-else class="librarian-content">
      <!-- Librarian Details and Actions Row -->
      <div class="librarian-detail">
        <div class="librarian-card" style="flex: 1">
          <div class="librarian-left">
            <img
              :src="librarian.avatar || '/src/assets/images/profile-avatar.jpg'"
              alt="Librarian Profile"
              class="librarian-profile"
            />
          </div>
          <div class="librarian-right">
            <div class="librarian-name">
              <h1 class="name">{{ librarian.firstName }} {{ librarian.lastName }}</h1>
              <h3>
                {{ librarian.employeeId }} |
                <span style="font-weight: 500; color: gray">{{ librarian.role }}</span>
              </h3>
              <span :class="['status-chip', statusClass]">
                {{ librarian.status }}
              </span>
            </div>

            <table class="librarian-detail-table">
              <tbody>
                <tr>
                  <th><strong>Email:</strong></th>
                  <td>{{ librarian.email }}</td>
                </tr>
                <tr>
                  <th><strong>Department:</strong></th>
                  <td>{{ librarian.department }}</td>
                </tr>
                <tr>
                  <th><strong>Role:</strong></th>
                  <td>{{ librarian.role }}</td>
                </tr>
                <tr>
                  <th><strong>Join Date:</strong></th>
                  <td>{{ formatDate(librarian.joinDate) }}</td>
                </tr>
                <tr>
                  <th><strong>Experience:</strong></th>
                  <td>{{ getExperienceRange(librarian.joinDate) }}</td>
                </tr>
                <tr>
                  <th><strong>Assigned Sections:</strong></th>
                  <td>{{ librarian.assignedSections || 'Not assigned' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="librarian-card actions-div">
          <h2 style="margin: 0">Actions</h2>
          <button
            :disabled="buttonStatesDisabled.activate"
            @click="handleAction('Activate')"
            class="action-btn"
          >
            Activate
          </button>
          <button
            :disabled="buttonStatesDisabled.partTime"
            @click="handleAction('Part-time')"
            class="action-btn"
          >
            Part-time
          </button>
          <button
            :disabled="buttonStatesDisabled.onLeave"
            @click="handleAction('On Leave')"
            class="action-btn"
          >
            On Leave
          </button>
          <button
            :disabled="buttonStatesDisabled.inactive"
            @click="handleAction('Inactive')"
            class="action-btn"
          >
            Deactivate
          </button>
        </div>
      </div>

      <!-- Work Activities Section -->
      <div class="section-block">
        <div class="header">
          <h2>Work Activities</h2>
          <div class="line"></div>
        </div>

        <div class="activity-carousel">
          <!-- Book Management Activities -->
          <div class="activity-category">
            <div class="category-header">
              <h3>Recent Book Management</h3>
            </div>
            <div class="activity-block">
              <LibrarianActivityBlock
                v-for="(activity, index) in bookManagementActivities"
                :key="index"
                activity-type="book-management"
                :activity-data="activity"
                :librarian-name="librarianFullName"
                :librarian-department="librarian.department"
                :time-recorded="activity.timeRecorded"
              />
            </div>
          </div>

          <!-- Member Assistance Activities -->
          <div class="activity-category">
            <div class="category-header">
              <h3>Recent Member Management</h3>
            </div>
            <div class="activity-block">
              <LibrarianActivityBlock
                v-for="(activity, index) in memberAssistanceActivities"
                :key="index"
                activity-type="member-assistance"
                :activity-data="activity"
                :librarian-name="librarianFullName"
                :librarian-department="librarian.department"
                :time-recorded="activity.timeRecorded"
              />
            </div>
          </div>

          <!-- System Activities -->
          <div class="activity-category">
            <div class="category-header">
              <h3>Recent Borrowing Processing</h3>
            </div>
            <div class="activity-block">
              <LibrarianActivityBlock
                v-for="(activity, index) in systemActivities"
                :key="index"
                activity-type="system"
                :activity-data="activity"
                :librarian-name="librarianFullName"
                :librarian-department="librarian.department"
                :time-recorded="activity.timeRecorded"
              />
            </div>
          </div>
          <div class="activity-category">
            <div class="category-header">
              <h3>Recent Reserving Processing</h3>
            </div>
            <div class="activity-block">
              <LibrarianActivityBlock
                v-for="(activity, index) in systemActivities"
                :key="index"
                activity-type="system"
                :activity-data="activity"
                :librarian-name="librarianFullName"
                :librarian-department="librarian.department"
                :time-recorded="activity.timeRecorded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLibrariansStore } from '../../../stores/librarians.js'
import LibrarianActivityBlock from './librarianActivityBlock.vue'

export default {
  name: 'LibrarianDetail',
  components: {
    LibrarianActivityBlock,
  },
  props: ['id'],
  data() {
    return {
      librariansStore: useLibrariansStore(),
    }
  },
  async created() {
    await this.librariansStore.fetchLibrarianById(this.id)
  },
  computed: {
    librarian() {
      return this.librariansStore.selectedLibrarian
    },
    librarianFullName() {
      if (!this.librarian) return ''
      return `${this.librarian.firstName} ${this.librarian.lastName}`
    },
    loading() {
      return this.librariansStore.loading
    },
    error() {
      return this.librariansStore.error
    },
    buttonStatesDisabled() {
      if (!this.librarian) return {}
      const status = this.librarian.status?.toLowerCase().replace(' ', '-')
      switch (status) {
        case 'active':
          return {
            activate: true,
            partTime: false,
            onLeave: false,
            inactive: false,
          }
        case 'part-time':
          return {
            activate: false,
            partTime: true,
            onLeave: false,
            inactive: false,
          }
        case 'on-leave':
          return {
            activate: false,
            partTime: false,
            onLeave: true,
            inactive: false,
          }
        case 'inactive':
          return {
            activate: false,
            partTime: false,
            onLeave: false,
            inactive: true,
          }
        default:
          return {
            activate: false,
            partTime: false,
            onLeave: false,
            inactive: false,
          }
      }
    },
    statusClass() {
      if (!this.librarian || !this.librarian.status) return ''
      const status = this.librarian.status.toLowerCase().replace(' ', '-')
      switch (status) {
        case 'active':
          return 'active'
        case 'part-time':
          return 'part-time'
        case 'on-leave':
          return 'on-leave'
        case 'training':
          return 'training'
        case 'inactive':
          return 'inactive'
        default:
          return ''
      }
    },
    bookManagementActivities() {
      // Sample data for book management activities
      return [
        {
          action: 'Book Added',
          bookTitle: 'JavaScript: The Definitive Guide',
          bookAuthor: 'David Flanagan',
          details: 'Added to Programming section',
          timeRecorded: '2 hours ago',
        },
        {
          action: 'Book Updated',
          bookTitle: 'Clean Architecture',
          bookAuthor: 'Robert C. Martin',
          details: 'Updated availability status',
          timeRecorded: '5 hours ago',
        },
        {
          action: 'Book Cataloged',
          bookTitle: 'Design Patterns',
          bookAuthor: 'Gang of Four',
          details: 'Completed cataloging process',
          timeRecorded: '1 day ago',
        },
      ]
    },
    memberAssistanceActivities() {
      // Sample data for member assistance activities
      return [
        {
          action: 'Member Registration',
          memberName: 'John Smith',
          memberId: 'M2025001',
          details: 'Completed new member setup',
          timeRecorded: '3 hours ago',
        },
        {
          action: 'Book Recommendation',
          memberName: 'Sarah Johnson',
          memberId: 'M2024587',
          details: 'Recommended programming books',
          timeRecorded: '6 hours ago',
        },
        {
          action: 'Issue Resolution',
          memberName: 'Mike Wilson',
          memberId: 'M2024123',
          details: 'Resolved account access issue',
          timeRecorded: '1 day ago',
        },
      ]
    },
    systemActivities() {
      // Sample data for system activities
      return [
        {
          action: 'Report Generated',
          reportType: 'Monthly Circulation Report',
          details: 'Generated October 2025 report',
          timeRecorded: '4 hours ago',
        },
        {
          action: 'Inventory Check',
          section: 'Reference Section',
          details: 'Completed quarterly inventory',
          timeRecorded: '2 days ago',
        },
        {
          action: 'System Backup',
          system: 'Member Database',
          details: 'Weekly backup completed',
          timeRecorded: '3 days ago',
        },
      ]
    },
  },
  methods: {
    async handleAction(action) {
      if (!this.librarian) return

      const actionStatusMap = {
        Activate: 'Active',
        'Part-time': 'Part-time',
        'On Leave': 'On Leave',
        Inactive: 'Inactive',
      }

      const newStatus = actionStatusMap[action]
      if (newStatus) {
        const success = await this.librariansStore.updateLibrarianStatus(
          this.librarian.id,
          newStatus,
        )
        if (success) {
          alert(`${action} successful! Librarian status updated to ${newStatus}.`)
        } else {
          alert(`Failed to ${action.toLowerCase()} librarian. Please try again.`)
        }
      }
    },
    async retryFetch() {
      this.librariansStore.clearError()
      await this.librariansStore.fetchLibrarianById(this.id)
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
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
  watch: {
    '$route.params.id': {
      handler: async function (newId, oldId) {
        if (newId !== oldId) {
          this.librariansStore.clearError()
          await this.librariansStore.fetchLibrarianById(newId)
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped>
.librarian-page {
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.heading-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
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

.librarian-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
}

.librarian-detail {
  display: flex;
  gap: 20px;
}

.librarian-card {
  display: flex;
  border-radius: 16px;
  padding: 40px;
  gap: 50px;
  box-sizing: border-box;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.actions-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  padding: 30px 40px;
  min-width: 200px;
}

.librarian-left img.librarian-profile {
  width: 200px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.librarian-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.librarian-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
}

.librarian-detail-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #808080;
}

.librarian-detail-table td {
  padding: 10px 16px;
  border: 1px solid #ccc;
  color: #555;
  vertical-align: middle;
}

.librarian-detail-table th {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  text-align: left;
  padding: 10px 16px;
  color: #333;
  width: 200px;
}

/* Work Activities Section */
.section-block {
  margin: 20px 0;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.activity-carousel {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px 40px;
}

.activity-category {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-header {
  padding: 10px 0;
  border-left: 4px solid #8ecae6;
  padding-left: 15px;
}

.category-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #444;
}

.activity-block {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px 0;
  scroll-behavior: smooth;
}

.activity-block::-webkit-scrollbar {
  height: 8px;
}

.activity-block::-webkit-scrollbar-thumb {
  background-color: #8ecae6;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.activity-block::-webkit-scrollbar-thumb:hover {
  background-color: #6bb8d8;
}

.activity-block::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 4px;
  margin: 0 10px;
}

@media (max-width: 768px) {
  .librarian-content {
    padding: 0 15px;
    gap: 15px;
  }

  .librarian-detail {
    flex-direction: column;
  }

  .librarian-card {
    flex-direction: column;
    gap: 20px;
  }

  .title {
    font-size: 2rem;
  }

  .librarian-left img.librarian-profile {
    width: 150px;
    height: 180px;
    align-self: center;
  }

  .actions-div {
    padding: 20px;
    min-width: auto;
  }

  .action-btn {
    width: 120px;
    font-size: 14px;
  }

  .section-block {
    margin: 15px 0;
  }

  .header {
    padding: 15px 20px;
  }

  .header h2 {
    font-size: 1.5rem;
  }

  .activity-carousel {
    padding: 15px 20px;
    gap: 20px;
  }

  .activity-block {
    gap: 12px;
  }

  .circulation-block {
    width: 250px;
    min-width: 250px;
    max-width: 250px;
  }
}
</style>
