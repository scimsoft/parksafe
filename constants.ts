import { Listing, Amenity } from './types';

export const AMENITIES: Amenity[] = [
  { id: 'water', label: 'Potable Water', icon: '💧' },
  { id: 'electric', label: 'Electric Hookup', icon: '⚡' },
  { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
  { id: 'waste', label: 'Waste Disposal', icon: '🗑️' },
  { id: 'pets', label: 'Pet Friendly', icon: '🐾' },
  { id: 'fire', label: 'Campfire Allowed', icon: '🔥' },
  { id: 'toilet', label: 'Toilet Access', icon: '🚽' },
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Secluded Forest Clearing',
    description: 'A peaceful spot deep in the woods. Perfect for nature lovers who want total privacy. Wake up to the sound of birds and rustling leaves. No amenities, just pure nature.',
    location: 'Oregon, USA',
    pricePerNight: 25,
    imageSeed: 'forest-camp',
    amenities: ['pets', 'fire'],
    hostName: 'Sarah J.',
    rating: 4.8,
    type: 'Forest'
  },
  {
    id: '2',
    title: 'Sunny Coastal Driveway',
    description: 'Park your van safely in our paved driveway. We are just a 5-minute walk from the beach. Includes access to a garden hose for water and outdoor power outlet.',
    location: 'California, USA',
    pricePerNight: 45,
    imageSeed: 'beach-van',
    amenities: ['water', 'electric', 'wifi'],
    hostName: 'Mike T.',
    rating: 4.5,
    type: 'Driveway'
  },
  {
    id: '3',
    title: 'Old Oak Farm Meadow',
    description: 'Large grassy meadow on a working farm. Fresh eggs available in the morning! Lots of space for kids and pets to run around. We have a compost toilet available.',
    location: 'Vermont, USA',
    pricePerNight: 30,
    imageSeed: 'farm-meadow',
    amenities: ['water', 'pets', 'toilet'],
    hostName: 'Farmer Bill',
    rating: 4.9,
    type: 'Farm'
  },
  {
    id: '4',
    title: 'Urban Oasis Parking',
    description: 'Secure gated parking in the city center. Perfect base for exploring the museums and nightlife. High-speed Wi-Fi reaches the spot.',
    location: 'Austin, TX',
    pricePerNight: 50,
    imageSeed: 'city-parking',
    amenities: ['wifi', 'electric', 'waste'],
    hostName: 'Elena R.',
    rating: 4.2,
    type: 'Driveway'
  },
  {
    id: '5',
    title: 'Mountain View Ridge',
    description: 'Stunning panoramic views of the Rockies. Flat gravel pad suitable for larger RVs. Windy but worth it for the sunset.',
    location: 'Colorado, USA',
    pricePerNight: 35,
    imageSeed: 'mountain-view',
    amenities: ['pets', 'fire'],
    hostName: 'Alex P.',
    rating: 4.7,
    type: 'Field'
  },
  {
    id: '6',
    title: 'Lakeside Retreat',
    description: 'Right on the edge of a private lake. Bring your kayak! Very quiet area, strict noise curfew after 10pm to preserve the tranquility.',
    location: 'Michigan, USA',
    pricePerNight: 40,
    imageSeed: 'lake-side',
    amenities: ['water', 'fire', 'pets'],
    hostName: 'Grandpa Joe',
    rating: 4.6,
    type: 'Forest'
  }
];