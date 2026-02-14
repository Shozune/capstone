import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import WhyCampusCare from "../components/WhyCampusCare/WhyCampusCare";
import CallToAction from "../components/CallToAction/CallToAction";
import Footer from "../components/Footer/Footer";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Features />
      <WhyCampusCare />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;