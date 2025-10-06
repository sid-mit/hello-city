import { SituationData } from '@/components/Cards/SituationCard';

export interface Category {
  id: string;
  emoji: string;
  title: string;
  mapPosition: [number, number];
  situations: SituationData[];
}

export interface CityDataStructure {
  cityId: string;
  cityName: string;
  cityEmoji: string;
  categories: Category[];
}

// Paris Data
export const parisData: CityDataStructure = {
  cityId: 'paris',
  cityName: 'Paris',
  cityEmoji: '🇫🇷',
  categories: [
    {
      id: 'restaurants',
      emoji: '🍽️',
      title: 'Restaurants & Cafés',
      mapPosition: [48.8534, 2.3488],
      situations: [
        {
          id: 'ordering-food-paris',
          cityId: 'paris',
          cityName: 'Paris',
          cityEmoji: '🇫🇷',
          emoji: '🍽️',
          title: 'Ordering Food',
          description: 'Learn essential phrases for ordering at restaurants',
          context: 'Use these when sitting at a restaurant table',
          phrases: [
            {
              native: "Une table pour deux, s'il vous plaît",
              romanization: 'oon tah-bluh poor duh, seel voo pleh',
              english: 'A table for two, please',
            },
            {
              native: 'Je voudrais ça, s\'il vous plaît',
              romanization: 'zhuh voo-dreh sah, seel voo pleh',
              english: 'I would like this, please',
            },
            {
              native: 'C\'était délicieux',
              romanization: 'seh-teh deh-lee-syuh',
              english: 'This was delicious',
            },
          ],
        },
        {
          id: 'dietary-restrictions-paris',
          cityId: 'paris',
          cityName: 'Paris',
          cityEmoji: '🇫🇷',
          emoji: '🥗',
          title: 'Dietary Restrictions',
          description: 'Communicate your dietary needs clearly',
          context: 'Important when ordering food',
          phrases: [
            {
              native: 'J\'ai une allergie alimentaire',
              romanization: 'zhay oon ah-lair-zhee ah-lee-mahn-tair',
              english: 'I have a food allergy',
            },
            {
              native: 'Je suis végétarien(ne)',
              romanization: 'zhuh swee vay-zhay-tah-ryahn',
              english: 'I am vegetarian',
            },
            {
              native: 'Sans gluten, s\'il vous plaît',
              romanization: 'sahn gloo-tahn, seel voo pleh',
              english: 'Gluten-free, please',
            },
          ],
        },
        {
          id: 'asking-bill-paris',
          cityId: 'paris',
          cityName: 'Paris',
          cityEmoji: '🇫🇷',
          emoji: '💳',
          title: 'Asking for the Bill',
          description: 'Request the check and pay',
          context: 'Use at the end of your meal',
          phrases: [
            {
              native: 'L\'addition, s\'il vous plaît',
              romanization: 'lah-dee-syohn, seel voo pleh',
              english: 'The bill, please',
            },
            {
              native: 'Acceptez-vous les cartes?',
              romanization: 'ahk-sep-tay-voo lay kart',
              english: 'Do you accept cards?',
            },
          ],
        },
      ],
    },
    {
      id: 'transit',
      emoji: '🚇',
      title: 'Metro & Transit',
      mapPosition: [48.8809, 2.3553],
      situations: [
        {
          id: 'buying-tickets-paris',
          cityId: 'paris',
          cityName: 'Paris',
          cityEmoji: '🇫🇷',
          emoji: '🎫',
          title: 'Buying Tickets',
          description: 'Purchase metro and train tickets',
          context: 'At ticket machines or counters',
          phrases: [
            {
              native: 'Un billet pour [destination], s\'il vous plaît',
              romanization: 'uhn bee-yeh poor, seel voo pleh',
              english: 'One ticket to [destination], please',
            },
            {
              native: 'Aller-retour ou aller simple?',
              romanization: 'ah-lay ruh-toor oo ah-lay sahm-pluh',
              english: 'Round trip or one way?',
            },
          ],
        },
        {
          id: 'finding-platform-paris',
          cityId: 'paris',
          cityName: 'Paris',
          cityEmoji: '🇫🇷',
          emoji: '🚉',
          title: 'Finding Your Platform',
          description: 'Navigate the metro system',
          context: 'When looking for the right train',
          phrases: [
            {
              native: 'Quelle voie?',
              romanization: 'kel vwah',
              english: 'Which platform?',
            },
            {
              native: 'Est-ce le bon train?',
              romanization: 'es luh bohn trahn',
              english: 'Is this the right train?',
            },
            {
              native: 'Où dois-je changer?',
              romanization: 'oo dwah-zhuh shahn-zhay',
              english: 'Where do I transfer?',
            },
          ],
        },
      ],
    },
    {
      id: 'shopping',
      emoji: '🛍️',
      title: 'Shopping',
      mapPosition: [48.8698, 2.3080],
      situations: [
        {
          id: 'asking-prices-paris',
          cityId: 'paris',
          cityName: 'Paris',
          cityEmoji: '🇫🇷',
          emoji: '💰',
          title: 'Asking About Prices',
          description: 'Inquire about costs and sizes',
          context: 'When shopping in stores',
          phrases: [
            {
              native: 'Combien ça coûte?',
              romanization: 'kohm-byahn sah koot',
              english: 'How much does this cost?',
            },
            {
              native: 'Avez-vous ceci dans une autre taille?',
              romanization: 'ah-vay-voo suh-see dahn oon oh-truh tie',
              english: 'Do you have this in another size?',
            },
            {
              native: 'Puis-je essayer ceci?',
              romanization: 'pwee-zhuh eh-say-yay suh-see',
              english: 'Can I try this on?',
            },
          ],
        },
      ],
    },
    {
      id: 'hotels',
      emoji: '🏨',
      title: 'Hotels',
      mapPosition: [48.8566, 2.3615],
      situations: [
        {
          id: 'checking-in-paris',
          cityId: 'paris',
          cityName: 'Paris',
          cityEmoji: '🇫🇷',
          emoji: '🔑',
          title: 'Checking In',
          description: 'Check into your hotel',
          context: 'At the hotel reception',
          phrases: [
            {
              native: 'J\'ai une réservation',
              romanization: 'zhay oon ray-zair-vah-syohn',
              english: 'I have a reservation',
            },
            {
              native: 'Le petit-déjeuner est-il inclus?',
              romanization: 'luh puh-tee day-zhuh-nay eh-teel ahn-kloo',
              english: 'Is breakfast included?',
            },
            {
              native: 'Quel est le mot de passe WiFi?',
              romanization: 'kel eh luh moh duh pahs wee-fee',
              english: 'What\'s the WiFi password?',
            },
          ],
        },
      ],
    },
    {
      id: 'emergency',
      emoji: '🏥',
      title: 'Emergency',
      mapPosition: [48.8606, 2.3376],
      situations: [
        {
          id: 'getting-help-paris',
          cityId: 'paris',
          cityName: 'Paris',
          cityEmoji: '🇫🇷',
          emoji: '🚨',
          title: 'Getting Help',
          description: 'Emergency phrases for urgent situations',
          context: 'In case of emergencies',
          phrases: [
            {
              native: 'J\'ai besoin d\'aide',
              romanization: 'zhay buh-zwahn dayd',
              english: 'I need help',
            },
            {
              native: 'Où est l\'hôpital?',
              romanization: 'oo eh loh-pee-tahl',
              english: 'Where is the hospital?',
            },
            {
              native: 'Appelez la police',
              romanization: 'ah-play lah poh-lees',
              english: 'Call the police',
            },
          ],
        },
      ],
    },
    {
      id: 'culture',
      emoji: '🎭',
      title: 'Culture & Etiquette',
      mapPosition: [48.8606, 2.3522],
      situations: [
        {
          id: 'greetings-paris',
          cityId: 'paris',
          cityName: 'Paris',
          cityEmoji: '🇫🇷',
          emoji: '👋',
          title: 'Greetings & Politeness',
          description: 'Essential polite expressions',
          context: 'Use in all interactions',
          phrases: [
            {
              native: 'Bonjour',
              romanization: 'bohn-zhoor',
              english: 'Hello / Good day',
            },
            {
              native: 'Merci beaucoup',
              romanization: 'mair-see boh-koo',
              english: 'Thank you very much',
            },
            {
              native: 'Excusez-moi',
              romanization: 'eks-kew-zay-mwah',
              english: 'Excuse me',
            },
          ],
        },
      ],
    },
  ],
};

