'use client';
import { listings, swiperBreakpoints } from "@/utils/constants";
import { ListingItem } from "./ListingItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import featuredListingRightArrow from '../public/icons/featured-listing-right-arrow.svg'
import featuredListingLeftArrow from '../public/icons/featured-listing-left-arrow.svg'
import Image from "next/image";
import { useState } from "react";

const FeaturedListing = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <>
      <div className="w-full h-auto flex bg-[#F3F3F3] relative py-5 md:py-10">
        {/* Custom prev and next navigation for slider - Hidden on mobile */}
        <div className="hidden md:flex justify-between items-center absolute inset-0 pointer-events-none">
          <Image
            src={featuredListingLeftArrow}
            alt='featured listing left arrow'
            className={`featured-listing-left-arrow cursor-pointer select-none pointer-events-auto ${isBeginning ? 'opacity-30 pointer-events-none cursor-not-allowed' : 'opacity-100 pointer-events-auto cursor-pointer'}`}
            draggable={false}
          />
          <Image
            src={featuredListingRightArrow}
            alt='featured listing right arrow'
            className={`featured-listing-right-arrow cursor-pointer select-none pointer-events-auto ${isEnd ? 'opacity-30 pointer-events-none cursor-not-allowed' : 'opacity-100 pointer-events-auto cursor-pointer'}`}
            draggable={false}
          />
        </div>
        <div className="flex flex-col space-y-4 md:space-y-1 w-full h-full px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-20">
          <div className="w-full flex justify-center items-center">
            <h3 className="font-dream-avenue text-black text-3xl sm:text-4xl md:text-5xl lg:text-[60px] flex justify-center items-center w-full uppercase text-center">Featured Listings</h3>
          </div>
          <div className="py-4">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              grabCursor={true}
              breakpoints={swiperBreakpoints}
              className="w-full h-full !pb-4"
              modules={[Navigation]}
              navigation={{
                prevEl: ".featured-listing-left-arrow",
                nextEl: ".featured-listing-right-arrow",
              }}
              onReachBeginning={() => setIsBeginning(true)}
              onReachEnd={() => setIsEnd(true)}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
            >
              {listings && listings.map((listing, index) => (
                <SwiperSlide key={index}>
                  <ListingItem listing={listing} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* Mobile divider line - only visible on mobile/tablet */}
      <div className="w-full bg-[#F3F3F3] flex justify-center md:hidden py-6">
        <div className="w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#7AB767]/30 to-transparent"></div>
      </div>
    </>
  )
}

export default FeaturedListing
