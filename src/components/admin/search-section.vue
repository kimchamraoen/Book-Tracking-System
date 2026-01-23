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
        <input type="checkbox" id="themeCheckbox" />
        <span class="theme-slider">
          <span class="theme-icons">
            <!-- <img src="@/assets/icons/sun-light-theme.svg" class="icon sun" /> -->
            <!-- <img src="@/assets/icons/moon-dark-theme.svg" class="icon moon" /> -->
          </span>

          <span class="theme-knob">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="knob-icon sun">
              <path
                fill="#fcfcfd"
                d="M485.6 49.2C490.5 51.2 494.1 55.6 495.1 60.8L512 144L595.2 160.8C600.4 161.9 604.7 165.4 606.8 170.3C608.9 175.2 608.3 180.8 605.4 185.2L558.5 255.9L605.4 326.6C608.3 331 608.9 336.6 606.8 341.5C604.7 346.4 600.4 350 595.2 351L533 363.7C521.1 355 507.9 348.1 493.6 343.3C491.1 330.6 486.8 318.6 480.9 307.6C490.4 292.7 496 275 496 255.9C496 202.9 453 159.9 400 159.9C352.1 159.9 312.4 195 305.2 240.8C278.7 220.5 245.7 208.3 209.8 207.9L194.7 185.2C191.8 180.8 191.2 175.2 193.3 170.3C195.4 165.4 199.7 161.8 204.9 160.8L288 144L304.8 60.8C305.9 55.6 309.4 51.3 314.3 49.2C319.2 47.1 324.8 47.7 329.2 50.6L400 97.6L470.7 50.7C475.1 47.8 480.7 47.2 485.6 49.3zM448 256C448 259.8 447.6 263.5 446.7 267.1C425 250.1 397.7 240 368 240C363.4 240 358.9 240.2 354.5 240.7C360.9 221.7 378.9 208 400 208C426.5 208 448 229.5 448 256zM128 576C75 576 32 533 32 480C32 437.5 59.6 401.4 97.9 388.8C96.6 382.1 96 375.1 96 368C96 306.1 146.1 256 208 256C251.1 256 288.5 280.3 307.2 316C321.9 298.9 343.7 288 368 288C412.2 288 448 323.8 448 368C448 373.5 447.4 378.8 446.4 384C446.9 384 447.5 384 448 384C501 384 544 427 544 480C544 533 501 576 448 576L128 576z"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="knob-icon moon">
              <path
                fill="#f7f7f7"
                d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z"
              />
            </svg>
          </span>
        </span>
      </label>
      <div class="divider"></div>
      <div class="account-info" v-if="user.email">
        <img src="@/assets/images/profile-avatar.jpg" alt="Profile" />

        <div class="account-info-text">
          <span class="account-info-name"> {{ user.firstName }} {{ user.lastName }} </span>
          <span class="account-info-email">
            {{ user.email }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from '@/services/user-service'
export default {
  name: 'SearchSection',
  data() {
    return {
      user: {
        firstName: 'Loading...',
        lastName: '',
        email: '',
        role: '',
      },
    }
  },
  async created() {
    // 1. Try local cache first for instant UI
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        this.user = JSON.parse(savedUser)
      } catch (e) {
        localStorage.removeItem('user')
      }
    }

    // 2. Fetch fresh data
    try {
      const freshUser = await getProfile()
      this.user = freshUser
      localStorage.setItem('user', JSON.stringify(freshUser))
    } catch (error) {
      console.error('Session expired or profile fetch failed:', error)
      // If 401 happens, your interceptor will handle the redirect
    }
  },
  async mounted() {
    const themeCheckbox = document.getElementById('themeCheckbox')
    themeCheckbox.addEventListener('change', () => {
      document.body.classList.toggle('dark-theme', themeCheckbox.checked)
    })
  },
  methods: {
    async account_data() {
      try {
        // Fetch and set account data here
      } catch (error) {
        console.error('Error fetching account data:', error)
      }
    },
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

.theme-toggle {
  --width: 64px;
  --height: 34px;

  position: relative;
  display: inline-block;
  width: var(--width);
  height: var(--height);
}

/* Hide checkbox */
.theme-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Slider background */
.theme-slider {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #e0f2fe, #191970);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.4s ease;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.5),
    0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Background icons */
.theme-icons {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.theme-icons .icon {
  width: 16px;
  height: 16px;
  opacity: 0.6;
}

/* Knob */
.theme-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #49497c;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

/* Knob icons */
.knob-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.knob-icon.moon {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

/* Checked (dark mode) */
.theme-toggle input:checked + .theme-slider {
  background: linear-gradient(135deg, #021521, #f8f8fa);
}

.theme-toggle input:checked + .theme-slider .theme-knob {
  transform: translateX(30px);
}

.theme-toggle input:checked + .theme-slider .knob-icon.sun {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}

.theme-toggle input:checked + .theme-slider .knob-icon.moon {
  opacity: 1;
  transform: rotate(0) scale(1);
}
</style>
