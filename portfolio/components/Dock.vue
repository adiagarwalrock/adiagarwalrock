<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 sm:gap-4">
    
    <!-- Main Navigation - Disjointed Pill 1 -->
    <div class="flex items-center gap-2 px-3 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-xl rounded-2xl ring-1 ring-black/5 dark:ring-white/10 h-[74px] transition-colors duration-300">
      <button
        v-for="item in items"
        :key="item.id"
        @click="$emit('update:activePage', item.id)"
        class="relative group flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/50 dark:hover:bg-zinc-800/50"
      >
        <span class="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap pointer-events-none origin-bottom">
          {{ item.label }}
        </span>
        
        <div
          class="transition-all duration-300 transform"
          :class="{
            'scale-110 -translate-y-1': activePage === item.id,
            'group-hover:scale-120 group-hover:-translate-y-2': activePage !== item.id
          }"
        >
          <component 
            :is="item.icon" 
            :size="24" 
            class="transition-colors duration-300"
            :class="activePage === item.id ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'" 
            :stroke-width="activePage === item.id ? 2.5 : 1.5"
          />
        </div>
        
        <div 
          v-if="activePage === item.id"
          class="absolute bottom-1.5 w-1 h-1 bg-zinc-900 dark:bg-zinc-100 rounded-full"
        />
      </button>
    </div>

    <!-- Resume Link - Disjointed Pill 2 -->
    <a 
        :href="cvLink"
        target="_blank"
        class="relative group flex flex-col items-center justify-center w-[74px] h-[74px] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-xl rounded-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 hover:bg-white/90 dark:hover:bg-zinc-800 hover:scale-105"
        title="Download Resume"
    >
         <span class="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap pointer-events-none origin-bottom">
            Resume PDF
         </span>
         <div class="transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-0.5">
            <FileText :size="26" class="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" :stroke-width="1.5" />
         </div>
    </a>
    
  </div>
</template>

<script setup lang="ts">
import { Page } from '../types';
import { Home, Clock, Briefcase, FolderGit2, FileText } from 'lucide-vue-next';

defineProps<{
  activePage: Page;
  cvLink: string;
}>();

defineEmits<{
  (e: 'update:activePage', page: Page): void;
}>();

const items = [
  { id: Page.INTRO, icon: Home, label: 'Intro' },
  { id: Page.NOW, icon: Clock, label: 'Now' },
  { id: Page.PROJECTS, icon: FolderGit2, label: 'Projects' },
  { id: Page.EXPERIENCE, icon: Briefcase, label: 'Experience' },
];
</script>
