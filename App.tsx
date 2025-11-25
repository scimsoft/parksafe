import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ListingCard } from './components/ListingCard';
import { HostFlow } from './components/HostFlow';
import { ListingDetails } from './components/ListingDetails';
import { Listing, ViewState } from './types';
import { MOCK_LISTINGS } from './constants';
import { searchListingsWithAI } from './services/geminiService';
import { Search, Loader2, Map, Trees } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredListings(listings);
      return;
    }

    setIsSearching(true);
    // Use Gemini for semantic search
    const matchingIds = await searchListingsWithAI(searchQuery, listings);
    
    // Reorder listings based on AI ranking
    const results = matchingIds
      .map(id => listings.find(l => l.id === id))
      .filter(Boolean) as Listing[];
    
    // Append any that weren't returned by AI but might match broadly (optional, strictly following AI here for demo)
    // If AI returns nothing, show empty state? Or show all? Let's show what AI found.
    
    setFilteredListings(results);
    setIsSearching(false);
    setCurrentView(ViewState.SEARCH);
  };

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentView(ViewState.DETAILS);
  };

  const handleHostComplete = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
    setFilteredListings(prev => [newListing, ...prev]);
    setCurrentView(ViewState.HOME);
    // Reset search
    setSearchQuery('');
  };

  // Render Content based on ViewState
  const renderContent = () => {
    switch (currentView) {
      case ViewState.DETAILS:
        return selectedListing ? (
          <ListingDetails 
            listing={selectedListing} 
            onBack={() => setCurrentView(ViewState.SEARCH)} 
          />
        ) : null;

      case ViewState.HOST:
        return (
          <HostFlow 
            onComplete={handleHostComplete}
            onCancel={() => setCurrentView(ViewState.HOME)}
          />
        );

      case ViewState.HOME:
        return (
          <div>
            {/* Hero Section */}
            <div className="relative bg-forest-600 text-white py-24 px-4 overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
               <div className="relative max-w-4xl mx-auto text-center z-10">
                 <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                   Find the perfect spot<br/>to park your adventure.
                 </h1>
                 <p className="text-lg md:text-xl text-forest-100 mb-10 max-w-2xl mx-auto">
                   Discover private driveways, fields, and forests hosted by locals. 
                   Safe, unique, and affordable camping.
                 </p>
                 
                 <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                   <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                     <Search className="h-6 w-6 text-earth-400" />
                   </div>
                   <input
                     type="text"
                     className="w-full pl-14 pr-32 py-4 rounded-full text-earth-900 bg-white shadow-2xl focus:ring-4 focus:ring-forest-500/30 outline-none text-lg placeholder-earth-400"
                     placeholder="Describe your dream spot (e.g. 'quiet forest near a lake')"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                   <button 
                     type="submit"
                     disabled={isSearching}
                     className="absolute right-2 top-2 bottom-2 bg-forest-600 hover:bg-forest-700 text-white px-6 rounded-full font-bold transition-all disabled:bg-earth-400"
                   >
                     {isSearching ? <Loader2 className="animate-spin" /> : 'Search'}
                   </button>
                 </form>
                 
                 <div className="mt-6 flex justify-center gap-4 text-sm font-medium text-forest-100/80">
                    <span className="flex items-center"><Map className="w-4 h-4 mr-1"/> Private Land</span>
                    <span className="flex items-center"><Trees className="w-4 h-4 mr-1"/> Unique Stays</span>
                 </div>
               </div>
            </div>

            {/* Featured Listings Preview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-earth-900 mb-2">Featured Spots</h2>
                    <p className="text-earth-500">Top-rated by the campervan community</p>
                </div>
                <button 
                    onClick={() => {
                        setFilteredListings(listings);
                        setCurrentView(ViewState.SEARCH);
                    }}
                    className="text-forest-600 font-bold hover:text-forest-700 hover:underline"
                >
                    View all &rarr;
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.slice(0, 3).map(listing => (
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    onClick={handleListingClick} 
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case ViewState.SEARCH:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Header */}
            <div className="mb-8">
               <form onSubmit={handleSearch} className="flex gap-2 max-w-3xl">
                 <div className="relative flex-grow">
                   <Search className="absolute left-3 top-3.5 h-5 w-5 text-earth-400" />
                   <input
                     type="text"
                     className="w-full pl-10 pr-4 py-3 rounded-xl border border-earth-200 bg-white text-earth-900 shadow-sm focus:ring-2 focus:ring-forest-500 outline-none"
                     placeholder="Filter results... (try 'near beach' or 'farm with animals')"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>
                 <button 
                   type="submit"
                   className="bg-forest-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-forest-700 transition-colors flex items-center"
                   disabled={isSearching}
                 >
                   {isSearching ? <Loader2 className="animate-spin" /> : 'Update'}
                 </button>
               </form>
            </div>

            {/* Results */}
            {isSearching ? (
                <div className="flex flex-col items-center justify-center py-20 text-earth-500">
                    <Loader2 className="w-12 h-12 animate-spin mb-4 text-forest-500" />
                    <p>Asking AI to find the best spots for you...</p>
                </div>
            ) : filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredListings.map(listing => (
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    onClick={handleListingClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-earth-200 border-dashed">
                <p className="text-xl text-earth-500 font-serif mb-2">No spots found.</p>
                <p className="text-earth-400">Try adjusting your search or clearing filters.</p>
                <button 
                    onClick={() => {
                        setSearchQuery('');
                        setFilteredListings(listings);
                    }}
                    className="mt-4 text-forest-600 font-bold hover:underline"
                >
                    Clear Search
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-earth-900 text-earth-300 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-serif text-xl font-bold text-white mb-4">Safe Park</p>
          <p className="text-sm opacity-60">© 2024 Safe Park. AI-Powered Campervan Parking.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;