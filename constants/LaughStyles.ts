export interface Persona {
    id: string;
    name: string;
    image: any; // Replace with the appropriate image type for your project
    value: string;
    description: string;
    audio: string;
  }
  
  export const laughStyles: Persona[] = [
    {
      id: '2',
      name: 'The Aristocrat',
      image: require('@/assets/images/pic1.png'),
      value: "2000",
      description:
        'A laugh of refinement, grace, and just enough condescension to let everyone know you’re better than them.',
      audio: 'audio/aristocrat.mp3',
    },
    {
      id: '3',
      name: 'The Heiress',
      image: require('@/assets/images/pic1.png'),
      value: "3000",
      description:
        'This laugh is unhinged yet irresistible—perfect for someone who just bought a diamond-encrusted handbag for their dog.',
      audio: 'audio/heiress.mp3',
    },
    {
      id: '4',
      name: 'The Sinister Tycoon',
      image: require('@/assets/images/pic1.png'),
      value: "5000",
      description:
        'A dark, villainous laugh designed for moments of ultimate power, like cornering a rival company or raising rent.',
      audio: 'audio/tycoon.mp3',
    },
    {
      id: '5',
      name: 'The Tech Bro',
      image: require('@/assets/images/pic1.png'),
      value: "1500",
      description:
        'A laugh filled with overconfidence and startup jargon, perfect for someone pitching the 47th Uber for socks.',
      audio: 'audio/techbro.mp3',
    },
    {
      id: '6',
      name: 'The Nervous Millionaire',
      image: require('@/assets/images/pic1.png'),
      value: "800",
      description:
        'This laugh is quick and shaky, like someone pretending they understand hedge funds but just Googled "how stocks work."',
      audio: 'audio/nervous.mp3',
    },
    {
      id: '7',
      name: 'The Champagne Chuckler',
      image: require('@/assets/images/pic1.png'),
      value: "2500",
      description:
        'Soft, bubbly, and effervescent, this laugh pairs well with caviar and pretending to care about the opera.',
      audio: 'audio/champagne.mp3',
    },
    {
      id: '8',
      name: 'The Social Media Influencer',
      image: require('@/assets/images/pic1.png'),
      value: "1200",
      description:
        'This laugh is perfectly curated for Instagram Stories—effortless and slightly fake, just like their lifestyle.',
      audio: 'audio/influencer.mp3',
    },
    {
      id: '9',
      name: 'The Lottery Winner',
      image: require('@/assets/images/pic1.png'),
      value: "3500",
      description:
        'This laugh is ecstatic and borderline chaotic, like someone who just won the jackpot and immediately quit their job.',
      audio: 'audio/lottery.mp3',
    },
    {
      id: '10',
      name: 'The Overthinker',
      image: require('@/assets/images/pic1.png'),
      value: "500",
      description:
        'A hesitant laugh that screams, "Am I supposed to find this funny, or is this a trap?"',
      audio: 'audio/overthinker.mp3',
    },
    {
      id: '11',
      name: 'The Mysterious Billionaire',
      image: require('@/assets/images/pic1.png'),
      value: "7000",
      description:
        'A low, cryptic laugh with pauses that leave everyone wondering if they’re in on the joke—or the next target.',
      audio: 'audio/mysterious.mp3',
    },
    {
      id: '12',
      name: 'The Boardroom Beast',
      image: require('@/assets/images/pic1.png'),
      value: "4000",
      description:
        'A commanding laugh designed to intimidate competitors and assert dominance during awkward silences in meetings.',
      audio: 'audio/boardroom.mp3',
    },
  ];
  