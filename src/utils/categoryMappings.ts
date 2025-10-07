// Metadata for spot_type and sub_scenario to display correctly in UI

export interface CategoryMetadata {
  id: string;
  emoji: string;
  title: string;
  color: string;
  description: string;
  mapPosition: [number, number]; // [lat, lng]
}

export interface SituationMetadata {
  id: string;
  title: string;
  description: string;
  emoji: string;
  context: string;
}

// Category mappings (spot_type)
export const CATEGORY_METADATA: Record<string, CategoryMetadata> = {
  cafe: {
    id: 'cafe',
    emoji: '☕',
    title: 'Café & Bakery',
    color: '#8B4513',
    description: 'Order drinks and pastries',
    mapPosition: [48.8566, 2.3522],
  },
  restaurant: {
    id: 'restaurant',
    emoji: '🍽️',
    title: 'Restaurant',
    color: '#DC143C',
    description: 'Dining and ordering food',
    mapPosition: [48.8606, 2.3376],
  },
  subway: {
    id: 'subway',
    emoji: '🚇',
    title: 'Subway',
    color: '#4169E1',
    description: 'Navigate the metro system',
    mapPosition: [48.8738, 2.2950],
  },
  transit: {
    id: 'transit',
    emoji: '🚌',
    title: 'Transit',
    color: '#4169E1',
    description: 'Navigate public transportation',
    mapPosition: [48.8738, 2.2950],
  },
  taxi: {
    id: 'taxi',
    emoji: '🚕',
    title: 'Taxi',
    color: '#FFD700',
    description: 'Getting around by taxi',
    mapPosition: [48.8700, 2.3100],
  },
  shopping: {
    id: 'shopping',
    emoji: '🛍️',
    title: 'Shopping',
    color: '#FF1493',
    description: 'Shop and make purchases',
    mapPosition: [48.8656, 2.3212],
  },
  hotel: {
    id: 'hotel',
    emoji: '🏨',
    title: 'Hotel',
    color: '#4682B4',
    description: 'Check-in and hotel services',
    mapPosition: [48.8584, 2.2945],
  },
  bar: {
    id: 'bar',
    emoji: '🍺',
    title: 'Bar & Nightlife',
    color: '#9B59B6',
    description: 'Socialize and order drinks',
    mapPosition: [48.8620, 2.3400],
  },
  museum: {
    id: 'museum',
    emoji: '🏛️',
    title: 'Museum',
    color: '#2ECC71',
    description: 'Visit cultural sites',
    mapPosition: [48.8610, 2.3360],
  },
  police: {
    id: 'police',
    emoji: '🚨',
    title: 'Police & Emergency',
    color: '#E74C3C',
    description: 'Emergency assistance',
    mapPosition: [48.8550, 2.3450],
  },
};

// Situation mappings (sub_scenario)
export const SITUATION_METADATA: Record<string, SituationMetadata> = {
  ordering: {
    id: 'ordering',
    title: 'Ordering',
    description: 'Place your order',
    emoji: '🍽️',
    context: 'At the counter',
  },
  asking: {
    id: 'asking',
    title: 'Asking Questions',
    description: 'Get information',
    emoji: '❓',
    context: 'Making inquiries',
  },
  paying: {
    id: 'paying',
    title: 'Paying',
    description: 'Complete payment',
    emoji: '💳',
    context: 'At checkout',
  },
  preferences: {
    id: 'preferences',
    title: 'Preferences',
    description: 'Express your needs',
    emoji: '⚙️',
    context: 'Specifying preferences',
  },
  greetings: {
    id: 'greetings',
    title: 'Greetings',
    description: 'Start conversations',
    emoji: '👋',
    context: 'Meeting someone',
  },
  directions: {
    id: 'directions',
    title: 'Directions',
    description: 'Find your way',
    emoji: '🗺️',
    context: 'On the street',
  },
  tickets: {
    id: 'tickets',
    title: 'Tickets',
    description: 'Buy tickets',
    emoji: '🎫',
    context: 'At the ticket counter',
  },
  checkin: {
    id: 'checkin',
    title: 'Check-in',
    description: 'Hotel arrival',
    emoji: '🔑',
    context: 'At hotel reception',
  },
  requests: {
    id: 'requests',
    title: 'Requests',
    description: 'Ask for services',
    emoji: '🛎️',
    context: 'Making requests',
  },
};

// Helper to get category metadata or create default
export function getCategoryMetadata(spotType: string): CategoryMetadata {
  return CATEGORY_METADATA[spotType] || {
    id: spotType,
    emoji: '📍',
    title: spotType.charAt(0).toUpperCase() + spotType.slice(1),
    color: '#6B7280',
    description: 'Custom category',
    mapPosition: [48.8566, 2.3522],
  };
}

// Helper to get situation metadata or create default
export function getSituationMetadata(subScenario: string): SituationMetadata {
  return SITUATION_METADATA[subScenario] || {
    id: subScenario,
    title: subScenario.charAt(0).toUpperCase() + subScenario.slice(1),
    description: 'Custom situation',
    emoji: '💬',
    context: 'Various situations',
  };
}
