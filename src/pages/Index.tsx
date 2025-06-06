
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import LiveDemo from '@/components/LiveDemo';
import HowItWorks from '@/components/HowItWorks';
import ApiIntegrationForm from '@/components/ApiIntegrationForm';
import Pricing from '@/components/Pricing';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollProgress from '@/components/ScrollProgress';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <LiveDemo />
        <Features />
        <HowItWorks />
        <ApiIntegrationForm />
        <ImageGalleryModal />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
