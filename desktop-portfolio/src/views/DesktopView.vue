<template>
  <div class="desktop">
    <Desktop />
    <WindowManager />
    <Taskbar />
    <Clippy />
  </div>
</template>

<script setup lang="ts">
import Desktop from '../components/Desktop.vue';
import WindowManager from '../components/WindowManager.vue';
import Taskbar from '../components/Taskbar.vue';
import Clippy from '../components/Clippy.vue';
</script>

<style scoped>
.desktop {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.desktop > :first-child {
  flex-grow: 1;
}
</style>
