import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: { fontFamily: "var(--font-inter), ui-sans-serif, system-ui" },
      }}
    />
  );
}