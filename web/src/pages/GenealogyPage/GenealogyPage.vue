<script setup lang="ts"></script>

<template>
  <div class="GenealogyPage-root">
    <div class="GenealogyPage-title">Árvore Genealógica (em construção)</div>

    <img
      class="self-center"
      alt="page under construction"
      src="/img/under-construction.svg"
      height="600"
      width="600"
    />
  </div>
</template>

<style scoped lang="scss">
@reference '../../styles.scss';

.GenealogyPage-root {
  @apply flex h-[60vh] flex-col justify-between lg:container;

  .GenealogyPage-title {
    @apply text-4xl text-brand-800;
  }
}
</style>
