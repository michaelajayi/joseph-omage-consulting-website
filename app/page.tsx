import Faq from "@/components/Faq";
import FeaturedListing from "@/components/FeaturedListing";
import Hero from "@/components/Hero";
import { Nav } from "@/components/Nav";
import OurMission from "@/components/OurMission";
import OurServices from "@/components/OurServices";
import { ScrollButtons } from "@/components/ScrollButtons";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <OurMission />
      <FeaturedListing />
      <OurServices />
      <Faq />
      <ScrollButtons />
    </>
  );
}
