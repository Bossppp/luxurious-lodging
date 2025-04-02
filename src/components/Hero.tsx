
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Hero = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/hotels', { state: searchParams });
  };

  return (
    <div className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1551038247-3d9af20df552)', 
          filter: 'brightness(40%)'
        }}
      />
      
      {/* Gold Overlay Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-luxe-dark/80 via-transparent to-luxe-dark/80"
      />
      
      <div className="luxe-container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Experience Luxury <span className="text-luxe-gold">Beyond Imagination</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-10">
            Discover and book the finest hotels for your perfect getaway
          </p>
          
          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxe-gold h-5 w-5" />
                <Input
                  type="text"
                  name="destination"
                  placeholder="Destination"
                  value={searchParams.destination}
                  onChange={handleChange}
                  className="pl-10 bg-luxe-dark/60 border-luxe-gold/30 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxe-gold h-5 w-5" />
                <Input
                  type="date"
                  name="checkIn"
                  placeholder="Check-in"
                  value={searchParams.checkIn}
                  onChange={handleChange}
                  className="pl-10 bg-luxe-dark/60 border-luxe-gold/30 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxe-gold h-5 w-5" />
                <Input
                  type="date"
                  name="checkOut"
                  placeholder="Check-out"
                  value={searchParams.checkOut}
                  onChange={handleChange}
                  className="pl-10 bg-luxe-dark/60 border-luxe-gold/30 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxe-gold h-5 w-5" />
                <Input
                  type="number"
                  name="guests"
                  placeholder="Guests"
                  min="1"
                  value={searchParams.guests}
                  onChange={handleChange}
                  className="pl-10 bg-luxe-dark/60 border-luxe-gold/30 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4 bg-luxe-gold hover:bg-luxe-gold/90 text-luxe-dark font-medium"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Hotels
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
