import { SituationData } from '@/components/Cards/SituationCard';

export interface Category {
  id: string;
  emoji: string;
  title: string;
  color: string;
  description: string;
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
      color: '#F97316',
      description: 'Master dining out with essential phrases for restaurants and cafés',
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
          categoryColor: '#F97316',
          culturalTip: 'In France, always greet staff with "Bonjour" before making any request. It\'s considered rude to skip this greeting.',
          conversationFlow: [
            { step: 1, speaker: 'you', phraseIndex: 0 },
            { step: 2, speaker: 'other', action: 'Waiter shows you to your table and brings menus' },
            { step: 3, speaker: 'you', phraseIndex: 1 },
            { step: 4, speaker: 'other', action: 'Waiter brings your food' },
            { step: 5, speaker: 'you', phraseIndex: 2 },
          ],
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
          categoryColor: '#F97316',
          culturalTip: 'French cuisine is very diverse. Don\'t hesitate to ask about ingredients - restaurants are used to accommodating dietary needs.',
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
          categoryColor: '#F97316',
          culturalTip: 'In France, the waiter won\'t bring the bill until you ask. Tipping is optional but appreciated (5-10%).',
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
      color: '#3B82F6',
      description: 'Navigate the Paris metro system with confidence',
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
      color: '#A855F7',
      description: 'Shop like a local with essential retail phrases',
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
      color: '#14B8A6',
      description: 'Check-in, check-out, and hotel amenities',
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
      color: '#EF4444',
      description: 'Essential phrases for urgent situations',
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
      color: '#F59E0B',
      description: 'Learn cultural norms and polite expressions',
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
      color: '#F97316',
      description: 'Master Korean dining etiquette and restaurant phrases',
      mapPosition: [37.5636, 126.9856],
      situations: [
        {
          id: 'ordering-food-seoul',
          cityId: 'seoul',
          cityName: 'Seoul',
          cityEmoji: '🇰🇷',
          emoji: '🍽️',
          title: 'Ordering Food',
          description: 'Get attention and place your order',
          context: 'When you\'re ready to order at a restaurant',
          categoryColor: '#F97316',
          culturalTip: 'Point to menu or picture if unsure; "이거요!" (igeoyo - "this one!") works great. In Korean restaurants, it\'s common to call the server by saying "저기요!" loudly.',
          conversationFlow: [
            { step: 1, speaker: 'you', phraseIndex: 0 },
            { step: 2, speaker: 'other', action: 'Server approaches your table' },
            { step: 3, speaker: 'you', phraseIndex: 1 },
            { step: 4, speaker: 'other', action: 'Server brings the dish' },
            { step: 5, speaker: 'you', phraseIndex: 2 },
          ],
          phrases: [
            {
              native: '저기요!',
              romanization: 'Jeogiyo!',
              english: 'Excuse me!',
            },
            {
              native: '이거 주세요',
              romanization: 'Igeo juseyo',
              english: 'Please give me this',
            },
            {
              native: '뭐가 맛있어요?',
              romanization: 'Mwoga masisseoyo?',
              english: 'What\'s good here?',
            },
            {
              native: '매운 거 괜찮아요',
              romanization: 'Maeun geo gwaenchanayo',
              english: 'Spicy is okay',
            },
          ],
        },
        {
          id: 'allergy-dietary-seoul',
          cityId: 'seoul',
          cityName: 'Seoul',
          cityEmoji: '🇰🇷',
          emoji: '⚠️',
          title: 'Allergy & Dietary Restrictions',
          description: 'Communicate your dietary needs safely',
          context: 'Before ordering, especially if you have allergies',
          categoryColor: '#F97316',
          culturalTip: 'Allergies aren\'t a common conversation topic in Korea, so speak slowly and clearly. Many dishes contain fish sauce or shrimp paste, so ask if unsure.',
          phrases: [
            {
              native: '저 ___ 알레르기 있어요',
              romanization: 'Jeo ___ alleureugi isseoyo',
              english: 'I\'m allergic to ___',
            },
            {
              native: '고기 빼주세요',
              romanization: 'Gogi bbaejuseyo',
              english: 'Please remove meat',
            },
            {
              native: '채식 메뉴 있어요?',
              romanization: 'Chaesik menyu isseoyo?',
              english: 'Do you have vegetarian options?',
            },
            {
              native: '견과류 없이 주세요',
              romanization: 'Gyeongwaryu eobsi juseyo',
              english: 'Please make it without nuts',
            },
            {
              native: '해산물 알레르기 있어요',
              romanization: 'Haesanmul alleureugi isseoyo',
              english: 'I\'m allergic to seafood',
            },
          ],
        },
        {
          id: 'adding-orders-seoul',
          cityId: 'seoul',
          cityName: 'Seoul',
          cityEmoji: '🇰🇷',
          emoji: '➕',
          title: 'Adding Orders',
          description: 'Request more items during your meal',
          context: 'When you need water, more side dishes, or additional items',
          categoryColor: '#F97316',
          culturalTip: 'Banchan (side dishes) refills are usually free! Don\'t hesitate to ask for more. Water and napkins are also complimentary.',
          phrases: [
            {
              native: '물 좀 주세요',
              romanization: 'Mul jom juseyo',
              english: 'Can I have some water?',
            },
            {
              native: '김치 더 주세요',
              romanization: 'Kimchi deo juseyo',
              english: 'More kimchi, please',
            },
            {
              native: '반찬 리필 돼요?',
              romanization: 'Banchan ripil dwaeyo?',
              english: 'Can I get more side dishes?',
            },
            {
              native: '휴지 주세요',
              romanization: 'Hyuji juseyo',
              english: 'Napkins, please',
            },
            {
              native: '포크 있어요?',
              romanization: 'Pokeu isseoyo?',
              english: 'Do you have a fork?',
            },
          ],
        },
        {
          id: 'paying-bill-seoul',
          cityId: 'seoul',
          cityName: 'Seoul',
          cityEmoji: '🇰🇷',
          emoji: '💳',
          title: 'Paying the Bill',
          description: 'Handle payment and show gratitude',
          context: 'When you\'re ready to pay and leave',
          categoryColor: '#F97316',
          culturalTip: 'In most Korean restaurants, you pay at the counter near the entrance, not at your table. Card payment is widely accepted everywhere.',
          phrases: [
            {
              native: '계산할게요',
              romanization: 'Gyesan halgeyo',
              english: 'I\'d like the bill, please',
            },
            {
              native: '카드 돼요?',
              romanization: 'Kadeu dwaeyo?',
              english: 'Do you accept cards?',
            },
            {
              native: '영수증 주세요',
              romanization: 'Yeongsujeung juseyo',
              english: 'Receipt, please',
            },
            {
              native: '잘 먹었습니다',
              romanization: 'Jal meogeotseumnida',
              english: 'Thank you for the meal',
            },
            {
              native: '따로따로 계산해 주세요',
              romanization: 'Ttarottaro gyesan hae juseyo',
              english: 'Separate bills, please',
            },
          ],
        },
      ],
    },
    {
      id: 'transit',
      emoji: '🚇',
      title: 'Metro & Transit',
      color: '#3B82F6',
      description: 'Navigate Seoul\'s efficient subway system',
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
      color: '#A855F7',
      description: 'Shop in Korean markets and stores',
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
      color: '#F97316',
      description: 'Navigate Chinese restaurants with confidence',
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
      color: '#3B82F6',
      description: 'Master Beijing\'s metro system',
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
      color: '#A855F7',
      description: 'Shop in Beijing markets and stores',
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
      color: '#F97316',
      description: 'Master Hindi dining phrases',
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
      color: '#3B82F6',
      description: 'Navigate Delhi metro with ease',
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
      color: '#A855F7',
      description: 'Shop in Indian markets and bazaars',
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
      color: '#F97316',
      description: 'Enjoy authentic Mexican cuisine with confidence',
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
      color: '#3B82F6',
      description: 'Navigate Mexico City\'s metro system',
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
      color: '#A855F7',
      description: 'Shop in Mexican markets and stores',
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
