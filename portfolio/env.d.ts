/// <reference types="vite/client" />

interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: any[];
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
