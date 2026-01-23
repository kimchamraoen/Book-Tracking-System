<script>
import { login } from "../services/authservice";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await login({
          email: this.email,
          password: this.password,
        });
        console.log("Login successful:", res);

        // Redirect after login
        this.$router.push("/admin/dashboard");
      } catch (_err) {
        this.error = "Invalid email or password";
      }
    },
  },
};
</script>

<template>
  <div class="login-page">
    <!-- Top Bar -->
    <header class="top-bar">
      <div class="brand">Library ITC</div>
    </header>

    <!-- Login Wrapper -->
    <section class="login-wrapper">
      <div class="login-card">
        <!-- Image Side -->
        <div class="card-image">
        </div>

        <!-- Form Side -->
        <div class="card-form">
          <h1>Login</h1>

          <form class="login-form" @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Email address" />
            <input v-model="password" type="password" placeholder="Password" />

            <button type="submit">Sign In</button>

            <div class="extra">
              <a href="#">Forgot password?</a>
              <span>•</span>
              <a href="/register">Create account</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
/* --------------------
   BACKGROUND
--------------------- */
.login-page {
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background:
    linear-gradient(135deg, #080838 0%, #111154 60%, #191970 100%);
  position: relative;
  overflow: hidden;
}

/* grid lines */
.login-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 100px 100px;
  opacity: 0.35;
}

/* --------------------
   TOP BAR
--------------------- */
.top-bar {
  position: relative;
  z-index: 2;
  margin-top: 2rem;
  margin-left: 2rem;
  color: #ffffff;
}

.brand {
  font-size: 1.5rem;
  font-weight: 800;
}

/* --------------------
   WRAPPER
--------------------- */
.login-wrapper {
  position: relative;
  z-index: 2;
  min-height: calc(100vh - 90px);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* --------------------
   LOGIN CARD
--------------------- */
.login-card {
  display: flex;
  width: 900px;
  max-width: 90%;
  height: 480px;
  border-radius: 24px;
  overflow: hidden;

  /* Glass effect */
  /* background: rgba(245, 244, 246, 0.9); */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
}

/* --------------------
   IMAGE SIDE
--------------------- */
.card-image {
  flex: 1;
  background:
    url('../assets/book1111.jpg')
    center / cover no-repeat;
  color: #ffffff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-image h2 {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.card-image p {
  font-size: 1rem;
  line-height: 1.6;
  color: #e0e7ff;
}

/* --------------------
   FORM SIDE
--------------------- */
.card-form {
  flex: 1;
  padding: 50px 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
      135deg,
      rgba(8, 8, 56, 0.85),
      rgba(25, 25, 112, 0.85)
    ),;
}

.card-form h1 {
  font-size: 2.3rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: #f4f4f8;
}

/* --------------------
   FORM
--------------------- */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-form input {
  padding: 12px 16px;
  border-radius: 30px;
  border: 1.5px solid #cbd5f5;
  font-size: 0.95rem;
  outline: none;
}

.login-form input::placeholder {
  color: #64748b;
  font-size: 16px;
}

.login-form input:focus {
  border-color: #4f46e5;
}

/* --------------------
   BUTTON
--------------------- */
.login-form button {
  margin-top: 10px;
  padding: 12px;
  border-radius: 30px;
  background: #4f46e5;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.login-form button:hover {
  background: #3730a3;
}

/* --------------------
   EXTRA
--------------------- */
.extra {
  margin-top: 18px;
  font-size: 0.85rem;
  text-align: center;
}

.extra a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
}

.extra a:hover {
  text-decoration: underline;
}

.extra span {
  margin: 0 6px;
  color: #94a3b8;
}

/* --------------------
   RESPONSIVE
--------------------- */
@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    height: auto;
  }

  .card-image {
    display: none;
  }
}
</style>
