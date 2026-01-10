<template>
  <div id="app-container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useWindowsStore } from './stores/windows';

const route = useRoute();
const windowsStore = useWindowsStore();

// Track page views on route changes
watch(() => route.fullPath, (newPath) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-KFKYTXNP5X', {
      page_path: newPath,
      page_title: document.title,
    });
  }
});

// Track when apps are focused/opened
watch(() => windowsStore.windows.find(w => w.focused)?.appId, (newFocusedAppId) => {
  if (newFocusedAppId && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'screen_view', {
      app_name: 'Desktop Portfolio',
      screen_name: newFocusedAppId,
    });
    // Also track as page view for consistency with the other portfolio
    window.gtag('config', 'G-KFKYTXNP5X', {
      page_path: `/#/${newFocusedAppId}`,
      page_title: `App: ${newFocusedAppId}`,
    });
  }
});
</script>

<style>
body {
  background-image: url('./assets/wallpaper.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  font-family: 'Tahoma', sans-serif;
  font-size: 11px;
}

#app-container {
  height: 100%;
  width: 100%;
}
</style>