
import { useToast as useHookToast } from "@/hooks/use-toast";

// Re-export the toast functionality
export const useToast = useHookToast;
export const toast = useHookToast().toast;
