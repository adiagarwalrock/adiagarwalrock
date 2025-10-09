<template>
  <div class="files-app">
    <nav class="menu-bar">
      <button v-for="item in menuItems" :key="item" type="button">
        {{ item }}
      </button>
    </nav>

    <div class="toolbar">
      <template v-for="button in toolbarButtons" :key="button.key">
        <div v-if="button.separator" class="toolbar-separator" aria-hidden="true"></div>
        <button
          v-else
          type="button"
          :disabled="button.disabled"
          @click="button.action && button.action()"
        >
          {{ button.label }}
        </button>
      </template>
    </div>

    <div class="address-bar">
      <label for="address-input">Address</label>
      <input id="address-input" type="text" :value="addressPath" readonly />
    </div>

    <div class="content-area">
      <aside class="sidebar">
        <div class="drive-card">
          <div class="drive-icon">C:</div>
          <div class="drive-copy">
            <h4>(C:)</h4>
            <p>{{ driveMessage }}</p>
          </div>
        </div>
        <div v-if="activeFile" class="file-details">
          <h5>{{ activeFile.title }}</h5>
          <ul>
            <li><span class="detail-label">Type:</span> PDF Document</li>
            <li><span class="detail-label">Location:</span> {{ activeFile.file }}</li>
          </ul>
        </div>
        <div v-else class="file-details muted">
          <p>No item selected.</p>
        </div>
      </aside>

      <section class="file-grid">
        <div
          v-for="file in files"
          :key="file.file"
          class="file-item"
          :class="{ active: activeFile && activeFile.file === file.file }"
          tabindex="0"
          @click="selectFile(file)"
          @dblclick="openPreview(file)"
          @keydown.enter.prevent="openPreview(file)"
          @keydown.space.prevent="selectFile(file)"
        >
          <img :src="filesIcon" alt="Resume file icon" />
          <span>{{ file.title }}</span>
        </div>
        <p v-if="!files.length" class="empty-state">No files available.</p>
      </section>
    </div>

    <div v-if="previewFile" class="preview-pane">
      <div class="preview-toolbar">
        <span class="preview-title">{{ previewFile.title }}</span>
        <div class="preview-actions">
          <button type="button" @click="downloadFile">Download</button>
          <button type="button" @click="openFileInNewTab">Open in new tab</button>
          <button type="button" @click="closePreview">Close preview</button>
        </div>
      </div>
      <iframe :src="previewFile.file" frameborder="0"></iframe>
    </div>

    <footer class="status-bar">
      <span class="status-field">{{ statusText }}</span>
      <span class="status-field">{{ statusDetail }}</span>
      <span class="status-field align-right">My Computer</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import filesIcon from '../../assets/icons/files.png';

interface ResumeFile {
  title: string;
  file: string;
}

const files = ref<ResumeFile[]>([]);
const activeFile = ref<ResumeFile | null>(null);
const previewFile = ref<ResumeFile | null>(null);

const menuItems = ['File', 'Edit', 'View', 'Go', 'Favorites', 'Help'];
const addressPath = 'C:\\Portfolio\\Resume';

const driveMessage = computed(() =>
  activeFile.value ? 'Selected item details appear below.' : 'Select an item to view its description.'
);

const hasSelection = computed(() => Boolean(activeFile.value));

const toolbarButtons = computed(() => [
  { key: 'back', label: 'Back', disabled: true },
  { key: 'forward', label: 'Forward', disabled: true },
  { key: 'up', label: 'Up', disabled: true },
  { key: 'separator-1', separator: true },
  { key: 'cut', label: 'Cut', disabled: true },
  { key: 'copy', label: 'Copy', disabled: !hasSelection.value },
  { key: 'paste', label: 'Paste', disabled: true },
  { key: 'undo', label: 'Undo', disabled: true },
  { key: 'delete', label: 'Delete', disabled: !hasSelection.value },
  { key: 'separator-2', separator: true },
  {
    key: 'open',
    label: 'Open',
    disabled: !hasSelection.value,
    action: () => activeFile.value && openPreview(activeFile.value),
  },
  {
    key: 'properties',
    label: 'Properties',
    disabled: !hasSelection.value,
    action: () => activeFile.value && openPreview(activeFile.value),
  },
]);

const statusText = computed(() => {
  const total = files.value.length;
  if (!total) return 'No objects';
  return `${total} object${total === 1 ? '' : 's'}`;
});

const statusDetail = computed(() => {
  if (previewFile.value) {
    return `Previewing ${previewFile.value.title}`;
  }
  if (activeFile.value) {
    return activeFile.value.title;
  }
  return 'Select an item.';
});

const selectFile = (file: ResumeFile) => {
  activeFile.value = file;
};

const openPreview = (file: ResumeFile) => {
  selectFile(file);
  previewFile.value = file;
};

const closePreview = () => {
  previewFile.value = null;
};

const openFileInNewTab = () => {
  if (previewFile.value) {
    window.open(previewFile.value.file, '_blank', 'noopener');
  }
};

