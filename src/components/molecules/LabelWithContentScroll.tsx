"use client";

import { SLTypo } from "@/components/SLTypo";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChipItem {
  label: string;
  value: string;
  isActive?: boolean;
}

interface LabelWithContentScrollProps {
  label: string;
  items: ChipItem[];
  className?: string;
  labelClassName?: string;
  contentClassName?: string;
  onChipClick?: (value: string) => void;
}

export const LabelWithContentScroll = ({
  label,
  items,
  className,
  labelClassName,
  contentClassName,
  onChipClick,
}: LabelWithContentScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      console.log("Scroll left:", scrollLeft);
      console.log("Scroll width:", scrollWidth - clientWidth);
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("w-full space-y-[var(--core-spacing-lg)]", className)}>
      <SLTypo
        text={label}
        variant="fontH5Medium"
        className={cn(
          "text-[var(--semantic-color-text-default)]",
          labelClassName
        )}
      />
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute h-full left-0 top-1/2 -translate-y-1/2 z-10 bg-white pr-2"
          >
            <ChevronLeft strokeWidth={1.25} className="h-5 w-5" />
          </button>
        )}
        <div
          ref={scrollRef}
          className={cn(
            "flex gap-[var(--core-spacing-sm)] overflow-x-auto hide-scrollbar",
            contentClassName
          )}
          onScroll={checkScroll}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => onChipClick?.(item.value)}
              className={cn(
                "p-0 rounded-full whitespace-nowrap transition-colors flex items-center",
                item.isActive
                  ? "bg-[var(--semantic-color-bg-primary)] text-[var(--semantic-color-text-default)]"
                  : "bg-white text-[var(--semantic-color-text-default)] border"
              )}
            >
              <SLTypo
                text={item.label}
                as="span"
                variant="fontLabelNormal"
                className="px-[var(--core-spacing-sm)] py-0.5"
              />
            </button>
          ))}
        </div>
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute h-full right-0 top-1/2 -translate-y-1/2 z-10 bg-white pl-2"
          >
            <ChevronRight strokeWidth={1.25} className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
