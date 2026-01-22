// stores/books.js
import { defineStore } from 'pinia'
import { getBooks, updateBook, createBook, deleteBook } from '../services/AuthService' // Your API file

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    currentBook: null,
    loading: false,
    error: null,
  }),
  actions: {
    // Action to fetch all books
    async fetchBooks() {
      this.loading = true;
      try {
        const data = await getBooks();
        this.books = data; 
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // ADD THIS NEW ACTION:
    async fetchBookById(id) {
      this.loading = true;
      this.currentBook = null; // Clear old data
      try {
        // Option A: If books are already loaded, find it locally
        const existingBook = this.books.find(b => String(b.id) === String(id));
        
        if (existingBook) {
          this.currentBook = existingBook;
        } else {
          // Option B: Fetch all books again if the array is empty (e.g., on page refresh)
          await this.fetchBooks();
          this.currentBook = this.books.find(b => String(b.id) === String(id));
        }
        
        if (!this.currentBook) {
          throw new Error("Book not found");
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // Action to update a book
    async updateBook(id, updatedFields){
      this.loading = true;
      try{
        const updatedBook = await updateBook(id, updatedFields);
        // Update the book in the local state
        const index = this.books.findIndex(b => String(b.id) === String(id));
        if(index !== -1){
          this.books[index] = {
            ...updatedBook,
            // status: updatedBook.availability ? 'Available' : 'Borrowed',
            // department: updatedBook.location?.name || 'Unknown'
          }
        }
        return true;
      } catch(err){
        this.error = err.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    // NEW: Create Book
    async createBook(bookData) {
      this.loading = true;
      try {
        const newBook = await createBook(bookData);
        this.books.push(newBook); // Add to local state
        return newBook;
      } catch (err) {
        this.error = err.message;
        throw err; // Re-throw so component can catch
      } finally {
        this.loading = false;
      }
    },

    // Delete a book
    async deleteBook(id) {
      this.loading = true;
      try {
        await deleteBook(id); // Call backend
        // Remove from local state
        this.books = this.books.filter(b => String(b.id) !== String(id));
        if (this.currentBook && String(this.currentBook.id) === String(id)) {
          this.currentBook = null;
        }
        return true;
      } catch (err) {
        this.error = err.message;
        console.error('Delete Book Error:', err);
        return false;
      } finally {
        this.loading = false;
      }
    }
  },
})
