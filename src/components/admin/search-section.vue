<template>
  <div class="search-section d-flex justify-between">
    <form class="d-flex align-center justify-center">
      <div class="search-bar">
        <input type="text" placeholder="Search anything ..." />
        <img src="@/assets/icons/search-logo.svg" alt="" width="20" />
      </div>
    </form>
    <div class="technical-section">
      <button class="btn-notification">
        <img src="@/assets/icons/notification-logo.svg" alt="" width="30" />
      </button>
      <label class="theme-toggle">
        <input type="checkbox" name="" id="themeCheckbox" />
        <span class="theme-slider">
          <img class="theme-icon sun" src="@/assets/icons/sun-light-theme.svg" alt="" />
          <img class="theme-icon moon" src="@/assets/icons/moon-dark-theme.svg" alt="" />
          <span class="theme-knob">
            <img class="theme-knob-icon sun" src="@/assets/icons/sun-light-theme.svg" alt="" />
            <img class="theme-knob-icon moon" src="@/assets/icons/moon-dark-theme.svg" alt="" />
          </span>
        </span>
      </label>
      <div class="divider"></div>
      <div class="account-info">
        <img src="@/assets/images/profile-avatar.jpg" alt="" />
        <div class="account-info-text">
          <span class="account-info-name">Sonavin Rem</span>
          <span class="account-info-email">sonavin.rem@gmail.com</span>
        </div>
        <img src="@/assets/icons/down-arrow.svg" alt="" width="20" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchSection',
  mounted() {
    const themeCheckbox = document.getElementById('themeCheckbox')
    themeCheckbox.addEventListener('change', () => {
      document.body.classList.toggle('dark-theme', themeCheckbox.checked)
    })
  },
}
</script>

<style scoped>
/* Component-specific positioning and checkbox functionality only */
.search-section {
  position: sticky;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 80px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 30px;
}

/* Theme toggle checkbox functionality */
#themeCheckbox:checked ~ .theme-slider .theme-knob {
  transform: translateX(26px);
}

#themeCheckbox:checked ~ .theme-slider .theme-knob .theme-knob-icon.moon {
  opacity: 1;
}

#themeCheckbox:checked ~ .theme-slider .theme-knob .theme-knob-icon.sun {
  opacity: 0;
}
</style>
