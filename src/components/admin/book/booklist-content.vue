<template>
  <div class="table-list-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Cover</th>
          <th>ISBN</th>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Department</th>
          <th>Language</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="8" class="table-loading">Loading books...</td>
        </tr>
        <tr v-else-if="error">
          <td colspan="8" class="table-error">
            {{ error }}
            <button @click="booksStore.fetchBooks()" class="retry-btn">Retry</button>
          </td>
        </tr>
        <tr v-else v-for="book in sortedBooks" :key="book.id" @click="goToBookDetail(book)">
          <td>
            <img :src="book.coverImage" alt="Book Cover" class="table-image" />
          </td>
          <td class="truncate-sm">{{ book.isbn }}</td>
          <td class="truncate">{{ book.title }}</td>
          <td class="truncate">{{ book.author }}</td>
          <td class="truncate">{{ book.genre }}</td>
          <td class="truncate">{{ book.department }}</td>
          <td class="truncate-sm">{{ book.language }}</td>
          <td>
            <span :class="['status-chip', statusClass(book.status)]">
              {{ book.status }}
            </span>
          </td>
          <td class="actions-cell">
            <div>
              <button
                @click.stop="viewBook(book.id)"
                class="action-buttons btn-view"
                title="View Details"
              >
                View
              </button>
              <button @click.stop="editBook(book.id)" class="action-buttons btn-edit" title="Edit">
                Edit
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="!loading && !error && sortedBooks.length === 0">
          <td colspan="8" class="table-empty">No books found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { useBooksStore } from '../../../stores/books.js'

export default {
  name: 'BooklistContent',
  props: ['sortKey', 'sortOrder', 'filterValue', 'searchQuery'],
  data() {
    return {
      booksStore: useBooksStore(),
    }
  },
  async mounted() {
    // Fetch books when component mounts
    if (this.booksStore.books.length === 0) {
      await this.booksStore.fetchBooks()
    }
  },
  methods: {
    goToBookDetail(book) {
      this.$router.push({ name: 'BookDetails', params: { id: String(book.id) } })
    },
    statusClass(status) {
      const map = {
        Available: 'status-available',
        Borrowed: 'status-borrowed',
        Reserved: 'status-reserved',
        Reading: 'status-reading',
        Lost: 'status-lost',
      }
      return map[status] || 'status-unknown'
    },
    viewBook(bookId) {
      this.$router.push({ name: 'BookDetails', params: { id: String(bookId) } })
    },
    editBook(bookId) {
      this.$router.push({ name: 'EditBook', params: { id: String(bookId) } })
    },
  },
  computed: {
    books() {
      return this.booksStore.books
    },
    loading() {
      return this.booksStore.loading
    },
    error() {
      return this.booksStore.error
    },
    sortedBooks() {
      let result = [...this.books]

      // 1. Apply search filter first
      if (this.searchQuery && this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim()
        result = result.filter(
          (book) =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.isbn.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query) ||
            book.department.toLowerCase().includes(query),
        )
      }

      // 2. Filter by value (e.g. only show "Fantasy")
      if (this.filterValue) {
        result = result.filter(
          (book) => String(book[this.sortKey]).toLowerCase() === this.filterValue.toLowerCase(),
        )
      }

      // 3. Sort alphabetically
      if (this.sortKey && this.sortKey !== 'none') {
        result.sort((a, b) => {
          const valA = String(a[this.sortKey] || '').toLowerCase()
          const valB = String(b[this.sortKey] || '').toLowerCase()
          if (this.sortOrder === 'asc') return valA.localeCompare(valB)
          if (this.sortOrder === 'desc') return valB.localeCompare(valA)
          return 0
        })
      }

      return result
    },
  },
}
</script>
