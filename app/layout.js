import './globals.css';

export const metadata = {
  title: 'NexusIntel — AI-Powered Market Impact Intelligence',
  description: 'Real-time AI-powered platform that continuously analyzes worldwide news and determines market impact on stocks, sectors, and industries with explainable reasoning.',
  keywords: 'market intelligence, AI, stock impact, real-time news, NLP, financial analysis',
  authors: [{ name: 'NexusIntel' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e1a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --font-inter: 'Inter', sans-serif;
            --font-outfit: 'Outfit', sans-serif;
            --font-jetbrains: 'JetBrains Mono', monospace;
          }
        `}} />
      </head>
      <body style={{ fontFamily: 'var(--font-inter, var(--font-primary))' }}>
        {/* Animated mesh background */}
        <div className="mesh-bg" aria-hidden="true" />
        <div className="mesh-blob-3" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
