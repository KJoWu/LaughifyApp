export interface Persona {
  id: string;
  name: string;
  image: any; // Replace with the appropriate image type for your project
  value: string;
  description: string;
  audio: string;
  currentScore: number;
  achieved:boolean;
}

export interface Scenario {
  id: string;
  name: string;
  image: any; 
  description: string;
  audio: string;
  laughValue:number
}

export const laughStyles: Persona[] = [
  {
    id: "1",
    name: "The Etsy Mogul",
    image: require("../assets/images/12.jpg"),
    value: "2000",
    description: "A hearty laugh of triumph, like someone who just sold a million digital downloads of wedding invitations.",
    audio: "audio/etsy.mp3",
    currentScore: 8,
    achieved: true
  },
  {
    id: "4",
    name: "The Golden Fairway Baron",
    image: require("../assets/images/9.jpg"),
    value: "5000",
    description: "A refined laugh that echoes across the green, fitting for someone who owns five golf courses and calls it an investment.",
    audio: "audio/golf.mp3",
    currentScore: 0,
    achieved: false
  },  
  {
    id: "16",
    name: "The Socialite Diva",
    image: require("../assets/images/8.jpg"),
    value: "3000",
    description: "A glittering laugh, perfect for gala nights and charity brunches that cost more than a car.",
    audio: "audio/socialite.mp3",
    currentScore: 5,
    achieved: true
  },
  {
    id: "11",
    name: "The Space Tourism Magnate",
    image: require("../assets/images/87.jpg"),
    value: "12000",
    description: "A triumphant laugh that resonates through the cosmos, like someone who just sold VIP tickets for the first luxury vacation to Mars.",
    audio: "audio/space.mp3",
    currentScore: 0,
    achieved: false
  },
  {
    id: "13",
    name: "The Vineyard Virtuoso",
    image: require("../assets/images/3.jpg"),
    value: "8_000",
    description: "A rich, velvety laugh, like someone sampling their own award-winning vintage from a sprawling private vineyard.",
    audio: "audio/vineyard.mp3",
    currentScore: 7,
    achieved: true
  },
  {
    id: "14",
    name: "The Diamond Empire Builder",
    image: require("../assets/images/13.jpg"),
    value: "10000",
    description: "An unmistakably glittering laugh, as brilliant as the rare gemstones they control across continents.",
    audio: "audio/diamond.mp3",
    currentScore: 3,
    achieved: false
  },
  {
    id: "15",
    name: "The AI Overlord",
    image: require("../assets/images/4.jpg"),
    value: "20000",
    description: "A mechanical laugh infused with smug superiority, like someone who just automated their empire into unstoppable dominance.",
    audio: "audio/ai.mp3",
    currentScore: 0,
    achieved: false
  }
];

export const scenarios: Scenario[] = [
  {
    id: "1",
    name: "TedTalk Conference",
    image: require("../assets/images/7.jpg"),
    description: "Share a knowing chuckle at a TedTalk about disrupting the luxury avocado toast industry with fellow innovators.",
    audio: "test",
    laughValue: 1_000,
  },
  {
    id: "4",
    name: "Antarctic Hot Spring Resort",
    image: require("../assets/images/1.jpg"),
    description: "Chuckle warmly while relaxing in geothermal springs in Antarctica, surrounded by penguins wearing diamond-studded collars.",
    audio: "test",
    laughValue: 3_000,
  },
  {
    id: "6",
    name: "Gold Capsule Yacht Party",
    image: require("../assets/images/6.jpg"),
    description: "Set sail on your shimmering golden yacht, where opulence meets adventure. Cruise through dazzling virtual dimensions, mingling with extravagant AI personalities programmed to entertain and delight.",
    audio: "test",
    laughValue: 15_000,    
  },
  {
    id: "6",
    name: "Lunar Luxe Gala",
    image: require("../assets/images/5.jpg"),
    description: "Step onto the Moon's gleaming surface for the most exclusive event in the galaxy. Bask in the glow of Earthlight as you sip cosmic cocktails, dance in low gravity, and mingle with the universe’s elite in an opulent lunar dome designed for extravagance.",
    audio: "test",
    laughValue: 18_000,
  },
];
