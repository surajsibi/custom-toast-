"use client";

import { useEffect, useState } from "react";
import { Toast, toastStore } from "./toastStore";
import "./toast.css";

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsub = toastStore.subscribe((list) => {
      setToasts(list);
    });

    return () => unsub();
  }, []);

  return (
    <div className="fixed top-5 right-5 z-[9999px] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-[#1a1a1a] text-white py-3 px-4 rounded-lg min-w-60 relative shadow-[0_4px_14px_rgba(0,0,0,0.4)] animate-[fadeInUp_0.25s_ease] "
        >
          {t.title && <div className="font-semibold">{t.title}</div>}
          {t.message && (
            <div className="opacity-80 mt-2 text-sm">{t.message}</div>
          )}

          <button
            className="absolute top-2 right-2 border-none bg-none text-white cursor-pointer "
            onClick={() => toastStore.remove(t.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