// Seoul Data (Korean)
export const seoulData: CityDataStructure = {
  cityId: 'seoul',
  cityName: 'Seoul',
  cityEmoji: '🇰🇷',
  categories: [
    {
      id: 'restaurants',
      emoji: '🍽️',
      title: 'Restaurants & Cafés',
      mapPosition: [37.5636, 126.9856],
      situations: [
        {
          id: 'ordering-food-seoul',
          cityId: 'seoul',
          cityName: 'Seoul',
          cityEmoji: '🇰🇷',
          emoji: '🍽️',
          title: 'Ordering Food',
          description: 'Essential phrases for Korean restaurants',
          context: 'When dining at restaurants',
          phrases: [
            {
              native: '두 명이요',
              romanization: 'du myeong-i-yo',
              english: 'Table for two',
            },
            {
              native: '메뉴판 주세요',
              romanization: 'me-nyu-pan ju-se-yo',
              english: 'Menu please',
            },
            {
              native: '계산서 주세요',
              romanization: 'gye-san-seo ju-se-yo',
              english: 'Bill please',
            },
            {
              native: '맛있어요',
              romanization: 'ma-si-sseo-yo',
              english: 'This is delicious',
            },
          ],
        },
        {
          id: 'dietary-seoul',
          cityId: 'seoul',
          cityName: 'Seoul',
          cityEmoji: '🇰🇷',
          emoji: '🥗',
          title: 'Dietary Needs',
          description: 'Communicate food preferences',
          context: 'For special dietary requirements',
          phrases: [
            {
              native: '매운 거 빼주세요',
              romanization: 'mae-un geo bbae-ju-se-yo',
              english: 'No spicy please',
            },
            {
              native: '채식주의자예요',
              romanization: 'chae-sik-ju-ui-ja-ye-yo',
              english: 'I am vegetarian',
            },
          ],
        },
      ],
    },
    {
      id: 'transit',
      emoji: '🚇',
      title: 'Metro & Transit',
      mapPosition: [37.5547, 126.9707],
      situations: [
        {
          id: 'metro-navigation-seoul',
          cityId: 'seoul',
          cityName: 'Seoul',
          cityEmoji: '🇰🇷',
          emoji: '🚉',
          title: 'Using the Metro',
          description: 'Navigate Seoul\'s subway system',
          context: 'At metro stations',
          phrases: [
            {
              native: '어디로 가요?',
              romanization: 'eo-di-ro ga-yo',
              english: 'Where does this go?',
            },
            {
              native: '얼마예요?',
              romanization: 'eol-ma-ye-yo',
              english: 'How much?',
            },
            {
              native: '환승해야 해요?',
              romanization: 'hwan-seung-hae-ya hae-yo',
              english: 'Do I need to transfer?',
            },
          ],
        },
      ],
    },
    {
      id: 'shopping',
      emoji: '🛍️',
      title: 'Shopping',
      mapPosition: [37.4979, 127.0276],
      situations: [
        {
          id: 'shopping-seoul',
          cityId: 'seoul',
          cityName: 'Seoul',
          cityEmoji: '🇰🇷',
          emoji: '💰',
          title: 'Shopping Essentials',
          description: 'Common shopping phrases',
          context: 'In stores and markets',
          phrases: [
            {
              native: '얼마예요?',
              romanization: 'eol-ma-ye-yo',
              english: 'How much is this?',
            },
            {
              native: '다른 사이즈 있어요?',
              romanization: 'da-reun sa-i-jeu i-sseo-yo',
              english: 'Do you have another size?',
            },
            {
              native: '카드 받으세요?',
              romanization: 'ka-deu ba-deu-se-yo',
              english: 'Do you accept cards?',
            },
          ],
        },
      ],
    },
  ],
};

