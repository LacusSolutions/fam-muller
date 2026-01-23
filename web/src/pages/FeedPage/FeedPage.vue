<script setup lang="ts"></script>

<template>
  <div class="FeedPage-root">
    <h1 class="FeedPage-title">Feed (em construção)</h1>

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

.FeedPage-root {
  @apply flex h-[60vh] flex-col justify-between lg:container;

  .FeedPage-title {
    @apply text-4xl text-brand-800;
  }
}
</style>
