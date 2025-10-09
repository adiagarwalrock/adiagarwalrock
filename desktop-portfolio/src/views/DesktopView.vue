<template>
  <div class="desktop">
    <Desktop />
    <WindowManager />
    <Taskbar />
    <Clippy />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Desktop from '../components/Desktop.vue';
import WindowManager from '../components/WindowManager.vue';
import Taskbar from '../components/Taskbar.vue';
import Clippy from '../components/Clippy.vue';
import { useWindowsStore, type AppId } from '../stores/windows';

const route = useRoute();
const windowsStore = useWindowsStore();

const openAppFromRoute = (appId: string | string[]) => {
  if (typeof appId === 'string' && appId) {
    const validAppIds: AppId[] = ['files', 'browser', 'linkedin', 'github', 'about', 'word', 'terminal', 'tetris'];
    if (validAppIds.includes(appId as AppId)) {
      windowsStore.openApp(appId as AppId);
    }
  }
};

onMounted(() => {
  openAppFromRoute(route.params.appId);
});

watch(() => route.params.appId, (newAppId) => {
  if (newAppId) {
    openAppFromRoute(newAppId);
  }
});
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
