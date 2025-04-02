
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_HOTELS, MOCK_ROOMS, Hotel, Room, RoomType } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Star, MapPin, Users, Wifi, Coffee, Utensils, DumbBell, Waves, Check, User } from 'lucide-react';

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with proper auth state

  useEffect(() => {
    // In a real app, this would be an API call to get hotel and room data
    if (id) {
      const foundHotel = MOCK_HOTELS.find(h => h.id === id);
      if (foundHotel) {
        setHotel(foundHotel);
        const hotelRooms = MOCK_ROOMS[id] || [];
        setRooms(hotelRooms);
      } else {
        // Hotel not found, redirect to hotels page
        navigate('/hotels');
      }
    }
    
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-5 w-5" />;
      case 'restaurant':
        return <Utensils className="h-5 w-5" />;
      case 'room service':
        return <Coffee className="h-5 w-5" />;
      case 'gym':
        return <DumbBell className="h-5 w-5" />;
      case 'pool':
      case 'private beach':
        return <Waves className="h-5 w-5" />;
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  const getRoomTypeColor = (type: RoomType) => {
    switch (type) {
      case RoomType.STANDARD:
        return 'bg-blue-100 text-blue-800';
      case RoomType.DELUXE:
        return 'bg-purple-100 text-purple-800';
      case RoomType.SUITE:
        return 'bg-amber-100 text-amber-800';
      case RoomType.PRESIDENTIAL:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleBooking = () => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      navigate('/login', { state: { redirectTo: `/hotels/${id}` } });
      return;
    }

    if (!selectedRoom || !checkInDate || !checkOutDate) {
      // Show error or validation message
      return;
    }

    // Navigate to booking confirmation page with details
    navigate('/booking/confirm', {
      state: {
        hotelId: id,
        roomId: selectedRoom.id,
        checkInDate,
        checkOutDate,
        guests
      }
    });
  };

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col bg-luxe-dark text-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-luxe-dark text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hotel Header */}
        <div className="relative h-80 md:h-96">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${hotel.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxe-dark via-transparent to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 luxe-container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div>
                <Link to="/hotels" className="text-sm text-luxe-gold hover:underline mb-2 inline-block">
                  &larr; Back to Hotels
                </Link>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{hotel.name}</h1>
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-luxe-gold mr-1" />
                  <span className="text-gray-300">{hotel.address}, {hotel.city}, {hotel.country}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Star className="h-4 w-4 fill-luxe-gold text-luxe-gold mr-1" />
                    <span className="font-medium">{hotel.rating}</span>
                    <span className="text-gray-400 ml-1">({hotel.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <Badge variant="outline" className="mt-4 md:mt-0 border-luxe-gold text-luxe-gold px-3 py-1">
                Luxury
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="py-8 luxe-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="w-full border-b border-gray-800 bg-transparent">
                  <TabsTrigger value="overview" className="data-[state=active]:text-luxe-gold data-[state=active]:border-b-2 data-[state=active]:border-luxe-gold rounded-none">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="rooms" className="data-[state=active]:text-luxe-gold data-[state=active]:border-b-2 data-[state=active]:border-luxe-gold rounded-none">
                    Rooms
                  </TabsTrigger>
                  <TabsTrigger value="amenities" className="data-[state=active]:text-luxe-gold data-[state=active]:border-b-2 data-[state=active]:border-luxe-gold rounded-none">
                    Amenities
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:text-luxe-gold data-[state=active]:border-b-2 data-[state=active]:border-luxe-gold rounded-none">
                    Reviews
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-6">
                  <h2 className="text-2xl font-serif font-semibold mb-4">About {hotel.name}</h2>
                  <p className="text-gray-300 mb-6">
                    {hotel.description}
                  </p>
                  <p className="text-gray-300 mb-6">
                    Nestled in the heart of {hotel.city}, {hotel.name} offers an unrivaled luxury experience. Our dedicated staff caters to your every need, ensuring a memorable stay in one of our meticulously designed rooms and suites. Each space is thoughtfully appointed with premium amenities and elegant décor to provide maximum comfort and style.
                  </p>
                  <p className="text-gray-300">
                    Whether you're visiting for business or leisure, {hotel.name} provides the perfect setting for relaxation and rejuvenation. Enjoy our world-class facilities, including {hotel.amenities.slice(0, 3).join(', ')}, and more.
                  </p>
                </TabsContent>
                
                <TabsContent value="rooms" className="pt-6">
                  <h2 className="text-2xl font-serif font-semibold mb-6">Available Rooms</h2>
                  {rooms.length > 0 ? (
                    <div className="space-y-6">
                      {rooms.map((room) => (
                        <div 
                          key={room.id} 
                          className={`bg-gray-900/50 border ${selectedRoom?.id === room.id ? 'border-luxe-gold' : 'border-gray-800'} rounded-lg overflow-hidden`}
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 h-48 md:h-auto">
                              <img 
                                src={room.imageUrl} 
                                alt={room.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 md:p-6 flex-grow">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="text-xl font-semibold">{room.name}</h3>
                                  <Badge className={`${getRoomTypeColor(room.type)} mt-1`}>
                                    {room.type}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <div className="text-luxe-gold font-semibold text-xl">${room.price}</div>
                                  <span className="text-gray-400 text-sm">per night</span>
                                </div>
                              </div>
                              
                              <p className="text-gray-300 my-3">{room.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {room.amenities.map((amenity, index) => (
                                  <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-400 mb-4">
                                <Users className="h-4 w-4 mr-1" />
                                <span>Max {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}</span>
                              </div>
                              
                              <div className="flex justify-end">
                                <Button 
                                  variant={room.status === 'AVAILABLE' ? 'default' : 'outline'} 
                                  className={
                                    room.status === 'AVAILABLE' 
                                      ? 'bg-luxe-gold hover:bg-luxe-gold/90 text-white' 
                                      : 'border-gray-700 text-gray-400'
                                  }
                                  disabled={room.status !== 'AVAILABLE'}
                                  onClick={() => handleRoomSelect(room)}
                                >
                                  {room.status === 'AVAILABLE' ? 'Select Room' : 'Unavailable'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No rooms available for this hotel.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="amenities" className="pt-6">
                  <h2 className="text-2xl font-serif font-semibold mb-6">Hotel Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-900/30 rounded-md">
                        <div className="mr-3 h-10 w-10 rounded-full bg-luxe-gold/10 flex items-center justify-center">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-semibold">Guest Reviews</h2>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-luxe-gold text-luxe-gold mr-1" />
                      <span className="font-semibold text-lg">{hotel.rating}</span>
                      <span className="text-gray-400 ml-1">({hotel.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Sample reviews - would be populated from API in real app */}
                    <div className="bg-gray-900/30 rounded-lg p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="bg-luxe-gold text-white h-10 w-10 rounded-full flex items-center justify-center font-semibold mr-3">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">Michael Johnson</div>
                            <div className="text-sm text-gray-400">Stayed June 2023</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= 5 ? 'fill-luxe-gold text-luxe-gold' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300">
                        "Absolutely fantastic stay! The service was impeccable and the room exceeded all expectations. The bed was so comfortable, and the view was breathtaking. I'll definitely be coming back."
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/30 rounded-lg p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="bg-luxe-gold text-white h-10 w-10 rounded-full flex items-center justify-center font-semibold mr-3">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">Sarah Williams</div>
                            <div className="text-sm text-gray-400">Stayed May 2023</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= 4 ? 'fill-luxe-gold text-luxe-gold' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300">
                        "We had a wonderful anniversary weekend at this hotel. The staff went above and beyond to make our stay special. The only small issue was the noise from the street, but it wasn't too bad."
                      </p>
                      
                      <div className="mt-4 pl-4 border-l-2 border-luxe-gold/30">
                        <div className="text-sm text-luxe-gold font-medium mb-1">Response from {hotel.name}</div>
                        <p className="text-sm text-gray-400">
                          Thank you for choosing us for your anniversary celebration! We're delighted you enjoyed your stay. We appreciate your feedback about the street noise and are looking into solutions for better soundproofing. We hope to welcome you back soon!
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/30 rounded-lg p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="bg-luxe-gold text-white h-10 w-10 rounded-full flex items-center justify-center font-semibold mr-3">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">David Thompson</div>
                            <div className="text-sm text-gray-400">Stayed April 2023</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= 5 ? 'fill-luxe-gold text-luxe-gold' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300">
                        "This hotel sets the standard for luxury accommodations. From the moment I arrived, I felt like royalty. The spa treatments were incredible, and the restaurant served the best meal I've had in years. Can't recommend enough!"
                      </p>
                    </div>
                    
                    <Button variant="outline" className="border-luxe-gold text-luxe-gold hover:bg-luxe-gold hover:text-white w-full">
                      Load More Reviews
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sticky top-4">
                <h3 className="text-xl font-serif font-semibold mb-4">Book Your Stay</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-1 block text-gray-300">Check-in Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-gray-700 bg-gray-800/50"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-luxe-gold" />
                          {checkInDate ? format(checkInDate, "PPP") : <span className="text-gray-400">Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="bg-gray-900 border-gray-800"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block text-gray-300">Check-out Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-gray-700 bg-gray-800/50"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-luxe-gold" />
                          {checkOutDate ? format(checkOutDate, "PPP") : <span className="text-gray-400">Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          initialFocus
                          disabled={(date) => !checkInDate || date <= checkInDate || date > new Date(checkInDate.getTime() + 3 * 24 * 60 * 60 * 1000)}
                          className="bg-gray-900 border-gray-800"
                        />
                      </PopoverContent>
                    </Popover>
                    {checkInDate && (
                      <p className="text-xs text-gray-400 mt-1">Max stay: 3 nights</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block text-gray-300">Guests</label>
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full p-2 rounded-md border border-gray-700 bg-gray-800/50 text-white focus:ring-luxe-gold focus:border-luxe-gold"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Separator className="my-4 bg-gray-800" />
                
                <div className="mb-4">
                  <h4 className="font-medium mb-3">Selected Room</h4>
                  {selectedRoom ? (
                    <div className="p-3 bg-gray-800/50 border border-luxe-gold/30 rounded-md">
                      <div className="font-medium">{selectedRoom.name}</div>
                      <div className="text-sm text-gray-400 mb-1">{selectedRoom.type}</div>
                      <div className="text-luxe-gold font-semibold">${selectedRoom.price} per night</div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-md text-gray-400 text-center">
                      Please select a room
                    </div>
                  )}
                </div>
                
                {checkInDate && checkOutDate && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-3">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Check-in Date</span>
                        <span>{format(checkInDate, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Check-out Date</span>
                        <span>{format(checkOutDate, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Number of Nights</span>
                        <span>
                          {Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))}
                        </span>
                      </div>
                      {selectedRoom && (
                        <div className="flex justify-between font-medium pt-2 border-t border-gray-800">
                          <span>Total</span>
                          <span className="text-luxe-gold">
                            ${selectedRoom.price * Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-white"
                  disabled={!selectedRoom || !checkInDate || !checkOutDate}
                  onClick={handleBooking}
                >
                  {isLoggedIn ? 'Book Now' : 'Login to Book'}
                </Button>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  By booking, you agree to our <Link to="/terms" className="text-luxe-gold hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-luxe-gold hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelDetail;
