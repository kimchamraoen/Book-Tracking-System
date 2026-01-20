<script>
import { ref, onMounted, onUnmounted } from 'vue'
import ReturningInfo_Block from './returningInfo_Block.vue'
import ReturningListContent from './returning-list-content.vue'
import { useGlobalSearch } from '@/composables/useGlobalSearch.js'

export default {
  name: 'ContentReturning',
  components: {
    ReturningInfo_Block,
    ReturningListContent,
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
        title: 'Total Returns',
        count: 1250,
        blockColor: '#3730a3',
        description: 'Total number of books returned',
      },
      {
        title: 'Today Returns',
        count: 45,
        blockColor: '#3730a3',
        description: 'Books returned today',
      },
      {
        title: 'Late Returns',
        count: 18,
        blockColor: '#3730a3',
        description: 'Books returned after due date',
      },
      {
        title: 'Damaged Returns',
        count: 8,
        blockColor: '#3730a3',
        description: 'Books returned with damage',
      },
      {
        title: 'On-time Returns',
        count: 1184,
        blockColor: '#3730a3',
        description: 'Books returned',
      },
      {
        title: 'This Week',
        count: 287,
        blockColor: '#3730a3',
        description: 'Books returned this week',
      },
    ])

    const options = ref([
      { label: 'Return Status', key: 'returnStatus' },
      { label: 'Return Date', key: 'returnDate' },
      { label: 'Member Type', key: 'memberType' },
      { label: 'Condition', key: 'condition' },
    ])

    const facets = ref({
      returnStatus: ['On Time', 'Late', 'Very Late', 'Overdue'],
      returnDate: ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month'],
      memberType: ['Student', 'Faculty', 'Staff', 'Guest', 'Researcher'],
      condition: ['Good', 'Fair', 'Damaged', 'Lost'],
    })

    // Methods
    const goToDetails = () => {
      // Logic to navigate to detailed view
      // this.$router.push({ name: 'ReturningDetails', params: { category: title } })
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
  <div class="content-returning">
    <div class="heading-section">
      <h1>Overview of Returning</h1>
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
            <a href="#">Process Return</a>
            <a href="#">View All Returns</a>
            <a href="#">Late Returns Report</a>
            <a href="#">Damaged Books Report</a>
            <a href="#">Return Statistics</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="header">
        <h2>Returning Summary</h2>
        <!-- <div class="line"></div> -->
      </div>
      <div class="each-block">
        <ReturningInfo_Block
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
        <h2>Return Records</h2>
        <div class="line"></div>
        <!-- <div class="search-container">
          <div class="search-bar">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search returns by a search term"
            />
            <img src="@/assets/icons/search-logo.svg" alt="Search" width="20" />
          </div>
        </div> -->
      </div>
      <div class="returninglist-section">
        <div class="sort-menu-btn"></div>
        <ReturningListContent
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
.content-returning {
  width: 100%;
  box-sizing: border-box;
  overflow: scroll;
}

.returninglist-section {
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
