<template>
  <div class="word-processor-app">
    <div class="toolbar">
      <button @click="saveAsMarkdown">Save as Markdown</button>
    </div>
    <QuillEditor theme="snow" toolbar="full" ref="quillEditorRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import TurndownService from 'turndown';

const quillEditorRef = ref<typeof QuillEditor | null>(null);

const saveAsMarkdown = () => {
  if (quillEditorRef.value) {
    const htmlContent = quillEditorRef.value.getHTML();
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(htmlContent);

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
</script>

<style scoped>
.word-processor-app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.word-processor-app :deep(.ql-toolbar.ql-snow) {
  font-size: 14px; /* Adjust toolbar icon size */
}

.word-processor-app :deep(.ql-container) {
  flex-grow: 1;
  font-size: 16px;
}

.word-processor-app :deep(.ql-editor) {
  min-height: 400px; /* Ensure a decent typing area */
}
</style>
