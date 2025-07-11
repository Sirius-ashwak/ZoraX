import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { config } from 'dotenv';

// Load environment variables
config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Demo data
const demoUsers = [
  {
    address: '0x1234567890123456789012345678901234567890',
    username: 'cosmic_creator',
    email: 'cosmic@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
    bio: 'Digital artist creating cosmic symphonies in Web3. Exploring the intersection of music, art, and blockchain technology.',
    website: 'https://cosmicbeats.com',
    twitter: '@cosmicbeats',
    discord: 'cosmicbeats#1234',
    role: 'creator'
  },
  {
    address: '0x2234567890123456789012345678901234567890',
    username: 'stellar_artist',
    email: 'stellar@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
    bio: 'Creating stellar art for the cosmos. NFT artist and digital creator pushing boundaries.',
    website: 'https://stellarart.com',
    twitter: '@stellarart',
    discord: 'stellarart#5678',
    role: 'creator'
  },
  {
    address: '0x3234567890123456789012345678901234567890',
    username: 'nft_collector_pro',
    email: 'collector@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Passionate NFT collector and Web3 enthusiast. Supporting amazing creators across the ecosystem.',
    website: 'https://nftcollector.pro',
    twitter: '@nftcollectorpro',
    discord: 'nftcollector#9012',
    role: 'supporter'
  },
  {
    address: '0x4234567890123456789012345678901234567890',
    username: 'web3_musician',
    email: 'musician@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Creating the future of music in Web3. Decentralized beats for a decentralized world.',
    website: 'https://web3musician.com',
    twitter: '@web3musician',
    discord: 'web3musician#3456',
    role: 'creator'
  }
];

const demoCampaigns = [
  {
    creatorId: 1,
    title: 'Cosmic Symphony NFT Collection',
    description: 'A groundbreaking collection of 1,000 unique cosmic-themed NFTs with embedded music compositions. Each NFT represents a unique celestial body with its own musical signature.',
    category: 'Art',
    fundingGoal: 50000,
    currentFunding: 32500,
    pricePerNFT: 0.08,
    totalSupply: 1000,
    mintedCount: 406,
    duration: 30,
    status: 'active',
    imageUri: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
    contractAddress: '0x5555567890123456789012345678901234567890',
    tags: ['cosmic', 'music', 'art', 'generative'],
    benefits: [
      'Exclusive access to private Discord community',
      'Behind-the-scenes content and creator insights',
      'Early access to future cosmic collections',
      'Potential royalties from music streaming'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/cosmicbeats',
      discord: 'https://discord.gg/cosmicbeats',
      website: 'https://cosmicbeats.com'
    }
  },
  {
    creatorId: 2,
    title: 'Stellar Landscapes Genesis',
    description: 'Hand-crafted digital landscapes from distant galaxies. Each piece is a 1/1 artwork representing unexplored worlds in our universe.',
    category: 'Art',
    fundingGoal: 25000,
    currentFunding: 18750,
    pricePerNFT: 0.12,
    totalSupply: 500,
    mintedCount: 156,
    duration: 45,
    status: 'active',
    imageUri: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop',
    contractAddress: '0x6666667890123456789012345678901234567890',
    tags: ['landscape', 'space', 'digital-art', 'limited-edition'],
    benefits: [
      'High-resolution artwork files',
      'Creator commentary for each piece',
      'Invitation to virtual gallery events',
      'Collector badge and special recognition'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/stellarart',
      discord: 'https://discord.gg/stellarart',
      website: 'https://stellarart.com'
    }
  },
  {
    creatorId: 4,
    title: 'Decentralized Beats Album',
    description: 'The first fully decentralized album release. 12 tracks of cutting-edge electronic music, with each track available as a unique NFT.',
    category: 'Music',
    fundingGoal: 75000,
    currentFunding: 42000,
    pricePerNFT: 0.25,
    totalSupply: 300,
    mintedCount: 168,
    duration: 60,
    status: 'active',
    imageUri: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    contractAddress: '0x7777767890123456789012345678901234567890',
    tags: ['music', 'electronic', 'album', 'innovation'],
    benefits: [
      'Exclusive streaming rights to unreleased tracks',
      'Producer credits on future releases',
      'Access to remix stems and samples',
      'VIP access to live performances'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/web3musician',
      discord: 'https://discord.gg/web3musician',
      website: 'https://web3musician.com'
    }
  },
  {
    creatorId: 1,
    title: 'Interactive Cosmic Journey',
    description: 'An immersive Web3 experience combining AR, VR, and blockchain technology. Holders can explore procedurally generated cosmic environments.',
    category: 'Technology',
    fundingGoal: 100000,
    currentFunding: 67500,
    pricePerNFT: 0.5,
    totalSupply: 200,
    mintedCount: 135,
    duration: 90,
    status: 'active',
    imageUri: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop',
    contractAddress: '0x8888867890123456789012345678901234567890',
    tags: ['vr', 'ar', 'interactive', 'metaverse'],
    benefits: [
      'Beta access to VR application',
      'Custom avatar creation tools',
      'Exclusive in-world assets and items',
      'Governance tokens for platform decisions'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/cosmicbeats',
      discord: 'https://discord.gg/cosmicjourney',
      website: 'https://cosmicjourney.app'
    }
  }
];

