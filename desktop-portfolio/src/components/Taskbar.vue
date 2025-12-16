<template>
  <div class="taskbar">
    <div class="start-menu-container" ref="startMenuContainer" @mouseenter="openStartMenu" @mouseleave="closeStartMenu">
      <div class="start-button" :class="{ active: showStartMenu }" @click.stop="toggleStartMenu" role="button"
        tabindex="0">
        <img src="../assets/icons/xp/win-logo.svg" class="start-icon" alt="" />
        <span class="start-text">start</span>
      </div>

      <transition name="slide-up">
        <div v-if="showStartMenu" class="start-menu" @click.stop>
          <div class="xp-menu-header">
            <div class="user-profile">
              <div class="user-avatar-frame">
                <img :src="userAvatar" alt="User Avatar" class="user-avatar" />
              </div>
              <span class="user-name">Aditya Agarwal</span>
            </div>
          </div>
          <div class="xp-menu-body">
            <div class="xp-left-column">
              <ul class="xp-apps-list">
                <li v-for="item in pinnedItems" :key="item.key" class="xp-menu-item" @click="handleItemClick(item)">
                  <div class="xp-icon-placeholder" :style="{ backgroundColor: item.iconColor }"></div>
                  <div class="xp-item-text">
                    <span class="xp-item-title">{{ item.label }}</span>
                    <span v-if="item.subLabel" class="xp-item-subtitle">{{ item.subLabel }}</span>
                  </div>
                </li>
              </ul>
              <div class="xp-separator"></div>
              <div class="all-programs-container">
                <div class="xp-menu-item all-programs"
                  @click="openBrowserWith('https://www.google.com/search?igu=1&q=Aditya+Agarwal')">
                  <span class="xp-item-title">All Programs</span>
                  <span class="xp-arrow-green">▶</span>
                </div>
              </div>
            </div>
            <div class="xp-right-column">
              <ul class="xp-system-list">
                <li class="xp-menu-item" @click="openFiles">
                  <span class="xp-item-title bold">My Documents</span>
                </li>
                <li class="xp-menu-item" @click="openFiles">
                  <span class="xp-item-title bold">My Recent Documents</span>
                  <span class="xp-arrow">▶</span>
                </li>
                <li class="xp-menu-item" @click="openFiles">
                  <span class="xp-item-title bold">My Computer</span>
                </li>
                <li class="xp-menu-item" @click="openFiles">
                  <span class="xp-item-title bold">My Network Places</span>
                </li>
                <div class="xp-separator horizontal"></div>
                <li class="xp-menu-item" @click="openAbout">
                  <span class="xp-item-title">Control Panel</span>
                </li>
                <li class="xp-menu-item" @click="openAboutWindow">
                  <span class="xp-item-title">Connect To</span>
                </li>
                <li class="xp-menu-item" @click="openAboutWindow">
                  <span class="xp-item-title">Printers and Faxes</span>
                </li>
                <div class="xp-separator horizontal"></div>
                <li class="xp-menu-item" @click="openAboutWindow">
                  <span class="xp-item-title">Help and Support</span>
                </li>
                <li class="xp-menu-item" @click="openAboutWindow">
                  <span class="xp-item-title">Search</span>
                </li>
                <li class="xp-menu-item" @click="runCommand">
                  <span class="xp-item-title">Run...</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="xp-menu-footer">
            <div class="footer-button" @click="logOff">
              <span class="icon-logoff"></span>
              <span>Log Off</span>
            </div>
            <div class="footer-button" @click="shutDown">
              <span class="icon-shutdown"></span>
              <span>Turn Off Computer</span>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="taskbar-divider"></div>

    <div class="quick-launch">
      <div class="quick-icon desktop-icon" @click="goToSimpleMode" title="Show Desktop"></div>
      <div class="quick-icon ie-icon" @click="openBrowserWith('https://www.google.com')"
        title="Launch Internet Explorer"></div>
    </div>

    <div class="taskbar-divider"></div>

    <div class="running-apps">
      <div v-for="win in windows" :key="win.id" class="app-tab" :class="{ focused: win.focused }"
        @click="focus(win.id)">
        <img :src="win.icon" :alt="win.title" />
        <span class="app-title">{{ win.title }}</span>
      </div>
    </div>

    <div class="system-tray">
      <div class="tray-icons">
        <span class="tray-icon" title="Volume">🔊</span>
      </div>
      <div class="clock">
        {{ currentTime }}
      </div>
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
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return time;
};

