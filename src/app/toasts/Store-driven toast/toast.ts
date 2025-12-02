
import { toastStore } from "./toastStore";

export const toast = {
  success(message: string, duration?: number) {
    toastStore.push({ title: "Success", message, duration });
  },

  error(message: string, duration?: number) {
    toastStore.push({ title: "Error", message, duration });
  },

  custom(opts: { title?: string; message?: string; duration?: number }) {
    toastStore.push(opts);
  },
};
