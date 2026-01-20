<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { Button } from '~/components';
</script>

<template>
  <div class="HomeLayout-root">
    <header class="HomeLayout-header">
      <RouterLink class="logo" to="/">
        <img src="/img/logo.svg" alt="Müller logo" height="60" width="60" />
        Müller
      </RouterLink>

      <div class="HomeLayout-nav">
        <Button secondary href="#about"> Sobre a Família </Button>

        <Button secondary href="#stats"> Recursos da Plataforma </Button>

        <Button href="/feed">Entrar</Button>
      </div>
    </header>

    <main class="HomeLayout-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.HomeLayout-root {
  @apply flex-1 lg:container;
}

.HomeLayout-header {
  @apply flex items-center justify-between gap-4 p-4 md:py-8;

  .HomeLayout-logo {
    @apply inline-flex items-center gap-4 font-brand text-5xl;
  }

  .HomeLayout-nav {
    @apply flex items-center gap-4;
  }
}

.HomeLayout-content {
  @apply px-4;
}
</style>
