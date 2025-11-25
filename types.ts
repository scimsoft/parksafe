export interface Amenity {
  id: string;
  label: string;
  icon: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  imageSeed: string; // For picsum
  amenities: string[]; // List of Amenity IDs
  hostName: string;
  rating: number;
  type: 'Driveway' | 'Field' | 'Forest' | 'Farm';
}

export interface SearchState {
  query: string;
  isLoading: boolean;
  results: Listing[];
}

export enum ViewState {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  HOST = 'HOST',
  DETAILS = 'DETAILS'
}
