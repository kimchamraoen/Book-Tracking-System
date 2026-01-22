<template>
  <div class="member-page">
    <div class="heading-section">
      <h1>Member Details</h1>
      <button class="back-btn" @click="$router.back()">Back</button>
    </div>

    <div v-if="loading" class="loading-container">
      <p>Loading member details...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="retryFetch" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="!member" class="error-container">
      <p>Member not found</p>
      <button @click="$router.back()" class="back-btn">Go Back</button>
    </div>

    <div v-else class="module-content">
      <div class="module-detail">
        <div class="module-card" style="flex: 1">
          <div class="card-left">
            <img
              :src="member.profileImage || '/src/assets/images/profile-avatar.jpg'"
              alt="Member Profile"
              class="member-profile"
            />
          </div>
          <div class="card-right">
            <div class="member-name">
              <h1 class="title name">{{ member.firstname }} {{ member.lastname }}</h1>
              <h3>
                {{ member.id }} |
                <span style="font-weight: 500; color: gray">{{ member.role }}</span>
              </h3>
              <span :class="['status-chip', statusClass]">
                {{ member.status }}
              </span>
            </div>

            <table class="card-detail-table">
              <tbody>
                <tr>
                  <th><strong>Email:</strong></th>
                  <td>{{ member.email }}</td>
                </tr>
                <tr>
                  <th><strong>Phone:</strong></th>
                  <td>{{ member.phone }}</td>
                </tr>
                <tr>
                  <th><strong>Department:</strong></th>
                  <td>{{ member.department }}</td>
                </tr>
                <tr>
                  <th><strong>Role:</strong></th>
                  <td>{{ member.role }}</td>
                </tr>
                <tr>
                  <th><strong>Join Date:</strong></th>
                  <td>{{ member.joinDate }}</td>
                </tr>
                <tr>
                  <th><strong>Books Issued:</strong></th>
                  <td>{{ member.booksIssued }} / {{ member.maxBooks }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="actions-div">
          <h2 style="margin: 0">Actions</h2>
          <button
            :disabled="buttonStatesDisabled.activate"
            @click="handleAction('Activate')"
            class="action-btn"
          >
            Activate
          </button>
          <button
            :disabled="buttonStatesDisabled.suspend"
            @click="handleAction('Suspend')"
            class="action-btn"
          >
            Suspend
          </button>
          <button
            :disabled="buttonStatesDisabled.expire"
            @click="handleAction('Expire')"
            class="action-btn"
          >
            Expire
          </button>
          <button
            :disabled="buttonStatesDisabled.block"
            @click="handleAction('Block')"
            class="action-btn"
          >
            Block
          </button>
        </div>
      </div>

      <!-- User Activities Section -->
      <div class="section-block">
        <div class="header">
          <h2>User Activities</h2>
          <div class="line"></div>
        </div>

        <div class="activity-carousel">
          <!-- Borrowing Activities -->
          <div class="activity-category">
            <div class="category-header">
              <h3>Recent Borrowings</h3>
            </div>
            <div class="activity-block">
              <MemberActivityBlock
                v-for="(borrowing, index) in memberBorrowings"
                :key="index"
                activity-type="borrowing"
                :activity-data="borrowing"
                :member-name="memberFullName"
                :member-department="member.department"
                :time-recorded="borrowing.timeRecorded"
              />
            </div>
          </div>

          <!-- Reserving Activities -->
          <div class="activity-category">
            <div class="category-header">
              <h3>Recent Reservations</h3>
            </div>
            <div class="activity-block">
              <MemberActivityBlock
                v-for="(reservation, index) in memberReservations"
                :key="index"
                activity-type="reservation"
                :activity-data="reservation"
                :member-name="memberFullName"
                :member-department="member.department"
                :time-recorded="reservation.timeRecorded"
              />
            </div>
          </div>

          <!-- Reading Activities -->
          <div class="activity-category">
            <div class="category-header">
              <h3>Recent Reading Sessions</h3>
            </div>
            <div class="activity-block">
              <MemberActivityBlock
                v-for="(reading, index) in memberReadings"
                :key="index"
                activity-type="reading"
                :activity-data="reading"
                :member-name="memberFullName"
                :member-department="member.department"
                :time-recorded="reading.timeRecorded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMembersStore } from '../../../stores/members.js'
import MemberActivityBlock from './memberActivityBlock.vue'

export default {
  name: 'MemberDetail',
  components: {
    MemberActivityBlock,
  },
  props: ['id'],
  data() {
    return {
      membersStore: useMembersStore(),
    }
  },
  async created() {
    await this.membersStore.fetchMemberById(this.id)
  },
  computed: {
    member() {
      return this.membersStore.selectedMember
    },
    memberFullName() {
      if (!this.member) return ''
      return `${this.member.firstname} ${this.member.lastname}`
    },
    loading() {
      return this.membersStore.loading
    },
    error() {
      return this.membersStore.error
    },
    buttonStatesDisabled() {
      if (!this.member) return {}
      const status = this.member.status?.toLowerCase()
      switch (status) {
        case 'active':
          return {
            activate: true,
            suspend: false,
            expire: false,
            block: false,
          }
        case 'suspended':
          return {
            activate: false,
            suspend: true,
            expire: false,
            block: false,
          }
        case 'expired':
          return {
            activate: false,
            suspend: true,
            expire: true,
            block: false,
          }
        case 'blocked':
          return {
            activate: false,
            suspend: true,
            expire: true,
            block: true,
          }
        default:
          return {
            activate: false,
            suspend: false,
            expire: false,
            block: false,
          }
      }
    },
    statusClass() {
      if (!this.member || !this.member.status) return ''
      const status = this.member.status.toLowerCase()
      switch (status) {
        case 'active':
          return 'status-active'
        case 'suspended':
          return 'status-suspended'
        case 'expired':
          return 'status-expired'
        case 'pending':
          return 'status-pending'
        case 'blocked':
          return 'status-blocked'
        default:
          return ''
      }
    },
    memberBorrowings() {
      // Sample data for member borrowing activities
      return [
        {
          bookTitle: 'Atomic Habits',
          bookAuthor: 'James Clear',
          status: 'Borrowed',
          dueDate: '2025-11-01',
          timeRecorded: '2 days ago',
        },
        {
          bookTitle: 'Clean Code',
          bookAuthor: 'Robert C. Martin',
          status: 'Borrowed',
          dueDate: '2025-10-28',
          timeRecorded: '5 days ago',
        },
        {
          bookTitle: 'JavaScript: The Good Parts',
          bookAuthor: 'Douglas Crockford',
          status: 'Returned',
          dueDate: '2025-10-15',
          timeRecorded: '1 week ago',
        },
      ]
    },
    memberReservations() {
      // Sample data for member reservation activities
      return [
        {
          bookTitle: 'Vue.js in Action',
          bookAuthor: 'Erik Hanchett',
          status: 'Reserved',
          reservationDate: '2025-10-20',
          timeRecorded: '1 day ago',
        },
        {
          bookTitle: 'Design Patterns',
          bookAuthor: 'Gang of Four',
          status: 'Cancelled',
          reservationDate: '2025-10-18',
          timeRecorded: '3 days ago',
        },
      ]
    },
    memberReadings() {
      // Sample data for member reading activities
      return [
        {
          bookTitle: 'Effective JavaScript',
          bookAuthor: 'David Herman',
          tableNumber: 'T-007',
          duration: '2 hours 30 min',
          sessionDate: '2025-10-21',
          timeRecorded: 'Today',
        },
        {
          bookTitle: "You Don't Know JS",
          bookAuthor: 'Kyle Simpson',
          tableNumber: 'T-012',
          duration: '1 hour 45 min',
          sessionDate: '2025-10-19',
          timeRecorded: '2 days ago',
        },
        {
          bookTitle: 'Learning React',
          bookAuthor: 'Alex Banks',
          tableNumber: 'T-005',
          duration: '3 hours 15 min',
          sessionDate: '2025-10-17',
          timeRecorded: '4 days ago',
        },
      ]
    },
  },
  methods: {
    async handleAction(action) {
      if (!this.member) return
      const actionStatusMap = {
        Activate: 'Active',
        Suspend: 'Suspended',
        Expire: 'Expired',
        Block: 'Blocked',
      }
      const newStatus = actionStatusMap[action]
      if (newStatus) {
        const success = await this.membersStore.updateMemberStatus(this.member.id, newStatus)
        if (success) {
          alert(`${action} successful! Member status updated to ${newStatus}.`)
        } else {
          alert(`Failed to ${action.toLowerCase()} member. Please try again.`)
        }
      }
    },
    async retryFetch() {
      this.membersStore.clearError()
      await this.membersStore.fetchMemberById(this.id)
    },
  },
  watch: {
    '$route.params.id': {
      handler: async function (newId, oldId) {
        if (newId !== oldId) {
          this.membersStore.clearError()
          await this.membersStore.fetchMemberById(newId)
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped>
.member-page {
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
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

.member-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.member-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
}

.member-detail-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #808080;
}

.member-detail-table td {
  padding: 10px 16px;
  border: 1px solid #ccc;
  color: #555;
  vertical-align: middle;
}

.member-detail-table th {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  text-align: left;
  padding: 10px 16px;
  color: #333;
  width: 200px;
}

/* User Activities Section */
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
  padding: 20px 30px;
}

.activity-category {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-header {
  padding: 10px 0;
  border-left: 4px solid #243f92;
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

.section-block {
  margin: 0;
}

@media (max-width: 768px) {
  .member-content {
    padding: 0 15px;
    gap: 15px;
  }

  .member-detail {
    flex-direction: column;
  }

  .member-card {
    flex-direction: column;
    gap: 20px;
  }

  .title {
    font-size: 2rem;
  }

  .member-left img.member-profile {
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
}
</style>
