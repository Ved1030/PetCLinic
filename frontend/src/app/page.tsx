import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/home/ContactSection";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Gallery />
      <Testimonials />
      <ContactSection />
      <CTA />
      <FAQ />
    </>
  );
}
