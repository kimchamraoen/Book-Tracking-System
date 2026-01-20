<template>
  <div class="circulation-block" style="width: auto;">
    <div class="title" :style="{ backgroundColor: titleColor }" style="color: white;">
      {{ activityTitle }}
    </div>
    <div class="activity-list">
      <div class="activity-items" style="display: flex;">
        <img class="book-cover" :src="getActivityImage()" :alt="activityType" style="width: auto; height: 100px;"/>
        <div class="book-info">
          <span class="book-title">{{ getMainTitle() }}</span>
          <span class="book-author">{{ getSubTitle() }}</span>
          <span :class="['activity', 'status-chip', activityStatusClass]">
            {{ getActivityStatus() }}
          </span>
        </div>
        <div class="content">
          <img
            class="profile-avatar"
            style="margin-bottom: 10px"
            :src="librarianAvatar"
            :alt="librarianName"
          />
          <span class="time-recorded">{{ timeRecorded }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibrarianActivityBlock',
  props: {
    activityType: {
      type: String,
      required: true,
      validator: (value) => ['book-management', 'member-assistance', 'system'].includes(value),
    },
    activityData: {
      type: Object,
      required: true,
    },
    librarianName: {
      type: String,
      required: true,
    },
    librarianDepartment: {
      type: String,
      required: true,
    },
    timeRecorded: {
      type: String,
      required: true,
    },
  },
  computed: {
    librarianAvatar() {
      return '/src/assets/images/profile-avatar.jpg'
    },
    titleColor() {
      const colors = {
        'book-management': '#243f92',
        'member-assistance': '#243f92',
        system: '#243f92',
      }
      return colors[this.activityType]
    },
    activityTitle() {
      const titles = {
        'book-management': 'Book Management',
        'member-assistance': 'Member Assistance',
        system: 'System Activity',
      }
      return titles[this.activityType]
    },
    activityStatusClass() {
      const statusLower = this.getActivityStatus().toLowerCase()

      if (
        statusLower.includes('completed') ||
        statusLower.includes('added') ||
        statusLower.includes('updated')
      ) {
        return 'status-active'
      } else if (statusLower.includes('pending') || statusLower.includes('in progress')) {
        return 'status-pending'
      } else if (statusLower.includes('failed') || statusLower.includes('error')) {
        return 'status-expired'
      } else if (statusLower.includes('cancelled') || statusLower.includes('rejected')) {
        return 'status-blocked'
      } else {
        return 'status-suspended'
      }
    },
  },
  methods: {
    getActivityImage() {
      // Use book cover for book-management, member icon for member-assistance, system icon for system
      return '/src/assets/images/atomic-habit.jpg'
    },
    getMainTitle() {
      if (this.activityType === 'book-management') {
        return this.activityData.bookTitle || 'Unknown Book'
      } else if (this.activityType === 'member-assistance') {
        return this.activityData.memberName || 'Unknown Member'
      } else if (this.activityType === 'system') {
        return (
          this.activityData.reportType ||
          this.activityData.section ||
          this.activityData.system ||
          'System Task'
        )
      }
      return 'Activity'
    },
    getSubTitle() {
      if (this.activityType === 'book-management') {
        return this.activityData.bookAuthor || 'Unknown Author'
      } else if (this.activityType === 'member-assistance') {
        return this.activityData.memberId || 'No ID'
      } else if (this.activityType === 'system') {
        return this.activityData.details || 'System operation'
      }
      return 'Details'
    },
    getActivityStatus() {
      if (this.activityType === 'book-management') {
        return this.activityData.action || 'Completed'
      } else if (this.activityType === 'member-assistance') {
        return this.activityData.action || 'Assisted'
      } else if (this.activityType === 'system') {
        return this.activityData.action || 'Completed'
      }
      return 'Completed'
    },
  },
}
</script>

<style scoped>
/* Responsive design */
@media (max-width: 768px) {
  .circulation-block {
    width: 250px;
    min-width: 250px;
    max-width: 250px;
  }

  .activity-list{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .activity-item{
    display: flex;
    gap: 1rem;
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
  
  .title div{
    color: white;
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
}
</style>
