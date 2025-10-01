// lib/api.ts
import axios from 'axios';

// The live URL of your deployed backend
const API_BASE_URL = 'https://lifeline-api-b3zn.render.com';

// Create a reusable Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios interceptor to automatically add the JWT token to every request.
 * This is the magic that keeps users authenticated.
 */
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// --- AUTHENTICATION ---
export const register = (userData: any) => apiClient.post('/users/', userData);

interface LoginResponse {
  access_token: string;
  [key: string]: any;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  const response = await apiClient.post<LoginResponse>('/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (response.data.access_token) {
    localStorage.setItem('accessToken', response.data.access_token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
};

// --- HOSPITALS ---
export const getAllHospitals = () => apiClient.get('/hospitals/');
export const createHospital = (hospitalData: { name: string, location: string }) => apiClient.post('/hospitals/', hospitalData);

// --- INVENTORY ---
export const getInventoryForHospital = (hospitalId: number) => apiClient.get(`/inventory/${hospitalId}`);
export const addBloodUnit = (unitData: { blood_type: string, hospital_id: number }) => apiClient.post('/inventory/', unitData);

// --- ALERTS ---
export const getExpiringUnits = (hospitalId: number, days: number = 7) => apiClient.get(`/alerts/expiry/${hospitalId}?days_until_expiry=${days}`);
export const getShortagePrediction = (hospitalId: number) => apiClient.get(`/predict/shortage/${hospitalId}`);

// --- COMPLIANCE ---
export const getComplianceOverview = () => apiClient.get('/compliance/overview');

// --- TESTING HELPERS ---
export const addExpiringBloodUnit = (unitData: { blood_type: string, hospital_id: number }) => apiClient.post('/inventory/add_expiring_unit', unitData);