<script>
import { ref, onMounted, onUnmounted } from 'vue'
import BookInfo_Block from './bookInfo_Block.vue'
import booklistContent from './booklist-content.vue'
import { useGlobalSearch } from '@/composables/useGlobalSearch.js'

export default {
  name: 'ContentBooks',
  components: {
    BookInfo_Block,
    booklistContent,
  },
  setup() {
    const { registerSearchCallback, unregisterSearchCallback } = useGlobalSearch()

    // Reactive data
    const isDropdownOpen = ref(false)
    const selectedSort = ref('None')
    const selectedKey = ref('None')
    const selectedValue = ref(null)
    const sortLabel = ref('None')
    const sortOrder = ref('asc')
    const searchQuery = ref('')

    const overviews = ref([
      {
        title: 'Total Books',
        count: 1250,
        blockColor: '#AEDFF7',
        description: 'Number of books in the inventory',
      },
      {
        title: 'Available Books',
        count: 850,
        blockColor: '#A3F7B5',
        description: 'Books available for users',
      },
      {
        title: 'Reading Books',
        count: 300,
        blockColor: '#F7C59A',
        description: 'Books being read by users',
      },
      {
        title: 'Borrowed Books',
        count: 300,
        blockColor: '#F7C59A',
        description: 'Books Borrowed by users',
      },
      {
        title: 'Reserved Books',
        count: 300,
        blockColor: '#F7C59A',
        description: 'Books Reserved by users',
      },
      {
        title: 'Lost Books',
        count: 100,
        blockColor: '#F7A3A3',
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
    <div class="section-block">
      <div class="header">
        <h2>Inventory Summary</h2>
        <div class="line"></div>
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
    <div class="section-block">
      <div class="header">
        <h2>Book List</h2>
        <div class="line"></div>
        <div class="search-container">
          <div class="search-bar">
            <input v-model="searchQuery" type="text" placeholder="Search book by search term" />
            <img src="@/assets/icons/search-logo.svg" alt="Search" width="20" />
          </div>
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
  box-sizing: border-box;
  overflow: scroll;
}

.booklist-section {
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
  /* overflow: scroll; */
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

  .each-block{
    width: fit-content;
    height: 20rem;
  }
}
</style>
