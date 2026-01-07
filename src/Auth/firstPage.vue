<template>
  <div class="landing-page">
    <!-- Top Navigation -->
    <header class="top-bar">
      <div class="brand">Library ITC</div>
      <nav>
        <a href="/login" class="btn-outline">Login</a>
        <a href="/register" class="btn-solid">Register</a>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero">
      <h1>
        Welcome to<br />
        <span>Library ITC</span>
      </h1>
      <p>
        A modern digital library system designed for learning, research,
        and academic excellence.
      </p>
    </section>
  </div>
</template>

<style scoped>
/* --------------------
   BACKGROUND
--------------------- */
.landing-page {
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  color: #ffffff;
  background:
    linear-gradient(135deg, #080838 0%, #111154 60%, #191970 100%);
  position: relative;
  overflow: hidden;
}

/* tech lines */
.landing-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(202, 24, 24, 0.06) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 100px 100px;
  opacity: 0.35;
}

/* diagonal accents */
.landing-page::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, transparent 55%, rgba(247, 244, 244, 0.08) 56%, transparent 60%),
    linear-gradient(120deg, transparent 70%, rgba(255,255,255,0.05) 71%, transparent 75%);
}

/* --------------------
   TOP BAR
--------------------- */
.top-bar {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 60px;
}

.brand {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 1px;
}

/* --------------------
   NAV BUTTONS
--------------------- */
nav {
  display: flex;
  gap: 16px;
}

.btn-outline {
  padding: 8px 20px;
  border: 1.5px solid #ffffff;
  border-radius: 20px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
}

.btn-outline:hover {
  background: #ffffff;
  color: #020617;
}

.btn-solid {
  padding: 8px 20px;
  background: #ffffff;
  color: #020617;
  border-radius: 20px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
}

.btn-solid:hover {
  background: #cbd5f5;
}

/* --------------------
   HERO
--------------------- */
.hero {
  position: relative;
  z-index: 2;
  max-width: 1250px;
  padding: 100px 60px;
}

.hero h1 {
  font-size: 3.4rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
  margin-left: 10rem;
  color: #ffffff;
}

.hero span {
  margin-left: 10rem;
  font-size: 8rem;
  color: #8686f4;
}

.hero h1  {
  color: #fcfcfd;
  font-size: 3rem;
}

.hero p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #e5e7eb;
  margin-bottom: 40px;
  margin-left: 20rem;
}

/* --------------------
   HERO BUTTONS
--------------------- */
.actions {
  display: flex;
  gap: 20px;
}
</style>
