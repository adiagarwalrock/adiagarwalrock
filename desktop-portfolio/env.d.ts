/// <reference types="vite/client" />

interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: any[];
}

declare module 'clippyjs';
declare module 'draggable-resizable-vue3';
declare module 'winbox/src/js/winbox';