import Image from "next/image";
import footerBg from '../public/images/header_bg_04.jpg';
import FooterContent from "./FooterContent";

export const Footer = () => {
  return (
    <div className="relative w-full h-auto border-t-2 border-white/30" data-theme="dark">
      {/* Background image */}
      <Image src={footerBg} alt='footer bg' fill quality={100} sizes="100vw" className='object-cover object-center' />

      {/* Overlay for better text readibility */}
      <div className="absolute inset-0 z-10 bg-black/50"></div>

      {/* Footer content */}
      <div className="relative z-20 h-full">
        <FooterContent />
      </div>

    </div>
  )
}

