<template>
  <div class="clippy-anchor" aria-hidden="true"></div>
  <div v-if="dialogText" class="clippy-dialog" :style="dialogStyle" ref="dialogRef" @click.stop>
    <div class="dialog-header">
      <span>Clippy</span>
      <button type="button" @click="closeDialog">×</button>
    </div>
    <div class="dialog-body">
      {{ dialogText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import clippy from 'clippyjs';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

type ClippyAgent = {
  show: (fast?: boolean) => void;
  hide: (fast?: boolean) => void;
  moveTo: (x: number, y: number) => void;
  speak: (text: string) => void;
};

const agentRef = ref<ClippyAgent | null>(null);
const dialogText = ref('');
const dialogRef = ref<HTMLElement | null>(null);
const dialogStyle = ref<Record<string, string>>({});

let resizeHandler: (() => void) | null = null;
let dialogHideTimer: number | null = null;
let dialogUpdateTimer: number | null = null;

const closeDialog = () => {
  if (dialogHideTimer) {
    window.clearTimeout(dialogHideTimer);
    dialogHideTimer = null;
  }
  dialogText.value = '';
};

const getAgentElement = () => {
  const agent = agentRef.value as any;
  if (!agent || !agent._el) return null;
  return typeof agent._el.get === 'function' ? agent._el.get(0) : agent._el;
};

const updateDialogPosition = () => {
  if (!dialogText.value) return;
  const agentEl = getAgentElement();
  const dialogEl = dialogRef.value;
  if (!agentEl || !dialogEl) return;

  const agentRect = agentEl.getBoundingClientRect();
  const dialogWidth = dialogEl.offsetWidth || 220;
  const dialogHeight = dialogEl.offsetHeight || 100;
  const margin = 16;

  let left = agentRect.left + agentRect.width - dialogWidth;
  let top = agentRect.top - dialogHeight - margin;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  left = Math.max(margin, Math.min(left, viewportWidth - dialogWidth - margin));
  top = Math.max(margin, Math.min(top, viewportHeight - dialogHeight - margin));

  dialogStyle.value = {
    left: `${left}px`,
    top: `${top}px`,
  };
};

const scheduleDialogUpdate = () => {
  if (dialogUpdateTimer) {
    window.clearTimeout(dialogUpdateTimer);
  }
  updateDialogPosition();
  let runs = 0;
  const tick = () => {
    updateDialogPosition();
    runs += 1;
    if (runs < 5) {
      dialogUpdateTimer = window.setTimeout(tick, 160);
    } else {
      dialogUpdateTimer = null;
    }
  };
  dialogUpdateTimer = window.setTimeout(tick, 160);
};

const showDialog = (text: string, duration = 6000) => {
  dialogText.value = text;
  nextTick(() => scheduleDialogUpdate());
  if (dialogHideTimer) {
    window.clearTimeout(dialogHideTimer);
  }
  dialogHideTimer = window.setTimeout(() => {
    dialogText.value = '';
    dialogHideTimer = null;
  }, duration);
};

const applyFixedPosition = () => {
  const el = getAgentElement();
  if (!el) return;

  const width = el.offsetWidth || 120;
  const height = el.offsetHeight || 120;
  const taskbarHeight = 48;
  const padding = 16;
  const top = Math.max(padding, window.innerHeight - height - taskbarHeight);
  const left = Math.max(padding, window.innerWidth - width - padding);

  el.style.position = 'fixed';
  el.style.top = `${top}px`;
  el.style.left = `${left}px`;
  el.style.bottom = 'auto';
  el.style.right = 'auto';

  scheduleDialogUpdate();
};

const localAssetBase = import.meta.env.BASE_URL;
const fallbackAssetBase = 'https://cdn.jsdelivr.net/gh/pi0/clippyjs@master/assets/agents/';

const loadAgent = (basePath = localAssetBase, alreadyRetried = false) => {
  clippy.load(
    'Clippy',
    (agent) => {
      agentRef.value = agent;
      applyFixedPosition();
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      resizeHandler = () => {
        applyFixedPosition();
        scheduleDialogUpdate();
      };
      window.addEventListener('resize', resizeHandler);
      agent.show(false);
      if (agent.play) {
        agent.play('Greeting');
      }
      showDialog("Welcome to Adi's portfolio! I am Clippy, your personal assistant.");
    },
    (error) => {
      if (!alreadyRetried && basePath === localAssetBase) {
        console.warn('Local Clippy assets missing, falling back to CDN.', error);
        loadAgent(fallbackAssetBase, true);
        return;
      }
      console.error('Failed to load Clippy agent:', error);
    },
    basePath
  );
};

onMounted(() => {
  loadAgent();
});

onBeforeUnmount(() => {
  if (dialogUpdateTimer) {
    window.clearTimeout(dialogUpdateTimer);
    dialogUpdateTimer = null;
  }
  if (dialogHideTimer) {
    window.clearTimeout(dialogHideTimer);
    dialogHideTimer = null;
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
  if (agentRef.value) {
    agentRef.value.hide(true);
    agentRef.value = null;
  }
});
</script>

<style scoped>
.clippy-anchor {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 1px;
  height: 1px;
  z-index: 110000;
}

:deep(.clippy) {
  z-index: 120000;
  pointer-events: auto;
}

:deep(.clippy-balloon) {
  display: none !important;
}

.clippy-dialog {
  position: fixed;
  z-index: 120001;
  pointer-events: auto;
  max-width: 260px;
  background: linear-gradient(180deg, #ffffff 0%, #f1f1f1 100%);
  border: 2px solid #000080;
  border-radius: 6px;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.4);
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  color: #000;
  overflow: hidden;
}

.dialog-header {
  background: linear-gradient(180deg, #0b62d6 0%, #094eab 100%);
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  padding: 4px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #042f6c;
}

.dialog-header button {
  background: #c0c0c0;
  border: 1px solid #333;
  border-radius: 2px;
  width: 18px;
  height: 18px;
  line-height: 16px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
}

.dialog-header button:hover {
  background: #ffbaba;
}

.dialog-body {
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.4;
}
</style>
