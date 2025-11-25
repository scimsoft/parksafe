import React from 'react';
import { Listing } from '../types';
import { AMENITIES } from '../constants';
import { MapPin, Star } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  return (
    <div 
      onClick={() => onClick(listing)}
      className="group bg-white rounded-2xl overflow-hidden border border-earth-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${listing.imageSeed}/600/400`} 
          alt={listing.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm flex items-center text-xs font-bold text-earth-900">
          <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
          {listing.rating}
        </div>
        <div className="absolute bottom-3 left-3 bg-forest-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
          {listing.type}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-earth-900 group-hover:text-forest-600 transition-colors">
            {listing.title}
          </h3>
        </div>
        
        <div className="flex items-center text-earth-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {listing.location}
        </div>
        
        <p className="text-earth-600 text-sm line-clamp-2 mb-4 flex-grow">
          {listing.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities.slice(0, 3).map(amenityId => {
            const amenity = AMENITIES.find(a => a.id === amenityId);
            if (!amenity) return null;
            return (
              <span key={amenityId} className="inline-flex items-center px-2 py-1 rounded-md bg-earth-100 text-xs text-earth-700" title={amenity.label}>
                {amenity.icon} <span className="ml-1 hidden sm:inline">{amenity.label}</span>
              </span>
            );
          })}
          {listing.amenities.length > 3 && (
            <span className="px-2 py-1 rounded-md bg-earth-100 text-xs text-earth-700">
              +{listing.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-earth-100 flex items-center justify-between mt-auto">
          <span className="text-xs text-earth-500">
            Hosted by {listing.hostName}
          </span>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-forest-600">${listing.pricePerNight}</span>
            <span className="text-sm text-earth-500 ml-1">/night</span>
          </div>
        </div>
      </div>
    </div>
  );
};