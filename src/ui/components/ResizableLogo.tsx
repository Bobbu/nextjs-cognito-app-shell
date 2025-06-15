// ui/components/ResizableLogo.tsx
import Image from "next/image";
import Link from "next/link";

type ResizableLogoProps = {
  size?: number; // Applies to both width and height for square logos
};

export default function ResizableLogo({ size = 48 }: ResizableLogoProps) {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="App logo"
        width={size}
        height={size}
        priority
        className="h-auto w-auto max-h-[100px] md:max-h-[120px]"
      />
    </Link>
  );
}
