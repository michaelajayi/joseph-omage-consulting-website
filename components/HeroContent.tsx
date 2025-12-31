import CustomButton from "./CustomButton"

export const HeroContent = () => {
  return (
    <div className="mx-auto h-full flex flex-col justify-end pb-8 md:pb-[10%] items-center">
      <div className="w-full flex flex-col lg:flex-row justify-between items-start px-4 sm:px-6 md:px-10 lg:px-20 gap-6 lg:gap-0">
        <div className="w-full lg:w-1/2 flex flex-col space-y-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-bold font-clash text-white leading-tight">Joseph Omage Consulting</h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium font-dream-avenue text-white leading-tight italic">Buy, Rent, Survey & Value with Us!</h1>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col space-y-3 md:space-y-5 items-start">
          <p className='text-base sm:text-lg md:text-xl lg:text-[22px] font-satoshi text-white leading-relaxed'>Lorem ipsum dolor sit amet consectetur. A semper volutpat nulla est sed morbi. Sit diam in nulla accumsan viverra nunc cum et tristique. Aliquet in in facilisis sed libero urna.
            Chat Us Now</p>
          <div className="hero-cta-button">
            <CustomButton cta="Chat Us Now" size={18} bg="#fff" color="#000" />
          </div>
        </div>
      </div>
    </div>
  )
}
