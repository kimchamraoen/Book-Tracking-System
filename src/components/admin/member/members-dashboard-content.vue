<template>
  <div class="section-block">
    <div class="header">
      <h2>Inventory Summary</h2>
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
    </div>
    <div class="Memberlist-section">
      <div class="sort-menu-btn"></div>
      <MemberlistContent
        :sortKey="selectedKey"
        :sortOrder="sortOrder"
        :filterValue="selectedValue"
      />
    </div>
  </div>
</template>

<script>
import MemberInfo_Block from './memberInfo_Block.vue'
import MemberlistContent from './memberlist-content.vue'
export default {
  name: 'MembersDashboardContent',
  components: {
    MemberInfo_Block,
    MemberlistContent,
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
          title: 'Total Members',
          count: 1250,
          blockColor: '#AEDFF7',
          description: 'Number of Members in the inventory',
        },
        {
          title: 'Available Members',
          count: 850,
          blockColor: '#A3F7B5',
          description: 'Members currently available for users',
        },
        {
          title: 'Reading Members',
          count: 300,
          blockColor: '#F7C59A',
          description: 'Members currently being read by users',
        },
        {
          title: 'Borrowed Members',
          count: 300,
          blockColor: '#F7C59A',
          description: 'Members currently Borrowed by users',
        },
        {
          title: 'Reserved Members',
          count: 300,
          blockColor: '#F7C59A',
          description: 'Members currently Reserved by users',
        },
        {
          title: 'Lost/Damaged Members',
          count: 100,
          blockColor: '#F7A3A3',
          description: 'Members currently unavailable for users',
        },
      ],
    }
  },
  methods: {
    goToDetails(title) {
      // Logic to navigate to detailed view
      this.$router.push({ name: 'MemberDetails', params: { category: title } })
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
