<template>
  <div ref="winboxContent">
    <component :is="appContent" :window="window" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, computed, watch } from 'vue';
import WinBox from 'winbox/src/js/winbox';
import 'winbox/dist/css/winbox.min.css';
import type { WindowState } from '../stores/windows';
import { useWindowsStore } from '../stores/windows';

// App content components
import FilesApp from './apps/FilesApp.vue';
import BrowserApp from './apps/BrowserApp.vue';
import LinkedInApp from './apps/LinkedInApp.vue';
import GitHubApp from './apps/GitHubApp.vue';
import AboutApp from './apps/AboutApp.vue';
import WordProcessorApp from './apps/WordProcessorApp.vue';
import TerminalApp from './apps/TerminalApp.vue';
import TetrisApp from './apps/TetrisApp.vue';


const props = defineProps<{ window: WindowState }>();
const store = useWindowsStore();
const winboxContent = ref<HTMLElement | null>(null);
let winbox: WinBox | null = null;

const appContent = computed(() => {
  switch (props.window.appId) {
    case 'files': return FilesApp;
    case 'browser': return BrowserApp;
    case 'linkedin': return LinkedInApp;
    case 'github': return GitHubApp;
    case 'about': return AboutApp;
    case 'word': return WordProcessorApp;
    case 'terminal': return TerminalApp;
    case 'tetris': return TetrisApp;
    default: return null;
  }
});

onMounted(() => {
  if (winboxContent.value) {
    winbox = new WinBox({
      id: props.window.id,
      title: props.window.title,
      icon: props.window.icon,
      x: props.window.x,
      y: props.window.y,
      width: props.window.w,
      height: props.window.h,
      mount: winboxContent.value,
      onclose: () => {
        store.close(props.window.id);
        return false; // prevent default close
      },
      onfocus: () => store.focus(props.window.id),
      onmove: (x: any, y: any) => store.move(props.window.id, x, y),
      onresize: (w: any, h: any) => store.resize(props.window.id, w, h),
      onminimize: (minimized: boolean) => store.setMinimized(props.window.id, minimized),
    });

    watch(() => props.window.focused, (isFocused) => {
      if (isFocused) {
        winbox?.focus();
      }
    });

    watch(() => props.window.minimized, (isMinimized) => {
      winbox?.minimize(isMinimized);
    });
  }
});



</script>
