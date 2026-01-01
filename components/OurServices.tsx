import Image from 'next/image';
import houseIcon from '../public/icons/house.png';
import { services } from '@/utils/constants';
import ScrollAnimatedElement from './ScrollAnimatedElement';

const OurServices = () => {
  return (
    <>
    <div id="services" className="w-full h-full flex bg-[#F3F3F3] pb-10 md:pb-20" data-theme="light">
      <div className="w-full h-full flex justify-center items-center px-4 sm:px-6 md:px-10 py-10 md:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
          <div className="lg:col-span-4">
            <ScrollAnimatedElement type="fadeInLeft" duration={1} toggleActions="play reverse play reverse">
              <div className="flex space-x-2 items-center justify-center lg:justify-start">
                <h2 className="font-dream-avenue text-[#353741] text-3xl sm:text-4xl md:text-5xl lg:text-[55px] uppercase text-center lg:text-left">Our Services</h2>
                <Image src={houseIcon} alt='house icon' className="w-8 h-8 sm:w-10 sm:h-10 md:w-auto md:h-auto" />
              </div>
            </ScrollAnimatedElement>
          </div>
          <div className="lg:col-span-8 flex flex-col space-y-5 w-full lg:max-w-[80%]">
            {services.map((service, index) => (
              <ScrollAnimatedElement
                key={index}
                type="fadeInRight"
                duration={0.8}
                delay={index * 0.15}
                toggleActions="play reverse play reverse"
              >
                <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-8 space-y-3 sm:space-y-0 items-start border-b border-[#C4C4C4] py-5">
                  <div className="flex items-end font-dream-avenue text-[#A3AED0]">
                    <span className='text-3xl sm:text-4xl md:text-[48px] leading-12 font-bold italic '>0{index + 1}</span>
                    <span className="text-lg sm:text-xl md:text-[24px]">/</span>
                    <span className='text-lg sm:text-xl md:text-[24px] italic'>0{services.length}</span>
                  </div>
                  <div className="flex flex-col space-y-3 md:space-y-5">
                    <h3 className='font-dream-avenue text-black text-2xl sm:text-3xl md:text-4xl lg:text-[50px]'>{service.title}</h3>
                    <p className='font-satoshi text-black text-sm sm:text-base leading-relaxed'>{service.details}</p>
                  </div>
                </div>
              </ScrollAnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* Mobile divider line - only visible on mobile/tablet */}
    <div className="w-full bg-[#F3F3F3] flex justify-center md:hidden">
      <div className="w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#7AB767]/30 to-transparent"></div>
    </div>
    </>
  )
}

export default OurServices
