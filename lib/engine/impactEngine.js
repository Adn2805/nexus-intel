import { clamp } from '../utils.js';

export const calculateImpactScore = (event, stock) => {
  const baseScore = randomBetween(40, 95);
  const confidence = randomBetween(60, 99);
  const urgency = randomBetween(30, 95);
  
  // Determine direction based on event severity and sector
  let direction = 'mixed';
  if (baseScore > 70) direction = 'positive';
  else if (baseScore < 40) direction = 'negative';
  
  return { score: baseScore, confidence, urgency, direction };
};

export const calculateSectorImpact = (event) => {
  return event.affectedSectors.map(sector => ({
    name: sector.name,
    impact: sector.impact,
    score: sector.score || randomBetween(50, 90)
  }));
};

export const getImpactColor = (score, direction) => {
  if (direction === 'positive') return `rgba(0, 227, 158, ${score / 100})`;
  if (direction === 'negative') return `rgba(255, 71, 87, ${score / 100})`;
  return `rgba(255, 165, 2, ${score / 100})`;
};

export const getImpactLabel = (score) => {
  if (score >= 90) return 'Critical';
  if (score >= 70) return 'High';
  if (score >= 50) return 'Medium';
  if (score >= 30) return 'Low';
  return 'Minimal';
};

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
