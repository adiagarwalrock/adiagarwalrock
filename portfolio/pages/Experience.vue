<template>
  <div class="max-w-4xl mx-auto pt-20 pb-32 px-6">
    <div
      class="transition-all duration-500 ease-out transform"
      :class="mounted ? 'opacity-100' : 'opacity-0'"
    >
      <h1 class="font-serif text-4xl text-zinc-900 dark:text-zinc-100 mb-12 transition-colors duration-300">Experience & Skills</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <!-- Main Timeline -->
          <div class="lg:col-span-2 space-y-12">
              <div 
                v-for="(exp, idx) in EXPERIENCE_DATA" 
                :key="idx" 
                class="relative pl-8 border-l border-zinc-300 dark:border-zinc-600 transition-colors duration-300"
              >
                  <span class="absolute -left-1.5 top-1.5 w-3 h-3 bg-white dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-600 rounded-full transition-colors duration-300"></span>
                  <div class="mb-2">
                      <h3 class="text-lg font-bold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">{{ exp.role }}</h3>
                      <div class="flex justify-between items-baseline text-sm text-zinc-500 dark:text-zinc-400 mb-2 transition-colors duration-300">
                          <span class="font-medium text-zinc-700 dark:text-zinc-300">{{ exp.company }}</span>
                          <span>{{ exp.period }}</span>
                      </div>
                  </div>
                  <ul class="list-disc list-outside ml-4 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed transition-colors duration-300">
                      <li v-for="(pt, i) in exp.points" :key="i">{{ pt }}</li>
                  </ul>
              </div>
          </div>

          <!-- Sidebar Skills -->
          <div class="space-y-8">
              <div 
                v-for="cat in SKILLS_DATA" 
                :key="cat.category" 
                class="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm transition-colors duration-300"
              >
                  <h4 class="font-serif font-bold text-zinc-900 dark:text-zinc-100 mb-4 transition-colors duration-300">{{ cat.category }}</h4>
                  <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="skill in cat.skills" 
                        :key="skill" 
                        class="px-2 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs rounded border border-zinc-100 dark:border-zinc-700 transition-colors duration-300"
                      >
                          {{ skill }}
                      </span>
                  </div>
              </div>

               <div class="bg-zinc-900 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-300 p-6 rounded-2xl transition-colors duration-300">
                  <h4 class="font-serif font-bold text-white dark:text-white mb-2">Education</h4>
                  <div class="mb-4">
                      <p class="font-medium text-white dark:text-white text-sm">MS in Machine Learning</p>
                      <p class="text-xs text-zinc-400 dark:text-zinc-400">Stevens Institute of Tech</p>
                  </div>
                  <div>
                      <p class="font-medium text-white dark:text-white text-sm">B Tech. in Computer Science</p>
                      <p class="text-xs text-zinc-400 dark:text-zinc-400">Alliance University</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { EXPERIENCE_DATA, SKILLS_DATA } from '../constants';

const mounted = ref(false);

onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 50);
});
</script>
