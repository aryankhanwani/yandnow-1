import Hero from "@/components/sections/Hero";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import Statement from "@/components/sections/Statement";
import SolutionsScroller from "@/components/sections/SolutionsScroller";
import Metrics from "@/components/sections/Metrics";
import Method from "@/components/sections/Method";
import WhyChoose from "@/components/sections/WhyChoose";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Reach from "@/components/sections/Reach";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/Faq";
import { faqs } from "@/lib/site";

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
      <WhyChoose />
      <FeaturedWork />
      <Reach />
      <Testimonials />
      <Faq items={faqs} />
    </>
  );
}
