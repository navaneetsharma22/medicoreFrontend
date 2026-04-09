/**
 * Simulated Mock API Service for Medical Dashboard Data
 */

const mockData = {
  stats: {
    totalPatients: { value: '1,452', trend: 'up', trendValue: '4%' },
    appointmentsToday: { value: '92', trend: 'up', trendValue: '12%' },
    avgTreatmentTime: { value: '38m', trend: 'down', trendValue: '5%' }
  },
  charts: {
    revenue: [
      { name: 'Mon', revenue: 4200 },
      { name: 'Tue', revenue: 3100 },
      { name: 'Wed', revenue: 5600 },
      { name: 'Thu', revenue: 2980 },
      { name: 'Fri', revenue: 7190 },
      { name: 'Sat', revenue: 8690 },
      { name: 'Sun', revenue: 11200 },
    ],
    departments: [
      { name: 'Cardiology', patients: 140 },
      { name: 'Neurology', patients: 95 },
      { name: 'Pediatrics', patients: 170 },
      { name: 'Oncology', patients: 70 },
      { name: 'Orthopedics', patients: 105 },
    ]
  },
  schedule: [
    { id: 1, type: 'Consultation', patient: 'Emma Watson', time: '10:00 AM', isOnline: true },
    { id: 2, type: 'Follow up', patient: 'James Smith', time: '11:30 AM', isOnline: false },
    { id: 3, type: 'Checkup', patient: 'Olivia Davis', time: '02:00 PM', isOnline: false },
    { id: 4, type: 'Therapy', patient: 'William Chen', time: '03:45 PM', isOnline: true },
  ],
  activity: [
    { id: 1, title: 'Lab results ready', target: 'O. Davis', time: '10 min ago', type: 'alert' },
    { id: 2, title: 'Prescription renewed', target: 'E. Watson', time: '1 hr ago', type: 'success' },
    { id: 3, title: 'New medical record added', target: 'J. Smith', time: '2 hrs ago', type: 'document' },
    { id: 4, title: 'Payment received', target: 'W. Chen', time: '4 hrs ago', type: 'success' },
  ]
};

export const fetchDashboardData = () => {
  return new Promise((resolve) => {
    // Simulate network delay of 800ms
    setTimeout(() => {
      resolve(mockData);
    }, 800);
  });
};
