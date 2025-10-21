import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    selectedBook: null,
    loading: false,
    error: null,
  }),

  getters: {
    getBookById: (state) => (id) => {
      return state.books.find((book) => book.id === id)
    },

    getBooksByGenre: (state) => (genre) => {
      return state.books.filter((book) =>
        Array.isArray(book.genre) ? book.genre.includes(genre) : book.genre === genre,
      )
    },
  },

  actions: {
    // Simulate API call to fetch all books
    async fetchBooks() {
      this.loading = true
      this.error = null

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // In real implementation, this would be:
        // const response = await fetch('/api/books')
        // const data = await response.json()

        // Simulated API response
        this.books = [
          {
            id: 1,
            coverImage: '/src/assets/images/atomic-habit.jpg',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Fiction',
            department: 'GIC',
            shelf: '01',
            isbn: '9780743273565',
            status: 'Available',
            subtitle: 'A Classic American Novel',
            language: 'English',
            description:
              'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City, the novel tells the first-person story of Nick Carraway.',
            publishedYear: 1925,
            pages: 180,
            publisher: 'Scribner',
          },
          {
            id: 2,
            coverImage: '/src/assets/images/atomic-habit.jpg',
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            genre: 'Fiction',
            department: 'GIC',
            shelf: '02',
            isbn: '9780061120084',
            status: 'Borrowed',
            subtitle: 'A Story of Moral Courage',
            language: 'English',
            description:
              'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.',
            publishedYear: 1960,
            pages: 376,
            publisher: 'J.B. Lippincott & Co.',
          },
          {
            id: 3,
            coverImage: '/src/assets/images/atomic-habit.jpg',
            title: '1984',
            author: 'George Orwell',
            genre: 'Dystopian',
            department: 'GAR',
            shelf: '03',
            isbn: '9780451524935',
            status: 'Reserved',
            subtitle: 'A Dystopian Social Science Fiction',
            language: 'English',
            description:
              'Nineteen Eighty-Four is a dystopian social science fiction novel and cautionary tale written by English writer George Orwell.',
            publishedYear: 1949,
            pages: 328,
            publisher: 'Secker & Warburg',
          },
          {
            id: 4,
            coverImage: '/src/assets/images/atomic-habit.jpg',
            title: 'Moby Dick',
            author: 'Herman Melville',
            genre: 'Fiction',
            department: 'GCI',
            shelf: '04',
            isbn: '9781503280786',
            status: 'Lost',
            subtitle: 'The Whale',
            language: 'English',
            description:
              "Moby-Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The book is the sailor Ishmael's narrative of the obsessive quest of Ahab.",
            publishedYear: 1851,
            pages: 635,
            publisher: 'Richard Bentley',
          },
          {
            id: 5,
            coverImage: '/src/assets/images/atomic-habit.jpg',
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            genre: 'Fiction',
            department: 'GIC',
            shelf: '05',
            isbn: '9781503290563',
            status: 'Reading',
            subtitle: 'A Romantic Novel',
            language: 'English',
            description:
              'Pride and Prejudice is an 1813 romantic novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet.',
            publishedYear: 1813,
            pages: 432,
            publisher: 'T. Egerton',
          },
          {
            id: 6,
            coverImage: '/src/assets/images/atomic-habit.jpg',
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            genre: 'Fiction',
            department: 'GIC',
            shelf: '06',
            isbn: '9780316769488',
            status: 'Available',
            subtitle: 'A Coming-of-Age Story',
            language: 'English',
            description:
              'The Catcher in the Rye is a novel by J. D. Salinger, published in 1951. It is widely considered one of the most important American novels of the 20th century.',
            publishedYear: 1951,
            pages: 277,
            publisher: 'Little, Brown and Company',
          },
        ]
      } catch (error) {
        this.error = 'Failed to fetch books'
        console.error('Error fetching books:', error)
      } finally {
        this.loading = false
      }
    },

    // Simulate API call to fetch a specific book by ID
    async fetchBookById(id) {
      this.loading = true
      this.error = null

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        // In real implementation, this would be:
        // const response = await fetch(`/api/books/${id}`)
        // const data = await response.json()

        // Check if we already have this book in our store
        let book = this.getBookById(parseInt(id))

        if (!book) {
          // If not in store, fetch all books first
          await this.fetchBooks()
          book = this.getBookById(parseInt(id))
        }

        this.selectedBook = book
        return book
      } catch (error) {
        this.error = 'Failed to fetch book details'
        console.error('Error fetching book:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    // Update book status (for actions like borrow, return, etc.)
    async updateBookStatus(bookId, newStatus) {
      this.loading = true
      this.error = null

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        // In real implementation, this would be:
        // const response = await fetch(`/api/books/${bookId}/status`, {
        //   method: 'PATCH',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ status: newStatus })
        // })

        // Update in store
        const book = this.books.find((b) => b.id === bookId)
        if (book) {
          book.status = newStatus
        }

        if (this.selectedBook && this.selectedBook.id === bookId) {
          this.selectedBook.status = newStatus
        }

        return true
      } catch (error) {
        this.error = 'Failed to update book status'
        console.error('Error updating book status:', error)
        return false
      } finally {
        this.loading = false
      }
    },

    clearSelectedBook() {
      this.selectedBook = null
    },

    clearError() {
      this.error = null
    },
  },
})
