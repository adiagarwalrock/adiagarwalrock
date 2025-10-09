<template>
  <div class="taskbar">
    <div
      class="start-menu-container"
      ref="startMenuContainer"
      @mouseenter="openStartMenu"
      @mouseleave="closeStartMenu"
    >
      <button
        type="button"
        class="start-button"
        :class="{ active: showStartMenu }"
        @click.stop="toggleStartMenu"
        :aria-expanded="showStartMenu"
        aria-haspopup="true"
      >
        Start
      </button>
      <div v-if="showStartMenu" class="start-menu" @click.stop>
        <div class="menu-branding">
          <div class="brand-logo"></div>
          <span class="brand-text">Windows98</span>
          <div class="brand-footer">
            <span class="brand-start">Start</span>
            <div class="brand-icons">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="menu-body">
          <div class="user-card">
            <img :src="userAvatar" alt="Aditya Agarwal" loading="lazy" />
            <div class="user-meta">
              <span class="user-caption">Logged in as</span>
              <span class="user-name">Aditya Agarwal</span>
            </div>
          </div>
          <ul class="menu-items">
            <template v-for="item in startMenuItems" :key="item.key">
              <li
                v-if="item.type === 'item'"
                class="menu-item"
                :class="{ 'has-submenu': item.hasSubmenu }"
                @click="handleItemClick(item)"
              >
                <span class="item-icon" :style="{ backgroundColor: item.iconColor }"></span>
                <span class="item-label">{{ item.label }}</span>
                <span v-if="item.hasSubmenu" class="submenu-arrow">&gt;</span>
              </li>
              <li v-else class="menu-separator" aria-hidden="true"></li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="running-apps">
      <div v-for="win in windows" :key="win.id" class="app-tab" :class="{ focused: win.focused }" @click="focus(win.id)">
        <img :src="win.icon" :alt="win.title" />
        <span>{{ win.title }}</span>
      </div>
    </div>
    <div class="clock">
      {{ currentTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useWindowsStore } from '../stores/windows';

const store = useWindowsStore();
const windows = computed(() => store.windows);
const { focus } = store;

const formatDateTime = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', { hour12: false });
  return `${day} ${month}, ${year} | ${time}`;
};

const currentTime = ref(formatDateTime(new Date()));
const showStartMenu = ref(false);
let timer: number;
const startMenuContainer = ref<HTMLElement | null>(null);
const userAvatar = new URL('../assets/aditya_profile.jpg', import.meta.url).href;

const closeStartMenu = () => {
  showStartMenu.value = false;
};

const openStartMenu = () => {
  showStartMenu.value = true;
};

const toggleStartMenu = () => {
  showStartMenu.value = !showStartMenu.value;
};

const openAboutWindow = () => {
  store.openApp('about');
};

const openBrowserWith = (url: string) => {
  store.openApp('browser', { url });
};

const openFiles = () => store.openApp('files');
const openGitHub = () => store.openApp('github');
const openLinkedIn = () => store.openApp('linkedin');
const openAbout = () => store.openApp('about');

const logOff = () => {
  store.windows.forEach(win => {
    if (!win.minimized) {
      store.setMinimized(win.id, true);
    }
  });
};

const shutDown = () => {
  const confirmed = window.confirm('Shut down the portfolio OS? This will close all open windows.');
  if (confirmed) {
    [...store.windows].forEach(win => store.close(win.id));
  }
};

const goToSimpleMode = () => {
  window.location.href = 'https://www.adityaagarwal.me/';
};

const runCommand = () => {
  const command = window.prompt('Type the URL or search query to run:', 'https://www.google.com/webhp?igu=1');
  if (!command) return;
  const isFullUrl = /^https?:\/\//i.test(command);
  const target = isFullUrl
    ? command
    : `https://www.google.com/search?igu=1&q=${encodeURIComponent(command)}`;
  openBrowserWith(target);
};

