<script>
import { ref, onMounted, onUnmounted } from 'vue'
import BorrowingInfo_Block from './borrowingInfo_Block.vue'
import BorrowingListContent from './borrowing-list-content.vue'
import { useGlobalSearch } from '@/composables/useGlobalSearch.js'

export default {
  name: 'ContentBorrowing',
  components: {
    BorrowingInfo_Block,
    BorrowingListContent,
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
        title: 'Total Borrowings',
        count: 450,
        blockColor: '#AEDFF7',
        description: 'Total number of active borrowings',
      },
      {
        title: 'Due Today',
        count: 25,
        blockColor: '#F7C59A',
        description: 'Books due for return today',
      },
      {
        title: 'Overdue Books',
        count: 12,
        blockColor: '#F7A3A3',
        description: 'Books past their due date',
      },
      {
        title: 'Extended Loans',
        count: 35,
        blockColor: '#E6E6FA',
        description: 'Loans with extended due dates',
      },
      {
        title: 'Short-term Loans',
        count: 180,
        blockColor: '#A3F7B5',
        description: 'Books borrowed for 7 days or less',
      },
      {
        title: 'Long-term Loans',
        count: 198,
        blockColor: '#FFE4B5',
        description: 'Books borrowed for more than 7 days',
      },
    ])

    const options = ref([
      { label: 'Status', key: 'status' },
      { label: 'Member Type', key: 'memberType' },
      { label: 'Due Date', key: 'dueDate' },
      { label: 'Loan Period', key: 'loanPeriod' },
    ])

    const facets = ref({
      status: ['Active', 'Overdue', 'Due Today', 'Extended', 'Renewed'],
      memberType: ['Student', 'Faculty', 'Staff', 'Guest', 'Researcher'],
      dueDate: ['Today', 'This Week', 'Next Week', 'This Month', 'Overdue'],
      loanPeriod: ['1-3 days', '4-7 days', '1-2 weeks', '2-4 weeks', '1+ months'],
    })

    // Methods
    const goToDetails = () => {
      // Logic to navigate to detailed view
      // this.$router.push({ name: 'BorrowingDetails', params: { category: title } })
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
  <div class="content-borrowing">
    <div class="heading-section">
      <h1>Overview of Borrowing</h1>
      <div class="heading-buttons">
        <div class="drop-down hover-open">
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
          <button class="btn btn2">
            <img src="@/assets/icons/menu-logo.svg" alt="" />Main Menu
          </button>
          <div class="drop-down-content">
            <a href="#">New Borrowing</a>
            <a href="#">View All Borrowings</a>
            <a href="#">Extend Loan</a>
            <a href="#">Return Book</a>
            <a href="#">Overdue Report</a>
          </div>
        </div>
      </div>
    </div>
    <div class="section-block">
      <div class="header">
        <h2>Borrowing Summary</h2>
        <div class="line"></div>
      </div>
      <div class="each-block">
        <BorrowingInfo_Block
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
        <h2>Borrowing Records</h2>
        <div class="line"></div>
        <div class="search-container">
          <div class="search-bar">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search borrowing by a search term"
            />
            <img src="@/assets/icons/search-logo.svg" alt="Search" width="20" />
          </div>
        </div>
      </div>
      <div class="borrowinglist-section">
        <div class="sort-menu-btn"></div>
        <BorrowingListContent
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
.content-borrowing {
  width: 100%;
  box-sizing: border-box;
  overflow: scroll;
}

.borrowinglist-section {
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
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
