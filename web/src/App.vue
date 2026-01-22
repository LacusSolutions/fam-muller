<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <router-view />

  <footer
    class="flex items-center justify-center h-24 mx-8 mt-auto border-t border-t-gray-200 text-gray-600"
  >
    <span><strong>LacusSoft &copy;</strong> {{ currentYear }} - All Rights Reserved </span>
  </footer>
</template>

<style lang="scss">
@import 'tailwindcss';

body {
  @apply min-h-screen bg-gray-50 text-gray-950 font-sans;
}

#app {
  @apply flex flex-col gap-8 min-h-screen;
}
</style>
