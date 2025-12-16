<template>
  <div class="max-w-2xl mx-auto pt-20 pb-32 px-6">
    <div
      class="transition-all duration-500 ease-out transform"
      :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
    >
      <div class="mb-10">
        <h1 class="font-serif text-4xl text-zinc-900 dark:text-zinc-100 mb-2 transition-colors duration-300">Now</h1>
        <p class="text-zinc-400 dark:text-zinc-500 text-sm uppercase tracking-widest font-medium transition-colors duration-300">Updated November 2025</p>
      </div>

      <!-- Professional Section -->
      <div class="mb-12">
        <h2 class="font-serif text-2xl text-zinc-800 dark:text-zinc-200 mb-6 flex items-center gap-2">
          Professional
        </h2>
        <div class="space-y-12 relative pl-12 ml-4 transition-colors duration-300">
          <!-- Vertical Line -->
          <div class="absolute top-2 bottom-2 left-[17px] w-[2px] bg-zinc-300 dark:bg-zinc-600"></div>
          
          <!-- Personal Model Fine-Tuning -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-rose-50 dark:bg-zinc-900 border border-rose-200 dark:border-rose-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <Mic :size="16" class="text-rose-500 dark:text-rose-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Personal Model Fine-Tuning</h3>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">November 2025</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
               Working on fine-tuning a model to replicate my specific speech patterns and communication style. 
               Currently in the data-collection phase, curating datasets from my personal writings and chats.
            </p>
          </div>

          <!-- Learning LangChain -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-blue-50 dark:bg-zinc-900 border border-blue-200 dark:border-blue-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <Link :size="16" class="text-blue-500 dark:text-blue-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Learning LangChain</h3>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">November 2025</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
               Deep diving into LangChain to architect robust and complex agentic workflows. 
               Increasing project volume to apply these concepts in real-world scenarios immediately.
            </p>
          </div>

          <!-- Track-us -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-emerald-50 dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <MapPin :size="16" class="text-emerald-500 dark:text-emerald-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Track-us (Shipped)</h3>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">October 2025</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
                Successfully built and deployed <a href="https://trackus.vercel.app/" target="_blank" rel="noopener noreferrer" class="underline hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">Track-us</a>. 
                It is actively being used by approximately <strong>800 users/week</strong>. 
                Code available on <a href="https://github.com/adiagarwalrock/track-us" target="_blank" rel="noopener noreferrer" class="underline hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">GitHub</a>.
            </p>
          </div>
        </div>
      </div>

      <!-- Personal Section -->
      <div>
        <h2 class="font-serif text-2xl text-zinc-800 dark:text-zinc-200 mb-6 flex items-center gap-2">
          Personal
        </h2>
        <div class="space-y-12 relative pl-12 ml-4 transition-colors duration-300">
          <!-- Vertical Line -->
          <div class="absolute top-2 bottom-2 left-[17px] w-[2px] bg-zinc-300 dark:bg-zinc-600"></div>
          
          <!-- Gaming -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-violet-50 dark:bg-zinc-900 border border-violet-200 dark:border-violet-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <Gamepad2 :size="16" class="text-violet-500 dark:text-violet-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Gaming</h3>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">November 2025</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
               Playing <span class="text-violet-600 dark:text-violet-400 font-medium">Valorant</span> and immersing myself in the world of <span class="text-violet-600 dark:text-violet-400 font-medium">Ghost of Tsushima</span>.
            </p>
          </div>
          
          <!-- Reading -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-amber-50 dark:bg-zinc-900 border border-amber-200 dark:border-amber-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <BookOpen :size="16" class="text-amber-500 dark:text-amber-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Reading</h3>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">October 2025</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
               Started reading <span class="text-amber-600 dark:text-amber-400 font-medium">Machine Learning Dummies</span>.
            </p>
          </div>
        </div>
      </div>
      
      <div class="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 italic text-sm transition-colors duration-300">
        Inspired by the <a href="https://nownownow.com/about" target="_blank" class="underline hover:text-zinc-600 dark:hover:text-zinc-300">Now page</a> movement.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Mic, Link, MapPin, Gamepad2, BookOpen } from 'lucide-vue-next';

const mounted = ref(false);

onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 50);
});
</script>
