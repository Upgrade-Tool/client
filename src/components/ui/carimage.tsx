import React from "react";

type CarImageProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  belowText?: React.ReactNode; // 👈 optional (price etc.)
};

const sizeStyles = {
  sm: "h-36 max-w-sm",
  md: "h-44 max-w-md",
  lg: "h-52 max-w-lg",
} as const;

export function CarImage({ src, alt, size = "md", belowText }: CarImageProps) {
  return (
    <div className="mt-6 w-full pb-6">
      {" "}
      <div className={`mx-auto ${sizeStyles[size]}`}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
      {/* Fixed price slot */}
      <div className="h-6 w-full text-right text-base font-semibold text-zinc-900">
        {belowText}
      </div>
    </div>
  );
}

export default CarImage;
