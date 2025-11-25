import React from 'react';
import { Listing } from '../types';
import { AMENITIES } from '../constants';
import { MapPin, Star, ArrowLeft, CheckCircle, Shield } from 'lucide-react';

interface ListingDetailsProps {
  listing: Listing;
  onBack: () => void;
}

export const ListingDetails: React.FC<ListingDetailsProps> = ({ listing, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto pt-6 pb-12 px-4">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-earth-600 hover:text-forest-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to search
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-earth-200 overflow-hidden">
        <div className="relative h-80 md:h-96 w-full">
          <img 
            src={`https://picsum.photos/seed/${listing.imageSeed}/1200/800`} 
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-forest-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {listing.type}
              </span>
              <span className="flex items-center bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold">
                <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                {listing.rating > 0 ? listing.rating : 'New'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold shadow-sm">{listing.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <div className="flex items-center text-earth-500 mb-4">
                <MapPin className="w-5 h-5 mr-2 text-forest-500" />
                <span className="text-lg">{listing.location}</span>
              </div>
              <p className="text-earth-700 text-lg leading-relaxed">
                {listing.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-earth-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map(id => {
                  const amenity = AMENITIES.find(a => a.id === id);
                  if (!amenity) return null;
                  return (
                    <div key={id} className="flex items-center p-3 rounded-xl bg-earth-50 text-earth-700">
                      <span className="text-xl mr-3">{amenity.icon}</span>
                      <span className="font-medium">{amenity.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-earth-50 p-6 rounded-2xl border border-earth-200 flex items-start gap-4">
              <Shield className="w-6 h-6 text-forest-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-earth-900 mb-1">Host Guarantee</h4>
                <p className="text-sm text-earth-600">
                    Hosted by <strong>{listing.hostName}</strong>. Verified property. 
                    This space has been reviewed for campervan accessibility.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white border border-earth-200 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-3xl font-bold text-forest-600">${listing.pricePerNight}</span>
                  <span className="text-earth-500"> / night</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="w-full p-3 border border-earth-300 rounded-xl text-center text-earth-400 cursor-not-allowed bg-earth-50">
                    Select Dates (Demo)
                </div>
              </div>

              <button className="w-full py-3 bg-forest-600 text-white font-bold rounded-xl hover:bg-forest-700 transition-colors shadow-md flex justify-center items-center">
                Request to Book <CheckCircle className="ml-2 w-4 h-4" />
              </button>
              
              <p className="text-xs text-center text-earth-400 mt-4">
                You won't be charged yet. This is a demo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};