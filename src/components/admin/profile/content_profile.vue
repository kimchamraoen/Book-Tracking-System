<template>
  <div class="profile-page">
    <!-- Header -->
    <div class="profile-header">
      <div class="header-left">
        <img
          src="https://via.placeholder.com/120"
          alt="Admin Avatar"
          class="avatar"
        />
        <div>
          <h2>{{ user.firstName }} {{ user.lastName }}</h2>
          <p>{{ user.role == 'admin' ? 'System Administrator' : user.role }}</p>
        </div>
      </div>

      <button class="primary" @click="showEdit = true">
        Edit Profile
      </button>
    </div>

    <!-- Content -->
    <div class="profile-content">
      <div class="card">
        <h3>Profile Information</h3>

        <div class="info-row">
          <span>Email</span>
          <span>{{ user.email }}</span>
        </div>
        <div class="info-row">
          <span>Username</span>
          <span>{{ user.username }}</span>
        </div>
        <div class="info-row">
          <span>Phone</span>
          <span>{{ user.phoneNumber }}</span>
        </div>
        <div class="info-row">
          <span>Location</span>
          <span>New York, USA</span>
        </div>
      </div>
    </div>

    <!-- Logout Button (Bottom Right) -->
    <button class="logout-btn" @click="handleLogout">
      Logout
    </button>

    <!-- Edit Profile Modal -->
    <div v-if="showEdit" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Edit Profile</h3>
          <span class="close" @click="showEdit = false">×</span>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" v-model="user.firstName" value="John Doe" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="user.email" value="admin@example.com" />
          </div>

          <div class="form-group">
            <label>Username</label>
            <input type="text" v-model="user.username" value="admin_john" />
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input type="text" v-model="user.phoneNumber" value="+1 234 567 890" />
          </div>

          <div class="form-group">
            <label>Location</label>
            <input type="text" v-model="user.location" value="New York, USA" />
          </div>
        </div>

        <div class="modal-actions">
          <button class="secondary" @click="showEdit = false">
            Cancel
          </button>
          <button class="primary" @click="saveChanges">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "@/services/authservice";

export default {
  data() {
    return {
      showEdit: false,
      // Initialize with empty fields to avoid errors before data loads
      user: {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        phoneNumber: '',
        department: '',
        createdAt: ''
      }
    };
  },
  mounted() {
    // 1. Get the user data from localStorage that you saved during login
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    } else {
      // If no user found, redirect to login
      this.$router.push('/login');
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    handleLogout() {
      logout(); // Clears localStorage
      this.$router.push('/login');
    },
    async saveChanges() {
      // Here you would call an API update function
      // For now, we update localStorage so the changes persist on refresh
      localStorage.setItem("user", JSON.stringify(this.user));
      alert("Profile updated locally!");
      this.showEdit = false;
    }
  }
};
</script>

<style scoped>
/* Page */
.profile-page {
  width: 100%;
  min-height: 100vh;
  background: #f3f4f6;
  padding: 30px;
  font-family: "Segoe UI", sans-serif;
  position: relative;
}

/* Header */
.profile-header {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

/* Content */
.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

/* Rows */
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #e5e7eb;
}

/* Buttons */
button {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.primary {
  background: #4f46e5;
  color: #ffffff;
}

.primary:hover {
  background: #4338ca;
}

.secondary {
  background: #e5e7eb;
}

/* Logout Button */
.logout-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #dc2626;
  color: #ffffff;
  padding: 12px 22px;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
  z-index: 900;
}

.logout-btn:hover {
  background: #b91c1c;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 12px;
}

/* Modal content */
.modal-header,
.modal-body,
.modal-actions {
  padding: 20px;
}

.modal-header {
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
}

.modal-actions {
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.close {
  font-size: 22px;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 600px) {
  .logout-btn {
    bottom: 15px;
    right: 15px;
    padding: 10px 18px;
  }
}

/* ===== Improved Modal Overlay ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* ===== Modal Container ===== */
.modal {
  width: 100%;
  max-width: 560px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: modalFadeIn 0.3s ease;
  overflow: hidden;
}

/* Animation */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ===== Modal Header ===== */
.modal-header {
  padding: 22px 26px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.close {
  font-size: 26px;
  color: #6b7280;
  cursor: pointer;
  line-height: 1;
}

.close:hover {
  color: #111827;
}

/* ===== Modal Body ===== */
.modal-body {
  padding: 26px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #374151;
}

.form-group input {
  padding: 11px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

/* Full width fields */
.form-group.full {
  grid-column: span 2;
}

/* ===== Modal Footer ===== */
.modal-actions {
  padding: 20px 26px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .modal-body {
    grid-template-columns: 1fr;
  }

  .form-group.full {
    grid-column: span 1;
  }
}

</style>
