import Image from "next/image";
import headerBackground01 from '../public/images/header_bg_01.jpg';
import { HeroContent } from "./HeroContent";

const Hero = () => {
  return (
    <section id="hero" className="relative w-full h-dvh min-h-dvh" data-theme="dark">
      {/* Background image */}
      <Image src={headerBackground01} alt='Modern real estate property' fill priority quality={100} sizes='100vw' className='object-cover object-center -z-10' />

      {/* Overlay for better text readibility */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/40 to-t-transparent"></div>

      {/* Content */}
      <div className="relative z-20 h-full">
        <HeroContent />
      </div>
    </section>
  )
}

export default Hero
