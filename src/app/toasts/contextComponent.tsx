"use client";
import { useToast } from "@/app/toasts/Context-driven-toast/ToastProvider";
import { toast } from "./Store-driven toast/toast";

export default function ContextComponent() {
  const { push } = useToast();
  return (
    <div>
      <button
        onClick={() => {
          push({
            title: "Success",
            message: "Your data was saved!",
            duration: 3000,
          });
        }}
      >
        Show Toast
      </button>
      <div className="flex gap-10 ">
        <button
          className="border bg-amber-400"
          onClick={() => toast.success("user saved")}
        >
          user saved
        </button>
        <button
          className="border bg-amber-400"
          onClick={() => toast.error("Something exploded!")}
        >
          error
        </button>
        <button
          className="border bg-amber-400"
          onClick={() =>
            toast.custom({ title: "Welcome", message: "Hello Suraj!" })
          }
        >
          title
        </button>
      </div>
    </div>
  );
}
