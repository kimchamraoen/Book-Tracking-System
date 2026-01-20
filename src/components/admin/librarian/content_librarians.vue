<script>
import LibrarianInfo_Block from './librarianInfo_Block.vue'
import LibrarianListContent from './librarian-list-content.vue'

export default {
  name: 'ContentLibrarians',
  components: {
    LibrarianInfo_Block,
    LibrarianListContent,
  },
  data() {
    return {
      isDropdownOpen: false,
      selectedSort: 'None',
      selectedKey: 'None',
      selectedValue: null,
      sortLabel: 'None',
      sortOrder: 'asc',
      overviews: [
        {
          title: 'Total Librarians',
          count: 25,
          blockColor: '#3730a3',
          description: 'Total registered library staff',
        },
        {
          title: 'Active Librarians',
          count: 22,
          blockColor: '#3730a3',
          description: 'Currently active librarians',
        },
        {
          title: 'Senior Librarians',
          count: 8,
          blockColor: '#3730a3',
          description: 'Senior-level librarians',
        },
        {
          title: 'Junior Librarians',
          count: 14,
          blockColor: '#3730a3',
          description: 'Junior-level librarians',
        },
        {
          title: 'Part-time Staff',
          count: 3,
          blockColor: '#3730a3',
          description: 'Part-time library staff',
        },
        {
          title: 'On Leave',
          count: 3,
          blockColor: '#3730a3',
          description: 'Staff currently on leave',
        },
      ],
      options: [
        { label: 'Department', key: 'department' },
        { label: 'Role', key: 'role' },
        { label: 'Status', key: 'status' },
        { label: 'Experience', key: 'experience' },
      ],
      facets: {
        department: [
          'Reference',
          'Circulation',
          'Technical Services',
          'Digital Collections',
          'Special Collections',
          'Administration',
        ],
        role: [
          'Head Librarian',
          'Senior Librarian',
          'Librarian',
          'Assistant Librarian',
          'Library Technician',
        ],
        status: ['Active', 'On Leave', 'Part-time', 'Training', 'Inactive'],
        experience: ['0-2 years', '3-5 years', '6-10 years', '11-15 years', '15+ years'],
      },
    }
  },
  methods: {
    goToDetails(title) {
      // Logic to navigate to detailed view
      this.$router.push({ name: 'LibrarianDetails', params: { category: title } })
    },
    setSort(option) {
      this.selectedSort = option
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    selectOption(option) {
      this.selectedSort = option
      this.isDropdownOpen = false
    },
    selectKey(key) {
      this.selectedKey = key
      this.selectedValue = null
      this.sortLabel = `${this.options.find((o) => o.key === key)?.label || 'None'}${
        this.selectedValue ? ' → ' + this.selectedValue : ''
      }`
    },
    titleCase(s) {
      return s ? s[0].toUpperCase() + s.slice(1) : ''
    },
    chooseValue(val) {
      this.selectedValue = val
      this.isDropdownOpen = false
    },
    chooseSort(order) {
      this.sortOrder = order
      this.selectedValue = null
      this.isDropdownOpen = false
    },
  },
}
</script>

<template>
  <div class="content-librarians">
    <div class="heading-section">
      <h1>Overview of Librarians</h1>
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
            <a href="#">Add new Librarian</a>
            <a href="#">See all Librarians</a>
            <a href="#">Update Librarian</a>
            <a href="#">Delete Librarian</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="header">
        <h2>Staff Summary</h2>
        <!-- <div class="line"></div> -->
      </div>
      <div class="each-block">
        <LibrarianInfo_Block
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
        <h2>Librarian List</h2>
        <div class="line"></div>
        <!-- <div class="search-container">
          <div class="search-bar">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search librarian by search term"
            />
            <img src="@/assets/icons/search-logo.svg" alt="Search" width="20" />
          </div>
        </div> -->
      </div>
      <div style="display: flex; justify-content: flex-end;margin-right: 50px;" >
        <div class="add-btn-wrapper">
        <button
          @click.stop="addBook(book.id)"
          class="add-button"
          title="Add New Book"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            class="add-icon"
          >
            <path
              fill="currentColor"
              d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"
            />
          </svg>
        </button>
        </div>
      </div>
      <div class="librarianlist-section">
        <div class="sort-menu-btn"></div>
        <LibrarianListContent
          :sortKey="selectedKey"
          :sortOrder="sortOrder"
          :filterValue="selectedValue"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-librarians {
  width: 100%;
  /* box-sizing: border-box; */
  overflow: scroll;
}

.heading-buttons {
  display: flex;
  gap: 10px;
}

.section-block {
  margin-bottom: 30px;
}

.librarianlist-section {
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
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
  transition: transform 0.15s ease, background-color 0.15s ease;
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
  .heading-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .heading-buttons {
    width: 100%;
    justify-content: flex-start;
  }

  .each-block {
    grid-template-columns: 1fr;
  }

  .two-col {
    flex-direction: column;
    min-width: 250px;
  }

  .dd-col.options {
    border-right: none;
    border-bottom: 1px solid #eee;
  }
}
</style>