const currentTime = ref(formatDateTime(new Date()));
const showStartMenu = ref(false);
let timer: number;
const startMenuContainer = ref<HTMLElement | null>(null);
const userAvatar = new URL('../assets/aditya_profile.jpg', import.meta.url).href;

const closeStartMenu = () => showStartMenu.value = false;
const openStartMenu = () => { };
const toggleStartMenu = () => showStartMenu.value = !showStartMenu.value;

const openAboutWindow = () => { store.openApp('about'); closeStartMenu(); };
const openBrowserWith = (url: string) => { store.openApp('browser', { url }); closeStartMenu(); };
const openFiles = () => { store.openApp('files'); closeStartMenu(); };
const openGitHub = () => { store.openApp('github'); closeStartMenu(); };
const openLinkedIn = () => { store.openApp('linkedin'); closeStartMenu(); };
const openAbout = () => { store.openApp('about'); closeStartMenu(); };

const logOff = () => {
  store.windows.forEach(win => { if (!win.minimized) store.setMinimized(win.id, true); });
  closeStartMenu();
};

const shutDown = () => {
  if (window.confirm('Shut down the portfolio OS? This will close all open windows.')) {
    [...store.windows].forEach(win => store.close(win.id));
  }
  closeStartMenu();
};

const goToSimpleMode = () => window.location.href = 'https://www.adityaagarwal.me/';

const runCommand = () => {
  const command = window.prompt('Type the URL or search query to run:', 'https://www.google.com/webhp?igu=1');
  if (command) {
    const isFullUrl = /^https?:\/\//i.test(command);
    const target = isFullUrl ? command : `https://www.google.com/search?igu=1&q=${encodeURIComponent(command)}`;
    openBrowserWith(target);
  }
  closeStartMenu();
};

interface StartMenuItem {
  key: string; label: string; subLabel?: string; iconColor: string; action?: () => void;
}

const pinnedItems: StartMenuItem[] = [
  { key: 'browser', label: 'Internet', subLabel: 'Browser', iconColor: '#3689e6', action: () => openBrowserWith('https://www.google.com') },
  { key: 'email', label: 'E-mail', subLabel: 'Outlook Express', iconColor: '#e6bd36', action: openAbout },
  { key: 'github', label: 'GitHub', iconColor: '#333', action: openGitHub },
  { key: 'linkedin', label: 'LinkedIn', iconColor: '#0077b5', action: openLinkedIn },
];

const handleItemClick = (item: StartMenuItem) => { if (item.action) item.action(); closeStartMenu(); };
const handleGlobalClick = (event: MouseEvent) => {
  if (startMenuContainer.value && !startMenuContainer.value.contains(event.target as Node)) closeStartMenu();
};

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
  timer = window.setInterval(() => { currentTime.value = formatDateTime(new Date()); }, 1000);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  clearInterval(timer);
});
</script>

<style scoped>
/* Reset & Fonts */
* {
  box-sizing: border-box;
}

.taskbar,
.start-menu {
  font-family: 'Tahoma', sans-serif;
  user-select: none;
  font-size: 11px;
}

/* Taskbar Container */
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
    height: 30px;
    /* XP Taskbar Gradient */
    background: linear-gradient(to bottom, #245edb 0%, #3f8cf3 9%, #245edb 18%, #245edb 92%, #1941a5 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  z-index: 99999;
  padding: 0;
}

/* Start Button - Pixel Perfect Approximation */
.start-button {
  height: 30px;
    padding: 0 12px 0 6px;
    background: radial-gradient(circle at 50% 0%, #7ee286 0%, #388e3c 100%);
    /* Green gradient */
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 2px 0 2px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  gap: 4px;
    cursor: pointer;
    color: #fff;
  font-weight: bold;
  font-style: italic;
  font-size: 14px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    transition: filter 0.1s;
    margin-right: 2px;
}

.start-button:hover {
  filter: brightness(1.1);
}

.start-button.active {
  box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.4);
    background: #2e7d32;
    padding-top: 2px;
}

.start-icon {
  width: 18px;
  height: 18px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
}

/* Dividers */
.taskbar-divider {
  width: 2px;
  height: 22px;
  background: rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0 6px;
  border-radius: 1px;
}

/* Quick Launch */
.quick-launch {
  display: flex;
  align-items: center;
  gap: 2px;
    padding-right: 4px;
}

.quick-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-size: cover;
}

.quick-icon:hover {
  filter: brightness(1.2);
}

.desktop-icon {
  background-color: #aaa;
  mask: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="2"/></svg>');
}

/* Placeholder */
.ie-icon {
  background-color: #3689e6;
  border-radius: 50%;
}

/* Placeholder */

