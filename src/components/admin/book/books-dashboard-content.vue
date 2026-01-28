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
import api from '@/api'

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
          key: 'total',
          title: 'Total Books',
          count: 0,
          blockColor: '#FFB4A8',
          description: 'Sum books in the inventory',
        },
        {
          key: 'available',
          title: 'Available Books',
          count: 0,
          blockColor: '#A3F7B5',
          description: 'Books currently available for users',
        },
        {
          key: 'reading',
          title: 'Reading Books',
          count: 0,
          blockColor: '#F7C59A',
          description: 'Books currently being read by users',
        },
        {
          key: 'borrowed',
          title: 'Borrowed Books',
          count: 0,
          blockColor: '#F7C59A',
          description: 'Books currently borrowed by users',
        },
        {
          key: 'reserved',
          title: 'Reserved Books',
          count: 0,
          blockColor: '#F7C59A',
          description: 'Books currently reserved by users',
        },
        {
          key: 'lost',
          title: 'Lost/Damaged Books',
          count: 0,
          blockColor: '#F7A3A3',
          description: 'Books currently unavailable for users',
        },
      ],
    }
  },
  methods: {
  async fetchBookCounts() {
    console.log('fetchBookCounts CALLED');
    try {
      const res = await api.get('/admin/books'); // endpoint returns ALL books
      console.log('Backend response:', res.data);

      const books = res.data || [];

      // Initialize counts
      const counts = {
        total: books.length,
        available: 0,
        reading: 0,
        borrowed: 0,
        reserved: 0,
        lost: 0,
      };

      // Count each book by status
      books.forEach((book) => {
        switch (book.status) {
          case 'available':
            counts.available++;
            break;
          case 'reading':
            counts.reading++;
            break;
          case 'borrowed':
            counts.borrowed++;
            break;
          case 'reserved':
            counts.reserved++;
            break;
          case 'lost':
          case 'damaged':
            counts.lost++;
            break;
          default:
            console.warn('Unknown status:', book.status);
        }
      });

      // Update overviews reactive array
      this.overviews.forEach((item) => {
        if (counts[item.key] !== undefined) {
          item.count = counts[item.key];
        }
      });

      console.log('Updated counts:', this.overviews);
    } catch (error) {
      console.error('Failed to fetch book counts', error);
    }
  },
},
mounted() {
  this.fetchBookCounts();
}
}
</script>

<style scoped></style>
