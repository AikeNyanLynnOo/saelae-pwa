"use client";

import * as React from "react";
import { ArrowDownToLine, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function FloatingBanner({
  handleInstallClick,
  isIOS = false,
}: {
  handleInstallClick: () => Promise<void>;
  isIOS?: boolean;
}) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <Card
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-10/12 max-w-[calc(100%-2rem)] lg:max-w-fit animate-slideInFromTop border-none shadow-lg rounded-lg`}
    >
      <CardContent className="flex items-center gap-4 py-2 px-4">
        <Image src="/icon512_rounded.png" alt="logo" width={18} height={18} />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">
            {isIOS
              ? 'To install: tap Share ↑ then "Add to Home Screen"'
              : "Get the best experience"}
          </p>
        </div>
        {!isIOS && (
          <Button
            variant="ghost"
            onClick={handleInstallClick}
            className="pl-1 pr-2 py-1 gap-1 text-xs text-[var(--semantic-color-icon-brand-default)]"
          >
            <ArrowDownToLine className="!h-3 text-[var(--semantic-color-icon-brand-default)]" />
            Install
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
