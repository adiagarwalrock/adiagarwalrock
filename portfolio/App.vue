<template>
  <main class="relative min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
    <Background />

    <div class="fixed top-6 right-6 z-50 flex items-center gap-4">
      <!-- Desktop Site Link -->
      <a
        href="https://desktop.adityaagarwal.me/"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2.5 rounded-full bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-lg text-zinc-600 dark:text-zinc-300 hover:scale-110 active:scale-95 transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
        aria-label="Go to Desktop Site"
      >
        <Monitor :size="20" />
      </a>

      <!-- Theme Toggle Button -->
      <button
        @click="toggleTheme"
        class="p-2.5 rounded-full bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-lg text-zinc-600 dark:text-zinc-300 hover:scale-110 active:scale-95 transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
        aria-label="Toggle Dark Mode"
      >
        <Transition
          mode="out-in"
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-5 rotate-90"
          enter-to-class="opacity-100 translate-y-0 rotate-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 translate-y-5 -rotate-90"
        >
          <component :is="isDark ? Moon : Sun" :size="20" :key="isDark ? 'dark' : 'light'" />
        </Transition>
      </button>
    </div>

    <!-- Content Area -->
    <div class="relative z-10 w-full min-h-screen flex flex-col text-zinc-900 dark:text-zinc-100">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 blur-sm"
        enter-to-class="opacity-100 blur-0"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="opacity-100 blur-0"
        leave-to-class="opacity-0 blur-sm"
      >
        <component :is="currentPageComponent" :key="currentPage" class="flex-grow" />
      </Transition>
    </div>

    <!-- <ChatWidget /> -->
    <Dock :activePage="currentPage" @update:activePage="setCurrentPage" cvLink="https://cv.adityaagarwal.me/" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import { Moon, Sun, Monitor } from 'lucide-vue-next';
import Background from './components/Background.vue';
import Dock from './components/Dock.vue';
// import ChatWidget from './components/ChatWidget.vue';
import Intro from './pages/Intro.vue';
import Now from './pages/Now.vue';
import Projects from './pages/Projects.vue';
import Experience from './pages/Experience.vue';
import { Page } from './types';

// Routing Helper
const getPageFromUrl = (): Page => {
  const path = window.location.pathname.slice(1); // Remove leading slash
  if (path === 'now') return Page.NOW;
  if (path === 'projects') return Page.PROJECTS;
  if (path === 'experience') return Page.EXPERIENCE;
  return Page.INTRO;
};

const currentPage = ref<Page>(getPageFromUrl());
const isDark = ref(false);

const setCurrentPage = (page: Page) => {
  currentPage.value = page;
  
  // Update URL
  const path = page === Page.INTRO ? '/' : `/${page}`;
  window.history.pushState({ page }, '', path);
};

// Handle Back/Forward navigation
const handlePopState = () => {
  currentPage.value = getPageFromUrl();
};

// Track page views when currentPage changes
watch(currentPage, (newPage) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-KFKYTXNP5X', {
      page_title: newPage,
      page_path: newPage === Page.INTRO ? '/' : `/${newPage}`,
    });
  }
});

const currentPageComponent = computed(() => {
  switch (currentPage.value) {
    case Page.INTRO: return Intro;
    case Page.NOW: return Now;
    case Page.PROJECTS: return Projects;
    case Page.EXPERIENCE: return Experience;
    default: return Intro;
  }
});

onMounted(() => {
  window.addEventListener('popstate', handlePopState);

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
});

const toggleTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    isDark.value = false;
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    isDark.value = true;
  }
};
</script>
