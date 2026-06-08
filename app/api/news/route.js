import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

// Initialize the parser
const parser = new Parser({
  customFields: {
    item: ['pubDate', 'guid'],
  }
});

export const revalidate = 0; // Disable cache so we always get fresh news

export async function GET() {
  try {
    // We fetch general market news from Yahoo Finance
    const feed = await parser.parseURL('https://finance.yahoo.com/news/rss');
    
    // We also can fetch specific ticker news if we wanted to
    // const feed = await parser.parseURL('https://feeds.finance.yahoo.com/rss/2.0/headline?s=AAPL,MSFT,TSLA,NVDA,AMZN,META,GOOGL,AMD,INTC,JPM,BAC');
    
    const articles = feed.items.slice(0, 15).map(item => ({
      guid: item.guid || item.link,
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet || item.content || item.title
    }));

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
