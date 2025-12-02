"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import ToastContainer from "./ToastContainer";

export type ToastOptions = {
  title?: string;
  message?: string;
  duration?: number; // in ms, default: 3000
};

export type ToastItem = ToastOptions & {
  id: string;
};

type ToastContextValue = {
  push: (toast: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

interface Props {
  children: ReactNode;
}

export function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (toast: ToastOptions) => {
      const id = crypto.randomUUID();
      const item: ToastItem = {
        id,
        duration: toast.duration ?? 3000,
        ...toast,
      };

      setToasts((prev) => [...prev, item]);

      if (item.duration !== 0) {
        setTimeout(() => remove(id), item.duration);
      }
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <ToastContainer toasts={toasts} remove={remove} />
    </ToastContext.Provider>
  );
}
