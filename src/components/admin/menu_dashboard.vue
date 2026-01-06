<template>
  <div class="menu-dashboard">
    <div class="nav-page-list">
      <div class="profile-div">
        <img src="@/assets/images/lib_itc_profile.png" alt="" width="100" class="profile" />
      </div>
      <span>NAVIGATION</span>
      <ul>
        <li>
          <router-link to="/admin/dashboard"
            ><img src="@/assets/icons/dashboard-logo.svg" alt="" />Dashboard</router-link
          >
        </li>
        <li>
          <router-link to="/admin/books"
            ><img src="@/assets/icons/books-logo.svg" alt="" />Books</router-link
          >
        </li>
        <li>
          <router-link to="/admin/members"
            ><img src="@/assets/icons/users-logo.svg" alt="" />Members</router-link
          >
        </li>
        <li>
          <router-link to="/admin/librarians"
            ><img src="@/assets/icons/users-logo.svg" alt="" />Librarians</router-link
          >
        </li>
        <li>
          <router-link to="/admin/borrowings"
            ><img src="@/assets/icons/circulation-logo.svg" alt="" />Borrowing</router-link
          >
        </li>
        <li>
          <router-link to="/admin/returnings"
            ><img src="@/assets/icons/circulation-logo.svg" alt="" />Returnings</router-link
          >
        </li>
        <li>
          <router-link to="/admin/reservings"
            ><img src="@/assets/icons/circulation-logo.svg" alt="" />Reservings</router-link
          >
        </li>
        <li>
          <router-link to="/admin/readings"
            ><img src="@/assets/icons/read-svg.svg" alt="" />Readings</router-link
          >
        </li>
        <li>
          <router-link to="/admin/Tracking"
            ><img src="@/assets/icons/location-logo.svg" alt="" />Tracking</router-link
          >
        </li>
        <!-- <li>
          <router-link to="/admin/analytics"
            ><img src="@/assets/icons/analytic-logo.svg" alt="" />Analytics</router-link
          >
        </li>
        <li>
          <router-link to="/admin/inbox"
            ><img src="@/assets/icons/inbox-logo.svg" alt="" />Inbox</router-link
          >
        </li> -->
      </ul>
      <span>PREFERENCES</span>
      <ul>
        <!-- <li>
          <router-link to="/admin/settings"
            ><img src="@/assets/icons/setting-logo.svg" alt="" />Settings</router-link
          >
        </li>
        <li>
          <router-link to="/admin/help"
            ><img src="@/assets/icons/help-logo.svg" alt="" />Help</router-link
          >
        </li> -->
        <li>
          <router-link to="/admin/profile"
            ><img src="@/assets/icons/profile-logo.svg" alt="" />Profile</router-link
          >
        </li>
      </ul>
    </div>
    <!-- <button class="logout-btn">
      <router-link to="/admin/logout"
        ><img src="@/assets/icons/logout-logo.svg" alt="" />Logout</router-link
      >
    </button> -->
  </div>
</template>

<script>
export default {
  name: 'AdminMenuDashboard',
}
</script>

<style scoped>
.menu-dashboard {
  padding: 20px;
  background-color: #c8efff;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 100vh;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid #9e9e9e;
}
.profile-div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile {
  width: 100px;
  border-radius: 50%;
  border: 2px solid #9e9e9e;
}
.nav-page-list {
  width: 200px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.nav-page-list span {
  color: #979797;
  font-weight: 600;
  font-size: 13px;
  margin-top: 40px;
}
.nav-page-list ul {
  list-style: none;
}
.nav-page-list li {
  margin: 5px 0;
}
.nav-page-list li a {
  display: flex; /* Arrange icon and text in a row */
  align-items: center; /* Vertically center them */
  gap: 10px;
  border-radius: 10px;
  padding: 5px 10px;
  text-decoration: none;
  color: #333;
}
img {
  width: 25px;
  margin-right: 10px;
  vertical-align: middle;
}
.nav-page-list li a:hover {
  background-color: #def7ff;
}

.is-selected {
  background-color: #def7ff;
  font-weight: bold;
}
</style>
