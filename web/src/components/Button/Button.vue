<script setup lang="ts">
import { type ButtonHTMLAttributes, computed } from 'vue';
import { RouterLink, type RouterLinkProps, useRoute } from 'vue-router';

import { clsx } from '~/utils/styles';

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  href?: string;
  isNav?: boolean;
  secondary?: boolean;
  to?: RouterLinkProps['to'];
}

export interface ButtonSlots {
  default: (props: unknown) => string;
}

const props = defineProps<ButtonProps>();
defineSlots<ButtonSlots>();

const route = useRoute();

const isMatching = computed(() => {
  const thisURL = props.to?.toString() ?? '';
  const paths = route.matched.map((route) => route.path);

  return paths.includes(thisURL);
});

const actualClasses = computed(() => {
  return clsx(
    'Button-root',
    props.secondary ? 'Button-secondary' : 'Button-primary',
    props.isNav && !isMatching.value && 'Button-link Button-inactive',
    props.class,
  );
});
</script>

<template>
  <RouterLink v-if="to" v-bind="$attrs" :class="actualClasses" :to="to">
    <slot />
  </RouterLink>

  <a v-else-if="href" v-bind="$attrs" :class="actualClasses" :href="href">
    <slot />
  </a>

  <button v-else v-bind="$attrs" :class="actualClasses" :type="type ?? 'button'">
    <slot />
  </button>
</template>

<style lang="scss">
.Button-root {
  @apply flex items-center justify-center h-12 rounded-md px-4 transition-colors font-bold text-center active:scale-[98%] active:filter active:brightness-[96%];

  &.Button-primary {
    @apply bg-brand-800 text-white hover:bg-brand-900;
  }

  &.Button-secondary {
    @apply text-brand-800 hover:text-brand-900 hover:bg-gray-100;
  }

  &.Button-link.Button-inactive {
    @apply font-normal text-gray-950 opacity-60 hover:opacity-100;
  }
}
</style>
