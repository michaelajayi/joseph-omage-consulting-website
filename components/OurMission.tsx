import Image from "next/image";
import ourMissionTextureBg from '../public/images/our-mission-bg-texture.png';
import ScrollAnimatedElement from "./ScrollAnimatedElement";


const OurMission = () => {
  const aboutMetrics = [
    {
      title: "Satisfied Clients",
      value: 200
    },
    {
      title: "Satisfied Clients",
      value: 200
    },
    {
      title: "Satisfied Clients",
      value: 200
    },
    {
      title: "Satisfied Clients",
      value: 200
    },
  ]
  return (
    <div className="w-full min-h-[60vh] flex justify-center items-center relative py-10 md:py-0" data-theme="dark">
      {/* Text background image   */}
      <Image src={ourMissionTextureBg} alt='our mission texture bg' fill className='object-cover object-center w-full h-full opacity-25' />

      {/* Overlay for texture bg */}
      <div className="absolute inset-0 z-10 bg-black/70"></div>

      {/* Content */}
      <div className="w-full h-full px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-5 flex flex-col space-y-10 md:space-y-20 z-20 justify-center relative">
        <div className="flex flex-col space-y-6 md:space-y-8">
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0 items-start md:items-center">
            <ScrollAnimatedElement type="fadeInLeft" duration={1} toggleActions="play reverse play reverse">
              <h2 className="font-dream-avenue text-white text-3xl sm:text-4xl md:text-[48px] shrink-0 uppercase">Our Mission</h2>
            </ScrollAnimatedElement>
            <ScrollAnimatedElement type="fadeInRight" duration={1} toggleActions="play reverse play reverse">
              <p className="font-satoshi text-white text-base md:text-lg leading-relaxed flex-1">Lorem ipsum dolor sit amet consectetur. A semper volutpat nulla est sed morbi. Sit diam in nulla accumsan viverra nunc cum et tristique. Aliquet in in facilisis sed libero urna. </p>
            </ScrollAnimatedElement>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {aboutMetrics.map((metric, index) => (
              <ScrollAnimatedElement
                key={index}
                type="fadeInUp"
                duration={0.8}
                delay={index * 0.1}
                toggleActions="play reverse play reverse"
              >
                <div className="flex flex-col space-y-2 md:space-y-5">
                  <p className='font-dream-avenue text-white text-3xl sm:text-4xl md:text-[48px] font-medium'>{metric.value}</p>
                  <p className="font-dream-avenue text-white text-lg sm:text-xl md:text-[24px]">{metric.title}</p>
                </div>
              </ScrollAnimatedElement>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default OurMission
