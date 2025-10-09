// /src/stores/windows.ts
import { defineStore } from 'pinia';

// Icons for window defaults
import browserIcon from '../assets/icons/browser.png';
import filesIcon from '../assets/icons/files.png';
import githubIcon from '../assets/icons/github.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import terminalIcon from '../assets/icons/terminal.png';
import tetrisIcon from '../assets/icons/tetris.png';
import wordIcon from '../assets/icons/word.png';

export type AppId = 'files' | 'browser' | 'linkedin' | 'github' | 'about' | 'word' | 'terminal' | 'tetris';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  icon: string;          // e.g., /icons/github.svg
  url?: string;          // for web apps (browser/link windows)
  x: number; y: number;  // px
  w: number; h: number;  // px
  z: number;             // z-index order
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
  createdAt: number;
}

type WindowOpenPayload = Omit<WindowState, 'id' | 'z' | 'focused' | 'createdAt'>;

const windowDefaults: Record<AppId, WindowOpenPayload> = {
  files: {
    appId: 'files',
    title: 'Files',
    icon: filesIcon,
    x: 160,
    y: 120,
    w: 640,
    h: 480,
    minimized: false,
    maximized: false,
  },
  browser: {
    appId: 'browser',
    title: 'Browser',
    icon: browserIcon,
    x: 220,
    y: 140,
    w: 820,
    h: 560,
    minimized: false,
    maximized: false,
    url: 'https://www.google.com/webhp?igu=1',
  },
  linkedin: {
    appId: 'linkedin',
    title: 'LinkedIn',
    icon: linkedinIcon,
    x: 260,
    y: 160,
    w: 780,
    h: 540,
    minimized: false,
    maximized: false,
  },
  github: {
    appId: 'github',
    title: 'GitHub',
    icon: githubIcon,
    x: 280,
    y: 180,
    w: 780,
    h: 540,
    minimized: false,
    maximized: false,
  },
  about: {
    appId: 'about',
    title: 'About',
    icon: filesIcon,
    x: 200,
    y: 200,
    w: 420,
    h: 320,
    minimized: false,
    maximized: false,
  },
  word: {
    appId: 'word',
    title: 'Word Processor',
    icon: wordIcon,
    x: 300,
    y: 200,
    w: 700,
    h: 500,
    minimized: false,
    maximized: false,
  },
  terminal: {
    appId: 'terminal',
    title: 'Terminal',
    icon: terminalIcon,
    x: 320,
    y: 220,
    w: 600,
    h: 400,
    minimized: false,
    maximized: false,
  },
  tetris: {
    appId: 'tetris',
    title: 'Tetris',
    icon: tetrisIcon,
    x: 340,
    y: 240,
    w: 400,
    h: 500,
    minimized: false,
    maximized: false,
  },
};

export const useWindowsStore = defineStore('windows', {
  state: () => ({ windows: [] as WindowState[], zTop: 1 }),
  actions: {
    open(win: Omit<WindowState, 'id' | 'z' | 'focused' | 'createdAt'>) {
      const newWindow: WindowState = {
        ...win,
        id: `win-${Date.now()}-${Math.random()}`,
        z: ++this.zTop,
        focused: true,
        createdAt: Date.now(),
      };
      this.windows.forEach(w => w.focused = false);
      this.windows.push(newWindow);
      this.focus(newWindow.id);
    },
    openApp(appId: AppId, overrides: Partial<WindowOpenPayload> = {}) {
      const existing = this.windows.find(win => win.appId === appId);
      if (existing) {
        if (overrides.url) {
          existing.url = overrides.url;
        }
        this.focus(existing.id);
        return;
      }
      const baseConfig = windowDefaults[appId];
      if (baseConfig) {
        this.open({
          ...baseConfig,
          ...overrides,
        });
      }
    },
    focus(id: string): void {
      const w = this.windows.find(v => v.id === id); if (!w) return;
      this.windows.forEach(v => (v.focused = v.id === id));
      w.z = ++this.zTop;
      w.minimized = false;
    },
    close(id: string): void { this.windows = this.windows.filter(v => v.id !== id); },
    setMinimized(id: string, minimized: boolean): void { const w = this.windows.find(v => v.id === id); if (w) w.minimized = minimized; },
    toggleMax(id: string): void { const w = this.windows.find(v => v.id === id); if (w) w.maximized = !w.maximized; },
    move(id: string, x: number, y: number): void { const w = this.windows.find(v => v.id === id); if (w) { w.x = x; w.y = y; } },
    resize(id: string, w: number, h: number): void { const w_ = this.windows.find(v => v.id === id); if (w_) { w_.w = w; w_.h = h; } },
  },
});