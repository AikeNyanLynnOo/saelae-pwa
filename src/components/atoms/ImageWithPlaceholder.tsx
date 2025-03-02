import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo } from "react";

interface ImagePlaceholderProps {
  className?: string;
  containerClassName?: string;
  src?: string;
}

export const ImageWithPlaceholder = ({
  className,
  containerClassName,
  src,
}: ImagePlaceholderProps) => {
  const containerClass = useMemo(
    () => cn("flex justify-center mb-4", containerClassName),
    [containerClassName]
  );

  const imageClass = useMemo(
    () => cn(`w-24 h-24 ${src ? "" : "bg-gray-200"} rounded-lg`, className),
    [className, src]
  );

  return (
    <div className={containerClass}>
      {(src && (
        <Image
          src={src}
          alt="placeholder"
          className={imageClass}
          width={400}
          height={300}
        />
      )) || <div className={imageClass} />}
    </div>
  );
};
