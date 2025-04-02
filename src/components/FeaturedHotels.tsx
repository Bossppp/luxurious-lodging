
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_HOTELS, Hotel } from '@/lib/types';
import HotelCard from './HotelCard';
import { Button } from '@/components/ui/button';
import { Hotel as HotelIcon } from 'lucide-react';

const FeaturedHotels = () => {
  const [featuredHotels, setFeaturedHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call to get featured hotels
    const featured = MOCK_HOTELS.slice(0, 3);
    setFeaturedHotels(featured);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-luxe-dark to-gray-900">
      <div className="luxe-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Featured <span className="text-luxe-gold">Luxury</span> Hotels
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of the most exceptional hotels, offering unrivaled luxury and impeccable service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} featured={true} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/hotels">
            <Button className="bg-transparent border-2 border-luxe-gold text-luxe-gold hover:bg-luxe-gold hover:text-white">
              <HotelIcon className="mr-2 h-4 w-4" />
              Explore All Hotels
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