interface StartMenuActionItem {
  type: 'item';
  key: string;
  label: string;
  iconColor: string;
  hasSubmenu?: boolean;
  action?: () => void;
  autoClose?: boolean;
}

interface StartMenuSeparatorItem {
  type: 'separator';
  key: string;
}

type StartMenuEntry = StartMenuActionItem | StartMenuSeparatorItem;

const startMenuItems: StartMenuEntry[] = [
  {
    type: 'item',
    key: 'windows-update',
    label: 'Windows Update',
    iconColor: '#0081d6',
    action: () => openBrowserWith('https://www.google.com/search?igu=1&q=Windows+Update'),
  },
  {
    type: 'item',
    key: 'new-office-doc',
    label: 'New Office Document',
    iconColor: '#fcd24f',
    action: openFiles,
  },
  {
    type: 'item',
    key: 'open-office-doc',
    label: 'Open Office Document',
    iconColor: '#f0c06d',
    action: openFiles,
  },
  { type: 'separator', key: 'sep-1' },
  {
    type: 'item',
    key: 'programs',
    label: 'Programs',
    iconColor: '#ea6a2e',
    hasSubmenu: true,
    action: () => openBrowserWith('https://www.google.com/search?igu=1&q=aditya+agarwal+portfolio+apps'),
  },
  {
    type: 'item',
    key: 'favorites',
    label: 'Favorites',
    iconColor: '#2b9a3b',
    hasSubmenu: true,
    action: () => {
      openGitHub();
      openLinkedIn();
    },
  },
  {
    type: 'item',
    key: 'documents',
    label: 'Documents',
    iconColor: '#f2e8c0',
    hasSubmenu: true,
    action: openFiles,
  },
  {
    type: 'item',
    key: 'settings',
    label: 'Settings',
    iconColor: '#8287f4',
    hasSubmenu: true,
    action: openAbout,
  },
  {
    type: 'item',
    key: 'find',
    label: 'Find',
    iconColor: '#04a3c3',
    hasSubmenu: true,
    action: () => openBrowserWith('https://www.google.com/search?igu=1&q=Aditya+Agarwal'),
  },
  {
    type: 'item',
    key: 'help',
    label: 'Help',
    iconColor: '#ffd66c',
    action: openAbout,
  },
  {
    type: 'item',
    key: 'run',
    label: 'Run...',
    iconColor: '#c1c5ca',
    action: runCommand,
  },
  { type: 'separator', key: 'sep-2' },
  {
    type: 'item',
    key: 'simple-mode',
    label: 'Simple Mode',
    iconColor: '#008080',
    action: goToSimpleMode,
  },
  {
    type: 'item',
    key: 'logoff',
    label: 'Log Off...',
    iconColor: '#f68f1e',
    action: logOff,
  },
  {
    type: 'item',
    key: 'shutdown',
    label: 'Shut Down...',
    iconColor: '#b95454',
    action: shutDown,
  },
  { type: 'separator', key: 'sep-3' },
  {
    type: 'item',
    key: 'about',
    label: 'About This Site',
    iconColor: '#2a62b7',
    action: openAboutWindow,
  },
];

const handleItemClick = (item: StartMenuEntry) => {
  if (item.type !== 'item') return;
  if (item.action) {
    item.action();
  }
  if (item.autoClose ?? true) {
    closeStartMenu();
  }
};

const handleGlobalClick = (event: MouseEvent) => {
  if (startMenuContainer.value && !startMenuContainer.value.contains(event.target as Node)) {
    closeStartMenu();
  }
};

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
  timer = window.setInterval(() => {
    currentTime.value = formatDateTime(new Date());
  }, 1000);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  clearInterval(timer);
});
</script>

<style scoped>
/* ... existing styles ... */
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 40px;
  background-color: #c0c0c0;
  border-top: 2px solid #fff;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 0 5px;
  width: 100%;
  z-index: 99999;
}

