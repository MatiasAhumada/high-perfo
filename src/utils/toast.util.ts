import { toast, type ExternalToast } from "sonner";

export type ToastOptions = ExternalToast;

export function toastSuccess(message: string, options?: ToastOptions) {
  toast.success(message, options);
}

export function toastError(message: string, options?: ToastOptions) {
  toast.error(message, options);
}

export function toastWarning(message: string, options?: ToastOptions) {
  toast.warning(message, options);
}

export function toastInfo(message: string, options?: ToastOptions) {
  toast.info(message, options);
}
