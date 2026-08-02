import LandingNavbar from "../components/LandingNavbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

export default LandingPage;