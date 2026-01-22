<script>
import { ref, onMounted, onUnmounted } from 'vue'
import BookInfo_Block from './bookInfo_Block.vue'
import booklistContent from './booklist-content.vue'
import { useGlobalSearch } from '@/composables/useGlobalSearch.js'
import { useRouter } from 'vue-router'

export default {
  name: 'ContentBooks',
  components: {
    BookInfo_Block,
    booklistContent,
  },
  setup() {
    const router = useRouter()
    const { registerSearchCallback, unregisterSearchCallback } = useGlobalSearch()

    // Reactive data
    const isDropdownOpen = ref(false)
    const selectedSort = ref('None')
    const selectedKey = ref('None')
    const selectedValue = ref(null)
    const sortLabel = ref('None')
    const sortOrder = ref('asc')
    const searchQuery = ref('')

    const goToCreateBook = () => {
      router.push({ name: 'CreateBook' })
    }

    const overviews = ref([
      {
        title: 'Total Books',
        count: 1250,
        blockColor: '#3730a3',
        description: 'Sum of books in the inventory',
      },
      {
        title: 'Available Books',
        count: 850,
        blockColor: '#3730a3',
        description: 'Books available for users',
      },
      {
        title: 'Reading Books',
        count: 300,
        blockColor: '#3730a3',
        description: 'Books being read by users',
      },
      {
        title: 'Borrowed Books',
        count: 300,
        blockColor: '#3730a3',
        description: 'Books Borrowed by users',
      },
      {
        title: 'Reserved Books',
        count: 300,
        blockColor: '#3730a3',
        description: 'Books Reserved by users',
      },
      {
        title: 'Lost Books',
        count: 100,
        blockColor: '#3730a3',
        description: 'unavailable Books',
      },
    ])

    const options = ref([
      { label: 'Genre', key: 'genre' },
      { label: 'Department', key: 'department' },
      { label: 'Language', key: 'language' },
      { label: 'Status', key: 'status' },
    ])

    const facets = ref({
      genre: [
        'Fiction',
        'Fantasy',
        'Dystopian',
        'Sci-Fi',
        'Romance',
        'Mystery',
        'Biography',
        'History',
        'Children',
        'Horror',
      ],
      department: ['GIC', 'GCA', 'GAR', 'GCI'],
      language: ['English', 'French', 'Spanish', 'German', 'Khmer'],
      status: ['Available', 'Checked Out', 'Reserved', 'Reading', 'Lost'],
    })

    // Methods
    const goToDetails = () => {
      // Logic to navigate to detailed view
      // this.$router.push({ name: 'BookDetails', params: { category: title } })
    }

    const setSort = (option) => {
      selectedSort.value = option
    }

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const selectOption = (option) => {
      selectedSort.value = option
      isDropdownOpen.value = false
    }

    const selectKey = (key) => {
      selectedKey.value = key
      selectedValue.value = null
      sortLabel.value = `${options.value.find((o) => o.key === key)?.label || 'None'}${
        selectedValue.value ? ' → ' + selectedValue.value : ''
      }`
    }

    const titleCase = (s) => {
      return s ? s[0].toUpperCase() + s.slice(1) : ''
    }

    const chooseValue = (val) => {
      selectedValue.value = val
      isDropdownOpen.value = false
    }

    const chooseSort = (order) => {
      sortOrder.value = order
      selectedValue.value = null
      isDropdownOpen.value = false
    }

    // Global search callback
    const handleGlobalSearch = (query) => {
      searchQuery.value = query
    }

    // Register search callback when component mounts
    onMounted(() => {
      registerSearchCallback(handleGlobalSearch)
    })

    // Unregister when component unmounts
    onUnmounted(() => {
      unregisterSearchCallback()
    })

    return {
      isDropdownOpen,
      selectedSort,
      selectedKey,
      selectedValue,
      sortLabel,
      sortOrder,
      searchQuery,
      overviews,
      options,
      facets,
      goToDetails,
      setSort,
      toggleDropdown,
      selectOption,
      selectKey,
      titleCase,
      chooseValue,
      chooseSort,
      goToCreateBook,
    }
  },
}
</script>