// Beijing Data (Mandarin)
export const beijingData: CityDataStructure = {
  cityId: 'beijing',
  cityName: 'Beijing',
  cityEmoji: '🇨🇳',
  categories: [
    {
      id: 'restaurants',
      emoji: '🍽️',
      title: 'Restaurants & Cafés',
      mapPosition: [39.9085, 116.4100],
      situations: [
        {
          id: 'ordering-food-beijing',
          cityId: 'beijing',
          cityName: 'Beijing',
          cityEmoji: '🇨🇳',
          emoji: '🍽️',
          title: 'Ordering Food',
          description: 'Essential Chinese phrases for dining',
          context: 'At restaurants',
          phrases: [
            {
              native: '两个人',
              romanization: 'liǎng gè rén',
              english: 'Table for two',
            },
            {
              native: '菜单，请',
              romanization: 'cài dān, qǐng',
              english: 'Menu please',
            },
            {
              native: '买单',
              romanization: 'mǎi dān',
              english: 'Bill please',
            },
            {
              native: '很好吃',
              romanization: 'hěn hǎo chī',
              english: 'Very delicious',
            },
          ],
        },
      ],
    },
    {
      id: 'transit',
      emoji: '🚇',
      title: 'Metro & Transit',
      mapPosition: [39.9042, 116.3976],
      situations: [
        {
          id: 'metro-beijing',
          cityId: 'beijing',
          cityName: 'Beijing',
          cityEmoji: '🇨🇳',
          emoji: '🚉',
          title: 'Using the Metro',
          description: 'Navigate Beijing subway',
          context: 'At metro stations',
          phrases: [
            {
              native: '这个去哪里?',
              romanization: 'zhè gè qù nǎ lǐ',
              english: 'Where does this go?',
            },
            {
              native: '多少钱?',
              romanization: 'duō shǎo qián',
              english: 'How much?',
            },
            {
              native: '需要换乘吗?',
              romanization: 'xū yào huàn chéng ma',
              english: 'Do I need to transfer?',
            },
          ],
        },
      ],
    },
    {
      id: 'shopping',
      emoji: '🛍️',
      title: 'Shopping',
      mapPosition: [39.9343, 116.4478],
      situations: [
        {
          id: 'shopping-beijing',
          cityId: 'beijing',
          cityName: 'Beijing',
          cityEmoji: '🇨🇳',
          emoji: '💰',
          title: 'Shopping',
          description: 'Shopping phrases',
          context: 'In stores',
          phrases: [
            {
              native: '多少钱?',
              romanization: 'duō shǎo qián',
              english: 'How much is this?',
            },
            {
              native: '有别的尺码吗?',
              romanization: 'yǒu bié de chǐ mǎ ma',
              english: 'Do you have another size?',
            },
            {
              native: '可以刷卡吗?',
              romanization: 'kě yǐ shuā kǎ ma',
              english: 'Can I pay by card?',
            },
          ],
        },
      ],
    },
  ],
};

