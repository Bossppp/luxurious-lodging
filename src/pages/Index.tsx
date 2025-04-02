
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedHotels from '@/components/FeaturedHotels';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, Clock, CreditCard, ShieldCheck } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-luxe-dark text-white">
      <Navbar />
      <Hero />

      <FeaturedHotels />

      {/* Features Section */}
      <section className="py-16 bg-luxe-dark">
        <div className="luxe-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Why Choose <span className="text-luxe-gold">LuxeStay</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We offer a seamless booking experience with exclusive benefits for our valued guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-luxe-gold/30 transition-colors text-center">
              <div className="inline-flex items-center justify-center p-4 bg-luxe-gold/10 rounded-full mb-4">
                <Award className="h-6 w-6 text-luxe-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Best Selection</h3>
              <p className="text-gray-400">
                Handpicked luxury hotels that meet our strict quality standards.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-luxe-gold/30 transition-colors text-center">
              <div className="inline-flex items-center justify-center p-4 bg-luxe-gold/10 rounded-full mb-4">
                <ShieldCheck className="h-6 w-6 text-luxe-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-400">
                We guarantee the lowest prices for your luxury hotel bookings.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-luxe-gold/30 transition-colors text-center">
              <div className="inline-flex items-center justify-center p-4 bg-luxe-gold/10 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-luxe-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Reward Points</h3>
              <p className="text-gray-400">
                Earn points with every booking to redeem for exclusive rewards.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-luxe-gold/30 transition-colors text-center">
              <div className="inline-flex items-center justify-center p-4 bg-luxe-gold/10 rounded-full mb-4">
                <Clock className="h-6 w-6 text-luxe-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400">
                Our dedicated support team is available around the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-luxe-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551038247-3d9af20df552')] bg-cover bg-center opacity-10"></div>
        <div className="luxe-container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Guest <span className="text-luxe-gold">Experiences</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hear what our guests have to say about their luxurious stays
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 relative">
              <div className="text-luxe-gold text-6xl absolute -top-4 -left-2 opacity-30">"</div>
              <div className="relative z-10">
                <p className="text-gray-300 mb-4 italic">
                  "The most incredible hotel experience I've ever had. The attention to detail and personalized service made me feel like royalty."
                </p>
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 rounded-full bg-luxe-gold text-white flex items-center justify-center font-semibold">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-xs text-gray-400">New York, USA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 relative">
              <div className="text-luxe-gold text-6xl absolute -top-4 -left-2 opacity-30">"</div>
              <div className="relative z-10">
                <p className="text-gray-300 mb-4 italic">
                  "The reward program is fantastic! I redeemed my points for a luxury gift and it was delivered to my doorstep within days."
                </p>
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 rounded-full bg-luxe-gold text-white flex items-center justify-center font-semibold">
                    JS
                  </div>
                  <div>
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-xs text-gray-400">London, UK</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 relative">
              <div className="text-luxe-gold text-6xl absolute -top-4 -left-2 opacity-30">"</div>
              <div className="relative z-10">
                <p className="text-gray-300 mb-4 italic">
                  "LuxeStay made our honeymoon unforgettable. From booking to checkout, every moment was perfect and stress-free."
                </p>
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 rounded-full bg-luxe-gold text-white flex items-center justify-center font-semibold">
                    RM
                  </div>
                  <div>
                    <p className="font-semibold">Robert Miller</p>
                    <p className="text-xs text-gray-400">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
