<template>
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
    </div>
    <div class="booklist-section">
      <div class="sort-menu-btn"></div>
      <booklistContent :sortKey="selectedKey" :sortOrder="sortOrder" :filterValue="selectedValue" />
    </div>
  </div>
</template>

<script>
import BookInfo_Block from './bookInfo_Block.vue'
import booklistContent from './booklist-content.vue'
export default {
  name: 'BooksDashboardContent',
  components: {
    BookInfo_Block,
    booklistContent,
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
          title: 'Total Books',
          count: 1250,
          blockColor: '#AEDFF7',
          description: 'Number of books in the inventory',
        },
        {
          title: 'Available Books',
          count: 850,
          blockColor: '#A3F7B5',
          description: 'Books currently available for users',
        },
        {
          title: 'Reading Books',
          count: 300,
          blockColor: '#F7C59A',
          description: 'Books currently being read by users',
        },
        {
          title: 'Borrowed Books',
          count: 300,
          blockColor: '#F7C59A',
          description: 'Books currently Borrowed by users',
        },
        {
          title: 'Reserved Books',
          count: 300,
          blockColor: '#F7C59A',
          description: 'Books currently Reserved by users',
        },
        {
          title: 'Lost/Damaged Books',
          count: 100,
          blockColor: '#F7A3A3',
          description: 'Books currently unavailable for users',
        },
      ],
    }
  },
  methods: {
    goToDetails(title) {
      // Logic to navigate to detailed view
      this.$router.push({ name: 'BookDetails', params: { category: title } })
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
