// Services/clientContent.ts
import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7210/api';

export interface ClientContentData {
  id?: string;
  shortName: string;
  detailName: string;
  clientProjectNumber: string;
}

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Sending request to: ${config.url}`, config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // You can add global error handling logic here
    return Promise.reject(error);
  }
);

export const fetchClientContents = async (): Promise<ClientContentData[]> => {
  try {
    const response = await apiClient.get<ClientContentData[]>('/ClientContent');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // More specific error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
        throw new Error(`Failed to fetch client contents: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        throw new Error('Error setting up request. Please try again.');
      }
    }
    
    // Fallback error handling
    throw new Error('An unexpected error occurred');
  }
};

export const createClientContent = async (data: ClientContentData): Promise<ClientContentData> => {
  try {
    // Validate input before sending
    if (!data.shortName || !data.detailName) {
      throw new Error('Short name and detail name are required');
    }

    const response = await apiClient.post<ClientContentData>('/ClientContent', {
      shortName: data.shortName.trim(),
      detailName: data.detailName.trim(),
      clientProjectNumber: data.clientProjectNumber || '0'
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        
        // More detailed error message from server
        const serverErrorMessage = error.response.data?.message || 
          `Failed to create client content: ${error.response.status}`;
        
        throw new Error(serverErrorMessage);
      } else if (error.request) {
        throw new Error('No response from server. Please check your network connection.');
      }
    }
    
    // If it's a validation error or other known error
    throw error;
  }
};

// Optional: Add a method to get a specific client content
export const getClientContentById = async (id: string): Promise<ClientContentData> => {
  try {
    const response = await apiClient.get<ClientContentData>(`/ClientContent/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Failed to fetch client content: ${error.response.status}`);
      }
    }
    throw error;
  }
};