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
          blockColor: '#AEDFF7',
          description: 'Total registered library staff',
        },
        {
          title: 'Active Librarians',
          count: 22,
          blockColor: '#A3F7B5',
          description: 'Currently active librarians',
        },
        {
          title: 'Senior Librarians',
          count: 8,
          blockColor: '#E6E6FA',
          description: 'Senior-level librarians',
        },
        {
          title: 'Junior Librarians',
          count: 14,
          blockColor: '#FFE4B5',
          description: 'Junior-level librarians',
        },
        {
          title: 'Part-time Staff',
          count: 3,
          blockColor: '#F7C59A',
          description: 'Part-time library staff',
        },
        {
          title: 'On Leave',
          count: 3,
          blockColor: '#F7A3A3',
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
            <a href="#">Manage Schedules</a>
          </div>
        </div>
      </div>
    </div>
    <div class="section-block">
      <div class="header">
        <h2>Staff Summary</h2>
        <div class="line"></div>
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
    <div class="section-block">
      <div class="header">
        <h2>Librarian List</h2>
        <div class="line"></div>
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
  box-sizing: border-box;
  overflow: scroll;
}

.heading-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.heading-section h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.heading-buttons {
  display: flex;
  gap: 10px;
}

.drop-down {
  position: relative;
  display: inline-block;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 14px;
}

.btn1 {
  background-color: #007bff;
  color: white;
}

.btn1:hover {
  background-color: #0056b3;
}

.btn2 {
  background-color: #28a745;
  color: white;
}

.btn2:hover {
  background-color: #1e7e34;
}

.btn img {
  width: 16px;
  height: 16px;
}

.drop-down-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1;
  top: 100%;
  right: 0;
  border: 1px solid #ddd;
}

.hover-open:hover .drop-down-content {
  display: block;
}

.two-col {
  display: flex;
  min-width: 400px;
}

.dd-col {
  flex: 1;
}

.dd-col.options {
  border-right: 1px solid #eee;
}

.drop-down-content a {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.2s ease;
}

.drop-down-content a:hover,
.drop-down-content a.active {
  background-color: #f8f9fa;
  color: #007bff;
}

.submenu-section {
  padding: 8px 0;
}

.submenu-title {
  padding: 8px 16px;
  font-weight: 600;
  color: #666;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-block {
  margin-bottom: 30px;
}

.header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.line {
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, #007bff, #28a745);
  border-radius: 1px;
}

.each-block {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.librarianlist-section {
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
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
