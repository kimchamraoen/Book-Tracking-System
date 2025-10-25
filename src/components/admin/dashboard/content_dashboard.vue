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
              :title_color="'#8ecae6'"
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
              :title_color="'#90e0ef'"
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
              :title_color="'#a3cef1'"
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
          count: 1500,
          image: bookstackImage,
          blockColor: '#ade8f4',
          description1: '15 Available',
          description2: '15 Borrowed',
          description3: '15 Reserved',
        },
        {
          title: 'Total Shelves',
          count: 50,
          image: bookstackImage,
          blockColor: '#caf0f8',
          description1: '120 depts',
          description2: '120 genres',
          description3: '120 empty',
        },
        {
          title: 'Total Genres',
          count: 12,
          image: bookCategoryImage,
          blockColor: '#90e0ef',
          description1: '12 Trending',
          description2: '12 Top Borrowed',
          description3: '12 New',
        },
        {
          title: 'Total Tables',
          count: 12,
          image: seatImage,
          blockColor: '#8ecae6',
          description1: '12 available',
          description2: '12 reading',
          description3: '12 reserved',
        },
        {
          title: 'Total Members',
          count: 320,
          image: memberImage,
          blockColor: '#a9d6e5',
          description1: '320 active',
          description2: '320 inactive',
          description3: '320 deleted',
        },
        {
          title: 'Total Staff',
          count: 320,
          image: staffImage,
          blockColor: '#a3cef1',
          description1: '12 present',
          description2: '12 absent',
          description3: '12 resigned',
        },
      ],
      summary: [
        {
          title: 'Registerations',
          count: 50,
          image: bookstackImage,
          blockColor: '#caf0f8',
          description1: '1 students',
          description2: '1 professors',
          description3: '1 guests',
        },
        {
          title: 'Admin Activities',
          count: 20,
          image: bookstackImage,
          blockColor: '#a3cef1',
          description1: '2 Added',
          description2: '2 Updated',
          description3: '2 Deleted',
        },
        {
          title: 'Reading Activities',
          count: 30,
          image: bookstackImage,
          blockColor: '#ade8f4',
          description1: '5 sessions',
          description2: '5 progressing',
          description3: '5 completed',
        },
        {
          title: 'Reservations',
          count: 5,
          image: memberImage,
          blockColor: '#90e0ef',
          description1: '5 Books',
          description2: '5 Tables',
          description3: '5 Pendings',
        },
        {
          title: 'Borrowings',
          count: 20,
          image: staffImage,
          blockColor: '#8ecae6',
          description1: '2 transactions',
          description2: '2 books',
          description3: '2 borrowers',
        },
        {
          title: 'Returnings',
          count: 15,
          image: seatImage,
          blockColor: '#a9d6e5',
          description1: '3 returnings',
          description2: '3 on-times',
          description3: '3 lates',
        },
      ],
      Borrowings: [
        {
          username: 'John Doe',
          yearGroup: 'I4-GIC-A',
          activity: 'Borrowed',
          timeRecorded: '12:00:00 PM',
        },
        {
          username: 'Jane Smith',
          yearGroup: 'I4-GIC-B',
          activity: 'Borrowed',
          timeRecorded: '11:30:00 AM',
        },
        {
          username: 'Alice Johnson',
          yearGroup: 'I4-GIC-C',
          activity: 'Borrowed',
          timeRecorded: '10:00:00 AM',
        },
        {
          username: 'Bob Brown',
          yearGroup: 'I4-GIC-D',
          activity: 'Borrowed',
          timeRecorded: '9:45:00 AM',
        },
        {
          username: 'Charlie White',
          yearGroup: 'I4-GIC-E',
          activity: 'Borrowed',
          timeRecorded: '9:30:00 AM',
        },
        {
          username: 'David Green',
          yearGroup: 'I4-GIC-F',
          activity: 'Borrowed',
          timeRecorded: '9:15:00 AM',
        },
        {
          username: 'Eve Black',
          yearGroup: 'I4-GIC-G',
          activity: 'Borrowed',
          timeRecorded: '9:00:00 AM',
        },
      ],
      Returnings: [
        {
          username: 'John Doe',
          yearGroup: 'I4-GIC-A',
          activity: 'Returned',
          timeRecorded: '12:00:00 PM',
        },
        {
          username: 'Jane Smith',
          yearGroup: 'I4-GIC-B',
          activity: 'Returned',
          timeRecorded: '11:30:00 AM',
        },
        {
          username: 'Alice Johnson',
          yearGroup: 'I4-GIC-C',
          activity: 'Returned',
          timeRecorded: '10:00:00 AM',
        },
        {
          username: 'Bob Brown',
          yearGroup: 'I4-GIC-D',
          activity: 'Returned',
          timeRecorded: '9:45:00 AM',
        },
        {
          username: 'Charlie White',
          yearGroup: 'I4-GIC-E',
          activity: 'Returned',
          timeRecorded: '9:30:00 AM',
        },
        {
          username: 'David Green',
          yearGroup: 'I4-GIC-F',
          activity: 'Returned',
          timeRecorded: '9:15:00 AM',
        },
        {
          username: 'Eve Black',
          yearGroup: 'I4-GIC-G',
          activity: 'Returned',
          timeRecorded: '9:00:00 AM',
        },
      ],
      Reservings: [
        {
          username: 'John Doe',
          yearGroup: 'I4-GIC-A',
          activity: 'Reserved',
          timeRecorded: '12:00:00 PM',
        },
        {
          username: 'Jane Smith',
          yearGroup: 'I4-GIC-B',
          activity: 'Reserved',
          timeRecorded: '11:30:00 AM',
        },
        {
          username: 'Alice Johnson',
          yearGroup: 'I4-GIC-C',
          activity: 'Reserved',
          timeRecorded: '10:00:00 AM',
        },
        {
          username: 'Bob Brown',
          yearGroup: 'I4-GIC-D',
          activity: 'Reserved',
          timeRecorded: '9:45:00 AM',
        },
        {
          username: 'Charlie White',
          yearGroup: 'I4-GIC-E',
          activity: 'Reserved',
          timeRecorded: '9:30:00 AM',
        },
        {
          username: 'David Green',
          yearGroup: 'I4-GIC-F',
          activity: 'Reserved',
          timeRecorded: '9:15:00 AM',
        },
        {
          username: 'Eve Black',
          yearGroup: 'I4-GIC-G',
          activity: 'Reserved',
          timeRecorded: '9:00:00 AM',
        },
      ],
      Readings: [
        {
          username: 'John Doe',
          yearGroup: 'I4-GIC-A',
          tableNumber: 'T-001',
          timeRecorded: '12:00:00 PM',
        },
        {
          username: 'Jane Smith',
          yearGroup: 'I4-GIC-B',
          tableNumber: '002',
          timeRecorded: '11:00:00 AM',
        },
        {
          username: 'Alice Johnson',
          yearGroup: 'I4-GIC-C',
          tableNumber: '003',
          timeRecorded: '10:30:00 AM',
        },
        {
          username: 'Bob Brown',
          yearGroup: 'I4-GIC-D',
          tableNumber: '004',
          timeRecorded: '9:45:00 AM',
        },
        {
          username: 'Charlie White',
          yearGroup: 'I4-GIC-E',
          tableNumber: '005',
          timeRecorded: '9:30:00 AM',
        },
        {
          username: 'David Green',
          yearGroup: 'I4-GIC-F',
          tableNumber: '006',
          timeRecorded: '9:15:00 AM',
        },
        {
          username: 'Eve Black',
          yearGroup: 'I4-GIC-G',
          tableNumber: '007',
          timeRecorded: '9:00:00 AM',
        },
      ],
    }
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
