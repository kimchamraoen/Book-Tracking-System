<template>
  <div class="content-dashboard">
    <div class="heading-section">
      <h1>Welcome to Library of ITC</h1>
      <div class="heading-buttons">
        <div class="drop-down hover-open" @mouseleave="isDropdownOpen = false">
          <button class="btn btn1">
            <img src="@/assets/icons/create-logo.svg" alt="" />Create
          </button>
          <div class="drop-down-content">
            <a href="#">New Book</a>
            <a href="#">New Member</a>
            <a href="#">New Staff</a>
          </div>
        </div>
        <div class="drop-down hover-open" @mouseleave="isDropdownOpen = false">
          <button class="btn btn2">
            <img src="@/assets/icons/control-logo.svg" alt="" />Control
          </button>
          <div class="drop-down-content">
            <a href="#">Borrow</a>
            <a href="#">Return</a>
            <a href="#">Reserve</a>
            <a href="#">Read</a>
          </div>
        </div>
      </div>
    </div>
    <div class="section-block">
      <div class="header">
        <h2>Overview</h2>
        <div class="line"></div>
      </div>
      <div class="each-block">
        <dashboardInfoBlock
          v-for="(overall, index) in overviews"
          :key="index"
          :title="overall.title"
          :count="overall.count"
          :image="overall.image"
          :blockColor="overall.blockColor"
          :description1="overall.description1"
          :description2="overall.description2"
          :description3="overall.description3"
        />
      </div>
    </div>
    <div class="section-block">
      <div class="header">
        <h2>Today Summary</h2>
        <div class="line"></div>
      </div>
      <div class="each-block">
        <dashboardInfoBlock
          v-for="(today, index) in summary"
          :key="index"
          :title="today.title"
          :count="today.count"
          :image="today.image"
          :blockColor="today.blockColor"
          :description1="today.description1"
          :description2="today.description2"
          :description3="today.description3"
        />
      </div>
    </div>
    <div class="section-block">
      <div class="header">
        <h2>Recent Activities</h2>
        <div class="line"></div>
      </div>
      <div class="activity-carousel">
        <div class="activity-block">
          <div class="category-header">
            <h3>Recent Reading Sessions</h3>
          </div>
          <div class="activity-lists">
            <DashboardCirculationActivityBlock
              v-for="(Borrowings, index) in Borrowings"
              :key="index"
              :title_activity="'Borrowing'"
              :title_color="' #243f92'"
              :username="Borrowings.username"
              :yearGroup="Borrowings.yearGroup"
              :activity="Borrowings.activity"
              :timeRecorded="Borrowings.timeRecorded"
            />
          </div>
        </div>
        <div class="activity-block">
          <div class="category-header">
            <h3>Recent Reading Sessions</h3>
          </div>

          <div class="activity-lists">
            <DashboardCirculationActivityBlock
              v-for="(Returnings, index) in Returnings"
              :key="index"
              :title_activity="'Returning'"
              :title_color="'  #243f92'"
              :username="Returnings.username"
              :yearGroup="Returnings.yearGroup"
              :activity="Returnings.activity"
              :timeRecorded="Returnings.timeRecorded"
            />
          </div>
        </div>
        <div class="activity-block">
          <div class="category-header">
            <h3>Recent Reading Sessions</h3>
          </div>

          <div class="activity-lists">
            <DashboardCirculationActivityBlock
              v-for="(Reservings, index) in Reservings"
              :key="index"
              :title_activity="'Reserving'"
              :title_color="' #243f92'"
              :username="Reservings.username"
              :yearGroup="Reservings.yearGroup"
              :activity="Reservings.activity"
              :timeRecorded="Reservings.timeRecorded"
            />
          </div>
        </div>
        <div class="activity-block">
          <div class="category-header">
            <h3>Recent Reading Sessions</h3>
          </div>
          <div class="activity-lists">
            <DashboardReadingActivityBlock
              v-for="(Reading, index) in Readings"
              :key="index"
              :username="Reading.username"
              :yearGroup="Reading.yearGroup"
              :tableNumber="Reading.tableNumber"
              :timeRecorded="Reading.timeRecorded"
              title-color="#243f92"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashboardInfoBlock from './dashboard-infoBlock.vue'

import bookstackImage from '@/assets/images/book-stack.png'
import bookCategoryImage from '@/assets/images/book-category.png'
import seatImage from '@/assets/images/seat-library.png'
import memberImage from '@/assets/images/member-group.png'
import staffImage from '@/assets/images/staff-library.png'

import DashboardCirculationActivityBlock from '@/components/admin/dashboard/dashboard-circulation-activity-block.vue'
import DashboardReadingActivityBlock from '@/components/admin/dashboard/dashboard-reading-activity-block.vue'
import { getBooks } from '@/services/book-service'
import { getAllLocations } from '@/services/location-service'
import { getAllUsers } from '@/services/user-service'
import { getAllHistory } from '@/services/history-service'

