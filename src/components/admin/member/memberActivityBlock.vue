<template>
  <div class="circulation-block">
    <div class="header" :style="{ backgroundColor: titleColor }">
      {{ activityTitle }}
    </div>
    <div class="activity-list">
      <img class="book-cover" :src="bookCover" alt="Book Cover" />
      <div class="book-info">
        <span class="book-title">{{ bookTitle }}</span>
        <span class="book-author">{{ bookAuthor }}</span>
        <!-- Special styling for reading activity table number -->
        <span v-if="activityType === 'reading'" class="table-number-large">
          {{ activityData.tableNumber }}
        </span>
        <!-- Regular status chip for other activities -->
        <span v-else :class="['activity', 'status-chip', activityStatusClass]">{{
          activityStatus
        }}</span>
      </div>
      <img class="profile-avatar" :src="memberAvatar" alt="Member Avatar" />
      <span class="time-recorded">{{ timeRecorded }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberActivityBlock',
  props: {
    activityType: {
      type: String,
      required: true,
      validator: (value) => ['borrowing', 'reservation', 'reading'].includes(value),
    },
    activityData: {
      type: Object,
      required: true,
    },
    memberName: {
      type: String,
      required: true,
    },
    memberDepartment: {
      type: String,
      required: true,
    },
    timeRecorded: {
      type: String,
      default: 'Just now',
    },
  },
  computed: {
    bookCover() {
      return '/src/assets/images/atomic-habit.jpg'
    },
    memberAvatar() {
      return '/src/assets/images/profile-avatar.jpg'
    },
    bookTitle() {
      const titles = {
        borrowing: this.activityData.bookTitle || 'Atomic Habits',
        reservation: this.activityData.bookTitle || 'Clean Code',
        reading: this.activityData.bookTitle || 'JavaScript Guide',
      }
      return titles[this.activityType]
    },
    bookAuthor() {
      const authors = {
        borrowing: this.activityData.bookAuthor || 'James Clear',
        reservation: this.activityData.bookAuthor || 'Robert Martin',
        reading: this.activityData.bookAuthor || 'Douglas Crockford',
      }
      return authors[this.activityType]
    },
    titleColor() {
      const colors = {
        borrowing: '#8ecae6',
        reservation: '#a3cef1',
        reading: '#90e0ef',
      }
      return colors[this.activityType]
    },
    activityTitle() {
      const titles = {
        borrowing: 'Borrowing Activity',
        reservation: 'Reservation Activity',
        reading: 'Reading Activity',
      }
      return titles[this.activityType]
    },
    activityStatus() {
      const status = {
        borrowing: this.activityData.status || 'Borrowed',
        reservation: this.activityData.status || 'Reserved',
        reading: `Table ${this.activityData.tableNumber}`,
      }
      return status[this.activityType]
    },
    activityStatusClass() {
      // Map activity status to CSS classes
      const statusLower = this.activityStatus.toLowerCase()

      if (statusLower.includes('borrowed') || statusLower === 'borrowed') {
        return 'status-active'
      } else if (statusLower.includes('reserved') || statusLower === 'reserved') {
        return 'status-pending'
      } else if (statusLower.includes('returned') || statusLower === 'returned') {
        return 'status-expired'
      } else if (statusLower.includes('cancelled') || statusLower === 'cancelled') {
        return 'status-blocked'
      } else if (statusLower.includes('available') || statusLower === 'available for pickup') {
        return 'status-suspended'
      } else if (statusLower.includes('table')) {
        return 'status-active' // Reading activities use active style
      } else {
        return 'status-pending' // Default
      }
    },
  },
}
</script>

<style scoped>
.circulation-block {
  min-width: 200px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: aliceblue;
  margin: 10px;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;
}

.circulation-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;
}

.icon {
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: 10px 0;
}

.book-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

.book-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 4px;
}

.book-author {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
  margin-bottom: 6px;
}

.activity {
  font-size: 0.85rem;
  font-weight: 600;
}

/* Large table number styling for reading activities */
.table-number-large {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-top: 8px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* Status chip styling similar to member detail */
.status-chip {
  width: fit-content;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: capitalize;
  letter-spacing: 0.2px;
  margin-top: 2px;
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
</style>
