import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { text, integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';

// Database Tables
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  address: text('address').notNull().unique(),
  username: text('username'),
  email: text('email'),
  avatar: text('avatar'),
  bio: text('bio'),
  website: text('website'),
  twitter: text('twitter'),
  discord: text('discord'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const campaigns = sqliteTable('campaigns', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  creatorId: integer('creator_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
  targetAmount: real('target_amount').notNull(),
  currentAmount: real('current_amount').default(0),
  minContribution: real('min_contribution').default(0.01),
  maxSupply: integer('max_supply'),
  currentSupply: integer('current_supply').default(0),
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }).notNull(),
  category: text('category').notNull(),
  tags: text('tags'), // JSON string
  contractAddress: text('contract_address'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const mints = sqliteTable('mints', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  campaignId: integer('campaign_id').notNull().references(() => campaigns.id),
  supporterId: integer('supporter_id').notNull().references(() => users.id),
  amount: real('amount').notNull(),
  tokenId: integer('token_id'),
  transactionHash: text('transaction_hash'),
  blockNumber: integer('block_number'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const reputation = sqliteTable('reputation', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  score: real('score').default(0),
  totalCampaigns: integer('total_campaigns').default(0),
  totalMints: integer('total_mints').default(0),
  totalRevenue: real('total_revenue').default(0),
  successRate: real('success_rate').default(0),
  badges: text('badges'), // JSON string
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const frames = sqliteTable('frames', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  campaignId: integer('campaign_id').notNull().references(() => campaigns.id),
  frameData: text('frame_data').notNull(), // JSON string
  interactionCount: integer('interaction_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Zod Schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  currentAmount: true,
  currentSupply: true,
}).extend({
  tags: z.array(z.string()).optional(),
});

export const insertMintSchema = createInsertSchema(mints).omit({
  id: true,
  createdAt: true,
});

export const insertReputationSchema = createInsertSchema(reputation).omit({
  id: true,
  updatedAt: true,
}).extend({
  badges: z.array(z.string()).optional(),
});

export const insertFrameSchema = createInsertSchema(frames).omit({
  id: true,
  createdAt: true,
  interactionCount: true,
}).extend({
  frameData: z.object({
    image: z.string(),
    buttons: z.array(z.object({
      label: z.string(),
      action: z.string(),
      target: z.string().optional(),
    })),
    input: z.string().optional(),
    postUrl: z.string(),
  }),
});

// TypeScript Types
export type User = typeof users.$inferSelect;
export type NewUser = z.infer<typeof insertUserSchema>;

export type Campaign = typeof campaigns.$inferSelect;
export type NewCampaign = z.infer<typeof insertCampaignSchema>;

export type Mint = typeof mints.$inferSelect;
export type NewMint = z.infer<typeof insertMintSchema>;

export type Reputation = typeof reputation.$inferSelect;
export type NewReputation = z.infer<typeof insertReputationSchema>;

export type Frame = typeof frames.$inferSelect;
export type NewFrame = z.infer<typeof insertFrameSchema>;

// API Response Types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}>;

// Campaign Status
export enum CampaignStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// User Roles
export enum UserRole {
  CREATOR = 'creator',
  SUPPORTER = 'supporter',
  ADMIN = 'admin',
}

// Reputation Levels
export enum ReputationLevel {
  NOVICE = 'novice',
  APPRENTICE = 'apprentice',
  EXPERT = 'expert',
  MASTER = 'master',
  LEGEND = 'legend',
}