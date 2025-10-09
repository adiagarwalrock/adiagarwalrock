<template>
  <div class="window-manager">
    <WindowShell v-for="window in windows" :key="window.id" :window="window" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWindowsStore } from '../stores/windows';
import WindowShell from './WindowShell.vue';

const store = useWindowsStore();
const windows = computed(() => store.windows);
</script>