// New Delhi Data (Hindi)
export const newDelhiData: CityDataStructure = {
  cityId: 'new-delhi',
  cityName: 'New Delhi',
  cityEmoji: '🇮🇳',
  categories: [
    {
      id: 'restaurants',
      emoji: '🍽️',
      title: 'Restaurants & Cafés',
      mapPosition: [28.6315, 77.2167],
      situations: [
        {
          id: 'ordering-food-delhi',
          cityId: 'new-delhi',
          cityName: 'New Delhi',
          cityEmoji: '🇮🇳',
          emoji: '🍽️',
          title: 'Ordering Food',
          description: 'Hindi phrases for dining',
          context: 'At restaurants',
          phrases: [
            {
              native: 'दो लोगों के लिए',
              romanization: 'do logon ke liye',
              english: 'Table for two',
            },
            {
              native: 'मेनू दिखाइए',
              romanization: 'menu dikhaiye',
              english: 'Show me the menu',
            },
            {
              native: 'बिल लाइए',
              romanization: 'bill laiye',
              english: 'Bring the bill',
            },
            {
              native: 'बहुत स्वादिष्ट है',
              romanization: 'bahut swadisht hai',
              english: 'Very delicious',
            },
          ],
        },
      ],
    },
    {
      id: 'transit',
      emoji: '🚇',
      title: 'Metro & Transit',
      mapPosition: [28.6328, 77.2197],
      situations: [
        {
          id: 'metro-delhi',
          cityId: 'new-delhi',
          cityName: 'New Delhi',
          cityEmoji: '🇮🇳',
          emoji: '🚉',
          title: 'Using the Metro',
          description: 'Navigate Delhi metro',
          context: 'At metro stations',
          phrases: [
            {
              native: 'यह कहाँ जाती है?',
              romanization: 'yah kahan jati hai',
              english: 'Where does this go?',
            },
            {
              native: 'कितने पैसे?',
              romanization: 'kitne paise',
              english: 'How much money?',
            },
            {
              native: 'क्या मुझे बदलना होगा?',
              romanization: 'kya mujhe badalna hoga',
              english: 'Do I need to change?',
            },
          ],
        },
      ],
    },
    {
      id: 'shopping',
      emoji: '🛍️',
      title: 'Shopping',
      mapPosition: [28.6506, 77.2303],
      situations: [
        {
          id: 'shopping-delhi',
          cityId: 'new-delhi',
          cityName: 'New Delhi',
          cityEmoji: '🇮🇳',
          emoji: '💰',
          title: 'Shopping',
          description: 'Shopping phrases',
          context: 'In markets',
          phrases: [
            {
              native: 'यह कितने का है?',
              romanization: 'yah kitne ka hai',
              english: 'How much is this?',
            },
            {
              native: 'दूसरा साइज़ है?',
              romanization: 'doosra size hai',
              english: 'Do you have another size?',
            },
            {
              native: 'कार्ड चलेगा?',
              romanization: 'card chalega',
              english: 'Will card work?',
            },
          ],
        },
      ],
    },
  ],
};

