export const eventTemplates = [
  {
    id: 'oil_crisis',
    category: 'Geopolitical',
    headlines: [
      'Middle East Tensions Escalate as Oil Supply Routes Face Disruption',
      'OPEC+ Announces Unexpected Oil Production Cuts',
      'Major Oil Refinery Operations Halted After Cyberattack'
    ],
    summaries: [
      'AI analysis indicates significant supply chain bottlenecks in global energy markets following recent disruptions. Energy prices are expected to experience elevated volatility in the near term.',
      'A sudden shift in crude oil supply dynamics is creating ripple effects across energy-intensive sectors. Analysts warn of sustained pricing pressure if constraints remain unresolved.'
    ],
    affectedSectors: [
      { name: 'Energy', impact: 'positive', score: 85 },
      { name: 'Automotive', impact: 'negative', score: 60 },
      { name: 'Utilities', impact: 'negative', score: 45 }
    ],
    affectedTickers: ['XOM', 'RELIANCE', 'TSLA'],
    sourceTypes: ['Reuters', 'Bloomberg', 'Financial Times'],
    severity: 'high',
    reasoningTemplate: 'The disruption in {category} supply chains leads to increased commodity prices. This directly benefits {positiveSector} margins while compressing operational margins for {negativeSector} companies.'
  },
  {
    id: 'ai_breakthrough',
    category: 'Technology',
    headlines: [
      'Major AI Lab Announces Next-Generation Reasoning Model',
      'Enterprise Adoption of Generative AI Surpasses Analyst Estimates',
      'New AI Hardware Accelerators Show 10x Performance Gains'
    ],
    summaries: [
      'Breakthroughs in artificial intelligence capabilities are triggering a reassessment of enterprise productivity tools. Infrastructure providers see massive demand surges.',
      'The latest AI advancements are accelerating the transition to intelligent cloud infrastructure. Related semiconductor demand is expected to outpace current supply forecasts.'
    ],
    affectedSectors: [
      { name: 'Technology', impact: 'positive', score: 90 },
      { name: 'Semiconductor', impact: 'positive', score: 95 },
      { name: 'AI & Cloud', impact: 'positive', score: 92 }
    ],
    affectedTickers: ['NVDA', 'MSFT', 'GOOGL', 'META'],
    sourceTypes: ['TechCrunch', 'The Wall Street Journal', 'CNBC'],
    severity: 'high',
    reasoningTemplate: 'Advancements in AI capabilities drive direct infrastructure spending. This creates a strong tailwind for {positiveSector} providers and specialized hardware manufacturers in the {positiveSector} space.'
  },
  {
    id: 'interest_rates',
    category: 'Economic',
    headlines: [
      'Central Bank Signals Aggressive Rate Cuts Ahead',
      'Inflation Data Cools Faster Than Expected',
      'Fed Chair Hints at Policy Pivot in Recent Remarks'
    ],
    summaries: [
      'Lower borrowing costs are expected to stimulate capital-intensive sectors. Growth stocks and real estate markets are reacting favorably to the changing macroeconomic environment.',
      'The shift in monetary policy provides relief to highly leveraged companies and boosts the present value of future earnings for growth-oriented sectors.'
    ],
    affectedSectors: [
      { name: 'Finance', impact: 'mixed', score: 55 },
      { name: 'Real Estate', impact: 'positive', score: 75 },
      { name: 'Technology', impact: 'positive', score: 65 }
    ],
    affectedTickers: ['JPM', 'SPY', 'QQQ', 'AAPL'],
    sourceTypes: ['Bloomberg', 'Federal Reserve Press', 'Reuters'],
    severity: 'critical',
    reasoningTemplate: 'A lower interest rate environment reduces borrowing costs, directly benefiting {positiveSector} and capital-intensive industries, while compressing net interest margins for traditional {mixedSector}.'
  }
];
