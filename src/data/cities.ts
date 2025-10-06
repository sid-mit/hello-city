import { City, Location } from '@/stores/appStore';

export const cities: City[] = [
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    language: 'Korean',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    emoji: '🇰🇷',
  },
  {
    id: 'beijing',
    name: 'Beijing',
    country: 'China',
    language: 'Mandarin',
    coordinates: { lat: 39.9042, lng: 116.4074 },
    emoji: '🇨🇳',
  },
  {
    id: 'new-delhi',
    name: 'New Delhi',
    country: 'India',
    language: 'Hindi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    emoji: '🇮🇳',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    language: 'French',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    emoji: '🇫🇷',
  },
  {
    id: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    language: 'Spanish',
    coordinates: { lat: 19.4326, lng: -99.1332 },
    emoji: '🇲🇽',
  },
];

export const parisLocations: Location[] = [
  {
    id: 'paris-restaurant',
    name: 'Latin Quarter',
    category: 'Restaurants & Cafés',
    emoji: '🍽️',
    coordinates: { lat: 48.8534, lng: 2.3488 },
    phrases: [
      {
        id: 'p1',
        text: "Une table pour deux, s'il vous plaît",
        translation: "A table for two, please",
        phonetic: 'oon tah-bluh poor duh, seel voo pleh',
      },
      {
        id: 'p2',
        text: 'Puis-je voir la carte?',
        translation: 'Could I see the menu?',
        phonetic: 'pwee-zhuh vwahr lah kart',
      },
      {
        id: 'p3',
        text: "J'ai une allergie alimentaire",
        translation: 'I have a food allergy',
        phonetic: 'zhay oon ah-lair-zhee ah-lee-mahn-tair',
      },
      {
        id: 'p4',
        text: "L'addition, s'il vous plaît",
        translation: 'The bill, please',
        phonetic: 'lah-dee-syohn, seel voo pleh',
      },
      {
        id: 'p5',
        text: 'C\'était délicieux',
        translation: 'This was delicious',
        phonetic: 'seh-teh deh-lee-syuh',
      },
    ],
  },
  {
    id: 'paris-metro',
    name: 'Gare du Nord',
    category: 'Metro & Transit',
    emoji: '🚇',
    coordinates: { lat: 48.8809, lng: 2.3553 },
    phrases: [
      {
        id: 'm1',
        text: 'Un billet pour [destination], s\'il vous plaît',
        translation: 'One ticket to [destination], please',
        phonetic: 'uhn bee-yeh poor, seel voo pleh',
      },
      {
        id: 'm2',
        text: 'Quelle voie?',
        translation: 'Which platform?',
        phonetic: 'kel vwah',
      },
      {
        id: 'm3',
        text: 'Est-ce le bon train?',
        translation: 'Is this the right train?',
        phonetic: 'es luh bohn trahn',
      },
      {
        id: 'm4',
        text: 'Où dois-je changer?',
        translation: 'Where do I transfer?',
        phonetic: 'oo dwah-zhuh shahn-zhay',
      },
    ],
  },
  {
    id: 'paris-shopping',
    name: 'Champs-Élysées',
    category: 'Shopping',
    emoji: '🛍️',
    coordinates: { lat: 48.8698, lng: 2.3080 },
    phrases: [
      {
        id: 's1',
        text: 'Combien ça coûte?',
        translation: 'How much does this cost?',
        phonetic: 'kohm-byahn sah koot',
      },
      {
        id: 's2',
        text: 'Avez-vous ceci dans une autre taille?',
        translation: 'Do you have this in another size?',
        phonetic: 'ah-vay-voo suh-see dahn oon oh-truh tie',
      },
      {
        id: 's3',
        text: 'Puis-je essayer ceci?',
        translation: 'Can I try this on?',
        phonetic: 'pwee-zhuh eh-say-yay suh-see',
      },
      {
        id: 's4',
        text: 'Acceptez-vous les cartes?',
        translation: 'Do you accept cards?',
        phonetic: 'ahk-sep-tay-voo lay kart',
      },
    ],
  },
  {
    id: 'paris-hotel',
    name: 'Marais District',
    category: 'Hotels',
    emoji: '🏨',
    coordinates: { lat: 48.8566, lng: 2.3615 },
    phrases: [
      {
        id: 'h1',
        text: "J'ai une réservation",
        translation: 'I have a reservation',
        phonetic: 'zhay oon ray-zair-vah-syohn',
      },
      {
        id: 'h2',
        text: 'Le petit-déjeuner est-il inclus?',
        translation: 'Is breakfast included?',
        phonetic: 'luh puh-tee day-zhuh-nay eh-teel ahn-kloo',
      },
      {
        id: 'h3',
        text: 'Quel est le mot de passe WiFi?',
        translation: 'What\'s the WiFi password?',
        phonetic: 'kel eh luh moh duh pahs wee-fee',
      },
      {
        id: 'h4',
        text: 'Puis-je laisser mes bagages?',
        translation: 'Can I leave my luggage?',
        phonetic: 'pwee-zhuh leh-say may bah-gazh',
      },
    ],
  },
  {
    id: 'paris-emergency',
    name: 'City Center',
    category: 'Emergency',
    emoji: '🏥',
    coordinates: { lat: 48.8606, lng: 2.3376 },
    phrases: [
      {
        id: 'e1',
        text: "J'ai besoin d'aide",
        translation: 'I need help',
        phonetic: 'zhay buh-zwahn dayd',
      },
      {
        id: 'e2',
        text: "Où est l'hôpital?",
        translation: 'Where is the hospital?',
        phonetic: 'oo eh loh-pee-tahl',
      },
      {
        id: 'e3',
        text: 'Appelez la police',
        translation: 'Call the police',
        phonetic: 'ah-play lah poh-lees',
      },
      {
        id: 'e4',
        text: "J'ai perdu mon passeport",
        translation: 'I\'ve lost my passport',
        phonetic: 'zhay pair-doo mohn pahs-por',
      },
    ],
  },
];

export const getCityLocations = (cityId: string): Location[] => {
  switch (cityId) {
    case 'paris':
      return parisLocations;
    default:
      return [];
  }
};
