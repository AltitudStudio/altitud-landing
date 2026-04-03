import Hero from '@/components/Hero';
import PortfolioCarousel from '@/components/PortfolioCarousel';
import AboutContact from '@/components/AboutContact';
import ServicesSection from '@/components/ServicesSection';
import CommentsSection from '@/components/CommentsSection';
import FeedbackForm from '@/components/FeedbackForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  // In the future this can be fetched from the GET endpoint of Google Apps Script
  // Currently using the generated image and some high-quality real estate placeholders.
  const mockImages = [
    '/portfolio_drone_1.png',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687931-cebf0746e50e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <main>
      <Navbar />
      <Hero />
      <PortfolioCarousel images={mockImages} />
      <ServicesSection />
      <AboutContact />
      <CommentsSection />
      <Footer />
    </main>
  );
}
