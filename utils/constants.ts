import listing01 from '../public/images/listings/listing-01.jpg';
import listing02 from '../public/images/listings/listing-02.jpg';
import listing03 from '../public/images/listings/listing-03.jpg';
import { CallIcon, Location03Icon, Mail01Icon, Linkedin01Icon, InstagramIcon, TiktokIcon, Facebook01Icon } from 'hugeicons-react';

export const services = [
  {
    title: "Real Estate Solutions",
    details: "Whether you're looking to buy, sell, or rent a property, we provide expert guidance every step of the way. Our in-depth market knowledge ensures that you get the best value for your investment."
  },
  {

    title: "Estate Surveying & Valuation",
    details: "Whether you're looking to buy, sell, or rent a property, we provide expert guidance every step of the way. Our in-depth market knowledge ensures that you get the best value for your investment."
  },
  {
    title: "Property Rentals",
    details: "We simplify the rental process by matching tenants with the right properties and ensuring seamless transactions for landlords. From lease agreements to tenant screening, we handle everything with professionalism and transparency."
  },
  {
    title: "Real Estate Solutions",
    details: "Our team provides strategic insights on property investment, market trends, and legal regulations to help you make the best real estate decisions. Whether you're an investor, homeowner, or developer, we offer tailored solutions to meet your needs."
  },
];

export const swiperBreakpoints = {
  640: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
};

export const listings = [
  {
    title: "Club House",
    location: 'Ikoyi',
    bedrooms: 3,
    bathrooms: 2,
    surfaceArea: 250,
    price: "1,000,000",
    image: listing01,
  },
  {
    title: "Club House",
    location: 'Lagos Island',
    bedrooms: 3,
    bathrooms: 2,
    surfaceArea: 250,
    price: "1,000,000",
    image: listing02,
  },
  {
    title: "Club House",
    location: 'Yaba, Onike',
    bedrooms: 3,
    bathrooms: 2,
    surfaceArea: 250,
    price: "1,000,000",
    image: listing01,
  },
  {
    title: "Club House",
    location: 'Lagos Mainland',
    bedrooms: 3,
    bathrooms: 2,
    surfaceArea: 250,
    price: "1,000,000",
    image: listing02,
  },
  {
    title: "Club House",
    location: 'Ikoyi',
    bedrooms: 3,
    bathrooms: 2,
    surfaceArea: 250,
    price: "1,000,000",
    image: listing03,
  },
  {
    title: "Club House",
    location: 'Ikoyi',
    bedrooms: 3,
    bathrooms: 2,
    surfaceArea: 250,
    price: "1,000,000",
    image: listing03,
  }
];

export const faqs = [
  {
    question: "How can I inspect an apartment?",
    response: "Lorem ipsum dolor sit amet consectetur. Sit in augue et consectetur penatibus libero tempor malesuada. Sem non sit id consequat cursus nulla ipsum. Dolor eu magnis commodo vitae ac. Ultrices tincidunt gravida vitae dolor sagittis nibh viverra senectus nunc."
  },
  {
    question: "How can I inspect an apartment?",
    response: "Lorem ipsum dolor sit amet consectetur. Sit in augue et consectetur penatibus libero tempor malesuada. Sem non sit id consequat cursus nulla ipsum. Dolor eu magnis commodo vitae ac. Ultrices tincidunt gravida vitae dolor sagittis nibh viverra senectus nunc."
  },
  {
    question: "How can I inspect an apartment?",
    response: "Lorem ipsum dolor sit amet consectetur. Sit in augue et consectetur penatibus libero tempor malesuada. Sem non sit id consequat cursus nulla ipsum. Dolor eu magnis commodo vitae ac. Ultrices tincidunt gravida vitae dolor sagittis nibh viverra senectus nunc."
  },
  {
    question: "How can I inspect an apartment?",
    response: "Lorem ipsum dolor sit amet consectetur. Sit in augue et consectetur penatibus libero tempor malesuada. Sem non sit id consequat cursus nulla ipsum. Dolor eu magnis commodo vitae ac. Ultrices tincidunt gravida vitae dolor sagittis nibh viverra senectus nunc."
  },
  {
    question: "How can I inspect an apartment?",
    response: "Lorem ipsum dolor sit amet consectetur. Sit in augue et consectetur penatibus libero tempor malesuada. Sem non sit id consequat cursus nulla ipsum. Dolor eu magnis commodo vitae ac. Ultrices tincidunt gravida vitae dolor sagittis nibh viverra senectus nunc."
  },
];

export const footerLinks = [
  {
    title: 'Home',
    link: '#hero'
  },
  {
    title: 'About',
    link: '#about'
  },
  {
    title: 'Property',
    link: '#properties'
  },
  {
    title: 'Services',
    link: '#services'
  },
  {
    title: 'FAQs',
    link: '#faqs'
  },
];

export const footerSocialLinks = [
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/josephomageconsulting",
    icon: Linkedin01Icon,
    color: "#0A66C2"
  },
  {
    title: "Instagram",
    link: "https://www.linkedin.com/in/josephomageconsulting",
    icon: InstagramIcon,
    color: "#E4405F"
  },
  {
    title: "TikTok",
    link: "tiktok.com",
    icon: TiktokIcon,
    color: "#000000"
  },
  {
    title: "Facebook",
    link: "https://www.facebook.com",
    icon: Facebook01Icon,
    color: "#1877F2"
  },
];

export const contactus = [
  {
    type: 'Email',
    icon: Mail01Icon,
    value: 'info@josephomageconsulting.com',
    link: 'mailto:info@josephomageconsulting.com',
  },
  {
    type: 'Address',
    icon: Location03Icon,
    value: [
      'Suite A1-144, Sura Shopping Complex,',
      'Off Simpson Street, Lagos Island, Lagos'
    ],
    link: ''
  },
  {
    type: 'Phone',
    icon: CallIcon,
    value: ['+234 (803) 580 0107', '+234 (703) 931 0599'],
    link: 'tel:+2348035800107'
  },
];

export const navLinks = [
  {
    title: 'Home',
    link: '#hero',
  },
  {
    title: 'About',
    link: '#about',
  },
  {
    title: 'Property',
    link: '#properties',
  },
  {
    title: 'Services',
    link: '#services'
  },
  {
    title: 'FAQs',
    link: '#faqs'
  }
];