const downloadFile = () => {
  if (!previewFile.value) return;
  const link = document.createElement('a');
  link.href = previewFile.value.file;
  link.download = previewFile.value.file.split('/').pop() || `${previewFile.value.title}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(async () => {
  try {
    const response = await fetch('/resume/manifest.json');
    if (!response.ok) {
      throw new Error('Failed to load resume manifest.');
    }
    files.value = await response.json();
  } catch (error) {
    console.error('Error fetching resume manifest:', error);
  }
});
</script>

<style scoped>
.files-app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #d4d0c8;
  color: #000;
  font-size: 12px;
}

.menu-bar {
  display: flex;
  gap: 12px;
  padding: 4px 10px;
  border-bottom: 1px solid #808080;
  background: #d4d0c8;
}

.menu-bar button {
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  padding: 2px 4px;
}

.menu-bar button:hover {
  text-decoration: underline;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: #d4d0c8;
  border-bottom: 1px solid #808080;
  box-shadow: inset 0 -1px 0 #ffffff;
}

.toolbar button {
  min-width: 60px;
  padding: 4px 6px;
  border: 1px solid #808080;
  background: #d4d0c8;
  box-shadow: inset 1px 1px 0 #ffffff;
  font: inherit;
  cursor: pointer;
}

.toolbar button:active {
  border-top-color: #404040;
  border-left-color: #404040;
  box-shadow: inset -1px -1px 0 #ffffff;
}

.toolbar button:disabled {
  color: #777;
  border-color: #aaa;
  cursor: default;
  box-shadow: none;
}

.toolbar-separator {
  width: 1px;
  height: 24px;
  background: #808080;
  box-shadow: 1px 0 0 #ffffff;
  margin: 0 6px;
}

.address-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: #ffffff;
  border-bottom: 1px solid #808080;
}

.address-bar label {
  font-weight: bold;
}

.address-bar input {
  flex: 1;
  padding: 2px 4px;
  border: 1px solid #808080;
  background: #ffffff;
  box-shadow: inset 1px 1px 0 #ffffff;
  font: inherit;
}

.content-area {
  display: flex;
  flex: 1;
  overflow: hidden;
  background: #ffffff;
}

.sidebar {
  width: 210px;
  padding: 12px;
  background: linear-gradient(180deg, #ffffff, #dfe9f4);
  border-right: 1px solid #808080;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.drive-card {
  display: flex;
  gap: 12px;
  align-items: center;
}

.drive-icon {
  width: 44px;
  height: 36px;
  border: 2px solid #c0c0c0;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: linear-gradient(180deg, #ffffff 0%, #e2e7f3 100%);
}

.drive-copy h4 {
  margin: 0 0 4px;
  font-size: 14px;
}

.drive-copy p {
  margin: 0;
  font-size: 12px;
}

.file-details {
  border: 1px solid #808080;
  padding: 10px;
  background: #ffffff;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #c0c0c0;
}

.file-details h5 {
  margin: 0 0 6px;
  font-size: 13px;
}

.file-details ul {
  padding-left: 16px;
  margin: 0;
  font-size: 12px;
}

.file-details li {
  margin-bottom: 4px;
}

.file-details .detail-label {
  font-weight: bold;
}

.file-details.muted {
  color: #555;
  font-style: italic;
}

.file-grid {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 20px 24px;
  overflow: auto;
  background: #ffffff;
}

.file-item {
  width: 100px;
  text-align: center;
  padding: 8px 4px;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
}

.file-item:hover {
  background: rgba(12, 87, 185, 0.1);
}

.file-item.active {
  border: 1px dotted #000080;
  background: rgba(12, 87, 185, 0.15);
}

.file-item:focus-visible {
  border: 1px dotted #000080;
}

.file-item img {
  width: 48px;
  height: 48px;
}

.file-item span {
  display: block;
  margin-top: 6px;
  line-height: 1.2;
}

.empty-state {
  margin: 0;
  color: #555;
}

.preview-pane {
  margin: 0 12px 12px;
  border: 1px solid #808080;
  background: #ffffff;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #c0c0c0;
  display: flex;
  flex-direction: column;
  height: 240px;
}

.preview-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  border-bottom: 1px solid #808080;
  background: #d4d0c8;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.preview-actions button {
  padding: 4px 8px;
  border: 1px solid #808080;
  background: #d4d0c8;
  box-shadow: inset 1px 1px 0 #ffffff;
  cursor: pointer;
}

.preview-actions button:active {
  border-top-color: #404040;
  border-left-color: #404040;
  box-shadow: inset -1px -1px 0 #ffffff;
}

.preview-pane iframe {
  flex: 1;
  border: none;
  background: #ffffff;
}

.status-bar {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 8px;
  align-items: center;
  padding: 4px 10px;
  background: #d4d0c8;
  border-top: 1px solid #ffffff;
  box-shadow: inset 0 1px 0 #808080;
}

.status-field {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.align-right {
  text-align: right;
}
</style>
