export interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  duration: number;
  creatorAddress: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface Creator {
  address: string;
  name: string;
  bio?: string | undefined;
  avatar?: string | undefined;
  socialLinks?: {
    twitter?: string | undefined;
    instagram?: string | undefined;
    website?: string | undefined;
  };
  id: string;
  campaignCount: number;
  totalRaised: number;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
