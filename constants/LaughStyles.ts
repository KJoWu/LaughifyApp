export interface Persona {
  id: string;
  name: string;
  image: any; // Replace with the appropriate image type for your project
  value: string;
  description: string;
  audio: string;
  currentScore: number;
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
    image: require("../assets/images/pic1.png"),
    value: "2000",
    description: "A hearty laugh of triumph, like someone who just sold a million digital downloads of wedding invitations.",
    audio: "audio/etsy.mp3",
    currentScore: 8
  },
  {
    id: "2",
    name: "The Startup Dreamer",
    image: require("../assets/images/pic1.png"),
    value: "1500",
    description: "A laugh of relentless optimism, perfect for someone pitching the next big AI-powered T-shirt company.",
    audio: "audio/startup.mp3",
    currentScore: 7
  },
  {
    id: "3",
    name: "The Convention Hustler",
    image: require("../assets/images/pic1.png"),
    value: "1800",
    description: "A cheeky laugh of confidence, like someone who just sold out their NSFW fanart at a comic convention.",
    audio: "audio/convention.mp3",
    currentScore: 9
  },
  {
    id: "4",
    name: "The Golf Tycoon",
    image: require("../assets/images/pic1.png"),
    value: "5000",
    description: "A refined laugh that echoes across the green, fitting for someone who owns five golf courses and calls it an investment.",
    audio: "audio/golf.mp3",
    currentScore: 0
  },
  {
    id: "5",
    name: "The Hedge Fund Prodigy",
    image: require("../assets/images/pic1.png"),
    value: "7000",
    description: "A laugh that balances arrogance and charm, typical of someone who just closed their third fund at 27.",
    audio: "audio/hedgefund.mp3",
    currentScore: 0
  },
  {
    id: "6",
    name: "The Aristocrat",
    image: require("../assets/images/pic1.png"),
    value: "2000",
    description: "A laugh of refinement, grace, and just enough condescension to let everyone know you are better than them.",
    audio: "audio/aristocrat.mp3",
    currentScore: 6
  },
  {
    id: "7",
    name: "The Heiress",
    image: require("../assets/images/pic1.png"),
    value: "3000",
    description: "This laugh is unhinged yet irresistible - perfect for someone who just bought a diamond-encrusted handbag for their dog.",
    audio: "audio/heiress.mp3",
    currentScore: 8
  },
  {
    id: "8",
    name: "The Sinister Tycoon",
    image: require("../assets/images/pic1.png"),
    value: "5000",
    description: "A dark, villainous laugh designed for moments of ultimate power, like cornering a rival company or raising rent.",
    audio: "audio/tycoon.mp3",
    currentScore: 0
  },
  {
    id: "9",
    name: "The Nervous Millionaire",
    image: require("../assets/images/pic1.png"),
    value: "800",
    description: "This laugh is quick and shaky, like someone pretending they understand hedge funds but just Googled how stocks work.",
    audio: "audio/nervous.mp3",
    currentScore: 7
  },
  {
    id: "10",
    name: "The Champagne Chuckler",
    image: require("../assets/images/pic1.png"),
    value: "2500",
    description: "Soft, bubbly, and effervescent, this laugh pairs well with caviar and pretending to care about the opera.mp3",
    currentScore: 8
  },
  {
    id: "11",
    name: "The Social Media Maven",
    image: require("../assets/images/pic1.png"),
    value: "1200",
    description: "This laugh is perfectly curated for Instagram Stories - effortless and slightly fake, just like their lifestyle.",
    audio: "audio/influencer.mp3",
    currentScore: 6
  },
  {
    id: "12",
    name: "The Lottery Winner",
    image: require("../assets/images/pic1.png"),
    value: "3500",
    description: "This laugh is ecstatic and borderline chaotic, like someone who just won the jackpot and immediately quit their job.",
    audio: "audio/lottery.mp3",
    currentScore: 0
  },
  {
    id: "13",
    name: "The Overthinker",
    image: require("../assets/images/pic1.png"),
    value: "500",
    description: "A hesitant laugh that screams, Am I supposed to find this funny, or is this a trap?",
    audio: "audio/overthinker.mp3",
    currentScore: 7
  },
  {
    id: "14",
    name: "The Mysterious Billionaire",
    image: require("../assets/images/pic1.png"),
    value: "7000",
    description: "A low, cryptic laugh with pauses that leave everyone wondering if they are in on the joke or the next target.",
    audio: "audio/mysterious.mp3",
    currentScore: 0
  },
  {
    id: "15",
    name: "The Boardroom Beast",
    image: require("../assets/images/pic1.png"),
    value: "4000",
    description: "A commanding laugh designed to intimidate competitors and assert dominance during awkward silences in meetings.",
    audio: "audio/boardroom.mp3",
    currentScore: 0
  },
  {
    id: "16",
    name: "The Passive Investor",
    image: require("../assets/images/pic1.png"),
    value: "3000",
    description: "A calm, collected laugh, like someone who earns more sleeping than most do working.",
    audio: "audio/investor.mp3",
    currentScore: 8
  }
];


export const scenarios: Scenario[] = [
  {
    id: "1",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  },
  {
    id: "2",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  },
  {
    id: "3",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  },
  {
    id: "1",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  },
  {
    id: "2",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  },
  {
    id: "3",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  },
  {
    id: "3",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  },
  {
    id: "22",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  },
  {
    id: "22",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  },
  {
    id: "322",
    name: "Yoga Studio on Mars",
    image: require("../assets/images/pic1.png"),
    description: "Have a good rich laugh as you realign the chakras in your wealthy mansion on Mars with your new age movement friends",
    audio: "audio/test.mp3",
    laughValue:2000,
  }
];
