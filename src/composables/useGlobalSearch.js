import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Global search state
const globalSearchQuery = ref('')
const searchCallbacks = ref(new Map())

export function useGlobalSearch() {
  const route = useRoute()

  // Register a search callback for the current route
  const registerSearchCallback = (callback) => {
    const routeName = route.name
    searchCallbacks.value.set(routeName, callback)
  }

  // Unregister search callback when component unmounts
  const unregisterSearchCallback = () => {
    const routeName = route.name
    searchCallbacks.value.delete(routeName)
  }

  // Set global search query and trigger search on active page
  const setGlobalSearch = (query) => {
    globalSearchQuery.value = query
    const routeName = route.name
    const callback = searchCallbacks.value.get(routeName)

    if (callback && typeof callback === 'function') {
      callback(query)
    }
  }

  // Get current search query
  const getSearchQuery = computed(() => globalSearchQuery.value)

  // Clear search
  const clearSearch = () => {
    globalSearchQuery.value = ''
    const routeName = route.name
    const callback = searchCallbacks.value.get(routeName)

    if (callback && typeof callback === 'function') {
      callback('')
    }
  }

  // Get placeholder text based on current route
  const getPlaceholder = computed(() => {
    const routeName = route.name
    const placeholders = {
      BooksContent: 'Search books by title, author, ISBN...',
      MembersContent: 'Search members by name, email, department...',
      LibrariansContent: 'Search librarians by name, department, role...',
      AdminDashboard: 'Search dashboard activities...',
      BookDetails: 'Search book details...',
      MemberDetails: 'Search member activities...',
    }

    return placeholders[routeName] || 'Search anything...'
  })

  return {
    globalSearchQuery: getSearchQuery,
    registerSearchCallback,
    unregisterSearchCallback,
    setGlobalSearch,
    clearSearch,
    getPlaceholder,
  }
}
