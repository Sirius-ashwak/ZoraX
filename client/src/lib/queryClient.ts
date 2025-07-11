/// <reference types="vite/client" />
import { QueryClient, QueryFunction } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Default fetcher for react-query
export const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const url = `${API_BASE_URL}${queryKey[0]}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Request failed');
  }
  
  return data.data;
};

// API request helper for mutations
export const apiRequest = async (
  method: 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: any
) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Set default query function
queryClient.setQueryDefaults(['api'], {
  queryFn: defaultQueryFn,
});