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
export const createPatient = async (patientData) => {
  const response = await fetch(`${API_BASE}/api/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData),
  });
  if (!response.ok) throw new Error('Failed to create patient');
  return response.json();
};

// Doctor APIs
export const fetchDoctors = async () => {
  const response = await fetch(`${API_BASE}/api/doctors`);
  if (!response.ok) throw new Error('Failed to fetch doctors');
  return response.json();
};

export const createDoctor = async (doctorData) => {
  const response = await fetch(`${API_BASE}/api/doctors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doctorData),
  });
  if (!response.ok) throw new Error('Failed to create doctor');
  return response.json();
};
