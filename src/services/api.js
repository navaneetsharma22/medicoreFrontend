/**
 * API Service — fetches all data from the backend.
 * No hardcoded data. Everything comes from /api endpoints.
 */

const API_BASE = '';  // Uses Vite proxy in dev, relative path in prod

export const fetchDashboardData = async () => {
  const response = await fetch(`${API_BASE}/api/dashboard`);
  if (!response.ok) throw new Error('Failed to fetch dashboard data');
  return response.json();
};

export const fetchPatients = async ({ search, kycStatus, date } = {}) => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (kycStatus && kycStatus !== 'All') params.set('kycStatus', kycStatus);
  if (date) params.set('date', date);

  const query = params.toString();
  const response = await fetch(`${API_BASE}/api/patients${query ? `?${query}` : ''}`);
  if (!response.ok) throw new Error('Failed to fetch patients');
  return response.json();
};

export const fetchPatientById = async (id) => {
  const response = await fetch(`${API_BASE}/api/patients/${id}`);
  if (!response.ok) throw new Error('Failed to fetch patient');
  return response.json();
};
