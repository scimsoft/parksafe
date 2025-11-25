import React from 'react';
import { ViewState } from '../types';
import { Tent, PlusCircle, Search } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-earth-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setView(ViewState.HOME)}
          >
            <div className="bg-forest-500 p-2 rounded-lg group-hover:bg-forest-600 transition-colors">
              <Tent className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-xl font-serif font-bold text-forest-600">Safe Park</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setView(ViewState.SEARCH)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === ViewState.SEARCH
                  ? 'bg-earth-200 text-forest-600'
                  : 'text-earth-600 hover:bg-earth-100'
              }`}
            >
              <Search className="h-4 w-4 mr-2" />
              Find a Spot
            </button>
            
            <button
              onClick={() => setView(ViewState.HOST)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === ViewState.HOST
                  ? 'bg-forest-500 text-white shadow-md'
                  : 'bg-earth-800 text-white hover:bg-earth-900'
              }`}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Host Your Space
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};