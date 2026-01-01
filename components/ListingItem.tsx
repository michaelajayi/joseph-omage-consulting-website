import Image, { StaticImageData } from "next/image";
import bedroom from '../public/icons/bed.svg';
import bathroom from '../public/icons/shower.svg';
import surfaceArea from '../public/icons/surface-area.svg';
import location from '../public/icons/location.svg';
import CustomButton from "./CustomButton";

interface ListingProps {
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  surfaceArea: number;
  price: string;
  image: StaticImageData;
}

export const ListingItem = ({ listing }: {
  listing: ListingProps
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-bl-[20px] rounded-br-[20px] shadow-[0_2px_24px_-2px_rgba(0,0,0,0.08),0_8px_16px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_32px_-2px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow duration-300 group">
      <div className="w-full h-60 sm:h-75 relative overflow-hidden">
        <Image src={listing.image} alt={listing.title} fill className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110" />
      </div>
      <div className="w-full flex flex-col space-y-3 p-4 sm:p-5">
        <div className="w-full flex flex-row justify-between items-start gap-2">
          <div className="flex flex-col space-y-1">
            <p className="font-clash font-medium text-black text-lg sm:text-[20px] tracking-[4%]">{listing.title}</p>
            <p className="font-clash font-medium text-black text-lg sm:text-[20px]">{listing.price}</p>
          </div>
          <div className="flex space-x-1 items-center">
            <Image src={location} alt='location icon' />
            <p className="font-dream-avenue font-semibold text-lg sm:text-[22px] leading-6 text-midgray italic">{listing.location}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row gap-2 items-center p-4 sm:p-5">
        <div className="flex-1 flex space-x-1 items-center">
          <Image src={bedroom} alt='bedroom' className="shrink-0" />
          <p className="font-dream-avenue text-black text-sm sm:text-[16px] italic whitespace-nowrap">{listing.bedrooms} Bedrooms</p>
        </div>
        <div className="flex-1 flex space-x-1 items-center justify-center">
          <Image src={bathroom} alt='bathroom' className="shrink-0" />
          <p className="font-dream-avenue text-black text-sm sm:text-[16px] italic whitespace-nowrap">{listing.bathrooms} Bathrooms</p>
        </div>
        <div className="flex-1 flex space-x-1 items-center justify-end">
          <Image src={surfaceArea} alt='surfaceArea' className="shrink-0" />
          <p className="font-dream-avenue text-black text-xs sm:text-[14px] italic whitespace-nowrap">{listing.surfaceArea} m<sup>2</sup> Surface</p>
        </div>
      </div>
      <div className="w-full flex gap-2 items-center p-4 sm:p-5">
        <div className="flex-1">
          <CustomButton cta="Buy" bg="#7AB767" color="#fff" size={16} fullWidthOnMobile />
        </div>
        <div className="flex-1">
          <CustomButton cta="View Details" size={16} px={20} py={10} fullWidthOnMobile />
        </div>
      </div>
    </div>
  )
}
