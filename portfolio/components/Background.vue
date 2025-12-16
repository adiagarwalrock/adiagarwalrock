<template>
  <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
    <div
      class="
        absolute -inset-[10px] opacity-50 dark:opacity-20 blur-[80px] 
        will-change-transform animate-aurora transition-opacity duration-500
      "
      :style="{
        backgroundImage: 'repeating-linear-gradient(100deg, #93c5fd 10%, #c4b5fd 15%, #93c5fd 20%, #e9d5ff 25%, #93c5fd 30%)',
        backgroundSize: '300% 200%',
        backgroundPosition: '50% 50%'
      }"
    ></div>
    <!-- Overlay: Soft white for light mode, Dark tint for dark mode -->
    <div class="absolute inset-0 bg-white/40 dark:bg-black/20 transition-colors duration-500"></div>
  </div>
</template>

<script setup lang="ts">
// No logic needed
</script>
