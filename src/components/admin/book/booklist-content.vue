<template>
  <div class="table-list-container">
    <table class="data-table" style="max-width: 75rem">
      <thead>
        <tr>
          <th>Cover</th>
          <th>ISBN</th>
          <th>Title</th>
          <th>Author</th>
          <th>Item No.</th>
          <th>CLL No.</th>
          <th>Department</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="booksStore.loading">
          <td colspan="9" class="table-loading">Loading books...</td>
        </tr>

        <tr v-else-if="booksStore.error">
          <td colspan="9" class="table-error">
            {{ booksStore.error }}
            <button @click="booksStore.fetchBooks()" class="retry-btn">Retry</button>
          </td>
        </tr>

        <tr v-for="book in sortedBooks" :key="book.id" @click="viewBook(book.id)">
          <td>
            <img :src="book.coverImage || '/placeholder.png'" alt="Cover" class="table-image" />
          </td>
          <td class="truncate-sm">{{ book.isbn }}</td>
          <td class="truncate">{{ book.title }}</td>
          <td class="truncate">{{ book.author }}</td>

          <td class="truncate">{{ book.itemNumber }}</td>
          <td class="truncate">{{ book.cllNumber }}</td>

          <td class="truncate">{{ book.location?.name || 'N/A' }}</td>

          <td>
            <span :class="['status-chip', statusClass(book.status)]">
              {{ book.status }}
            </span>
          </td>
          <td class="actions-cell">
            <div style="display: flex; gap: 10px">
              <button @click.stop="viewBook(book.id)" title="View Details">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  style="width: 18px; height: 18px"
                >
                  <path
                    d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"
                  />
                </svg>
              </button>
              <button @click.stop="editBook(book.id)" title="Edit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  style="width: 18px; height: 18px"
                >
                  <path
                    d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"
                  />
                </svg>
              </button>
              <button @click.stop="handleDelete(book.id)" title="Delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  style="width: 18px; height: 18px"
                >
                  <path
                    d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>

        <tr v-if="!booksStore.loading && !booksStore.error && sortedBooks.length === 0">
          <td colspan="9" class="table-empty">No books found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useBooksStore } from '../../../stores/books.js'

export default {
  name: 'BookListContent',
  setup() {
    const booksStore = useBooksStore()
    return { booksStore }
  },
  computed: {
    // This creates the array for the v-for
    sortedBooks() {
      // Always check if it's an array first to prevent "undefined" errors
      if (!this.booksStore.books || !Array.isArray(this.booksStore.books)) return []

      return [...this.booksStore.books].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },
  },
  async mounted() {
    // Fetch data immediately when the table is displayed
    await this.booksStore.fetchBooks()
  },
  methods: {
    statusClass(status) {
      if (!status) return 'default'
      return status.toLowerCase() // matches CSS: .available, .borrowed, etc.
    },
    viewBook(id) {
      this.$router.push(`/admin/books/${id}`)
    },
    editBook(id) {
      this.$router.push(`/admin/books/edit/${id}`)
    },
    async handleDelete(id) {
      if (confirm('Delete this book forever?')) {
        await this.booksStore.deleteBook(id)
      }
    },
  },
}
</script>

<style scoped>
button {
  background: none;
  border: none;
}
tr th {
  color: aliceblue;
  background-color: #3730a3;
}
</style>
