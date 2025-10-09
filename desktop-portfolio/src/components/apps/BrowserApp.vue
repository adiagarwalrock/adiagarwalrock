<template>
  <div class="browser-app">
    <div class="address-bar">
      <input v-model="url" @keyup.enter="navigate" />
      <button @click="navigate">Go</button>
    </div>
    <div class="disclaimer">
      <p>For security reasons, this browser can only navigate to a limited set of websites.</p>
    </div>
    <iframe :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { WindowState } from '../../stores/windows';

const props = defineProps<{ window: WindowState }>();

const allowedHosts = ['www.google.com', 'www.bing.com', 'www.wikipedia.org'];

const defaultUrl = props.window.url ?? 'https://www.google.com/webhp?igu=1';
const url = ref(defaultUrl);
const iframeSrc = ref(defaultUrl);

const setIframeUrl = (target: string) => {
  try {
    const hostname = new URL(target).hostname;
    if (allowedHosts.includes(hostname)) {
      url.value = target;
      iframeSrc.value = target;
    } else {
      alert('Navigation to this website is not allowed.');
    }
  } catch (e) {
    alert('Invalid URL');
  }
};

const navigate = () => {
  setIframeUrl(url.value);
};

onMounted(() => {
  if (props.window.url) {
    setIframeUrl(props.window.url);
  }
});

watch(
  () => props.window.url,
  newUrl => {
    if (newUrl && newUrl !== iframeSrc.value) {
      setIframeUrl(newUrl);
    }
  }
);
</script>

<style scoped>
.browser-app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.address-bar {
  display: flex;
  padding: 5px;
}

.address-bar input {
  flex-grow: 1;
  margin-right: 5px;
}

.disclaimer {
  padding: 5px;
  background-color: #f0f0f0;
  text-align: center;
}

iframe {
  flex-grow: 1;
  border: none;
}
</style>
