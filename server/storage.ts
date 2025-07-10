import { User, Campaign, Mint, Reputation, Frame, NewUser, NewCampaign, NewMint, NewReputation, NewFrame } from '../shared/schema';

export interface IStorage {
  // User operations
  createUser(user: NewUser): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getUserByAddress(address: string): Promise<User | null>;
  updateUser(id: number, updates: Partial<NewUser>): Promise<User | null>;
  getAllUsers(): Promise<User[]>;

  // Campaign operations
  createCampaign(campaign: NewCampaign): Promise<Campaign>;
  getCampaignById(id: number): Promise<Campaign | null>;
  getCampaignsByCreator(creatorId: number): Promise<Campaign[]>;
  getAllCampaigns(): Promise<Campaign[]>;
  updateCampaign(id: number, updates: Partial<NewCampaign>): Promise<Campaign | null>;
  deleteCampaign(id: number): Promise<boolean>;

  // Mint operations
  createMint(mint: NewMint): Promise<Mint>;
  getMintsByCampaign(campaignId: number): Promise<Mint[]>;
  getMintsBySupporter(supporterId: number): Promise<Mint[]>;
  getAllMints(): Promise<Mint[]>;

  // Reputation operations
  createReputation(reputation: NewReputation): Promise<Reputation>;
  getReputationByUser(userId: number): Promise<Reputation | null>;
  updateReputation(userId: number, updates: Partial<NewReputation>): Promise<Reputation | null>;
  getAllReputations(): Promise<Reputation[]>;

  // Frame operations
  createFrame(frame: NewFrame): Promise<Frame>;
  getFrameByCampaign(campaignId: number): Promise<Frame | null>;
  getAllFrames(): Promise<Frame[]>;
  updateFrameInteractions(campaignId: number): Promise<Frame | null>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: User[] = [];
  private campaigns: Campaign[] = [];
  private mints: Mint[] = [];
  private reputations: Reputation[] = [];
  private frames: Frame[] = [];
  private nextId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create some seed users
    const seedUsers: User[] = [
      {
        id: 1,
        address: '0x1234567890123456789012345678901234567890',
        username: 'cosmic_creator',
        email: 'creator@example.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        bio: 'Digital artist creating cosmic symphonies',
        website: 'https://cosmicbeats.com',
        twitter: '@cosmicbeats',
        discord: 'cosmicbeats#1234',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 2,
        address: '0x2234567890123456789012345678901234567890',
        username: 'stellar_artist',
        email: 'stellar@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        bio: 'Creating stellar art for the cosmos',
        website: 'https://stellarart.com',
        twitter: '@stellarart',
        discord: 'stellarart#5678',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
      }
    ];

    // Create some seed campaigns
    const seedCampaigns: Campaign[] = [
      {
        id: 1,
        creatorId: 1,
        title: 'Stellar Symphonies Collection',
        description: 'A groundbreaking collection of cosmic compositions that blend ethereal melodies with space-age production techniques.',
        imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        targetAmount: 10.0,
        currentAmount: 6.75,
        minContribution: 0.08,
        maxSupply: 2000,
        currentSupply: 1234,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-01'),
        category: 'Music',
        tags: '["electronic", "ambient", "cosmic"]',
        contractAddress: '0x3234567890123456789012345678901234567890',
        isActive: true,
        isFeatured: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: 2,
        creatorId: 2,
        title: 'Nebula Dreams Art Series',
        description: 'Explore the beauty of distant galaxies through this stunning digital art collection.',
        imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        targetAmount: 5.0,
        currentAmount: 3.2,
        minContribution: 0.05,
        maxSupply: 1000,
        currentSupply: 640,
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-02-28'),
        category: 'Art',
        tags: '["digital", "space", "abstract"]',
        contractAddress: '0x4234567890123456789012345678901234567890',
        isActive: true,
        isFeatured: false,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-20'),
      }
    ];

    // Create seed reputations
    const seedReputations: Reputation[] = [
      {
        id: 1,
        userId: 1,
        score: 8.5,
        totalCampaigns: 3,
        totalMints: 1234,
        totalRevenue: 15.75,
        successRate: 87.5,
        badges: '["Pioneer", "Crowd Favorite", "Top Creator"]',
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: 2,
        userId: 2,
        score: 7.2,
        totalCampaigns: 2,
        totalMints: 640,
        totalRevenue: 8.4,
        successRate: 75.0,
        badges: '["Rising Star", "Art Master"]',
        updatedAt: new Date('2024-01-20'),
      }
    ];