const demoReputations = [
  {
    userId: 1,
    level: 'expert',
    score: 850,
    totalCampaigns: 15,
    totalFunding: 125000,
    totalSupporters: 1247,
    successRate: 0.93,
    averageRating: 4.8,
    badges: ['pioneer', 'consistent-creator', 'community-favorite', 'innovation-leader'],
    auraLevel: 'cosmic',
    streakDays: 145
  },
  {
    userId: 2,
    level: 'apprentice',
    score: 420,
    totalCampaigns: 8,
    totalFunding: 67500,
    totalSupporters: 523,
    successRate: 0.87,
    averageRating: 4.6,
    badges: ['consistent-creator', 'rising-star'],
    auraLevel: 'stellar',
    streakDays: 89
  },
  {
    userId: 3,
    level: 'expert',
    score: 680,
    totalCampaigns: 0,
    totalFunding: 0,
    totalSupporters: 0,
    successRate: 0,
    averageRating: 0,
    badges: ['early-supporter', 'collector-pro', 'community-champion'],
    auraLevel: 'luminous',
    streakDays: 67
  },
  {
    userId: 4,
    level: 'apprentice',
    score: 390,
    totalCampaigns: 3,
    totalFunding: 42000,
    totalSupporters: 312,
    successRate: 0.67,
    averageRating: 4.4,
    badges: ['music-pioneer', 'innovative-creator'],
    auraLevel: 'radiant',
    streakDays: 23
  }
];

const demoMints = [
  {
    campaignId: 1,
    supporterId: 3,
    tokenId: 1,
    amount: 1,
    priceETH: 0.08,
    priceUSD: 180.50,
    transactionHash: '0xabc123def456789...',
    blockNumber: 12345678
  },
  {
    campaignId: 1,
    supporterId: 3,
    tokenId: 2,
    amount: 3,
    priceETH: 0.08,
    priceUSD: 180.50,
    transactionHash: '0xdef456abc789123...',
    blockNumber: 12345679
  },
  {
    campaignId: 2,
    supporterId: 3,
    tokenId: 1,
    amount: 1,
    priceETH: 0.12,
    priceUSD: 270.75,
    transactionHash: '0x789abc123def456...',
    blockNumber: 12345680
  },
  {
    campaignId: 3,
    supporterId: 3,
    tokenId: 1,
    amount: 2,
    priceETH: 0.25,
    priceUSD: 562.50,
    transactionHash: '0x456def789abc123...',
    blockNumber: 12345681
  }
];

