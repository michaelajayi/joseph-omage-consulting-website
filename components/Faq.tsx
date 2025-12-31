'use client';
import { faqs } from "@/utils/constants";
import Image from "next/image";
import house from '../public/icons/faq-house.png';
import accordionClose from '../public/icons/accordion-close.svg';
import accordionOpen from '../public/icons/accordion-open.svg';
import { useEffect, useRef, useState } from "react";
import { useLayout } from "@/app/context/LayoutContext";

const Faq = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const { setSectionHeight, getOverlap } = useLayout();
  const [openIndex, setOpenIndex] = useState<null | number>(0);

  useEffect(() => {
    if (!faqRef.current) return;

    const updateHeight = () => {
      if (faqRef.current) {
        setSectionHeight('faq', faqRef.current.offsetHeight);
      }
    };

    // Measure initially
    updateHeight();

    // Remeasure on window resize
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, [setSectionHeight]); // Recalc when accordion changes

  const overlap = getOverlap('faq');

  const toggleAccordion = (clickedIndex: number) => {
    setOpenIndex(openIndex === clickedIndex ? null : clickedIndex);
  }

  return (
    <div ref={faqRef} className="w-full h-full flex justify-center items-center p-4 sm:p-6 md:p-10 lg:p-32 relative z-20">
      <div className="w-full h-full bg-white rounded-[20px] border border-[#7AB767] flex flex-col space-y-6 md:space-y-10 p-4 sm:p-6 md:p-10 lg:p-20 shadow-2xl">
        <div className="flex space-x-2 items-center justify-center">
          <h2 className="font-dream-avenue text-[#353741] text-2xl sm:text-3xl md:text-4xl lg:text-[55px] uppercase text-center">Frequently Asked Questions</h2>
        </div>
        <div className="w-full h-full">
          <div className="flex flex-col space-y-3 md:space-y-5">
            {faqs.map((faq, index) => (
              <div className="flex flex-col space-y-3 border border-[#C4C4C4]/50 p-3 rounded-[10px]" key={index}>
                <div className="w-full flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion(index)}>
                  <div className="flex space-x-2 md:space-x-3 items-center">
                    <Image src={house} alt='house' className="w-6 h-6 sm:w-8 sm:h-8 md:w-auto md:h-auto" />
                    <p className="font-clash text-black text-sm sm:text-base md:text-[18px]">{faq.question}</p>
                  </div>
                  {openIndex === index ? (
                    <div className="w-auto h-full p-2 md:p-5 cursor-pointer shrink-0">
                      <Image src={accordionClose} alt='accordion close' className='cursor-pointer select-none w-4 h-4 sm:w-5 sm:h-5 md:w-auto md:h-auto' draggable={false} />
                    </div>
                  ) : (
                    <div className="w-auto h-full p-2 md:p-5 cursor-pointer shrink-0">
                      <Image src={accordionOpen} alt='accordion open' className='cursor-pointer select-none w-4 h-4 sm:w-5 sm:h-5 md:w-auto md:h-auto' draggable={false} />
                    </div>
                  )}
                </div>
                {openIndex === index && (
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className='font-satoshi text-[#909090] text-sm sm:text-base md:text-[18px]'>{faq.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div >
  )
}

export default Faq
