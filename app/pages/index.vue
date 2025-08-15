<template>
  <div class="main-page">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Saaas</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Support</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
     
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section (with dynamic background) -->
    <section class="hero d-flex justify-content-center align-items-center text-center text-white">
      <div class="container">
        <h1 class="display-3 fw-bold mb-4">Welcome to SaaaS</h1>
        <p class="lead mb-5">Experience the future of digital interaction. Fast, responsive, and easy to use.</p>
        <div class="d-flex justify-content-center gap-3">
          <router-link class="btn btn-primary btn-lg" to="/login">Open Web App</router-link>
          <button class="btn btn-outline-light btn-lg">Download</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer text-white py-3 text-center">
      <div class="container">
        <p>&copy; 2025 Nexolt. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
</script>

<style scoped>
/* Apply dynamic background */
.main-page {
  background: linear-gradient(135deg, rgba(16, 24, 35, 0.9), rgba(72, 86, 112, 0.9)), url('https://source.unsplash.com/random') no-repeat center center fixed;
  background-size: cover;
  height: 100%; /* Set full height */
  color: white;
  font-family: 'Arial', sans-serif;
  margin: 0; /* Remove margin */
  padding: 0; /* Remove padding */
}

/* Hero Section */
.hero {
  height: calc(100vh - 60px); /* Adjust height to take full screen, minus navbar height */
  background: rgba(16, 24, 35, 0.7); /* Dark overlay for better text visibility */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Navbar Styling */
.navbar {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}

/* Footer */
footer {
  background: linear-gradient(135deg, rgba(16, 24, 35, 0.9), rgba(72, 86, 112, 0.9));
  color: white;
  padding: 20px 0; /* Adjust footer padding */
  font-size: 0.9rem;
  text-align: center;
}

/* Navbar Styling */
.navbar .navbar-brand {
  font-weight: bold;
  color: white;
}

.navbar .nav-link {
  color: white;
}

.navbar .nav-link:hover {
  color: #5865f2; /* Highlight on hover */
}

.navbar .btn {
  border-radius: 20px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .hero .btn {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
}
</style>
