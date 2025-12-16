<template>
  <div class="max-w-3xl mx-auto pt-20 pb-32 px-6">
    <div
      class="transition-all duration-700 ease-out transform"
      :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
    >
      <div class="flex flex-col-reverse md:flex-row items-start justify-between gap-8 mb-10">
        <div class="flex-1">
          <h1 class="font-serif text-5xl md:text-6xl text-zinc-900 dark:text-zinc-100 mb-6 leading-tight transition-colors duration-300">
            Aditya Agarwal
          </h1>
          <h2 class="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light mb-4 max-w-xl transition-colors duration-300">
            Founding Machine Learning Engineer at Soopra.ai
          </h2>
          <h2
            class="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light mb-4 max-w-xl transition-colors duration-300">
            Building intelligent, Agentic Systems.
          </h2>
        </div>

        <div
          class="shrink-0 relative self-center md:self-start transition-all duration-700 delay-200"
          :class="mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'"
        >
          <div class="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-zinc-700 ring-1 ring-zinc-200 dark:ring-zinc-600 rotate-3 hover:rotate-0 transition-all duration-300 cursor-pointer">
            <img
              src="/aditya_headshot.jpg"
              alt="Aditya Agarwal"
                class="w-full h-full object-cover"
             />
          </div>
        </div>
      </div>

      <div class="prose prose-zinc dark:prose-invert text-zinc-600 dark:text-zinc-300 leading-relaxed mb-10 transition-colors duration-300">
        <p class="mb-4">
          I craft scalable AI infrastructure and specialize in RAG pipelines, Agentic systems, and NLP.
          Currently based in Jersey City, turning unstructured data into semantic knowledge.
        </p>
        <p class="mb-4">
          Previously a Full-Stack Developer delivering enterprise cloud solutions.
          I bridge the gap between cutting-edge ML research and production-grade software.
        </p>
        <p>
          Connect with me at <a href="mailto:adiagarwal1509@gmail.com" class="text-zinc-800 dark:text-zinc-100 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-zinc-300 dark:decoration-zinc-600 underline-offset-2">adiagarwal1509@gmail.com</a> or <a href="https://calendar.app.google/SNdonGredqAc8KWL9" target="_blank" rel="noopener noreferrer" class="text-zinc-800 dark:text-zinc-100 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-zinc-300 dark:decoration-zinc-600 underline-offset-2">meet me here</a>.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 mb-20">
        <a
          v-for="link in SOCIAL_LINKS"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-500 hover:shadow-sm transition-all duration-200"
          :aria-label="link.label"
        >
          <component :is="link.icon" :size="20" />
        </a>
      </div>

      <div
        class="group cursor-default inline-block transition-opacity duration-1000 delay-500"
        :class="mounted ? 'opacity-100' : 'opacity-0'"
      >
        <p class="font-mono text-sm text-zinc-400 dark:text-zinc-500 italic transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
          "Talk is cheap. Show me the code."
        </p>
        <div class="flex items-center gap-3 mt-3">
          <div class="h-px w-8 bg-zinc-200 dark:bg-zinc-700 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-600 transition-colors duration-300"></div>
          <p class="font-mono text-xs text-zinc-300 dark:text-zinc-600 uppercase tracking-widest group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors duration-300">
            Linus Torvalds
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SOCIAL_LINKS } from '../constants';

const mounted = ref(false);

onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 50);
});
</script>
