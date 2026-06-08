#  NexusIntel — AI-Powered Market Impact Intelligence Platform

> Real-time AI-powered platform that continuously analyzes worldwide news and determines which stocks, sectors, and markets may be positively or negatively impacted  with explainable reasoning.

![Platform Type](https://img.shields.io/badge/Platform-Market%20Intelligence-blue)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple)
![License](https://img.shields.io/badge/License-Academic-green)

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

That's it! The platform runs entirely locally with simulated real-time data. No API keys, no databases, no external services needed.

---

## 🎯 What is NexusIntel?

NexusIntel is **NOT** a stock prediction platform or a buy/sell recommendation system.

It is an **AI-powered market impact intelligence platform** that:

1. 📡 **Monitors** worldwide events in real-time
2. 🧠 **Understands** events using AI/NLP
3. 🏢 **Maps** events to affected stocks and sectors
4. 📊 **Scores** impact with confidence levels
5. 💡 **Explains** WHY the impact may happen

### Example

> **News:** "Middle East oil supply disruptions escalate"
>
> **NexusIntel Output:**
> - ⚡ Energy sector → **Positive** impact (supply constraints may raise prices)
> - ✈️ Airlines → **Negative** impact (fuel cost increases)
> - 🚚 Logistics → **Negative** impact (transportation cost surge)

---

## 🏗️ Architecture

```
News Sources (Simulated)
       ↓
Ingestion Engine
       ↓
Cleaning & Deduplication
       ↓
NLP Processing (Rule-based AI)
       ↓
Entity Extraction
       ↓
Impact Mapping Engine
       ↓
Scoring Engine
       ↓
Real-time Dashboard (WebSocket-style)
```

---

## 🖥️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | Full-stack React framework |
| Animations | Framer Motion | Premium micro-interactions |
| State | Zustand | Lightweight reactive state |
| Charts | Recharts | Data visualization |
| Icons | Lucide React | Premium icon set |
| Styling | Vanilla CSS | Custom design system |
| Fonts | Inter + JetBrains Mono + Outfit | Google Fonts (free) |

**Cost: $0** — Everything is free and runs locally.

---

## 📁 Project Structure

```
nexusintel/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout + fonts
│   ├── page.js                   # Landing page
│   ├── globals.css               # Complete design system
│   └── dashboard/
│       ├── layout.js             # Dashboard shell (3-column)
│       └── page.js               # Dashboard content
│
├── components/
│   ├── layout/                   # Navbar, Sidebar, DetailPanel
│   ├── news/                     # NewsCard, NewsFeed
│   ├── impact/                   # HeatMap, ImpactBadge
│   ├── charts/                   # MoodGauge, Timeline, MarketPulse
│   ├── ai/                       # AI Assistant
│   └── common/                   # LiveIndicator, shared components
│
├── lib/
│   ├── data/                     # Stock database, sector mappings
│   │   ├── stocks.js             # 150+ US + India stocks
│   │   ├── sectors.js            # GICS-style sector hierarchy
│   │   └── eventTemplates.js     # 50+ realistic event templates
│   ├── engine/                   # Intelligence engine
│   │   ├── eventGenerator.js     # Demo event generation
│   │   ├── impactEngine.js       # Impact scoring system
│   │   └── aiReasoning.js        # Template-based AI reasoning
│   └── utils.js                  # Utility functions
│
├── stores/
│   └── useStore.js               # Zustand global state
│
├── hooks/
│   └── useEventStream.js         # Real-time event stream hook
│
└── package.json
```

---

## ✨ Key Features

### 🔴 Real-Time Intelligence Feed
- Live streaming news cards with animated entry/exit
- Impact scores, sentiment badges, and sector tags
- Automatic expiration of outdated events

### 🗺️ Sector Impact Heatmap
- Visual treemap of sector impacts
- Color-coded: green (positive), red (negative), amber (mixed)
- Click-to-filter interaction

### 🧠 Explainable AI Analysis
- Every impact decision includes detailed reasoning
- Sector chain reaction analysis
- Confidence and urgency scores

### 📊 Market Mood Index
- AI-generated market sentiment gauge (0-100)
- Labels: Fear → Cautious → Neutral → Optimistic → Euphoria

### 🤖 AI Assistant
- Natural language queries about market impacts
- Context-aware responses based on current events
- Professional analyst-style commentary

### 🌡️ Impact Timeline
- 24-hour impact visualization
- Positive and negative impact areas
- Event markers with tooltips

### 🎨 Premium UI/UX
- Glassmorphism design system
- Animated mesh gradient backgrounds
- Framer Motion micro-interactions
- Dark mode (institutional-grade)
- Responsive design

---

## 📊 Supported Markets

### US Stocks
AAPL, MSFT, GOOGL, AMZN, NVDA, TSLA, META, AMD, and 90+ more across all sectors

### Indian Stocks
RELIANCE, TCS, INFY, HDFCBANK, ICICIBANK, and 25+ more

### ETFs
SPY, QQQ, DIA, IWM, XLK, XLE, XLF, XLV, GLD, SLV

### Sectors
Technology, Energy, Healthcare, Finance, Consumer, Industrial, Defense, Telecom, Automotive, Semiconductor, AI & Cloud, Pharma, FMCG, Crypto, Utilities, Materials, Real Estate

---

## 🛡️ Event Categories

War/Conflict, Sanctions, Oil Crisis, Inflation, Interest Rate Changes, AI Breakthrough, Semiconductor Shortage, Layoffs, Earnings, Mergers & Acquisitions, Product Launch, Supply Chain Disruption, Cybersecurity, Natural Disaster, Government Regulation, Trade War, Currency Crisis, IPO, Clinical Trial, Election, Energy Transition, Crypto Regulation

---

## ⚠️ Important Disclaimers

- This platform does **NOT** provide financial advice
- This platform does **NOT** provide buy/sell recommendations
- This platform does **NOT** claim guaranteed predictions
- This is **NOT** a trading bot

NexusIntel is purely an **impact intelligence and event analysis tool** for educational and informational purposes.

---

## 🎓 Academic Project

This project was built for academic purposes to demonstrate:
- Real-time data streaming architectures
- AI/NLP for financial text analysis
- Event-driven system design
- Premium UI/UX engineering
- Explainable AI principles

---

## 📄 License

This project is for academic and educational purposes.


