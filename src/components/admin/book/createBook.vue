<template>
  <div class="page-container">
    <transition name="fade">
      <div v-if="loading" class="loader-wrapper">
        <div class="heart-loader"></div>
        <p>Preparing your new book...</p>
      </div>

      <div v-else class="glass-card">
        <div class="header-section">
          <h2>Create Book</h2>
        </div>

        <form @submit.prevent="handleSave" class="form-content">
          <div class="input-group">
            <label>Book Title</label>
            <input v-model="formData.title" type="text" placeholder="e.g. The Great Gatsby" required />
          </div>

          <div class="input-row">
            <div class="input-group">
              <label>Author</label>
              <input v-model="formData.author" type="text" required />
            </div>
            <div class="input-group">
              <label>Item No.</label>
              <input v-model="formData.itemNumber" type="text" />
            </div>
            <div class="input-group">
                <label>ISBN</label>
                <input v-model="formData.isbn" type="text" placeholder="Auto-generated" readonly />
            </div>
          </div>

          <div class="input-row">
            <div class="input-group">
              <label>CLL No.</label>
              <input v-model="formData.cllNumber" type="text" />
            </div>
            <div class="input-group">
              <label>Status</label>
              <select v-model="formData.status">
                <option value="available">Available</option>
                <option value="reading">Reading</option>
                <option value="borrowed">Borrowed</option>
                <option value="reserved">Reserved</option>
                <option value="lost">Lost</option>
              </select>
            </div>  
          </div>

          <div class="action-footer">
            <button type="button" class="btn-cancel" @click="$router.back()">
              Cancel
            </button>
            <button type="submit" class="btn-save" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Create Book' }}
            </button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { useBooksStore } from '@/stores/books';

export default {
  data() {
    return {
      booksStore: useBooksStore(),
      formData: {
        title: '',
        author: '',
        genre: 'Fantasy',
        department: '',
        availability: true,
        isbn: this.generateISBN()
      },
      isSaving: false
    }
  },
  computed: {
    loading() { return this.booksStore.loading }
  },
  methods: {
    generateISBN() {
        // Simple random 13-digit ISBN
        return '978' + Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
    },
    async handleSave() {
        this.isSaving = true;
        try {
        await this.booksStore.createBook(this.formData);
        alert('Book created successfully!');
        this.$router.push({ name: 'BooksContent' });
        } catch (err) {
        console.error('Create Book Error:', err.response || err);
        alert('Failed to create book. Check console for details.');
        } finally {
        this.isSaving = false;
        }
    }
  }
}
</script>

<style scoped>

.page-container {
  width: 100%;
  min-height: 80%;
  padding: 40px;
  background: white;   /* FULL WHITE BACKGROUND */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}


.glass-card {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  overflow: hidden;
}


.header-section {
  background: linear-gradient(to right, #667eea, #764ba2);
  padding: 30px;
  color: white;
  text-align: center;
}

.header-section h2 {
  margin: 0;
  font-weight: 600;
  letter-spacing: 1px;
}

.isbn-tag {
  font-size: 0.8rem;
  opacity: 0.8;
  background: rgba(255,255,255,0.2);
  padding: 2px 10px;
  border-radius: 20px;
  margin-top: 8px;
  display: inline-block;
}

.form-content {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5568;
  margin-left: 5px;
}

input, select {
  padding: 12px 15px;
  border: 2px solid #edf2f7;
  border-radius: 12px;
  transition: all 0.3s ease;
  outline: none;
  font-size: 0.95rem;
}

input:focus, select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
}

.active-text {
  color: #48bb78;
  font-weight: 600;
}

/* Custom Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
}

.switch input { opacity: 0; width: 0; height: 0; }

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #cbd5e0;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px; width: 16px;
  left: 3px; bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider { background-color: #48bb78; }
input:checked + .slider:before { transform: translateX(22px); }

.action-footer {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.btn-save {
  flex: 2;
  background: #667eea;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-cancel {
  flex: 1;
  background: #f7fafc;
  color: #718096;
  border: 1px solid #edf2f7;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

.btn-save:hover {
  transform: translateY(-2px);
  background: #5a67d8;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Lovely Heart Loader */
.heart-loader {
  width: 50px;
  height: 50px;
  background-color: #667eea;
  margin: 0 auto 20px;
  animation: pulse 1.2s infinite;
  clip-path: path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
