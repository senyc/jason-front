import { Theme, toast } from "react-toastify";

export default function notifySuccess(message: string) {
  toast.success(message, { theme: localStorage.getItem("theme") != null ? localStorage.getItem("theme") as Theme : "light" });
}