    this.users = seedUsers;
    this.campaigns = seedCampaigns;
    this.reputations = seedReputations;
    this.nextId = Math.max(...seedUsers.map(u => u.id), ...seedCampaigns.map(c => c.id)) + 1;
  }

  // User operations
  async createUser(user: NewUser): Promise<User> {
    const newUser: User = {
      ...user,
      id: this.nextId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async getUserByAddress(address: string): Promise<User | null> {
    return this.users.find(u => u.address.toLowerCase() === address.toLowerCase()) || null;
  }

  async updateUser(id: number, updates: Partial<NewUser>): Promise<User | null> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    this.users[index] = {
      ...this.users[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.users[index];
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users];
  }

  // Campaign operations
  async createCampaign(campaign: NewCampaign): Promise<Campaign> {
    const newCampaign: Campaign = {
      ...campaign,
      id: this.nextId++,
      currentAmount: 0,
      currentSupply: 0,
      tags: Array.isArray(campaign.tags) ? JSON.stringify(campaign.tags) : campaign.tags || '[]',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.campaigns.push(newCampaign);
    return newCampaign;
  }

  async getCampaignById(id: number): Promise<Campaign | null> {
    return this.campaigns.find(c => c.id === id) || null;
  }

  async getCampaignsByCreator(creatorId: number): Promise<Campaign[]> {
    return this.campaigns.filter(c => c.creatorId === creatorId);
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return [...this.campaigns];
  }

  async updateCampaign(id: number, updates: Partial<NewCampaign>): Promise<Campaign | null> {
    const index = this.campaigns.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    this.campaigns[index] = {
      ...this.campaigns[index],
      ...updates,
      tags: Array.isArray(updates.tags) ? JSON.stringify(updates.tags) : updates.tags || this.campaigns[index].tags,
      updatedAt: new Date(),
    };
    return this.campaigns[index];
  }

  async deleteCampaign(id: number): Promise<boolean> {
    const index = this.campaigns.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.campaigns.splice(index, 1);
    return true;
  }

  // Mint operations
  async createMint(mint: NewMint): Promise<Mint> {
    const newMint: Mint = {
      ...mint,
      id: this.nextId++,
      createdAt: new Date(),
    };
    this.mints.push(newMint);
    
    // Update campaign current amount and supply
    const campaign = await this.getCampaignById(mint.campaignId);
    if (campaign) {
      await this.updateCampaign(campaign.id, {
        currentAmount: campaign.currentAmount + mint.amount,
        currentSupply: campaign.currentSupply + 1,
      });
    }
    
    return newMint;
  }

  async getMintsByCampaign(campaignId: number): Promise<Mint[]> {
    return this.mints.filter(m => m.campaignId === campaignId);
  }

  async getMintsBySupporter(supporterId: number): Promise<Mint[]> {
    return this.mints.filter(m => m.supporterId === supporterId);
  }

  async getAllMints(): Promise<Mint[]> {
    return [...this.mints];
  }

  // Reputation operations
  async createReputation(reputation: NewReputation): Promise<Reputation> {
    const newReputation: Reputation = {
      ...reputation,
      id: this.nextId++,
      badges: Array.isArray(reputation.badges) ? JSON.stringify(reputation.badges) : reputation.badges || '[]',
      updatedAt: new Date(),
    };
    this.reputations.push(newReputation);
    return newReputation;
  }

  async getReputationByUser(userId: number): Promise<Reputation | null> {
    return this.reputations.find(r => r.userId === userId) || null;
  }

  async updateReputation(userId: number, updates: Partial<NewReputation>): Promise<Reputation | null> {
    const index = this.reputations.findIndex(r => r.userId === userId);
    if (index === -1) return null;
    
    this.reputations[index] = {
      ...this.reputations[index],
      ...updates,
      badges: Array.isArray(updates.badges) ? JSON.stringify(updates.badges) : updates.badges || this.reputations[index].badges,
      updatedAt: new Date(),
    };
    return this.reputations[index];
  }

  async getAllReputations(): Promise<Reputation[]> {
    return [...this.reputations];
  }

  // Frame operations
  async createFrame(frame: NewFrame): Promise<Frame> {
    const newFrame: Frame = {
      ...frame,
      id: this.nextId++,
      frameData: typeof frame.frameData === 'object' ? JSON.stringify(frame.frameData) : frame.frameData,
      interactionCount: 0,
      createdAt: new Date(),
    };
    this.frames.push(newFrame);
    return newFrame;
  }

  async getFrameByCampaign(campaignId: number): Promise<Frame | null> {
    return this.frames.find(f => f.campaignId === campaignId) || null;
  }

  async getAllFrames(): Promise<Frame[]> {
    return [...this.frames];
  }

  async updateFrameInteractions(campaignId: number): Promise<Frame | null> {
    const index = this.frames.findIndex(f => f.campaignId === campaignId);
    if (index === -1) return null;
    
    this.frames[index] = {
      ...this.frames[index],
      interactionCount: this.frames[index].interactionCount + 1,
    };
    return this.frames[index];
  }
}

export const storage = new MemStorage();