const demoFrames = [
  {
    campaignId: 1,
    frameUrl: 'https://zorax.app/frames/cosmic-symphony',
    title: 'Cosmic Symphony NFT Collection',
    description: 'Mint your piece of the cosmos',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
    interactions: 1247,
    frameData: {
      buttons: [
        { text: 'Mint Now', action: 'mint' },
        { text: 'Learn More', action: 'link', target: 'https://cosmicbeats.com' }
      ]
    }
  },
  {
    campaignId: 2,
    frameUrl: 'https://zorax.app/frames/stellar-landscapes',
    title: 'Stellar Landscapes Genesis',
    description: 'Own a piece of the universe',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop',
    interactions: 892,
    frameData: {
      buttons: [
        { text: 'View Gallery', action: 'link', target: 'https://stellarart.com/gallery' },
        { text: 'Mint Art', action: 'mint' }
      ]
    }
  },
  {
    campaignId: 3,
    frameUrl: 'https://zorax.app/frames/decentralized-beats',
    title: 'Decentralized Beats Album',
    description: 'The future of music is here',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    interactions: 1586,
    frameData: {
      buttons: [
        { text: 'Listen Preview', action: 'link', target: 'https://web3musician.com/preview' },
        { text: 'Mint Track', action: 'mint' }
      ]
    }
  },
  {
    campaignId: 4,
    frameUrl: 'https://zorax.app/frames/cosmic-journey',
    title: 'Interactive Cosmic Journey',
    description: 'Experience the metaverse',
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop',
    interactions: 743,
    frameData: {
      buttons: [
        { text: 'Try Demo', action: 'link', target: 'https://cosmicjourney.app/demo' },
        { text: 'Get Access', action: 'mint' }
      ]
    }
  }
];

// Seeding function
async function seedData() {
  try {
    console.log('🌱 Starting Firebase data seeding...');
    
    // Seed Users
    console.log('📦 Seeding users...');
    const userIds = [];
    for (const user of demoUsers) {
      const docRef = await addDoc(collection(db, 'users'), {
        ...user,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      userIds.push(docRef.id);
      console.log(`✅ Created user: ${user.username}`);
    }
    
    // Seed Campaigns
    console.log('📦 Seeding campaigns...');
    const campaignIds = [];
    for (let i = 0; i < demoCampaigns.length; i++) {
      const campaign = demoCampaigns[i];
      const docRef = await addDoc(collection(db, 'campaigns'), {
        ...campaign,
        creatorId: userIds[campaign.creatorId - 1], // Map to actual user IDs
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      campaignIds.push(docRef.id);
      console.log(`✅ Created campaign: ${campaign.title}`);
    }
    
    // Seed Reputations
    console.log('📦 Seeding reputations...');
    for (let i = 0; i < demoReputations.length; i++) {
      const reputation = demoReputations[i];
      await addDoc(collection(db, 'reputations'), {
        ...reputation,
        userId: userIds[reputation.userId - 1], // Map to actual user IDs
        badges: JSON.stringify(reputation.badges),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`✅ Created reputation for user ${i + 1}`);
    }
    
    // Seed Mints
    console.log('📦 Seeding mints...');
    for (const mint of demoMints) {
      await addDoc(collection(db, 'mints'), {
        ...mint,
        campaignId: campaignIds[mint.campaignId - 1], // Map to actual campaign IDs
        supporterId: userIds[mint.supporterId - 1], // Map to actual user IDs
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`✅ Created mint for campaign ${mint.campaignId}`);
    }
    
    // Seed Frames
    console.log('📦 Seeding frames...');
    for (let i = 0; i < demoFrames.length; i++) {
      const frame = demoFrames[i];
      await addDoc(collection(db, 'frames'), {
        ...frame,
        campaignId: campaignIds[frame.campaignId - 1], // Map to actual campaign IDs
        frameData: JSON.stringify(frame.frameData),
        createdAt: serverTimestamp()
      });
      console.log(`✅ Created frame for campaign ${i + 1}`);
    }
    
    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - ${demoUsers.length} users created`);
    console.log(`   - ${demoCampaigns.length} campaigns created`);
    console.log(`   - ${demoReputations.length} reputations created`);
    console.log(`   - ${demoMints.length} mints created`);
    console.log(`   - ${demoFrames.length} frames created`);
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

// Run the seeding
seedData();