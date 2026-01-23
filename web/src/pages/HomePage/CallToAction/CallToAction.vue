<script setup lang="ts">
import { Button } from '~/components';
</script>

<template>
  <div class="HomePage-CallToAction-root">
    <p>Acessar a pplataforma</p>

    <Button to="/feed"> Entrar ou Registrar-se </Button>
  </div>
</template>

<style scoped lang="scss">
@reference '../../../styles.scss';

.HomePage-CallToAction-root {
  @apply flex flex-col items-center gap-8 pb-16 pt-8;

  p {
    @apply text-center text-4xl font-bold text-brand-800;
  }

  button {
    @apply px-8;
  }
}
</style>
