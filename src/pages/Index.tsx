
import { useState } from 'react';
import { toast } from 'sonner';
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
import PullToRefresh from '@/components/PullToRefresh';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const isMobile = useIsMobile();

  const handleRefresh = async () => {
    // Simulate refresh action
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshKey(prev => prev + 1);
    toast.success('Content refreshed!');
  };

  const content = (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <AnimatedBackground />
      <div className="relative z-10" key={refreshKey}>
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

  // Wrap with pull-to-refresh only on mobile
  if (isMobile) {
    return (
      <PullToRefresh onRefresh={handleRefresh}>
        {content}
      </PullToRefresh>
    );
  }

  return content;
};

export default Index;