// Mexico City Data (Spanish)
export const mexicoCityData: CityDataStructure = {
  cityId: 'mexico-city',
  cityName: 'Mexico City',
  cityEmoji: '🇲🇽',
  categories: [
    {
      id: 'restaurants',
      emoji: '🍽️',
      title: 'Restaurants & Cafés',
      mapPosition: [19.4270, -99.1596],
      situations: [
        {
          id: 'ordering-food-mexico',
          cityId: 'mexico-city',
          cityName: 'Mexico City',
          cityEmoji: '🇲🇽',
          emoji: '🍽️',
          title: 'Ordering Food',
          description: 'Spanish phrases for dining',
          context: 'At restaurants',
          phrases: [
            {
              native: 'Una mesa para dos, por favor',
              romanization: 'oo-nah meh-sah pah-rah dohs, por fah-vor',
              english: 'A table for two, please',
            },
            {
              native: 'El menú, por favor',
              romanization: 'el meh-noo, por fah-vor',
              english: 'The menu, please',
            },
            {
              native: 'La cuenta, por favor',
              romanization: 'lah kwen-tah, por fah-vor',
              english: 'The bill, please',
            },
            {
              native: '¡Está delicioso!',
              romanization: 'es-tah deh-lee-see-oh-soh',
              english: 'This is delicious!',
            },
          ],
        },
      ],
    },
    {
      id: 'transit',
      emoji: '🚇',
      title: 'Metro & Transit',
      mapPosition: [19.4326, -99.1332],
      situations: [
        {
          id: 'metro-mexico',
          cityId: 'mexico-city',
          cityName: 'Mexico City',
          cityEmoji: '🇲🇽',
          emoji: '🚉',
          title: 'Using the Metro',
          description: 'Navigate Mexico City metro',
          context: 'At metro stations',
          phrases: [
            {
              native: '¿A dónde va?',
              romanization: 'ah dohn-deh vah',
              english: 'Where does this go?',
            },
            {
              native: '¿Cuánto cuesta?',
              romanization: 'kwan-toh kwes-tah',
              english: 'How much does it cost?',
            },
            {
              native: '¿Necesito cambiar?',
              romanization: 'neh-seh-see-toh kahm-bee-ahr',
              english: 'Do I need to transfer?',
            },
          ],
        },
      ],
    },
    {
      id: 'shopping',
      emoji: '🛍️',
      title: 'Shopping',
      mapPosition: [19.4284, -99.1277],
      situations: [
        {
          id: 'shopping-mexico',
          cityId: 'mexico-city',
          cityName: 'Mexico City',
          cityEmoji: '🇲🇽',
          emoji: '💰',
          title: 'Shopping',
          description: 'Shopping phrases',
          context: 'In stores',
          phrases: [
            {
              native: '¿Cuánto cuesta?',
              romanization: 'kwan-toh kwes-tah',
              english: 'How much does this cost?',
            },
            {
              native: '¿Tiene otra talla?',
              romanization: 'tee-eh-neh oh-trah tah-yah',
              english: 'Do you have another size?',
            },
            {
              native: '¿Aceptan tarjetas?',
              romanization: 'ah-sep-tahn tar-heh-tahs',
              english: 'Do you accept cards?',
            },
          ],
        },
      ],
    },
  ],
};

// Export helper function to get city data
export const getCityData = (cityId: string): CityDataStructure | null => {
  switch (cityId) {
    case 'paris':
      return parisData;
    case 'seoul':
      return seoulData;
    case 'beijing':
      return beijingData;
    case 'new-delhi':
      return newDelhiData;
    case 'mexico-city':
      return mexicoCityData;
    default:
      return null;
  }
};

// Export all city data
export const allCityData = [parisData, seoulData, beijingData, newDelhiData, mexicoCityData];
