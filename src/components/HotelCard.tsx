
import { Link } from 'react-router-dom';
import { Hotel } from '@/lib/types';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HotelCardProps {
  hotel: Hotel;
  featured?: boolean;
}

const HotelCard = ({ hotel, featured = false }: HotelCardProps) => {
  return (
    <Link 
      to={`/hotels/${hotel.id}`}
      className={`dark-card transition-all duration-300 hover:shadow-xl hover:scale-[1.01] flex flex-col h-full group ${
        featured ? 'gold-outline' : ''
      }`}
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {featured && (
          <div className="absolute top-0 right-0 bg-luxe-gold text-white px-3 py-1 text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-semibold text-white group-hover:text-luxe-gold transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center text-luxe-gold">
            <Star className="h-4 w-4 fill-luxe-gold text-luxe-gold" />
            <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-300 mb-3">
          {hotel.city}, {hotel.country}
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
          {hotel.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-3">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs border-luxe-gold text-luxe-gold">
                {amenity}
              </Badge>
            ))}
            {hotel.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs border-luxe-gold text-luxe-gold">
                +{hotel.amenities.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{hotel.reviewCount} reviews</span>
            <span className="text-luxe-gold inline-flex items-center text-sm font-semibold">
              View Details
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
