<template>
  <div class="content-book">
    <div class="heading-section">
      <h1>Librarian Details</h1>
      <button class="back-btn" @click="$router.back()">Back</button>
    </div>

    <div v-if="loading" class="loading-container">
      <p>Loading book details...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="retryFetch" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="!book" class="error-container">
      <p>Book not found</p>
      <button @click="$router.back()" class="back-btn">Go Back</button>
    </div>

    <div v-else class="content">
      <div class="module-detail">
        <div class="module-card" style="flex: 1;">
          <div class="card-left">
            <img
              :src="book.coverImage || '/src/assets/images/atomic-habit.jpg'"
              alt="Book cover"
              class="book-cover"
            />
          </div>
          <div class="card-right">
            <div class="card-name">
              <h1 class="title name">{{ book.title }}</h1>
              <h3 class="sub-title" v-if="book.subtitle">{{ book.subtitle }}</h3>
              <span :class="['status-chip', statusClass]">
                {{ book.status }}
              </span>
            </div>

            <table class="card-detail-table">
              <tbody>
                <tr>
                  <th><strong>Author:</strong></th>
                  <td>{{ book.author }}</td>
                </tr>
                <tr>
                  <th><strong>ISBN:</strong></th>
                  <td>{{ book.isbn }}</td>
                </tr>
                <tr>
                  <th><strong>Department:</strong></th>
                  <td>
                    {{
                      Array.isArray(book.department) ? book.department.join(', ') : book.department
                    }}
                  </td>
                </tr>
                <tr>
                  <th><strong>Shelf:</strong></th>
                  <td>{{ book.shelf }}</td>
                </tr>
                <tr v-if="book.language">
                  <th><strong>Language:</strong></th>
                  <td>{{ book.language }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="actions-div">
          <h2 style="margin: 0">Actions</h2>
          <button
            :disabled="buttonStatesDisabled.borrow"
            @click="handleAction('Borrow')"
            class="action-btn"
          >
            Borrow
          </button>
          <button
            :disabled="buttonStatesDisabled.return"
            @click="handleAction('Return')"
            class="action-btn"
          >
            Return
          </button>
          <button
            :disabled="buttonStatesDisabled.read"
            @click="handleAction('Read')"
            class="action-btn"
          >
            Read
          </button>
          <button
            :disabled="buttonStatesDisabled.finish"
            @click="handleAction('Finish')"
            class="action-btn"
          >
            Finish
          </button>
          <button
            :disabled="buttonStatesDisabled.reserve"
            @click="handleAction('Reserve')"
            class="action-btn"
          >
            Reserve
          </button>
          <button
            :disabled="buttonStatesDisabled.cancel"
            @click="handleAction('Cancel')"
            class="action-btn"
          >
            Cancel
          </button>
        </div>
      </div>

      <div v-if="book && book.description" class="additional-info">
        <h2>Description</h2>
        <p>{{ book.description }}</p>
      </div>

      <!-- Similar Books Grid -->
      <div v-if="book" class="block-book-similar">
        <div class="header">
          <h2>Similar Books</h2>
          <div class="line"></div>
        </div>
        <div v-if="similarBooks.length > 0" class="books-grid">
          <div
            v-for="similarBook in similarBooks"
            :key="similarBook.id"
            class="book-grid-item"
            @click="goToBookDetail(similarBook)"
          >
            <div class="book-grid-cover">
              <img
                :src="similarBook.coverImage || '/src/assets/images/atomic-habit.jpg'"
                :alt="similarBook.title"
                class="grid-book-image"
              />
              <div class="book-overlay">
                <span class="view-details">View Details</span>
              </div>
            </div>
            <div class="books-grid-info">
              <h3 class="grid-book-title">{{ similarBook.title }}</h3>
              <p class="grid-book-author">{{ similarBook.author }}</p>
              <span :class="['grid-status-chip', getStatusClass(similarBook.status)]">
                {{ similarBook.status }}
              </span>
            </div>
          </div>
        </div>
        <div v-else-if="book" class="no-similar-books">
          <p>No similar books found for "{{ book.title }}"</p>
          <p>
            <small
              >Debug: Genre: {{ book.genre }}, Department: {{ book.department }}, Author:
              {{ book.author }}</small
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBooksStore } from '../../../stores/books.js'

