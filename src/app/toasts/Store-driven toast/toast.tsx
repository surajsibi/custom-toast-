import { CheckmarkIcon } from "@/app/toasts/icon/CheckmarkIcon.jsx";
import { toastStore } from "./toastStore";
import { ErrorIcon } from "@/app/toasts/icon/Error";

export const toast = {
  success(message: string, duration?: number) {
    toastStore.push({
      icon: <CheckmarkIcon />,
      title: "Success",
      message,
      duration,
    });
  },

  error(message: string, duration?: number) {
    toastStore.push({ icon: <ErrorIcon />, title: "Error", message, duration });
  },

  custom(opts: { title?: string; message?: string; duration?: number }) {
    toastStore.push(opts);
  },
};
