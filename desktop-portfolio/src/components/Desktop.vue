<template>
  <main class="desktop-main" @contextmenu.prevent>
    <DraggableResizableVue
      v-for="app in apps"
      :key="app.id"
      v-model:x="app.x"
      v-model:y="app.y"
      :w="80"
      :h="100"
      :resizable="false"
      class="desktop-icon"
      @dblclick="openWindow(app)"
    >
      <img :src="app.icon" :alt="app.title" />
      <span>{{ app.title }}</span>
    </DraggableResizableVue>
  </main>
</template>

<script setup lang="ts">
import DraggableResizableVue from 'draggable-resizable-vue3';
import { ref } from 'vue';
import '../assets/css/draggable.css?v=2';
import browserIcon from '../assets/icons/browser.png';
import filesIcon from '../assets/icons/files.png';
import githubIcon from '../assets/icons/github.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import terminalIcon from '../assets/icons/terminal.png';
import tetrisIcon from '../assets/icons/tetris.png';
import wordIcon from '../assets/icons/word.png';
import { useWindowsStore, type AppId } from '../stores/windows';


const windowsStore = useWindowsStore();
const { open } = windowsStore;

interface DesktopApp {
  id: AppId;
  title: string;
  icon: string;
  x: number;
  y: number;
}

const apps = ref<DesktopApp[]>([
  { id: 'files', title: 'Files', icon: filesIcon, x: 20, y: 20 },
  { id: 'browser', title: 'Browser', icon: browserIcon, x: 20, y: 120 },
  { id: 'linkedin', title: 'LinkedIn', icon: linkedinIcon, x: 20, y: 220 },
  { id: 'github', title: 'GitHub', icon: githubIcon, x: 20, y: 320 },
  { id: 'word', title: 'Word Processor', icon: wordIcon, x: 20, y: 420 },
  { id: 'terminal', title: 'Terminal', icon: terminalIcon, x: 20, y: 520 },
  { id: 'tetris', title: 'Tetris', icon: tetrisIcon, x: 20, y: 620 },
]);

const openWindow = (app: DesktopApp) => {
  const windowProps = {
    appId: app.id,
    title: app.title,
    icon: app.icon,
    x: 100 + Math.random() * 100,
    y: 100 + Math.random() * 100,
    w: 640,
    h: 480,
    minimized: false,
    maximized: false,
  };
  open(windowProps);
};

</script>

<style scoped>
.desktop-main {
  flex-grow: 1;
  position: relative;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  text-align: center;
  cursor: pointer;
}

.desktop-icon:hover {
  background-color: rgba(0, 0, 128, 0.5);
}

.desktop-icon img {
  width: 48px;
  height: 48px;
  margin-bottom: 5px;
}

.desktop-icon span {
  color: white;
  font-size: 12px;
  text-shadow: 1px 1px 2px black;
  user-select: none; /* Standard property */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
}
</style>