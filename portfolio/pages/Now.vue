<template>
  <div class="max-w-2xl mx-auto pt-20 pb-32 px-6">
    <div
      class="transition-all duration-500 ease-out transform"
      :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
    >
      <div class="mb-10">
        <h1 class="font-serif text-4xl text-zinc-900 dark:text-zinc-100 mb-2 transition-colors duration-300">Now</h1>
        <p
          class="text-zinc-400 dark:text-zinc-500 text-sm uppercase tracking-widest font-medium transition-colors duration-300">
          Updated March 2026</p>
      </div>

      <!-- Professional Section -->
      <div class="mb-12">
        <h2 class="font-serif text-2xl text-zinc-800 dark:text-zinc-200 mb-6 flex items-center gap-2">
          Professional
        </h2>
        <div class="space-y-12 relative pl-12 ml-4 transition-colors duration-300">
          <!-- Vertical Line -->
          <div class="absolute top-2 bottom-2 left-[17px] w-[2px] bg-zinc-300 dark:bg-zinc-600"></div>

          <!-- NanoChat -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-sky-50 dark:bg-zinc-900 border border-sky-200 dark:border-sky-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <Smartphone :size="16" class="text-sky-500 dark:text-sky-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <div class="flex items-center gap-3">
                <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">NanoChat (Closed Alpha)</h3>
                <a href="https://github.com/adiagarwalrock/NanoChat" target="_blank" rel="noopener noreferrer" class="group/link flex items-center gap-1 text-zinc-400 hover:text-sky-500 transition-colors" aria-label="GitHub Repository">
                  <Github :size="16" />
                </a>
              </div>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">March 2026</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
              Android chat app running <span class="text-sky-600 dark:text-sky-400 font-medium">on-device AI</span> models directly on phone - no internet or cloud dependencies. Utilizes Google Gemini Nano for local inference to ensure <span class="text-sky-600 dark:text-sky-400 font-medium">total privacy</span>. Functions as an offline-first ChatGPT alternative.
            </p>
            <p class="mt-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 italic flex items-center gap-2">
              <span class="text-sky-500">→</span>
              <span>(i can add you to the closed beta; just <a href="mailto:adiagarwal1509@gmail.com" class="underline decoration-sky-500/30 hover:decoration-sky-500 hover:text-sky-500 transition-all cursor-pointer">shoot me an email</a>.)</span>
            </p>
          </div>

          <!-- Digits -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-indigo-50 dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <Binary :size="16" class="text-indigo-500 dark:text-indigo-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <div class="flex items-center gap-3">
                <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Digits</h3>
                <div class="flex items-center gap-2">
                  <a href="https://digits.adityaagarwal.me" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-indigo-500 transition-colors" aria-label="Live Demo">
                    <ExternalLink :size="16" />
                  </a>
                  <a href="https://github.com/adiagarwalrock/mnist-digits-web" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-indigo-500 transition-colors" aria-label="GitHub Repository">
                    <Github :size="16" />
                  </a>
                </div>
              </div>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">February 2026</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
              An interactive <span class="text-indigo-600 dark:text-indigo-400 font-medium">Browser Toy</span> for digit recognition - draw on a grid to see real-time model predictions and internal <span class="text-indigo-600 dark:text-indigo-400 font-medium">neuron firing visualizations</span>. Operates entirely in client browser.
            </p>
          </div>

          <!-- Atlantis -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-teal-50 dark:bg-zinc-900 border border-teal-200 dark:border-teal-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <NotebookPen :size="16" class="text-teal-500 dark:text-teal-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <div class="flex items-center gap-3">
                <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Atlantis (Shipped)</h3>
                <div class="flex items-center gap-2">
                  <a href="https://github.com/Fantastic-Computing-Machine/atlantis" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-teal-500 transition-colors" aria-label="GitHub Repository">
                    <Github :size="16" />
                  </a>
                  <a href="https://hub.docker.com/r/strikead/atlantis" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-teal-500 transition-colors" aria-label="Docker Hub">
                    <Package :size="16" />
                  </a>
                  <a href="https://fantastic-computing-machine.github.io/atlantis/" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-teal-500 transition-colors" aria-label="Live Demo">
                    <ExternalLink :size="16" />
                  </a>
                </div>
              </div>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">January 2026</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
              Open-source tool for taking notes and drawing diagrams with <span class="text-teal-600 dark:text-teal-400 font-medium">full data privacy</span>. Features a clean editor with <span class="text-teal-600 dark:text-teal-400 font-medium">live preview</span> rendering alongside text.
            </p>
          </div>

          <!-- Personal Model Fine-Tuning -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-rose-50 dark:bg-zinc-900 border border-rose-200 dark:border-rose-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <Mic :size="16" class="text-rose-500 dark:text-rose-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Personal Model Fine-Tuning</h3>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">January 2026</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
              Working on <span class="text-rose-600 dark:text-rose-400 font-medium">fine-tuning</span> a model to replicate my specific <span class="text-rose-600 dark:text-rose-400 font-medium">speech patterns</span>. Currently in the data-collection phase, curating datasets from my personal writings and chats.
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
              Researching LangChain to architect robust, complex <span class="text-blue-600 dark:text-blue-400 font-medium">agentic workflows</span> applied in <span class="text-blue-600 dark:text-blue-400 font-medium">real-world scenarios</span>.
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
            <div class="absolute -left-12 top-0 w-9 h-9 bg-violet-50 dark:bg-zinc-900 border border-violet-200 dark:violet-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <Gamepad2 :size="16" class="text-violet-500 dark:text-violet-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Gaming</h3>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">Ongoing</span>
            </div>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
               Playing <span class="text-violet-600 dark:text-violet-400 font-medium">Valorant</span> and immersing myself in the world of <span class="text-violet-600 dark:text-violet-400 font-medium">Ghost of Tsushima</span>.
            </p>
          </div>

          <!-- PyTorch for Deep Learning -->
          <div class="relative">
            <div class="absolute -left-12 top-0 w-9 h-9 bg-orange-50 dark:bg-zinc-900 border border-orange-200 dark:border-orange-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-sm z-10">
              <GraduationCap :size="16" class="text-orange-500 dark:text-orange-400" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <div class="flex items-center gap-3">
                <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">PyTorch for Deep Learning</h3>
                <a href="https://www.coursera.org/programs/learning-program-for-family-iwira/professional-certificates/pytorch-for-deep-learning" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-orange-500 transition-colors" aria-label="Course Website">
                  <ExternalLink :size="16" />
                </a>
              </div>
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-300">February 2026 (in progress)</span>
            </div>
            <div class="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
              <p>
                Taking <span class="text-orange-600 dark:text-orange-400 font-medium">PyTorch</span> professional certificate to sharpen my understanding of how models are actually built and trained from <span class="text-orange-600 dark:text-orange-400 font-medium">Fundamentals</span>.
              </p>
              <div class="mt-4">
                <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-tight">Courses in the series:</span>
                <ul class="mt-2 space-y-2 text-sm border-l-2 border-orange-100 dark:border-orange-900/30 pl-4">
                  <li><span class="text-orange-600 dark:text-orange-400 font-medium">Fundamentals</span> - tensors, neural networks, and building a training pipeline from scratch <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 ml-2 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-500/20">Complete</span></li>
                  <li><span class="text-orange-600 dark:text-orange-400 font-medium">Techniques and Ecosystem Tools</span> - hyperparameter tuning, transfer learning, TorchVision and Hugging Face</li>
                  <li><span class="text-orange-600 dark:text-orange-400 font-medium">Advanced Architectures and Deployment</span> - Transformers, diffusion models, ResNet, and shipping models via ONNX and MLflow</li>
                </ul>
              </div>
            </div>
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
import { Binary, BookOpen, ExternalLink, Gamepad2, Github, GraduationCap, Link, Mic, NotebookPen, Package, Smartphone } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const mounted = ref(false);

onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 50);
});
</script>
