import { QueryClient } from '@tanstack/react-query';

// API Base URL
const API_BASE = '/api';

// Default fetch function for React Query
const defaultQueryFn = async ({ queryKey }: { queryKey: readonly unknown[] }) => {
  const url = queryKey[0] as string;
  const response = await fetch(`${API_BASE}${url}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Create a query client with default configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Helper function for API requests (POST, PATCH, DELETE)
export const apiRequest = async (
  url: string,
  options: {
    method?: 'POST' | 'PATCH' | 'DELETE' | 'PUT';
    body?: any;
    headers?: Record<string, string>;
  } = {}
) => {
  const { method = 'POST', body, headers = {} } = options;
  
  const response = await fetch(`${API_BASE}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};