import { City, Location } from '@/stores/appStore';

export const cities: City[] = [
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    language: 'Korean',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    emoji: '🇰🇷',
    available: true,
  },
  {
    id: 'beijing',
    name: 'Beijing',
    country: 'China',
    language: 'Mandarin',
    coordinates: { lat: 39.9042, lng: 116.4074 },
    emoji: '🇨🇳',
    available: true,
  },
  {
    id: 'new-delhi',
    name: 'New Delhi',
    country: 'India',
    language: 'Hindi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    emoji: '🇮🇳',
    available: true,
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    language: 'French',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    emoji: '🇫🇷',
    available: false,
  },
  {
    id: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    language: 'Spanish',
    coordinates: { lat: 19.4326, lng: -99.1332 },
    emoji: '🇲🇽',
    available: false,
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

export const seoulLocations: Location[] = [
  {
    id: 'seoul-restaurant',
    name: 'Myeongdong',
    category: 'Restaurants & Cafés',
    emoji: '🍽️',
    coordinates: { lat: 37.5636, lng: 126.9856 },
    phrases: [
      {
        id: 's1',
        text: '두 명이요',
        translation: 'Table for two',
        phonetic: 'du myeong-i-yo',
      },
      {
        id: 's2',
        text: '메뉴판 주세요',
        translation: 'Menu please',
        phonetic: 'me-nyu-pan ju-se-yo',
      },
      {
        id: 's3',
        text: '계산서 주세요',
        translation: 'Bill please',
        phonetic: 'gye-san-seo ju-se-yo',
      },
      {
        id: 's4',
        text: '맛있어요',
        translation: 'This is delicious',
        phonetic: 'ma-si-sseo-yo',
      },
    ],
  },
  {
    id: 'seoul-metro',
    name: 'Seoul Station',
    category: 'Metro & Transit',
    emoji: '🚇',
    coordinates: { lat: 37.5547, lng: 126.9707 },
    phrases: [
      {
        id: 's5',
        text: '어디로 가요?',
        translation: 'Where does this go?',
        phonetic: 'eo-di-ro ga-yo',
      },
      {
        id: 's6',
        text: '얼마예요?',
        translation: 'How much?',
        phonetic: 'eol-ma-ye-yo',
      },
      {
        id: 's7',
        text: '환승해야 해요?',
        translation: 'Do I need to transfer?',
        phonetic: 'hwan-seung-hae-ya hae-yo',
      },
    ],
  },
  {
    id: 'seoul-shopping',
    name: 'Gangnam',
    category: 'Shopping',
    emoji: '🛍️',
    coordinates: { lat: 37.4979, lng: 127.0276 },
    phrases: [
      {
        id: 's8',
        text: '얼마예요?',
        translation: 'How much is this?',
        phonetic: 'eol-ma-ye-yo',
      },
      {
        id: 's9',
        text: '다른 사이즈 있어요?',
        translation: 'Do you have another size?',
        phonetic: 'da-reun sa-i-jeu i-sseo-yo',
      },
      {
        id: 's10',
        text: '카드 받으세요?',
        translation: 'Do you accept cards?',
        phonetic: 'ka-deu ba-deu-se-yo',
      },
    ],
  },
];

export const beijingLocations: Location[] = [
  {
    id: 'beijing-restaurant',
    name: 'Wangfujing',
    category: 'Restaurants & Cafés',
    emoji: '🍽️',
    coordinates: { lat: 39.9085, lng: 116.4100 },
    phrases: [
      {
        id: 'b1',
        text: '两个人',
        translation: 'Table for two',
        phonetic: 'liǎng gè rén',
      },
      {
        id: 'b2',
        text: '菜单，请',
        translation: 'Menu please',
        phonetic: 'cài dān, qǐng',
      },
      {
        id: 'b3',
        text: '买单',
        translation: 'Bill please',
        phonetic: 'mǎi dān',
      },
      {
        id: 'b4',
        text: '很好吃',
        translation: 'Very delicious',
        phonetic: 'hěn hǎo chī',
      },
    ],
  },
  {
    id: 'beijing-metro',
    name: 'Tiananmen Square',
    category: 'Metro & Transit',
    emoji: '🚇',
    coordinates: { lat: 39.9042, lng: 116.3976 },
    phrases: [
      {
        id: 'b5',
        text: '这个去哪里?',
        translation: 'Where does this go?',
        phonetic: 'zhè gè qù nǎ lǐ',
      },
      {
        id: 'b6',
        text: '多少钱?',
        translation: 'How much?',
        phonetic: 'duō shǎo qián',
      },
      {
        id: 'b7',
        text: '需要换乘吗?',
        translation: 'Do I need to transfer?',
        phonetic: 'xū yào huàn chéng ma',
      },
    ],
  },
  {
    id: 'beijing-shopping',
    name: 'Sanlitun',
    category: 'Shopping',
    emoji: '🛍️',
    coordinates: { lat: 39.9343, lng: 116.4478 },
    phrases: [
      {
        id: 'b8',
        text: '多少钱?',
        translation: 'How much is this?',
        phonetic: 'duō shǎo qián',
      },
      {
        id: 'b9',
        text: '有别的尺码吗?',
        translation: 'Do you have another size?',
        phonetic: 'yǒu bié de chǐ mǎ ma',
      },
      {
        id: 'b10',
        text: '可以刷卡吗?',
        translation: 'Can I pay by card?',
        phonetic: 'kě yǐ shuā kǎ ma',
      },
    ],
  },
];

export const newDelhiLocations: Location[] = [
  {
    id: 'delhi-restaurant',
    name: 'Connaught Place',
    category: 'Restaurants & Cafés',
    emoji: '🍽️',
    coordinates: { lat: 28.6315, lng: 77.2167 },
    phrases: [
      {
        id: 'd1',
        text: 'दो लोगों के लिए',
        translation: 'Table for two',
        phonetic: 'do logon ke liye',
      },
      {
        id: 'd2',
        text: 'मेनू दिखाइए',
        translation: 'Show me the menu',
        phonetic: 'menu dikhaiye',
      },
      {
        id: 'd3',
        text: 'बिल लाइए',
        translation: 'Bring the bill',
        phonetic: 'bill laiye',
      },
      {
        id: 'd4',
        text: 'बहुत स्वादिष्ट है',
        translation: 'Very delicious',
        phonetic: 'bahut swadisht hai',
      },
    ],
  },
  {
    id: 'delhi-metro',
    name: 'Rajiv Chowk',
    category: 'Metro & Transit',
    emoji: '🚇',
    coordinates: { lat: 28.6328, lng: 77.2197 },
    phrases: [
      {
        id: 'd5',
        text: 'यह कहाँ जाती है?',
        translation: 'Where does this go?',
        phonetic: 'yah kahan jati hai',
      },
      {
        id: 'd6',
        text: 'कितने पैसे?',
        translation: 'How much money?',
        phonetic: 'kitne paise',
      },
      {
        id: 'd7',
        text: 'क्या मुझे बदलना होगा?',
        translation: 'Do I need to change?',
        phonetic: 'kya mujhe badalna hoga',
      },
    ],
  },
  {
    id: 'delhi-shopping',
    name: 'Chandni Chowk',
    category: 'Shopping',
    emoji: '🛍️',
    coordinates: { lat: 28.6506, lng: 77.2303 },
    phrases: [
      {
        id: 'd8',
        text: 'यह कितने का है?',
        translation: 'How much is this?',
        phonetic: 'yah kitne ka hai',
      },
      {
        id: 'd9',
        text: 'दूसरा साइज़ है?',
        translation: 'Do you have another size?',
        phonetic: 'doosra size hai',
      },
      {
        id: 'd10',
        text: 'कार्ड चलेगा?',
        translation: 'Will card work?',
        phonetic: 'card chalega',
      },
    ],
  },
];

export const mexicoCityLocations: Location[] = [
  {
    id: 'mexico-restaurant',
    name: 'Zona Rosa',
    category: 'Restaurants & Cafés',
    emoji: '🍽️',
    coordinates: { lat: 19.4270, lng: -99.1596 },
    phrases: [
      {
        id: 'mx1',
        text: 'Una mesa para dos, por favor',
        translation: 'A table for two, please',
        phonetic: 'oo-nah meh-sah pah-rah dohs, por fah-vor',
      },
      {
        id: 'mx2',
        text: '¿Puedo ver el menú?',
        translation: 'Can I see the menu?',
        phonetic: 'pweh-doh vehr el meh-noo',
      },
      {
        id: 'mx3',
        text: 'La cuenta, por favor',
        translation: 'The bill, please',
        phonetic: 'lah kwen-tah, por fah-vor',
      },
      {
        id: 'mx4',
        text: 'Está delicioso',
        translation: 'This is delicious',
        phonetic: 'es-tah deh-lee-syoh-soh',
      },
    ],
  },
  {
    id: 'mexico-metro',
    name: 'Zócalo',
    category: 'Metro & Transit',
    emoji: '🚇',
    coordinates: { lat: 19.4326, lng: -99.1332 },
    phrases: [
      {
        id: 'mx5',
        text: '¿A dónde va esto?',
        translation: 'Where does this go?',
        phonetic: 'ah dohn-deh vah es-toh',
      },
      {
        id: 'mx6',
        text: '¿Cuánto cuesta?',
        translation: 'How much does it cost?',
        phonetic: 'kwan-toh kwes-tah',
      },
      {
        id: 'mx7',
        text: '¿Necesito hacer transbordo?',
        translation: 'Do I need to transfer?',
        phonetic: 'neh-seh-see-toh ah-ser trans-bor-doh',
      },
    ],
  },
  {
    id: 'mexico-shopping',
    name: 'Polanco',
    category: 'Shopping',
    emoji: '🛍️',
    coordinates: { lat: 19.4340, lng: -99.1913 },
    phrases: [
      {
        id: 'mx8',
        text: '¿Cuánto cuesta esto?',
        translation: 'How much is this?',
        phonetic: 'kwan-toh kwes-tah es-toh',
      },
      {
        id: 'mx9',
        text: '¿Tiene otra talla?',
        translation: 'Do you have another size?',
        phonetic: 'tyeh-neh oh-trah tah-yah',
      },
      {
        id: 'mx10',
        text: '¿Aceptan tarjetas?',
        translation: 'Do you accept cards?',
        phonetic: 'ah-sep-tahn tar-heh-tas',
      },
    ],
  },
];

export const getCityLocations = (cityId: string): Location[] => {
  switch (cityId) {
    case 'seoul':
      return seoulLocations;
    case 'beijing':
      return beijingLocations;
    case 'new-delhi':
      return newDelhiLocations;
    case 'paris':
      return parisLocations;
    case 'mexico-city':
      return mexicoCityLocations;
    default:
      return [];
  }
};
