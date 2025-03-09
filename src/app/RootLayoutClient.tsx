"use client";

import React, { Suspense } from "react";
import "@/app/globals.css";
import { FloatingBanner } from "@/components/atoms/FloatingBanner";
import { useCommonStore } from "@/store/common-store";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add state to track install prompt and app installability
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [isInstallable, setIsInstallable] = React.useState(false);

  // Add detection for iOS
  const [isIOS, setIsIOS] = React.useState(false);

  React.useEffect(() => {
    // Check if device is iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

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

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("beforeinstallprompt", e);
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Update UI to notify the user app can be installed
      setIsInstallable(true);
    });
  }, []);

  // Handle the install button click
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Clear the deferredPrompt since it can't be used again
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="flex flex-col">
      <div className="min-h-[100dvh] container mx-auto px-0 md:px-5 lg:px-12 xl:px-20 max-w-screen-lg">
        {isIOS ? (
          <FloatingBanner
            handleInstallClick={handleInstallClick}
            isIOS={isIOS}
          />
        ) : isInstallable ? (
          <FloatingBanner handleInstallClick={handleInstallClick} />
        ) : null}
        {children}
      </div>
    </div>
  );
}
