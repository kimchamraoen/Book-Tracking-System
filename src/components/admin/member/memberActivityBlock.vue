<template>
  <div class="circulation-block">
    <div class="title" :style="{ backgroundColor: titleColor }">
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
        borrowing: '#243f92',
        reservation: '#243f92',
        reading: '#243f92',
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
/* Large table number styling for reading activities */
.table-number-large {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-top: 8px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .circulation-block {
    width: 250px;
    min-width: 250px;
    max-width: 250px;
  }

  .title {
    font-size: 1rem;
    padding: 10px 8px;
  }

  .book-info {
    margin: 10px 8px;
    min-height: 70px;
  }

  .book-title {
    font-size: 0.9rem;
  }

  .book-author {
    font-size: 0.8rem;
  }

  .status-chip {
    font-size: 0.75rem;
    padding: 3px 8px;
  }

  .table-number-large {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .circulation-block {
    width: 220px;
    min-width: 220px;
    max-width: 220px;
  }

  .title {
    font-size: 0.95rem;
    padding: 8px 6px;
  }

  .book-info {
    margin: 8px 6px;
  }

  .book-title {
    font-size: 0.85rem;
  }

  .book-author {
    font-size: 0.75rem;
  }

  .table-number-large {
    font-size: 1.1rem;
  }
}
</style>
