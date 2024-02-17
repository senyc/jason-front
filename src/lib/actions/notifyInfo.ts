import { Theme, toast } from "react-toastify";

export default function notifyInfo(message: string) {
  toast.info(message, { theme: localStorage.getItem("theme") != null ? localStorage.getItem("theme") as Theme : "light" });
}
