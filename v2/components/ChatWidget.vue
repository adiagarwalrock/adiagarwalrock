<template>
  <div class="fixed bottom-24 right-6 z-40 flex flex-col items-end">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-90 translate-y-5"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-90 translate-y-5"
    >
      <div
        v-if="isOpen"
        class="mb-4 w-80 sm:w-96 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[500px] transition-colors duration-300"
      >
        <!-- Header -->
        <div class="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/50">
          <div class="flex items-center gap-2">
            <Sparkles :size="16" class="text-amber-500" />
            <span class="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">Ask AI about Aditya</span>
          </div>
          <button 
            @click="isOpen = false"
            class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            <X :size="18" />
          </button>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]" ref="messagesContainer">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed"
              :class="msg.role === 'user'
                ? 'bg-zinc-800 dark:bg-zinc-700 text-white rounded-br-none'
                : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-bl-none shadow-sm'"
            >
              {{ msg.content }}
            </div>
          </div>
          <div v-if="loading" class="flex justify-start">
            <div class="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
              <div class="flex gap-1">
                <div class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <form @submit.prevent="handleSubmit" class="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div class="relative">
            <input
              type="text"
              v-model="input"
              placeholder="Ask about my skills..."
              class="w-full pl-4 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100"
            />
            <button
              type="submit"
              :disabled="loading || !input.trim()"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-zinc-900 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send :size="14" />
            </button>
          </div>
        </form>
      </div>
    </Transition>

    <button
      @click="isOpen = !isOpen"
      class="p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
      :class="isOpen ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300' : 'bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900'"
    >
      <component :is="isOpen ? X : MessageSquare" :size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { MessageSquare, X, Send, Sparkles } from 'lucide-vue-next';
import { generateChatResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const isOpen = ref(false);
const messages = ref<Message[]>([
  { id: '1', role: 'assistant', content: "Hi! I'm Aditya's AI assistant. Ask me anything about his work, skills, or experience." }
]);
const input = ref('');
const loading = ref(false);
const messagesContainer = ref<HTMLDivElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(messages, scrollToBottom, { deep: true });
watch(isOpen, (val) => {
  if (val) scrollToBottom();
});

const handleSubmit = async () => {
  if (!input.value.trim() || loading.value) return;

  const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.value };
  messages.value.push(userMsg);
  const currentInput = input.value;
  input.value = '';
  loading.value = true;

  const responseText = await generateChatResponse(currentInput);
  
  messages.value.push({ id: (Date.now() + 1).toString(), role: 'assistant', content: responseText });
  loading.value = false;
};
</script>
