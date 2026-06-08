import { generateId, randomChoice, randomBetween } from '../utils.js';
import { eventTemplates } from '../data/eventTemplates.js';
import { stocks } from '../data/stocks.js';
import { generateReasoning, generateStockReasoning } from './aiReasoning.js';
import { calculateSectorImpact, getImpactLabel } from './impactEngine.js';

export const generateEvent = () => {
  const template = randomChoice(eventTemplates);
  
  const headline = randomChoice(template.headlines);
  const summary = randomChoice(template.summaries);
  const source = randomChoice(template.sourceTypes);
  
  const timestamp = Date.now();
  const expiresAt = timestamp + randomBetween(15, 60) * 60000; // 15-60 mins
  
  const affectedSectors = calculateSectorImpact(template);
  
  // Find stocks that match the template's affected tickers OR match the affected sectors
  let eventStocks = stocks.filter(s => 
    template.affectedTickers.includes(s.ticker) || 
    affectedSectors.some(sec => sec.name === s.sector)
  );
  
  // Shuffle and pick up to 5
  eventStocks = eventStocks.sort(() => Math.random() - 0.5).slice(0, randomBetween(3, 6));
  
  const affectedStocks = eventStocks.map(stock => {
    const sectorData = affectedSectors.find(sec => sec.name === stock.sector);
    const impact = sectorData ? sectorData.impact : 'mixed';
    const score = sectorData ? Math.max(0, Math.min(100, sectorData.score + randomBetween(-10, 10))) : randomBetween(40, 60);
    
    return {
      ticker: stock.ticker,
      name: stock.name,
      impact,
      score,
      reasoning: generateStockReasoning(template, stock, impact)
    };
  });
  
  const sentimentScore = template.affectedSectors.reduce((acc, sec) => {
    if (sec.impact === 'positive') return acc + 0.5;
    if (sec.impact === 'negative') return acc - 0.5;
    return acc;
  }, 0);
  
  const baseImpactScore = randomBetween(60, 95);
  
  return {
    id: generateId(),
    headline,
    summary,
    source,
    category: template.category,
    severity: template.severity,
    timestamp,
    expiresAt,
    sentiment: {
      score: sentimentScore,
      label: sentimentScore > 0 ? 'Positive' : sentimentScore < 0 ? 'Negative' : 'Neutral'
    },
    affectedSectors,
    affectedStocks,
    aiReasoning: generateReasoning(template, affectedStocks, affectedSectors),
    credibilityScore: randomBetween(75, 99),
    freshnessScore: 100,
    isBreaking: Math.random() > 0.7,
    impactScore: baseImpactScore,
  };
};

export const generateEventFromRealNews = (article) => {
  const text = (article.title + ' ' + article.contentSnippet).toLowerCase();
  
  // Try to find the best matching template category based on keywords
  let bestTemplate = eventTemplates[0];
  let maxMatches = 0;
  
  eventTemplates.forEach(template => {
    let matches = 0;
    template.affectedSectors.forEach(sec => {
      if (text.includes(sec.name.toLowerCase())) matches++;
    });
    if (matches > maxMatches) {
      maxMatches = matches;
      bestTemplate = template;
    }
  });

  // Calculate sector impact based on the matched template
  const affectedSectors = calculateSectorImpact(bestTemplate);
  
  // Find stocks explicitly mentioned in the article
  let eventStocks = stocks.filter(s => 
    text.includes(s.ticker.toLowerCase()) || 
    text.includes(s.name.toLowerCase().split(' ')[0])
  );
  
  // If no specific stocks mentioned, pick from the affected sectors
  if (eventStocks.length === 0) {
    eventStocks = stocks.filter(s => affectedSectors.some(sec => sec.name === s.sector))
                        .sort(() => Math.random() - 0.5).slice(0, randomBetween(2, 4));
  }
  
  const affectedStocks = eventStocks.map(stock => {
    const sectorData = affectedSectors.find(sec => sec.name === stock.sector);
    
    // Determine sentiment from text very loosely (this is a simple heuristic)
    const positiveWords = ['surge', 'jump', 'gain', 'up', 'record', 'growth', 'beat'];
    const negativeWords = ['fall', 'drop', 'decline', 'down', 'miss', 'loss', 'cut'];
    
    let impact = sectorData ? sectorData.impact : 'mixed';
    let textScore = 0;
    positiveWords.forEach(w => { if(text.includes(w)) textScore++; });
    negativeWords.forEach(w => { if(text.includes(w)) textScore--; });
    
    if (textScore > 0) impact = 'positive';
    else if (textScore < 0) impact = 'negative';

    const score = sectorData ? Math.max(0, Math.min(100, sectorData.score + randomBetween(-10, 10))) : randomBetween(40, 60);
    
    // Custom reasoning based on real article
    const reasoning = `${stock.name} (${stock.ticker}) is directly exposed to this news. ${textScore > 0 ? 'Market reaction is highly positive.' : textScore < 0 ? 'Investors are reacting negatively.' : 'Market is assessing the mixed impact.'}`;
    
    return {
      ticker: stock.ticker,
      name: stock.name,
      impact,
      score,
      reasoning
    };
  });

  let overallSentiment = 0;
  affectedStocks.forEach(s => {
    if (s.impact === 'positive') overallSentiment += 0.5;
    if (s.impact === 'negative') overallSentiment -= 0.5;
  });

  const baseImpactScore = randomBetween(65, 98);

  return {
    id: article.guid || generateId(),
    headline: article.title,
    summary: article.contentSnippet,
    source: 'Yahoo Finance Live',
    category: bestTemplate.category,
    severity: overallSentiment < -1 ? 'critical' : 'moderate',
    timestamp: article.pubDate ? new Date(article.pubDate).getTime() : Date.now(),
    expiresAt: Date.now() + (24 * 60 * 60 * 1000), // Real news expires in 24 hours
    sentiment: {
      score: overallSentiment,
      label: overallSentiment > 0 ? 'Positive' : overallSentiment < 0 ? 'Negative' : 'Neutral'
    },
    affectedSectors,
    affectedStocks,
    aiReasoning: `Our engine analyzed the live article: "${article.title}". Based on the linguistic patterns and mentioned entities, we've identified significant exposure in the ${affectedSectors.map(s=>s.name).join(' and ')} sectors.`,
    credibilityScore: 99,
    freshnessScore: 100,
    isBreaking: true,
    impactScore: baseImpactScore,
    impactLabel: getImpactLabel(baseImpactScore)
  };
};
