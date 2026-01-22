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
              <h1 class="title name" v-if="book.title">{{ book.title }}</h1>
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
  data() {
    return {
      booksStore: useBooksStore(),
    }
  },
  async created() {
    // Get the ID from the URL parameters
    const bookId = this.$route.params.id;
    
    if (bookId) {
      // Now this function will exist because we added it to the store above
      await this.booksStore.fetchBookById(bookId);
    }
  },
  computed: {
    book() {
      return this.booksStore.currentBook;
    },
    loading() {
      return this.booksStore.loading;
    }
  }
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
