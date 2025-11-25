import React, { useState } from 'react';
import { Listing, ViewState } from '../types';
import { AMENITIES } from '../constants';
import { generateListingDescription } from '../services/geminiService';
import { Wand2, Loader2, Check, MapPin, DollarSign, Home } from 'lucide-react';

interface HostFlowProps {
  onComplete: (listing: Listing) => void;
  onCancel: () => void;
}

export const HostFlow: React.FC<HostFlowProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Driveway' as const,
    pricePerNight: 20,
    selectedAmenities: [] as string[],
    vibe: '',
    description: '',
    hostName: 'You'
  });

  const toggleAmenity = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(id)
        ? prev.selectedAmenities.filter(a => a !== id)
        : [...prev.selectedAmenities, id]
    }));
  };

  const handleGenerateDescription = async () => {
    setIsLoadingAI(true);
    const amenityLabels = formData.selectedAmenities
      .map(id => AMENITIES.find(a => a.id === id)?.label)
      .filter(Boolean) as string[];

    const desc = await generateListingDescription(
      formData.location,
      formData.type,
      amenityLabels,
      formData.vibe || 'Peaceful and safe'
    );
    
    setFormData(prev => ({ ...prev, description: desc }));
    setIsLoadingAI(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: Listing = {
      id: Date.now().toString(),
      title: formData.title || `${formData.type} in ${formData.location}`,
      description: formData.description,
      location: formData.location,
      pricePerNight: Number(formData.pricePerNight),
      imageSeed: `host-${Date.now()}`,
      amenities: formData.selectedAmenities,
      hostName: formData.hostName,
      rating: 0, // New listing
      type: formData.type
    };
    onComplete(newListing);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-earth-200 overflow-hidden">
        {/* Header */}
        <div className="bg-forest-600 p-6 text-white">
          <h2 className="text-2xl font-serif font-bold">List Your Space</h2>
          <p className="text-forest-100 opacity-90">Earn money by sharing your land with campers.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-earth-700 uppercase tracking-wide">The Basics</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-earth-500 mb-1">Location (City, State)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-earth-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-earth-300 bg-white text-earth-900 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all"
                    placeholder="e.g., Portland, OR"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-earth-500 mb-1">Property Type</label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 w-4 h-4 text-earth-400" />
                  <select
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-earth-300 bg-white text-earth-900 focus:ring-2 focus:ring-forest-500 outline-none appearance-none"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                  >
                    <option value="Driveway">Driveway</option>
                    <option value="Field">Field / Meadow</option>
                    <option value="Forest">Forest</option>
                    <option value="Farm">Farm Land</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-earth-700 uppercase tracking-wide">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITIES.map(amenity => (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex items-center p-3 rounded-xl border transition-all ${
                    formData.selectedAmenities.includes(amenity.id)
                      ? 'border-forest-500 bg-forest-50 text-forest-700 ring-1 ring-forest-500'
                      : 'border-earth-200 text-earth-600 hover:bg-earth-50'
                  }`}
                >
                  <span className="mr-2">{amenity.icon}</span>
                  <span className="text-sm font-medium">{amenity.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Description Generator */}
          <div className="space-y-4 bg-earth-50 p-6 rounded-2xl border border-earth-200">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-earth-800 uppercase tracking-wide flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-600" />
                AI Description Assistant
              </label>
            </div>
            
            <div>
              <label className="block text-xs text-earth-500 mb-1">What's the vibe? (Optional keyword)</label>
              <input 
                type="text"
                placeholder="e.g., Rustic, Modern, Quiet, Family-friendly"
                className="w-full px-4 py-2 rounded-xl border border-earth-300 bg-white text-earth-900 mb-3 text-sm"
                value={formData.vibe}
                onChange={e => setFormData({...formData, vibe: e.target.value})}
              />
            </div>

            <div className="relative">
              <textarea
                className="w-full p-4 rounded-xl border border-earth-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none min-h-[120px] text-earth-700 text-sm leading-relaxed"
                placeholder="Describe your spot... or let AI write it for you!"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isLoadingAI || !formData.location}
                className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingAI ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Wand2 className="w-3 h-3 mr-1" />}
                {isLoadingAI ? 'Writing...' : 'Auto-Write'}
              </button>
            </div>
            <p className="text-xs text-earth-500 italic">
              Tip: Fill in the location and amenities, then click Auto-Write to generate a professional listing description.
            </p>
          </div>

          {/* Price & Submit */}
          <div className="space-y-4 pt-4 border-t border-earth-200">
            <div className="flex items-center justify-between">
               <div className="w-1/2 mr-4">
                <label className="block text-xs text-earth-500 mb-1">Price per Night ($)</label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-earth-400" />
                    <input
                        type="number"
                        min="0"
                        required
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-earth-300 bg-white text-earth-900 focus:ring-2 focus:ring-forest-500 outline-none"
                        value={formData.pricePerNight}
                        onChange={e => setFormData({...formData, pricePerNight: Number(e.target.value)})}
                    />
                </div>
               </div>
               <div className="w-1/2 ml-4">
                 <label className="block text-xs text-earth-500 mb-1">Title</label>
                 <input 
                    type="text"
                    placeholder="Give it a catchy name"
                    className="w-full px-4 py-2 rounded-xl border border-earth-300 bg-white text-earth-900 focus:ring-2 focus:ring-forest-500 outline-none"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                 />
               </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-6 rounded-xl border border-earth-300 text-earth-600 font-medium hover:bg-earth-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl bg-forest-600 text-white font-bold hover:bg-forest-700 shadow-lg hover:shadow-xl transition-all flex justify-center items-center"
            >
              Publish Listing <Check className="ml-2 w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};