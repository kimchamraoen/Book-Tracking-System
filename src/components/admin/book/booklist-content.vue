<template>
  <div class="book-list">
    <table class="book-table">
      <thead>
        <tr>
          <th>Cover</th>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Department</th>
          <th>Shelf</th>
          <th>ISBN</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="8" style="text-align: center; padding: 20px; color: #666">
            Loading books...
          </td>
        </tr>
        <tr v-else-if="error">
          <td colspan="8" style="text-align: center; padding: 20px; color: #d32f2f">
            {{ error }}
            <button
              @click="booksStore.fetchBooks()"
              style="
                margin-left: 10px;
                padding: 5px 10px;
                border: 1px solid #d32f2f;
                background: white;
                color: #d32f2f;
                border-radius: 4px;
                cursor: pointer;
              "
            >
              Retry
            </button>
          </td>
        </tr>
        <tr v-else v-for="book in sortedBooks" :key="book.id" @click="goToBookDetail(book)">
          <td><img :src="book.coverImage" alt="Book Cover" class="book-cover truncate" /></td>
          <td class="truncate">{{ book.title }}</td>
          <td class="truncate">{{ book.author }}</td>
          <td class="truncate">{{ book.genre }}</td>
          <td class="truncate">{{ book.department }}</td>
          <td class="truncate">{{ book.shelf }}</td>
          <td class="truncate">{{ book.isbn }}</td>
          <td>
            <span :class="['status', statusClass(book.status)]">
              {{ book.status }}
            </span>
          </td>
        </tr>
        <tr v-if="!loading && !error && sortedBooks.length === 0">
          <td colspan="8" style="text-align: center; padding: 20px; color: #666">No books found</td>
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

<style scoped>
.book-list {
  /* padding: 20px; */
  overflow-x: auto;
}
.book-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 40px;
  border: 1px solid;
  font-size: 1rem;
}

.book-table th {
  background-color: #c8efff;
  border: 1px solid;
  white-space: nowrap;
  font-weight: 800;
  text-align: center;
  padding: 10px;
}

.book-table td {
  padding: 10px 16px;
  /* border-top: 1px solid #eee; */
  border: 1px solid;
  color: #555;
  vertical-align: middle;
}

.book-table tr {
  transition: background-color 0.2s;
  cursor: pointer;
}

.book-table tr:nth-child(even) {
  background-color: #f1f8ff;
}

.book-table tr:hover {
  background-color: #cee6ff;
}

/* Limit text overflow */
.truncate {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Book cover styling */
.book-cover {
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Status color labels */
.status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
}

.status-available {
  background-color: #e7f8ef;
  color: #1b7c2f;
}

.status-borrowed {
  background-color: #fff6e0;
  color: #b97a00;
}

.status-reserved {
  background-color: #e0e9ff;
  color: #0044b9;
}

.status-reading {
  background-color: #fff0e6;
  color: #c45a00;
}

.status-lost {
  background-color: #fdeaea;
  color: #c62828;
}

/* Responsive: shrink font and spacing on smaller screens */
@media (max-width: 768px) {
  .book-table th,
  .book-table td {
    padding: 8px 10px;
    font-size: 14px;
  }

  .truncate {
    max-width: 120px;
  }

  .book-cover {
    width: 40px;
    height: 60px;
  }
}
</style>
