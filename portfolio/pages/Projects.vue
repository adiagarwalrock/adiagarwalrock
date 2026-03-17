<template>
  <div class="max-w-5xl mx-auto pt-20 pb-32 px-6">
    <h1 
      class="font-serif text-4xl text-zinc-900 dark:text-zinc-100 mb-10 transition-colors duration-300 transform transition-all ease-out"
      :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
    >
      Selected Work
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(project, index) in PROJECT_DATA"
        :key="project.title"
        class="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-500 transform"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
        :style="{ transitionDelay: `${index * 100}ms` }"
      >
        <!-- GitHub Preview Image -->
        <div v-if="getGithubPreview(project.github)" class="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
          <img 
            :src="getGithubPreview(project.github)!" 
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ project.title }}
            </h3>
            <div class="flex gap-3">
              <a v-if="project.github" :href="project.github" target="_blank" class="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" aria-label="GitHub Repository">
                <Github :size="18" />
              </a>
              <a v-if="project.link" :href="project.link" target="_blank" class="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" aria-label="Live Demo">
                <ExternalLink :size="18" />
              </a>
            </div>
          </div>
          
          <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 h-24 overflow-hidden text-ellipsis transition-colors duration-300">
             {{ project.description[0] }}
          </p>
  
          <div class="flex flex-wrap gap-2 mt-auto">
            <span
              v-for="t in project.tech"
              :key="t"
              class="px-2.5 py-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
            >
              {{ t }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PROJECT_DATA } from '../constants';
import { ExternalLink, Github } from 'lucide-vue-next';

const mounted = ref(false);

const getGithubPreview = (url?: string) => {
  if (!url || !url.includes('github.com')) return null;
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (match) {
    return `https://opengraph.githubassets.com/1/${match[1]}/${match[2]}`;
  }
  return null;
};

onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 50);
});
</script>
