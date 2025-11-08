<script setup lang="ts">
</script>

<template>
  <div id="ios-hero" class="hero-section">
    <div class="container">
      <h1>Yarrow iOS SDK</h1>
      <p class="subtitle">
        Comprehensive mapping solution for iOS applications with advanced features and seamless integration
      </p>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  padding: 200px 0 100px;
  text-align: center;

  .container {
    max-width: 800px;
    margin: 0 auto;

    h1 {
      font-weight: 700;
      font-size: 48px;
      color: var(--text-primary);
      margin-bottom: 20px;
    }

    .subtitle {
      font-weight: 500;
      font-size: 24px;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }
  }
}

@media screen and (max-width: 768px) {
  .hero-section {
    padding: 150px 0 80px;

    .container {
      h1 {
        font-size: 36px;
      }

      .subtitle {
        font-size: 18px;
      }
    }
  }
}
</style>