export default {
  name: 'ContentDashboard',
  components: {
    dashboardInfoBlock,
    DashboardCirculationActivityBlock,
    DashboardReadingActivityBlock,
  },
  data() {
    return {
      overviews: [
        {
          title: 'Total Books',
          count: 0,
          image: bookstackImage,
          blockColor: '#09408f',
          description1: 'Loading...',
          description2: '',
          description3: '',
        },
        {
          title: 'Total Shelves',
          count: 0,
          image: bookstackImage,
          blockColor: '#09408f',
        },
        {
          title: 'Total Tables',
          count: 0,
          image: seatImage,
          blockColor: '#09408f',
          description1: 'Loading...',
          description2: '',
          description3: '',
        },
        {
          title: 'Total Members',
          count: 0,
          image: memberImage,
          blockColor: '#09408f',
          description1: 'Loading...',
          description2: '',
          description3: '',
        },
        {
          title: 'Total Staff',
          count: 0,
          image: staffImage,
          blockColor: '#09408f',
          description1: 'Loading...',
          description2: '',
          description3: '',
        },
      ],
      summary: [
        {
          title: 'Registrations',
          count: 0,
          image: bookstackImage,
          blockColor: '#09408f',
        },
        {
          title: 'Admin Activities',
          count: 0,
          image: bookstackImage,
          blockColor: '#09408f',
          description1: 'Loading...',
          description2: '',
          description3: '',
        },
        {
          title: 'Reading Activities',
          count: 0,
          image: bookstackImage,
          blockColor: '#09408f',
          description1: 'Loading...',
          description2: '',
          description3: '',
        },
        {
          title: 'Borrowings Activities',
          count: 0,
          image: staffImage,
          blockColor: '#09408f',
        },
        {
          title: 'Returnings Activities',
          count: 0,
          image: seatImage,
          blockColor: '#09408f',
        },
      ],
      Borrowings: [
        {
          username: 'John Doe',
          yearGroup: 'I4-GIC-A',
          activity: 'Borrowed',
          timeRecorded: '12:00:00 PM',
        },
      ],
      Returnings: [
        {
          username: 'John Doe',
          yearGroup: 'I4-GIC-A',
          activity: 'Returned',
          timeRecorded: '12:00:00 PM',
        },
      ],
      Reservings: [
        {
          username: 'John Doe',
          yearGroup: 'I4-GIC-A',
          activity: 'Reserved',
          timeRecorded: '12:00:00 PM',
        },
      ],
      Readings: [
        {
          username: 'John Doe',
          yearGroup: 'I4-GIC-A',
          tableNumber: 'T-001',
          timeRecorded: '12:00:00 PM',
        },
      ],
    }
  },
  async mounted() {
    await this.fetchDashboardData()
  },
  methods: {
    isToday(dateString) {
      if (!dateString) return false
      const today = new Date()
      const itemDate = new Date(dateString)

      return (
        today.getFullYear() === itemDate.getFullYear() &&
        today.getMonth() === itemDate.getMonth() &&
        today.getDate() === itemDate.getDate()
      )
    },
    async fetchDashboardData() {
      try {
        const [books, locations, allUsers, allHistory] = await Promise.all([
          getBooks(),
          getAllLocations(),
          getAllUsers(),
          getAllHistory(),
        ])

        // --- 1. OVERVIEW BLOCKS ---

        // Update Books
        if (books && Array.isArray(books)) {
          const bookBlock = this.overviews.find((b) => b.title === 'Total Books')
          if (bookBlock) {
            bookBlock.count = books.length
            bookBlock.description1 = `${books.filter((b) => b.status?.toLowerCase() === 'available').length} Available`
            bookBlock.description2 = `${books.filter((b) => b.status?.toLowerCase() === 'borrowed').length} Borrowed`
            bookBlock.description3 = `${books.filter((b) => b.status?.toLowerCase() === 'reading').length} Reading`
          }
        }

        // Update Shelves
        if (locations && Array.isArray(locations)) {
          const shelfBlock = this.overviews.find((b) => b.title === 'Total Shelves')
          if (shelfBlock) {
            // We filter for "shelf" within all locations
            const shelves = locations.filter((loc) => loc.name?.toLowerCase().includes('shelf'))
            shelfBlock.count = shelves.length
          }
        }

        if (locations && Array.isArray(locations) && books && Array.isArray(books)) {
          const tableBlock = this.overviews.find((b) => b.title === 'Total Tables')
          if (tableBlock) {
            // Find all location objects that are actually tables
            const allTables = locations.filter((loc) => loc.name?.toLowerCase().includes('table'))

            // Identify IDs of tables currently being used (Book Status = 'reading')
            // We use String() conversion to ensure the IDs match even if one is a number and one is a string
            const occupiedTableIds = new Set(
              books
                .filter((b) => b.status?.toLowerCase() === 'reading' && b.locationId)
                .map((b) => String(b.locationId)),
            )

            const occupiedCount = allTables.filter((t) => occupiedTableIds.has(String(t.id))).length
            const availableCount = allTables.length - occupiedCount

            tableBlock.count = allTables.length
            tableBlock.description1 = `${availableCount} Available`
            tableBlock.description2 = `${occupiedCount} Occupied`
          }
        }

        // --- 4. Update Members Block ---
        if (allUsers && Array.isArray(allUsers)) {
          const memberBlock = this.overviews.find((b) => b.title === 'Total Members')
          if (memberBlock) {
            // Filter only those with role 'user'
            const members = allUsers.filter((u) => u.role === 'user')

            memberBlock.count = members.length

            // Detailed descriptions based on Department enum
            const gicCount = members.filter((u) => u.department === 'GIC').length
            const amsCount = members.filter((u) => u.department === 'AMS').length
            const othersCount = members.length - (gicCount + amsCount)

            memberBlock.description1 = `${gicCount} GIC Members`
            memberBlock.description2 = `${amsCount} AMS Members`
            memberBlock.description3 = `${othersCount} Others`
          }

          // --- 5. Update Staff Block ---
          const staffBlock = this.overviews.find((b) => b.title === 'Total Staff')
          if (staffBlock) {
            const staff = allUsers.filter((u) => u.role === 'librarian' || u.role === 'admin')
            staffBlock.count = staff.length
            staffBlock.description1 = `${allUsers.filter((u) => u.role === 'librarian').length} Librarians`
            staffBlock.description2 = `${allUsers.filter((u) => u.role === 'admin').length} Admins`
          }
        }

        // --- TODAY SUMMARY ---

        // 1. Registrations
        const regBlock = this.summary.find((s) => s.title === 'Registerations')
        if (regBlock && Array.isArray(allUsers)) {
          const todayReg = allUsers.filter((u) => this.isToday(u.createdAt) && u.role === 'user')
          regBlock.count = todayReg.length
        }

        // 2. Admin Activities (Books created today)
        const adminBlock = this.summary.find((s) => s.title === 'Admin Activities')
        if (adminBlock && Array.isArray(books)) {
          const todayAdded = books.filter((b) => this.isToday(b.createdAt)).length
          adminBlock.count = todayAdded
          adminBlock.description1 = `${todayAdded} Books Added`
          adminBlock.description2 = `${books.filter((b) => this.isToday(b.updatedAt)).length} Books Updated`
          adminBlock.description3 = `${books.filter((b) => this.isToday(b.deletedAt)).length} Books Deleted`
        }

        // 3. Reading/Borrowing/Returning (Current Status)
        const readBlock = this.summary.find((s) => s.title === 'Reading Activities')
        if (readBlock && Array.isArray(books)) {
          const currentReading = books.filter((b) => b.status?.toLowerCase() === 'reading')
          const todayReads = books.filter(
            (b) => this.isToday(b.updatedAt) && b.status?.toLowerCase() === 'reading',
          )
          readBlock.count = todayReads.length
          readBlock.description1 = `${currentReading.length} active sessions`
        }

        const borrowBlock = this.summary.find((s) => s.title === 'Borrowings Activities')
        if (borrowBlock && Array.isArray(books)) {
          const currentBorrowed = books.filter((b) => b.status?.toLowerCase() === 'borrowed')
          borrowBlock.count = currentBorrowed.length
        }

        // --- Returning Block Debug Version ---
        const history = Array.isArray(allHistory) ? allHistory : []
        const returnBlock = this.summary.find((s) => s.title.includes('Returning'))

        if (returnBlock) {
          const todayReturns = history.filter((h) => {
            return (
              this.isToday(h.timestamp) &&
              h.fromStatus?.toLowerCase() === 'borrowed' &&
              h.toStatus?.toLowerCase() === 'available'
            )
          })

          returnBlock.count = todayReturns.length
        }
      } catch (error) {
        console.error('Failed to load dashboard stats:', error)
      }
    },
  },
}
</script>

<style scoped>
.content-dashboard {
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-x: hidden;
}

.activity-carousel {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
}

.activity-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0;
  flex-wrap: nowrap;
  padding-bottom: 10px;
}

.activity-lists {
  display: flex;
  overflow-x: auto;
}

.category-header {
  padding: 10px 0;
  border-left: 4px solid #8ecae6;
  padding-left: 15px;
  margin-bottom: 10px;
  margin-top: 50px;
}

.category-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #444;
}

.activity-block::-webkit-scrollbar {
  height: 8px;
}

.activity-block::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}

.activity-block::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}
</style>
