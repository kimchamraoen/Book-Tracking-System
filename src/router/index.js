import { createRouter, createWebHistory } from 'vue-router'

const Dashboard = () => import('../pages/admin/dashboard.vue')
const Books = () => import('../pages/admin/books.vue')
const BookDetails = () => import('../components/admin/book/bookDetail_content.vue')
const BooksContent = () => import('../components/admin/book/content_books.vue')
const Members = () => import('../pages/admin/members.vue')
const MemberDetails = () => import('../components/admin/member/memberDetail_content.vue')
const MembersContent = () => import('../components/admin/member/content_members.vue')
const Librarians = () => import('../pages/admin/librarians.vue')
const LibrariansContent = () => import('../components/admin/librarian/content_librarians.vue')

// TODO: Add these imports when the files are created
// const Borrowing = () => import('../pages/admin/borrowing.vue')
// const BorrowingContent = () => import('../components/admin/borrowing/content_borrowing.vue')
// const BorrowingDetails = () => import('../components/admin/borrowing/borrowingDetail_content.vue')
// const Returning = () => import('../pages/admin/returning.vue')
// const ReturningContent = () => import('../components/admin/returning/content_returning.vue')
// const Reserving = () => import('../pages/admin/reserving.vue')
// const ReservingContent = () => import('../components/admin/reserving/content_reserving.vue')
// const Reading = () => import('../pages/admin/reading.vue')
// const ReadingContent = () => import('../components/admin/reading/content_reading.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/admin/dashboard',
      meta: { title: 'BTS - Dashboard' },
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: Dashboard,
      meta: { title: 'BTS - Dashboard' },
    },
    {
      path: '/admin/books',
      name: 'AdminBooks',
      component: Books,
      meta: { title: 'BTS - Books' },
      children: [
        {
          path: '', // ✅ default route when visiting /admin/books
          name: 'BooksContent',
          component: BooksContent,
          meta: { title: 'BTS - Books Overview' },
        },
        {
          path: ':id',
          name: 'BookDetails',
          component: BookDetails,
          props: true,
          meta: { title: 'BTS - Book Details' },
        },
      ],
    },
    {
      path: '/admin/members',
      name: 'AdminMembers',
      component: Members,
      meta: { title: 'BTS - Members' },
      children: [
        {
          path: '', // ✅ default route when visiting /admin/members
          name: 'MembersContent',
          component: MembersContent,
          meta: { title: 'BTS - Members Overview' },
        },
        {
          path: ':id',
          name: 'MemberDetails',
          component: MemberDetails,
          props: true,
          meta: { title: 'BTS - Member Details' },
        },
      ],
    },
    {
      path: '/admin/librarians',
      name: 'AdminLibrarians',
      component: Librarians,
      meta: { title: 'BTS - Librarians' },
      children: [
        {
          path: '', // default route when visiting /admin/librarians
          name: 'LibrariansContent',
          component: LibrariansContent,
          meta: { title: 'BTS - Librarians Overview' },
        },
      ],
    },
    // TODO: Add these routes when the files are created
    // {
    //   path: '/admin/borrowing',
    //   name: 'AdminBorrowing',
    //   component: Borrowing,
    //   meta: { title: 'BTS - Borrowing' },
    //   children: [
    //     {
    //       path: '',
    //       name: 'BorrowingContent',
    //       component: BorrowingContent,
    //       meta: { title: 'BTS - Borrowing Overview' },
    //     },
    //     {
    //       path: ':id',
    //       name: 'BorrowingDetails',
    //       component: BorrowingDetails,
    //       props: true,
    //       meta: { title: 'BTS - Borrowing Details' },
    //     },
    //   ],
    // },
  ],
  scrollBehavior() {
    return { top: 0 } // always scroll to top
  },
  linkActiveClass: 'is-selected',
})

export default router
