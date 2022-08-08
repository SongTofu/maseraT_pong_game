import React from "react";

interface IProp {
  alt: string;
  src: string | undefined;
  className?: string;
}

function AchievementImg({ alt, src, className }: IProp) {
  return (
    <img
      alt={alt}
      title={alt}
      src={src}
      className={`w-[20px] h-[20px] ${className}`}
    />
  );
}

export default AchievementImg;
