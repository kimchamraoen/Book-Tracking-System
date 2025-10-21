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

    <div v-else class="member-content">
      <!-- Member Details and Actions Row -->
      <div class="member-detail">
        <div class="member-card" style="flex: 1">
          <div class="member-left">
            <img
              :src="member.profileImage || '/src/assets/images/profile-avatar.jpg'"
              alt="Member Profile"
              class="member-profile"
            />
          </div>
          <div class="member-right">
            <div class="member-name">
              <h1 class="title">{{ member.firstname }} {{ member.lastname }}</h1>
              <h3>{{ member.id }}</h3>
              <span :class="['status-chip', statusClass]">
                {{ member.status }}
              </span>
            </div>

            <table class="member-detail-table">
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

        <div class="member-card actions-div">
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

.retry-btn,
.back-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #c8efff;
  border: 1px solid #c1c1c1;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
}

.retry-btn:hover,
.back-btn:hover {
  background-color: deepskyblue;
}

.member-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
}

.member-detail {
  display: flex;
  gap: 20px;
}

.member-card {
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

.action-btn {
  width: 150px;
  font-size: 16px;
  padding: 10px 16px;
  border: none;
  background-color: #c8efff;
  border-radius: 6px;
  border: 1px solid #c1c1c1;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.action-btn:hover:not(:disabled) {
  background-color: deepskyblue;
  transform: translateY(-2px);
}

.action-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
  opacity: 0.6;
}

.member-left img.member-profile {
  width: 200px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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

.status-chip {
  width: fit-content;
  display: inline-block;
  padding: 6px 14px;
  margin-top: 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

.status-active {
  background-color: #e7f8ef;
  color: #1b7c2f;
  border: 1px solid #1b7c2f;
}

.status-suspended {
  background-color: #fff6e0;
  color: #b97a00;
  border: 1px solid #b97a00;
}

.status-expired {
  background-color: #fdeaea;
  color: #c62828;
  border: 1px solid #c62828;
}

.status-pending {
  background-color: #e0e9ff;
  color: #0044b9;
  border: 1px solid #0044b9;
}

.status-blocked {
  background-color: #f3e5f5;
  color: #7b1fa2;
  border: 1px solid #7b1fa2;
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

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.header h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}

.line {
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, #8ecae6, #a3cef1);
  margin-left: 20px;
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
  padding: 10px 0;
}

.activity-block::-webkit-scrollbar {
  height: 6px;
}

.activity-block::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.activity-block::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 3px;
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
}
</style>