.start-menu-container {
  position: relative;
}

.start-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border: 2px solid #fff;
  border-right-color: #888;
  border-bottom-color: #888;
  background-color: #c0c0c0;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  color: #000;
  box-shadow: inset -1px -1px 0 #808080;
}

.start-button::before {
  content: '';
  width: 16px;
  height: 16px;
  border: 1px solid #000;
  background:
    linear-gradient(90deg, #0f77db 50%, #f5cc0a 50%) top / 100% 50% no-repeat,
    linear-gradient(90deg, #dd1d1d 50%, #0da750 50%) bottom / 100% 50% no-repeat;
}

.start-button.active {
  border-top-color: #888;
  border-left-color: #888;
  border-right-color: #fff;
  border-bottom-color: #fff;
  box-shadow: inset 1px 1px 0 #808080;
}

.start-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  display: flex;
  min-width: 260px;
  background-color: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #666;
  border-bottom-color: #666;
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.35);
  z-index: 100000;
}

.menu-branding {
  width: 64px;
  background: linear-gradient(180deg, #00318c, #0065d0);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 6px 12px;
  text-align: center;
}

.menu-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 8px 0;
  background: #d7d7d7;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px 12px;
  border-bottom: 1px solid #a3a2a0;
  margin-bottom: 6px;
}

.user-card img {
  width: 48px;
  height: 48px;
  border: 2px solid #fff;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.35);
  object-fit: cover;
}

.user-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-caption {
  font-size: 11px;
  color: #303030;
}

.user-name {
  font-weight: bold;
  font-size: 13px;
}

.brand-logo {
  width: 32px;
  height: 32px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  background:
    linear-gradient(90deg, #0f77db 50%, #f5cc0a 50%) top / 100% 50% no-repeat,
    linear-gradient(90deg, #dd1d1d 50%, #0da750 50%) bottom / 100% 50% no-repeat;
}

.brand-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  text-shadow: 1px 1px #021f63;
}

.brand-footer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}

.brand-start {
  font-size: 12px;
  letter-spacing: 0.5px;
}

.brand-icons {
  display: grid;
  grid-template-columns: repeat(2, 8px);
  grid-template-rows: repeat(2, 8px);
  gap: 2px;
}

.brand-icons span {
  display: block;
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.4);
}

.brand-icons span:nth-child(1) {
  background-color: #0f77db;
}

.brand-icons span:nth-child(2) {
  background-color: #f5cc0a;
}

.brand-icons span:nth-child(3) {
  background-color: #dd1d1d;
}

.brand-icons span:nth-child(4) {
  background-color: #0da750;
}

.menu-items {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 18px 6px 12px;
  cursor: pointer;
  font-size: 13px;
  color: #000;
}

.menu-item:hover {
  background-color: #000080;
  color: white;
}

.item-icon {
  width: 22px;
  height: 22px;
  border: 1px solid #333;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.6);
}

.item-label {
  flex: 1;
}

.menu-item.has-submenu .submenu-arrow {
  margin-left: auto;
}

.submenu-arrow {
  font-size: 12px;
}

.menu-separator {
  height: 1px;
  margin: 6px 12px;
  background-color: #9a9a9a;
  border-top: 1px solid #fff;
}

.menu-separator::marker {
  content: '';
}

.running-apps {
  flex-grow: 1;
  display: flex;
  margin: 0 10px;
}

.app-tab {
  display: flex;
  align-items: center;
  padding: 3px 8px;
  margin: 0 2px;
  border: 2px solid #c0c0c0;
  cursor: pointer;
}

.app-tab.focused {
  border-color: #888;
  border-right-color: #fff;
  border-bottom-color: #fff;
  background-color: #e0e0e0;
}

.app-tab img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.clock {
  padding: 5px 10px;
  border: 2px solid #888;
  border-right-color: #fff;
  border-bottom-color: #fff;
}
</style>
