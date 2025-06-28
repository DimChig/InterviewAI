import Image from "next/image";
import React from "react";
import imgLogo from "@/public/images/logo.png";
interface ImageLogoProps {
  width: number;
  height: number;
}

const ImageLogo = ({ width, height }: ImageLogoProps) => {
  return (
    <div className="flex h-fit">
      <Image width={width} height={height} src={imgLogo} alt="Logo" />
    </div>
  );
};

export default ImageLogo;
