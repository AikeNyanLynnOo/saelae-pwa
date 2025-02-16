import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface ImagePlaceholderProps {
  className?: string;
  containerClassName?: string;
}

export const ImagePlaceholder = ({
  className,
  containerClassName,
}: ImagePlaceholderProps) => {
  const containerClass = useMemo(
    () => cn("flex justify-center mb-4", containerClassName),
    [containerClassName]
  );

  const imageClass = useMemo(
    () => cn("w-24 h-24 bg-gray-200 rounded-lg", className),
    [className]
  );

  return (
    <div className={containerClass}>
      <div className={imageClass} />
    </div>
  );
};