<template>
  <div class="content-books">
    <div class="heading-section">
      <h1>Overview of Books</h1>
      <div class="heading-buttons">
        <div class="drop-down hover-open">
          <!-- <div class="drop-down hover-open" @mouseleave="isDropdownOpen = false"> -->
          <button class="btn btn1">
            <img src="@/assets/icons/management-logo.svg" alt="" />
            Sort by: {{ sortLabel }}
          </button>
          <div class="drop-down-content two-col">
            <!-- Left: options -->
            <div class="dd-col options">
              <a
                v-for="opt in options"
                :key="opt.key"
                href="#"
                @click.prevent="selectKey(opt.key)"
                :class="{ active: selectedKey === opt.key }"
              >
                {{ opt.label }}
              </a>
            </div>

            <!-- Right: submenu for selected option -->
            <div class="dd-col panel" v-if="selectedKey !== 'none'">
              <div class="submenu-section">
                <div class="submenu-title">All</div>
                <a
                  href="#"
                  @click.prevent="chooseSort('asc')"
                  :class="{ active: !selectedValue && sortOrder === 'asc' }"
                  >A → Z</a
                >
                <a
                  href="#"
                  @click.prevent="chooseSort('desc')"
                  :class="{ active: !selectedValue && sortOrder === 'desc' }"
                  >Z → A</a
                >
              </div>

              <div class="submenu-section">
                <div class="submenu-title">Only</div>
                <a
                  v-for="val in facets[selectedKey]"
                  :key="val"
                  href="#"
                  @click.prevent="chooseValue(val)"
                  :class="{ active: selectedValue === val }"
                >
                  {{ val }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="drop-down hover-open">
          <!-- <div class="drop-down hover-open" @mouseleave="isDropdownOpen = false"> -->
          <button class="btn btn2">
            <img src="@/assets/icons/menu-logo.svg" alt="" />Main Menu
          </button>
          <div class="drop-down-content">
            <a href="#">Add new Book</a>
            <a href="#">See all Books</a>
            <a href="#">Update Book</a>
            <a href="#">Delete Book</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="header">
        <h2>Inventory Summary</h2>
        <!-- <div class="line"></div> -->
      </div>
      <div class="each-block">
        <BookInfo_Block
          v-for="(overall, index) in overviews"
          :key="index"
          :title="overall.title"
          :count="overall.count"
          :image="overall.image"
          :blockColor="overall.blockColor"
          :description="overall.description"
        />
      </div>
    </div>
    <div>
      <div class="header">
        <h2>Book List</h2>
        <div class="line"></div>
        <!-- <div class="search-container">
          <div class="search-bar">
            <input v-model="searchQuery" type="text" placeholder="Search book by search term" />
            <img src="@/assets/icons/search-logo.svg" alt="Search" width="20" />
          </div>
        </div> -->
      </div>
      <div style="display: flex; justify-content: flex-end; margin-right: 50px">
        <div class="add-btn-wrapper">
          <button @click.stop="goToCreateBook" class="add-button" title="Add New Book">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="add-icon">
              <path
                fill="currentColor"
                d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="booklist-section">
        <div class="sort-menu-btn"></div>
        <booklistContent
          :sortKey="selectedKey"
          :sortOrder="sortOrder"
          :filterValue="selectedValue"
          :searchQuery="searchQuery"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-books {
  width: 100%;
  /* box-sizing: border-box; */
  overflow: scroll;
}

.booklist-section {
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
  /* overflow: scroll; */
}

.add-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}

.add-button {
  background: none;
  border: none;
  padding: 6px;
  border-radius: 5px;
  background-color: #3730a3;
  display: flex;
  align-items: center;
  justify-content: center;

  /* cursor: pointer; */
  transition:
    transform 0.15s ease,
    background-color 0.15s ease;
}

.add-button:hover {
  /* background-color: rgba(28, 12, 130, 0.08); */
  transform: scale(1.08);
}

.add-button:active {
  transform: scale(0.95);
}

.add-icon {
  width: 24px;
  height: 24px;
  color: #f5f5f8;
  transition: color 0.15s ease;
}

/* Responsive design */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .search-container {
    width: 100%;
    max-width: none;
    margin: 0;
  }

  .line {
    width: 100%;
  }
}
</style>
