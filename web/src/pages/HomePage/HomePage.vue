<script setup lang="ts">
import { AboutSection } from './AboutSection';
import { CallToAction } from './CallToAction';
import { StatsSection } from './StatsSection';
</script>

<template>
  <div>
    <img class="mx-auto" src="/img/watermill.png" alt="water mill illustration" />

    <AboutSection />
    <StatsSection />
    <CallToAction />
  </div>
</template>
