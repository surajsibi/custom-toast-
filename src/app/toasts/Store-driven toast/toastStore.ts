export type Toast = {
  id: string;
  icon?: React.ReactNode | null;
  title?: string;
  message?: string;
  duration?: number;
};

type Listener = (toasts: Toast[]) => void;

class ToastStore {
  private toasts: Toast[] = [];
  private listeners: Set<Listener> = new Set();

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener([...this.toasts]); // always send fresh copy

    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    const copy = [...this.toasts];
    this.listeners.forEach((listener) => listener(copy));
  }

  push(toast: Omit<Toast, "id">) {
    const id = String(Date.now()) + Math.random(); // stable for Next.js
    const item: Toast = {
      id,
      ...toast,
      duration: toast.duration ?? 3000,
    };

    this.toasts.push(item);
    this.emit();

    if (item.duration !== 0) {
      setTimeout(() => this.remove(id), item.duration);
    }
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.emit();
  }
}

export const toastStore = new ToastStore();
