<template>
  <div class="search-section">
    <form action="">
      <div class="search-bar">
        <input type="text" placeholder="Search anything ..." />
        <img src="@/assets/icons/search-logo.svg" alt="" width="20" />
      </div>
    </form>
    <div class="technical-section">
      <button class="noti-btn">
        <img src="@/assets/icons/notification-logo.svg" alt="" width="30" />
      </button>
      <label class="theme-toggle">
        <input type="checkbox" name="" id="themeCheckbox" />
        <span class="slider">
          <img class="theme-icon sun" src="@/assets/icons/sun-light-theme.svg" alt="" />
          <img class="theme-icon moon" src="@/assets/icons/moon-dark-theme.svg" alt="" />
          <span class="knob"
            ><img class="knob-icon sun" src="@/assets/icons/sun-light-theme.svg" alt="" />
            <img class="knob-icon moon" src="@/assets/icons/moon-dark-theme.svg" alt=""
          /></span>
        </span>
      </label>
      <div class="divider"></div>
      <div class="account-info">
        <img src="@/assets/images/profile-avatar.jpg" alt="" />
        <div class="name-email-info">
          <span class="name">Sonavin Rem</span>
          <span class="email">sonavin.rem@gmail.com</span>
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
.search-section {
  width: 100%;
  padding: 10px;
  border: 2px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
}
.search-bar {
  display: flex;
  position: relative;
  flex: 1;
  width: 600px;
}
.search-bar img {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.search-bar input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
}
.search-bar input:focus {
  outline: none;
  border-color: blue;
  box-shadow: 0 0 5px rgba(200, 239, 255, 0.5);
}
form {
  display: flex;
  align-items: center;
  justify-content: center;
}
.noti-btn {
  padding: 5px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  color: black;
  border-radius: 10px;
  cursor: pointer;
  /* height: 100%; */
  width: 50px;
}
.noti-btn:hover {
  background-color: #c8efff;
}

.technical-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
}
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 45px;
  cursor: pointer;
}
.theme-toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 5px 15px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.4s;
}

.theme-icon {
  width: 20px;
  height: 20px;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.theme-icon.sun {
  opacity: 0;
}
.theme-icon.moon {
  opacity: 0.2;
}
.knob {
  position: absolute;
  left: 6px;
  width: 33px;
  height: 33px;
  border-radius: 7px;
  background-color: #c8efff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
  transform: translateX(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.knob-icon.sun {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 1;
}
.knob-icon.moon {
  width: 20px;
  height: 20px;
  opacity: 0;
}

input:checked + .slider .theme-icon.sun {
  opacity: 0.2;
}
input:checked + .slider .theme-icon.moon {
  opacity: 0;
}
input:checked + .slider .knob {
  transform: translateX(40px);
}
input:checked + .slider .knob-icon.sun {
  opacity: 0;
}
input:checked + .slider .knob-icon.moon {
  opacity: 1;
}

.divider {
  width: 1px;
  height: 40px;
  background-color: #e0e0e0;
  margin: 0 20px;
}

.account-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px;
  border-radius: 10px;
}
.account-info:hover {
  background-color: #ffffff;
}
.account-info img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.name-email-info {
  display: flex;
  flex-direction: column;
}
.name-email-info .name {
  font-weight: bold;
  color: #333;
}
.name-email-info .email {
  color: #666;
  font-size: 12px;
}
</style>
