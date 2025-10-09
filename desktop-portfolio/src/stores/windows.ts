// /src/stores/windows.ts
import { defineStore } from 'pinia';

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
