
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Clock, MapPin, Users, Star, Coffee, Wifi, ShieldCheck, Utensils } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-luxe-dark text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-black to-luxe-dark">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1551038247-3d9af20df552')] bg-cover bg-center"></div>
          <div className="luxe-container relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About LuxeStay</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Redefining luxury hospitality since 2010, with exceptional service and unforgettable experiences.
            </p>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16">
          <div className="luxe-container">
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 mb-8">
                <TabsTrigger value="story">Our Story</TabsTrigger>
                <TabsTrigger value="mission">Mission & Values</TabsTrigger>
                <TabsTrigger value="team">Our Team</TabsTrigger>
              </TabsList>
              
              <TabsContent value="story" className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-6 text-luxe-gold">Our Journey</h2>
                    <p className="text-gray-300 mb-6">
                      LuxeStay began with a vision to transform luxury hospitality. Founded in 2010 by hospitality veterans, 
                      we set out to create a network of premium hotels that would redefine what guests expect from a luxury stay.
                    </p>
                    <p className="text-gray-300">
                      From our first property in New York to our global presence today, we've maintained our commitment to 
                      excellence, personalized service, and creating moments of wonder for every guest who walks through our doors.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945" 
                      alt="LuxeStay Hotel" 
                      className="w-full h-96 object-cover"
                    />
                  </div>
                </div>
                
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                  <h3 className="text-2xl font-serif font-bold mb-6">Milestones</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-6">
                        <div className="text-luxe-gold font-bold text-lg mb-2">2010</div>
                        <p className="text-gray-300">First LuxeStay property opens in New York City</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-6">
                        <div className="text-luxe-gold font-bold text-lg mb-2">2013</div>
                        <p className="text-gray-300">Expansion to Europe with locations in Paris and London</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-6">
                        <div className="text-luxe-gold font-bold text-lg mb-2">2016</div>
                        <p className="text-gray-300">Launch of LuxeStay Rewards program for loyal customers</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-6">
                        <div className="text-luxe-gold font-bold text-lg mb-2">2020</div>
                        <p className="text-gray-300">Celebrated 10 years with our 50th property worldwide</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="mission">
                <div className="space-y-12">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                    <h2 className="text-3xl font-serif font-bold mb-6 text-center text-luxe-gold">Our Mission</h2>
                    <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-12">
                      "To create extraordinary experiences through personalized luxury,
                      where every guest feels uniquely valued and every stay becomes a cherished memory."
                    </p>
                    
                    <h3 className="text-2xl font-serif font-bold mb-6 text-center">Core Values</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="bg-luxe-gold/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Star className="text-luxe-gold h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Excellence</h4>
                        <p className="text-gray-300">
                          We pursue perfection in every detail, from the thread count of our linens to the smile that greets you.
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-luxe-gold/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Users className="text-luxe-gold h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Personalization</h4>
                        <p className="text-gray-300">
                          We believe luxury is personal. We tailor every experience to the unique preferences of our guests.
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-luxe-gold/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <ShieldCheck className="text-luxe-gold h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Integrity</h4>
                        <p className="text-gray-300">
                          We operate with honesty, transparency, and a commitment to ethical business practices.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                    <h3 className="text-2xl font-serif font-bold mb-6 text-center">What Sets Us Apart</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                        <Clock className="h-8 w-8 text-luxe-gold mx-auto mb-3" />
                        <h4 className="font-bold mb-1">24/7 Service</h4>
                        <p className="text-sm text-gray-300">Round-the-clock concierge and support</p>
                      </div>
                      
                      <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                        <MapPin className="h-8 w-8 text-luxe-gold mx-auto mb-3" />
                        <h4 className="font-bold mb-1">Prime Locations</h4>
                        <p className="text-sm text-gray-300">Exceptional properties in sought-after destinations</p>
                      </div>
                      
                      <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                        <Utensils className="h-8 w-8 text-luxe-gold mx-auto mb-3" />
                        <h4 className="font-bold mb-1">Fine Dining</h4>
                        <p className="text-sm text-gray-300">Award-winning restaurants in every hotel</p>
                      </div>
                      
                      <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                        <Wifi className="h-8 w-8 text-luxe-gold mx-auto mb-3" />
                        <h4 className="font-bold mb-1">Modern Amenities</h4>
                        <p className="text-sm text-gray-300">Cutting-edge technology with timeless luxury</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="team">
                <div className="space-y-12">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold mb-4 text-luxe-gold">Meet Our Leadership</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                      Our team brings decades of hospitality experience and a shared passion for creating exceptional experiences.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
                        alt="James Reynolds" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1">James Reynolds</h3>
                        <p className="text-luxe-gold mb-3">Founder & CEO</p>
                        <p className="text-gray-300 text-sm">
                          With over 25 years in luxury hospitality, James founded LuxeStay with a vision to redefine the guest experience.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" 
                        alt="Sophia Chen" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1">Sophia Chen</h3>
                        <p className="text-luxe-gold mb-3">Chief Operations Officer</p>
                        <p className="text-gray-300 text-sm">
                          Sophia ensures operational excellence across all properties, with a focus on sustainability initiatives.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" 
                        alt="Marcus Johnson" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1">Marcus Johnson</h3>
                        <p className="text-luxe-gold mb-3">Chief Experience Officer</p>
                        <p className="text-gray-300 text-sm">
                          Marcus designs the signature experiences that make each LuxeStay property unique and memorable.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-serif font-bold mb-4">Join Our Team</h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      We're always looking for passionate individuals who share our commitment to exceptional service.
                      Explore career opportunities with LuxeStay.
                    </p>
                    <button className="bg-luxe-gold hover:bg-luxe-gold/90 text-white font-medium py-2 px-6 rounded">
                      View Career Opportunities
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
