export const generateReasoning = (event, affectedStocks, affectedSectors) => {
  if (event.reasoningTemplate) {
    const positiveSector = affectedSectors.find(s => s.impact === 'positive')?.name || 'Technology';
    const negativeSector = affectedSectors.find(s => s.impact === 'negative')?.name || 'Utilities';
    const mixedSector = affectedSectors.find(s => s.impact === 'mixed')?.name || 'Finance';
    
    return event.reasoningTemplate
      .replace(/{positiveSector}/g, positiveSector)
      .replace(/{negativeSector}/g, negativeSector)
      .replace(/{mixedSector}/g, mixedSector)
      .replace(/{category}/g, event.category);
  }
  
  return `AI analysis suggests that recent developments in the ${event.category} space will have a pronounced effect on related markets. Supply chain dependencies and sector correlations indicate a high probability of margin impact for the involved entities.`;
};

export const generateStockReasoning = (event, stock, impact) => {
  if (impact === 'positive') return `Beneficiary of ${event.category} trends.`;
  if (impact === 'negative') return `Exposed to ${event.category} risks.`;
  return `Mixed exposure to current events.`;
};

export const generateMarketMood = (events) => {
  if (!events || events.length === 0) return { score: 50, label: 'NEUTRAL', description: 'Market conditions are balanced.' };
  
  const recentEvents = events.slice(0, 10);
  let totalScore = 50;
  
  recentEvents.forEach(e => {
    if (e.severity === 'critical' && e.sentiment?.score < 0) totalScore -= 10;
    else if (e.severity === 'critical' && e.sentiment?.score > 0) totalScore += 10;
    else if (e.sentiment?.score < 0) totalScore -= 5;
    else if (e.sentiment?.score > 0) totalScore += 5;
  });
  
  totalScore = Math.min(Math.max(totalScore, 0), 100);
  
  let label = 'NEUTRAL';
  if (totalScore <= 25) label = 'FEAR';
  else if (totalScore <= 45) label = 'CAUTIOUS';
  else if (totalScore <= 55) label = 'NEUTRAL';
  else if (totalScore <= 75) label = 'OPTIMISTIC';
  else label = 'EUPHORIA';
  
  return { score: totalScore, label, description: `Market sentiment is currently driven by ${recentEvents[0]?.category || 'recent'} events.` };
};
