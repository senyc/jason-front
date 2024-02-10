'use client';
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function InitializeColorScheme() {
  const [currentTheme, setCurrentTheme] = useState("");
  useEffect(() => {
    // If dark mode
    let theme = localStorage.getItem("theme");
    if (!theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = "dark";
      } else {
        theme = "light";
      }
    }

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove("hidden");
    setCurrentTheme(theme);
  }, []);
  return (
    currentTheme && <ToastContainer
      position="bottom-left"
      autoClose={1500}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      limit={3}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme={currentTheme}
      closeButton={false}
    />
  );
}
