<script setup lang="ts">
import useTracing from '~/composables/useTracing';

const { startSpan } = useTracing();
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col space-between">
    <!-- Header -->
    <header class="bg-white shadow-md">
      POC semaines plan de cours
      <NuxtLink to="/">Home</NuxtLink>
    </header>

    <!-- Main content slot -->
    <div class="wrapper flex-grow">
      <slot />
    </div>

    <footer class="bg-gray-900 text-white py-8">POC semaines plan de cours</footer>
  </div>
</template>