/* Running Apps Area */
.running-apps {
  flex: 1;
  display: flex;
  align-items: center;
    padding: 0 4px;
  gap: 2px;
  overflow: hidden;
}

.app-tab {
  height: 24px;
  min-width: 140px;
  max-width: 160px;
  background: #3c81f3;
  color: #fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  cursor: pointer;
  font-size: 11px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4);
    transition: background 0.1s;
}

.app-tab:hover {
  background: #5396f6;
}

.app-tab.focused {
  background: #1e52b7;
  box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  background: #1941a5;
  }
  
  .app-tab img {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
  
  .app-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* System Tray */
.system-tray {
  background: #1290e2;
  border-left: 1px solid #0d5c94;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-shadow: inset 1px 0 2px rgba(0, 0, 0, 0.2);
  color: #fff;
  gap: 8px;
}

.tray-icon {
  font-size: 12px;
}

/* Start Menu */
.start-menu {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 380px;
  background-color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
    border: 1px solid #003c74;
  }
  
  .xp-menu-header {
    background: linear-gradient(to bottom, #245edb, #3f8cf3);
    height: 64px;
    display: flex;
  align-items: center;
  padding: 0 8px;
    border-bottom: 2px solid #e55500;
    /* Orange strip */
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.user-avatar-frame {
  width: 48px;
  height: 48px;
  background: #fff;
  border-radius: 4px;
  padding: 2px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid #777;
}

.user-avatar {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  object-fit: cover;
  display: block;
}

.user-name {
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.xp-menu-body {
  display: flex;
  background-color: #fff;
  border-top: 1px solid #fff;
}

.xp-left-column {
  flex: 1;
  padding: 6px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.xp-right-column {
  width: 170px;
  background-color: #d3e5fa;
  border-left: 1px solid #9fbce0;
  padding: 6px;
  display: flex;
  flex-direction: column;
}

.xp-apps-list,
.xp-system-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.xp-menu-item {
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  color: #333;
    border: 1px solid transparent;
    line-height: 1.2;
  }
  
  .xp-menu-item:hover {
    background-color: #316ac5;
    color: #fff;
    border-color: #316ac5;
  }
  
  .xp-left-column .xp-menu-item {
    margin-bottom: 4px;
  }
  
  .xp-right-column .xp-menu-item {
    margin-bottom: 2px;
    height: 28px;
  }
  
  .xp-icon-placeholder {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    background-color: #ccc;
    flex-shrink: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .xp-item-text {
    display: flex;
    flex-direction: column;
  }
  
  .xp-item-title {
    font-size: 11px;
}

.xp-item-title.bold {
  font-weight: bold;
  font-size: 11px;
}

.xp-item-subtitle {
  font-size: 10px;
  color: #888;
}

.xp-menu-item:hover .xp-item-subtitle {
  color: #cce;
}

.xp-arrow,
.xp-arrow-green {
  margin-left: auto;
  font-size: 8px;
    opacity: 0.8;
  }
  
  .xp-arrow-green {
    color: #fff;
  }
  
  .all-programs-container {
    margin-top: auto;
    padding-top: 4px;
    text-align: center;
  }
  
  .all-programs {
    justify-content: center;
    padding: 6px;
    font-weight: bold;
}

.all-programs:hover {
  background-color: #2f71cd;
}

.xp-separator {
  height: 1px;
  background: linear-gradient(to right, transparent, #d3d3d3, transparent);
    margin: 6px 0;
}

.xp-separator.horizontal {
  background: #9fbce0;
  margin: 4px 6px;
  height: 1px;
  border-bottom: 1px solid #fff;
}

.xp-menu-footer {
  background: linear-gradient(to bottom, #3f8cf3, #245edb);
  height: 38px;
  display: flex;
  justify-content: flex-end;
    align-items: center;
    padding: 0 10px;
    gap: 10px;
    border-top: 2px solid #e55500;
    /* Orange strip */
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.footer-button {
  display: flex;
  align-items: center;
  gap: 6px;
    color: #fff;
    font-size: 11px;
  cursor: pointer;
  padding: 4px 6px;
  }
  
  .footer-button:hover {
    filter: brightness(1.2);
  }
  
  .icon-logoff {
    width: 18px;
    height: 18px;
    background-color: #e6bd36;
    border: 1px solid #fff;
    border-radius: 2px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  .icon-shutdown {
    width: 18px;
    height: 18px;
    background-color: #e4421d;
    border: 1px solid #fff;
    border-radius: 2px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Animations */
.slide-up-enter-active {
  transition: all 0.2s ease-out;
}

.slide-up-leave-active {
  transition: all 0.1s ease-in;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>