export default {
  name: 'BookDetail',
  props: ['id'],
  data() {
    return {
      booksStore: useBooksStore(),
    }
  },
  async created() {
    await this.booksStore.fetchBookById(this.id)
  },
  computed: {
    book() {
      return this.booksStore.selectedBook
    },
    loading() {
      return this.booksStore.loading
    },
    error() {
      return this.booksStore.error
    },
    buttonStatesDisabled() {
      if (!this.book) return {}
      const status = this.book.status?.toLowerCase()
      switch (status) {
        case 'available':
          return {
            borrow: false,
            return: true,
            read: false,
            finish: true,
            reserve: false,
            cancel: true,
          }
        case 'borrowed':
          return {
            borrow: true,
            return: false,
            read: true,
            finish: true,
            reserve: true,
            cancel: true,
          }
        case 'reserved':
          return {
            borrow: true,
            return: true,
            read: true,
            finish: true,
            reserve: true,
            cancel: false,
          }
        case 'reading':
          return {
            borrow: true,
            return: true,
            read: true,
            finish: false,
            reserve: true,
            cancel: true,
          }
        case 'lost':
          return {
            borrow: true,
            return: true,
            read: true,
            finish: true,
            reserve: true,
            cancel: true,
          }
        default:
          return {
            borrow: true,
            return: true,
            read: true,
            finish: true,
            reserve: true,
            cancel: true,
          }
      }
    },
    statusClass() {
      if (!this.book || !this.book.status) return ''
      const status = this.book.status.toLowerCase()
      switch (status) {
        case 'available':
          return 'status-available'
        case 'borrowed':
          return 'status-borrowed'
        case 'reserved':
          return 'status-reserved'
        case 'reading':
          return 'status-reading'
        case 'lost':
          return 'status-lost'
        default:
          return ''
      }
    },
    similarBooks() {
      if (!this.book || !this.booksStore.books) return []

      // Filter books that have similar characteristics
      const similarBooks = this.booksStore.books.filter((otherBook) => {
        if (otherBook.id === this.book.id) return false

        // Check for similar genre
        const currentGenres = Array.isArray(this.book.genre) ? this.book.genre : [this.book.genre]
        const otherGenres = Array.isArray(otherBook.genre) ? otherBook.genre : [otherBook.genre]
        const hasCommonGenre = currentGenres.some((genre) => otherGenres.includes(genre))

        // Check for same author
        const sameAuthor = this.book.author === otherBook.author

        // Check for same department
        const currentDepts = Array.isArray(this.book.department)
          ? this.book.department
          : [this.book.department]
        const otherDepts = Array.isArray(otherBook.department)
          ? otherBook.department
          : [otherBook.department]
        const hasCommonDept = currentDepts.some((dept) => otherDepts.includes(dept))

        // Check for similar language
        const sameLanguage = this.book.language === otherBook.language

        return hasCommonGenre || sameAuthor || hasCommonDept || sameLanguage
      })

      // If we have fewer than 3 similar books, add some random ones to fill the grid
      if (similarBooks.length < 3) {
        const remainingBooks = this.booksStore.books
          .filter((book) => book.id !== this.book.id && !similarBooks.find((s) => s.id === book.id))
          .slice(0, 6 - similarBooks.length)

        similarBooks.push(...remainingBooks)
      }

      return similarBooks.slice(0, 6) // Limit to 6 books total
    },
  },
  methods: {
    async handleAction(action) {
      if (!this.book) return
      const actionStatusMap = {
        Borrow: 'Borrowed',
        Return: 'Available',
        Read: 'Reading',
        Finish: 'Available',
        Reserve: 'Reserved',
        Cancel: 'Available',
      }
      const newStatus = actionStatusMap[action]
      if (newStatus) {
        const success = await this.booksStore.updateBookStatus(this.book.id, newStatus)
        if (success) {
          alert(`${action} successful! Book status updated to ${newStatus}.`)
        } else {
          alert(`Failed to ${action.toLowerCase()} book. Please try again.`)
        }
      }
    },
    async retryFetch() {
      this.booksStore.clearError()
      await this.booksStore.fetchBookById(this.id)
    },
    async goToBookDetail(book) {
      await this.$router.push({ name: 'BookDetails', params: { id: String(book.id) } })
      // Scroll to top after navigation
      this.$nextTick(() => {
        this.scrollToTop()
      })
    },

    scrollToTop() {
      // Try multiple scroll containers to ensure we find the right one
      const scrollContainers = [
        document.querySelector('.book-page'),
        document.querySelector('.admin-overall-page'),
        document.querySelector('main'),
        document.querySelector('.main-content'),
        document.documentElement,
        document.body,
      ]

      for (const container of scrollContainers) {
        if (container) {
          container.scrollTop = 0
          container.scrollTo?.({ top: 0, behavior: 'smooth' })
          break
        }
      }

      // Also ensure window scrolls to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    getStatusClass(status) {
      if (!status) return ''
      const statusLower = status.toLowerCase()
      switch (statusLower) {
        case 'available':
          return 'status-available'
        case 'borrowed':
          return 'status-borrowed'
        case 'reserved':
          return 'status-reserved'
        case 'reading':
          return 'status-reading'
        case 'lost':
          return 'status-lost'
        default:
          return ''
      }
    },
  },
  watch: {
    '$route.params.id': {
      handler: async function (newId, oldId) {
        if (newId !== oldId) {
          this.booksStore.clearError()
          await this.booksStore.fetchBookById(newId)

          // Wait for DOM update and scroll to top
          this.$nextTick(() => {
            setTimeout(() => {
              this.scrollToTop()
            }, 100) // small delay to ensure DOM is fully updated
          })
        }
      },
      immediate: false,
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.scrollToTop()
    })
  },
}
</script>

<style scoped>
/* Component-specific styles only - reuse original CSS classes */
.content-book{
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

.title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
}

.sub-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 10px 0 10px 0;
  color: #666;
}

.content{
  display: grid;
  justify-items: center;
  align-items: center;
  gap: 30px;
  padding: 20px;
}

.back-btn{
  background-color: #243f92;
  color: white;
  font: bold;
}

.card-detail-table th{
  background-color: #243f92;
  color: white;
  padding: 10px;
}

.block-book-similar{
  width: 100%;
  display: grid;
}

 .header {
    padding: 15px 20px;
  }

  .actions-div button{
    background-color: #243f92;
    color: white;
    font: bold;
  }

  .books-grid-info{
    background-color: #243f92;
    padding: 15px;
  }
.books-grid-info h3{
  color: white;
  font: bold;
}
.books-grid-info p{
  color: white;
}

@media (max-width: 768px) {
  .bookdetail {
    flex-direction: column;
  }

  .book-card {
    flex-direction: column;
    gap: 20px;
  }

  .title {
    font-size: 2rem;
  }

  .book-left img.book-cover {
    width: 150px;
    height: 240px;
    align-self: center;
  }

  .action-btn {
    width: 120px;
    font-size: 14px;
  }

  .book-page {
    animation: fadeUp 0.4s ease forwards;
    opacity: 0;
    transform: translateY(10px);
  }

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
