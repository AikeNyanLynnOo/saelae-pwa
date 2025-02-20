"use client";

import React from "react";
import "./globals.css";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    // Service Worker registration
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="min-h-[100dvh] container mx-auto px-0 md:px-5 lg:px-12 xl:px-20 max-w-screen-lg">
        {children}
      </div>
    </div>
  );
}
