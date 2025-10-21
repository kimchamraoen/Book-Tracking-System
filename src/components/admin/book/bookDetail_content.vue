<template>
  <div class="book-page">
    <div class="heading-section">
      <h1>Book Details</h1>
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

    <div v-else class="bookdetail">
      <div class="book-card" style="flex: 1">
        <div class="book-left">
          <img
            :src="book.coverImage || '/src/assets/images/atomic-habit.jpg'"
            alt="Book cover"
            class="book-cover"
          />
        </div>
        <div class="book-right">
          <div class="book-name">
            <h1 class="title">{{ book.title }}</h1>
            <h3 class="sub-title" v-if="book.subtitle">{{ book.subtitle }}</h3>
            <span :class="['status-chip', statusClass]">
              {{ book.status }}
            </span>
          </div>

          <table class="book-detail">
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

      <div class="book-card tech-div">
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
    <div v-if="book" class="similar-books-section">
      <h2>Similar Books</h2>
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
          <div class="book-grid-info">
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
.book-page {
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

.bookdetail {
  display: flex;
  gap: 20px;
  padding: 0 20px;
}

.book-card {
  display: flex;
  border-radius: 16px;
  padding: 40px;
  gap: 50px;
  box-sizing: border-box;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.tech-div {
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

.book-left img.book-cover {
  width: 200px;
  height: 320px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.book-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.book-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
}

.sub-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 10px 0 20px 0;
  color: #666;
}

.status-chip {
  width: fit-content;
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

.status-available {
  background-color: #e7f8ef;
  color: #1b7c2f;
  border: 1px solid #1b7c2f;
}

.status-borrowed {
  background-color: #fff6e0;
  color: #b97a00;
  border: 1px solid #b97a00;
}

.status-reserved {
  background-color: #e0e9ff;
  color: #0044b9;
  border: 1px solid #0044b9;
}

.status-reading {
  background-color: #fff0e6;
  color: #c45a00;
  border: 1px solid #c45a00;
}

.status-lost {
  background-color: #fdeaea;
  color: #c62828;
  border: 1px solid #c62828;
}

.book-detail {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #808080;
}

.book-detail td {
  padding: 10px 16px;
  border: 1px solid #ccc;
  color: #555;
  vertical-align: middle;
}

.book-detail th {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  text-align: left;
  padding: 10px 16px;
  color: #333;
  width: 200px;
}

.additional-info {
  background: #fff;
  color: #111;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  margin: 20px;
}

.additional-info h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
}

.additional-info p {
  line-height: 1.6;
  color: #333;
  font-size: 16px;
}

/* Similar Books Grid Styles */
.similar-books-section {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.similar-books-section h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #333;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 40px;
}

.book-grid-item {
  background: #c8efff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.book-grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.book-grid-cover {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.grid-book-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.book-grid-item:hover .grid-book-image {
  transform: scale(1.05);
}

.book-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.book-grid-item:hover .book-overlay {
  opacity: 1;
}

.view-details {
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.book-grid-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.grid-book-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.grid-book-author {
  font-size: 14px;
  color: #666;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
}

.grid-status-chip {
  width: fit-content;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 12px;
  text-transform: capitalize;
  letter-spacing: 0.2px;
  margin-top: 4px;
}

.no-similar-books {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.no-similar-books p {
  margin: 10px 0;
}

.no-similar-books small {
  color: #999;
  font-size: 12px;
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

  .tech-div {
    padding: 20px;
    min-width: auto;
  }

  .action-btn {
    width: 120px;
    font-size: 14px;
  }

  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }

  .book-grid-cover {
    height: 180px;
  }

  .book-grid-info {
    padding: 12px;
  }

  .grid-book-title {
    font-size: 14px;
  }

  .grid-book-author {
    font-size: 12px;
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
