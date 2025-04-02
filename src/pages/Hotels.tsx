
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HotelCard from '@/components/HotelCard';
import { MOCK_HOTELS, Hotel } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const HotelsPage = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const amenitiesList = [
    'Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Bar', 
    'Room Service', 'Parking', 'Beach Access', 'Airport Shuttle'
  ];

  useEffect(() => {
    // In a real app, this would be an API call to get hotels based on search params
    setHotels(MOCK_HOTELS);
    setFilteredHotels(MOCK_HOTELS);

    // If there are search params in the location state, use them for initial filtering
    if (location.state) {
      const { destination } = location.state;
      if (destination) {
        setSearchQuery(destination);
        filterHotels(destination, priceRange, selectedAmenities);
      }
    }
    
    window.scrollTo(0, 0);
  }, [location.state]);

  const filterHotels = (query: string, range: number[], amenities: string[]) => {
    let filtered = hotels.filter(hotel => {
      // Search query filter
      const matchesQuery = query === '' || 
        hotel.name.toLowerCase().includes(query.toLowerCase()) ||
        hotel.city.toLowerCase().includes(query.toLowerCase()) ||
        hotel.country.toLowerCase().includes(query.toLowerCase());
      
      // Amenities filter
      const matchesAmenities = amenities.length === 0 || 
        amenities.every(amenity => hotel.amenities.includes(amenity));
      
      return matchesQuery && matchesAmenities;
    });
    
    setFilteredHotels(filtered);
  };

  const handleSearch = () => {
    filterHotels(searchQuery, priceRange, selectedAmenities);
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setSelectedAmenities([]);
    setFilteredHotels(hotels);
  };

  useEffect(() => {
    filterHotels(searchQuery, priceRange, selectedAmenities);
  }, [selectedAmenities]);

  return (
    <div className="min-h-screen flex flex-col bg-luxe-dark text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gray-900 py-12">
          <div className="luxe-container">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Discover Our <span className="text-luxe-gold">Exclusive</span> Hotels
            </h1>
            <p className="text-gray-300 max-w-2xl">
              Find the perfect luxury accommodation for your next unforgettable getaway
            </p>
          </div>
        </div>
        
        {/* Search & Filters */}
        <div className="bg-gray-800 py-6 border-y border-gray-700">
          <div className="luxe-container">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by hotel name, city, or country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              
              <Button
                onClick={handleSearch}
                className="bg-luxe-gold hover:bg-luxe-gold/90 text-white"
              >
                Search
              </Button>
              
              <Button
                variant="outline"
                className="border-gray-600 text-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg text-luxe-gold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
                    <X className="mr-1 h-4 w-4" />
                    Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={50}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value)}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {amenitiesList.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`amenity-${amenity}`} 
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={(checked) => 
                              handleAmenityChange(amenity, checked === true)
                            }
                            className="border-gray-600 data-[state=checked]:bg-luxe-gold data-[state=checked]:border-luxe-gold"
                          />
                          <Label 
                            htmlFor={`amenity-${amenity}`}
                            className="text-sm text-gray-300 cursor-pointer"
                          >
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Hotel List */}
        <div className="py-12 bg-gradient-to-b from-luxe-dark to-gray-900">
          <div className="luxe-container">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-medium">
                {filteredHotels.length} {filteredHotels.length === 1 ? 'Hotel' : 'Hotels'} Found
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-2">Sort by:</span>
                <select className="bg-gray-800 border border-gray-700 rounded text-sm p-1.5 text-white focus:ring-luxe-gold focus:border-luxe-gold">
                  <option>Recommended</option>
                  <option>Highest Rating</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No hotels found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                <Button variant="outline" onClick={clearFilters} className="border-luxe-gold text-luxe-gold hover:bg-luxe-gold hover:text-white">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelsPage;
