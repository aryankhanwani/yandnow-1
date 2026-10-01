import Hero from "@/components/sections/Hero";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import Statement from "@/components/sections/Statement";
import SolutionsScroller from "@/components/sections/SolutionsScroller";
import Metrics from "@/components/sections/Metrics";
import Method from "@/components/sections/Method";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import Testimonials from "@/components/sections/Testimonials";
import Reach from "@/components/sections/Reach";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <Statement />
      <SolutionsScroller />
      <Metrics />
      <Method />
      <HorizontalGallery />
      <Reach />
      <Testimonials />
    </>
  );
}
