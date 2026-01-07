<script>
import { ref, onMounted, onUnmounted } from 'vue'
import MemberInfo_Block from './memberInfo_Block.vue'
import MemberListContent from './member-list-content.vue'
import { useGlobalSearch } from '@/composables/useGlobalSearch.js'

export default {
  name: 'ContentMembers',
  components: {
    MemberInfo_Block,
    MemberListContent,
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
        title: 'Total Members',
        count: 320,
        blockColor: '#09408f',
        description: 'Total registered library members',
      },
      {
        title: 'Active Members',
        count: 280,
        blockColor: '#4e96fc',
        description: 'Currently active members',
      },
      {
        title: 'Inactive Members',
        count: 15,
        blockColor: '#09408f',
        description: 'Members with Inactive accounts',
      },
      {
        title: 'Faculty Members',
        count: 45,
        blockColor: '#09408f',
        description: 'Professor members',
      },
      {
        title: 'Student Members',
        count: 150,
        blockColor: '#09408f',
        description: 'Student members',
      },
      {
        title: 'Guest Members',
        count: 85,
        blockColor: '#09408f',
        description: 'Outsiders of the institute',
      },
    ])

    const options = ref([
      { label: 'Department', key: 'department' },
      { label: 'Role', key: 'role' },
      { label: 'Status', key: 'status' },
      { label: 'Name', key: 'name' },
    ])

    const facets = ref({
      department: [
        'Computer Science',
        'Literature',
        'Mathematics',
        'Physics',
        'Engineering',
        'Biology',
        'Chemistry',
        'History',
        'Psychology',
        'Business',
      ],
      role: ['Student', 'Professor', 'Admin', 'Librarian', 'Guest'],
      status: ['Active', 'Inactive', 'Expired', 'Pending', 'Blocked'],
      name: [], // Names will be dynamically populated
    })

    // Methods
    const goToDetails = () => {
      // Logic to navigate to detailed view
      // this.$router.push({ name: 'MemberDetails', params: { category: title } })
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
  <div class="content-members">
    <div class="heading-section">
      <h1>Overview of Members</h1>
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
            <a href="#">Add new Member</a>
            <a href="#">See all Members</a>
            <a href="#">Update Member</a>
            <a href="#">Delete Member</a>
          </div>
        </div>
      </div>
    </div>
    <div class="section-block">
      <div class="header">
        <h2>Member Summary</h2>
        <div class="line"></div>
      </div>
      <div class="each-block">
        <MemberInfo_Block
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
        <h2>Member List</h2>
        <div class="line"></div>
        <div class="search-container">
          <div class="search-bar">
            <input v-model="searchQuery" type="text" placeholder="Search member by search term" />
            <img src="@/assets/icons/search-logo.svg" alt="Search" width="20" />
          </div>
        </div>
      </div>
      <div class="memberlist-section">
        <div class="sort-menu-btn"></div>
        <MemberListContent
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
.content-members {
  width: 100%;
  box-sizing: border-box;
  overflow: scroll;
}

.memberlist-section {
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
}
</style>
