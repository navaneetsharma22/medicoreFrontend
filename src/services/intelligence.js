/**
 * mediBuddy Clinical Intelligence Service
 * Handles AI-driven summaries and smart prioritization.
 */

/**
 * Generates a dynamic AI briefing based on dashboard data.
 * In a production environment, this would call an LLM (Gemini/OpenAI).
 */
export const generateDailyBriefing = (data) => {
  if (!data) return "Initializing clinical intelligence...";

  const appointments = data.schedule?.length || 0;
  const onlineCount = data.schedule?.filter(s => s.isOnline).length || 0;
  const alerts = data.activity?.filter(a => a.type === 'alert').length || 0;
  
  const greetings = ["Good morning", "Welcome back", "Hello"];
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  return `${greeting}, Dr. Sarah. You have ${appointments} appointments today (${onlineCount} virtual). There are ${alerts} critical lab results requiring your immediate attention in the Command Center.`;
};

/**
 * Smart Triage logic to prioritize activities or patients.
 * Assigns a 'priorityScore' (0-100) based on clinical indicators.
 */
export const prioritizeActivity = (activities) => {
  if (!activities) return [];

  return activities.map(item => {
    let score = 0;
    
    // Type-based scoring
    if (item.type === 'alert') score += 50;
    if (item.type === 'document') score += 20;
    if (item.type === 'success') score += 10;

    // Keyword-based scoring
    const title = item.title.toLowerCase();
    if (title.includes('lab result') || title.includes('critical')) score += 30;
    if (title.includes('emergency') || title.includes('urgent')) score += 40;
    if (title.includes('prescription')) score += 15;

    return { ...item, priorityScore: score };
  }).sort((a, b) => b.priorityScore - a.priorityScore);
};

/**
 * Analyzes patient vitals and returns a status recommendation.
 */
export const analyzeVitals = (vitals) => {
  // Mock logic for future integration
  const bp = vitals?.bloodPressure?.split('/') || [120, 80];
  const systolic = parseInt(bp[0]);
  
  if (systolic > 140) return { status: 'Critical', color: 'text-rose-500', note: 'Hypertensive Crisis' };
  if (systolic > 130) return { status: 'Warning', color: 'text-amber-500', note: 'Elevated BP' };
  return { status: 'Stable', color: 'text-mediBuddy-primary', note: 'Normal Vitals' };
};
