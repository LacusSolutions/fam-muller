<script setup lang="ts">
import {
  PhImagesSquare as ImagesSquareIcon,
  PhScroll as ScrollIcon,
  PhUsersThree as UsersThreeIcon,
} from '@phosphor-icons/vue';

import { floor } from '~/utils/math';

const documents = 80;
const medias = 40;
const members = 80;
const photos = 365;
const users = 30;

function truncateOverHundred(value: number): string {
  const isOver100 = value > 100;
  const roundedValue = isOver100 ? floor(value, -2) : value;
  const stringValue = roundedValue.toString().concat(isOver100 ? '+' : '');
  return stringValue;
}
</script>

<template>
  <section id="stats" class="HomePage-StatsSection-root">
    <header class="HomePage-StatsSection-header">A História Sendo Escrita</header>

    <div class="HomePage-StatsSection-body">
      <img
        src="/img/family-tree.svg"
        alt="ilustração de árvore genealógica"
        height="320"
        width="320"
      />

      <dl>
        <dt aria-label="qunatidade de membros">
          <UsersThreeIcon color="currentcolor" :size="72" />
        </dt>
        <dd>
          <span class="whitespace-nowrap">
            <strong>{{ members ?? 0 }} membros</strong> registrados.
          </span>
          <span class="block whitespace-nowrap">
            <strong>{{ users ?? 0 }} verificados</strong> e ativos.
          </span>
        </dd>

        <dt aria-label="quantidade de fotos">
          <ImagesSquareIcon color="currentcolor" :size="72" />
        </dt>
        <dd>
          <strong>{{ truncateOverHundred(photos) }} fotos</strong> publicadas
        </dd>

        <dt aria-label="Number of users">
          <ScrollIcon color="currentcolor" :size="72" />
        </dt>
        <dd>
          <strong>{{ truncateOverHundred(documents + medias) }}</strong> documentos, relatos e
          vídeos
        </dd>
      </dl>
    </div>
  </section>
</template>

<style scoped lang="scss">
.HomePage-StatsSection-root {
  @apply relative py-12;
}

.HomePage-StatsSection-header {
  @apply mb-10 text-center text-4xl lg:text-left;
}

.HomePage-StatsSection-body {
  @apply flex flex-col-reverse items-center justify-around gap-8 lg:flex-row;

  dl {
    @apply grow flex flex-wrap items-center gap-y-8 max-w-2xl;

    dt {
      @apply basis-1/6 text-brand-800;
    }

    dd {
      @apply basis-4/5 pl-4 text-2xl;
    }
  }
}
</style>
