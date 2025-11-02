import Image from "next/image";
import { useState } from "react";

export function MealImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc || "/fallback.jpg"} // fallback nếu không có ảnh
      alt={alt}
      width={48}
      height={48}
      className="rounded-lg object-cover border border-gray-300"
      onError={() => setImgSrc("/fallback.jpg")}
    />
  );
}
