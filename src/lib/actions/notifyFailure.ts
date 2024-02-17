import { Theme, toast } from "react-toastify";

export default function notifyFailure(message: string) {
  toast.error(message, { theme: localStorage.getItem("theme") != null ? localStorage.getItem("theme") as Theme : "light" });
}
