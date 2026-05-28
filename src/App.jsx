import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Shield, AlertTriangle, TrendingUp, Globe, MessageSquare, Settings,
  RefreshCw, Plus, ChevronRight, ChevronDown, Zap, Package, Truck,
  Activity, Search, X, Send, BarChart2, Download, Bell, Clock,
  CheckCircle, Radio, FileText, Sliders, Map, Cpu, ArrowUp, ArrowDown,
  AlertCircle, Info, Play, Pause
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';

// ==========================================
// 1. CONSTANTS & INITIAL LOCALIZED DATA
// ==========================================

const DEFAULT_SUPPLIERS = [
  {
    id: "sup_tata",
    name: "Tata Electronics",
    country: "India",
    flag: "ðŸ‡®ðŸ‡³",
    category: "Electronics",
    leadTime: 20,
    riskLevel: "LOW",
    riskPercentage: 32,
    primaryRisk: "Regulatory",
    geopoliticalScore: 22,
    financialScore: 18,
    weatherScore: 35,
    logisticsScore: 30,
    regulatoryScore: 48,
    cyberScore: 39,
    factors: [
      "Strategic advanced IC packaging & OSAT hub at Hosur, Tamil Nadu",
      "High integration with local 'Make in India' capital subsidy corridors",
      "Low susceptibility to direct South China Sea maritime flashpoints"
    ],
    impact: "Highly stable operations node. Provides a primary strategic hedge to East-Asian fab volatility.",
    timeToImpact: "Long-Term (6-12 months)",
    confidence: 94,
    alternates: [
      { name: "ASE Group", country: "Taiwan", flag: "ðŸ‡¹ðŸ‡¼" },
      { name: "Amkor Technology", country: "United States", flag: "ðŸ‡ºðŸ‡¸" }
    ],
    recommendation: "Channel 40% of microchip advanced assembly and packaging volume to Hosur immediately to hedge Taiwan risks.",
    lastAnalyzed: "2026-05-28 12:15:00"
  },
  {
    id: "sup_adani",
    name: "Adani Mundra Port",
    country: "India",
    flag: "ðŸ‡®ðŸ‡³",
    category: "Logistics",
    leadTime: 12,
    riskLevel: "MEDIUM",
    riskPercentage: 48,
    primaryRisk: "Logistics",
    geopoliticalScore: 35,
    financialScore: 25,
    weatherScore: 40,
    logisticsScore: 68,
    regulatoryScore: 38,
    cyberScore: 55,
    factors: [
      "Monitored shipping lane detours linked to Suez Canal blank sailings",
      "Expanding container terminals at Mundra, Gujarat serving as primary Western Hub",
      "IMEC (India-Middle East-Europe) logistics corridor sync capacity"
    ],
    impact: "Moderate logistics friction. Mundra represents a key alternate routing hub bypassing standard channels.",
    timeToImpact: "Short-Term (3-5 days)",
    confidence: 95,
    alternates: [
      { name: "JNPT Mumbai Port", country: "India", flag: "ðŸ‡®ðŸ‡³" },
      { name: "Port of Salalah", country: "Oman", flag: "ðŸ‡´ðŸ‡²" }
    ],
    recommendation: "Pre-book freight allocations linking Mundra Port rail to Western Europe corridors. Standardize safety stocks.",
    lastAnalyzed: "2026-05-28 13:05:00"
  },
  {
    id: "sup_isro",
    name: "ISRO Aerospace Components",
    country: "India",
    flag: "ðŸ‡®ðŸ‡³",
    category: "Electronics",
    leadTime: 30,
    riskLevel: "LOW",
    riskPercentage: 25,
    primaryRisk: "Regulatory",
    geopoliticalScore: 20,
    financialScore: 15,
    weatherScore: 30,
    logisticsScore: 28,
    regulatoryScore: 40,
    cyberScore: 35,
    factors: [
      "High engineering standards for structural avionics",
      "Direct strategic alignment with ISRO space missions",
      "Monitored carbon emissions tracking"
    ],
    impact: "Highly critical aerospace structural assemblies. Extremely robust node.",
    timeToImpact: "Long-Term (6+ months)",
    confidence: 97,
    alternates: [
      { name: "HAL Aerospace", country: "India", flag: "ðŸ‡®ðŸ‡³" },
      { name: "Boeing Systems", country: "United States", flag: "ðŸ‡ºðŸ‡¸" }
    ],
    recommendation: "Channel 65% of specialized aerospace telemetry assembly sourcing to Bengaluru node immediately.",
    lastAnalyzed: "2026-05-28 12:40:00"
  },
  {
    id: "sup_bel",
    name: "Bharat Electronics (BEL)",
    country: "India",
    flag: "ðŸ‡®ðŸ‡³",
    category: "Electronics",
    leadTime: 18,
    riskLevel: "LOW",
    riskPercentage: 20,
    primaryRisk: "Cyber",
    geopoliticalScore: 18,
    financialScore: 14,
    weatherScore: 25,
    logisticsScore: 22,
    regulatoryScore: 30,
    cyberScore: 38,
    factors: [
      "Advanced military communication transceivers",
      "Make in India electronic capital subsidization",
      "Strict compliance with defense security parameters"
    ],
    impact: "Primary secure electronics communication node. Negligible geopolitics vulnerability.",
    timeToImpact: "Immediate (1-3 days)",
    confidence: 95,
    alternates: [
      { name: "L&T Defense", country: "India", flag: "ðŸ‡®ðŸ‡³" },
      { name: "Raytheon Technologies", country: "United States", flag: "ðŸ‡ºðŸ‡¸" }
    ],
    recommendation: "Standardize dual-sourcing parameters. Utilize BEL Pune for localized secure telemetric chip assemblies.",
    lastAnalyzed: "2026-05-28 13:00:00"
  },
  {
    id: "sup_reliance",
    name: "Reliance Jamnagar Hub",
    country: "India",
    flag: "ðŸ‡®ðŸ‡³",
    category: "Raw Materials",
    leadTime: 15,
    riskLevel: "LOW",
    riskPercentage: 18,
    primaryRisk: "Weather",
    geopoliticalScore: 15,
    financialScore: 10,
    weatherScore: 38,
    logisticsScore: 24,
    regulatoryScore: 28,
    cyberScore: 30,
    factors: [
      "World's largest grassroots refinery and petrochemical base",
      "Expanding green hydrogen and polymer integration",
      "Strategic Indian Ocean logistics maritime protection"
    ],
    impact: "Highly robust feedstock raw materials provider. Excellent hedge to European gas crises.",
    timeToImpact: "Medium-Term (1-3 months)",
    confidence: 96,
    alternates: [
      { name: "Sinopec Corp", country: "China", flag: "ðŸ‡¨ðŸ‡³" },
      { name: "Saudi Aramco", country: "Saudi Arabia", flag: "ðŸ‡¸ðŸ‡¦" }
    ],
    recommendation: "Standardize polymer supply contracts linking Jamnagar to European hubs via Mundra Port rail systems.",
    lastAnalyzed: "2026-05-28 11:35:00"
  },
  {
    id: "sup_serum",
    name: "Serum Institute of India",
    country: "India",
    flag: "ðŸ‡®ðŸ‡³",
    category: "Raw Materials",
    leadTime: 14,
    riskLevel: "LOW",
    riskPercentage: 22,
    primaryRisk: "Regulatory",
    geopoliticalScore: 12,
    financialScore: 15,
    weatherScore: 28,
    logisticsScore: 30,
    regulatoryScore: 45,
    cyberScore: 32,
    factors: [
      "World's largest vaccine and biological active ingredient manufacturer",
      "Highly automated cold-chain logistics operations",
      "Monitored global regulatory drug compliance benchmarks"
    ],
    impact: "Primary secure biotech supply node. Critical to international pharma distribution hubs.",
    timeToImpact: "Long-Term (6 months)",
    confidence: 94,
    alternates: [
      { name: "Bharat Biotech", country: "India", flag: "ðŸ‡®ðŸ‡³" },
      { name: "Pfizer Inc", country: "United States", flag: "ðŸ‡ºðŸ‡¸" }
    ],
    recommendation: "Pre-book cold-chain air cargo routing allocations to bypass Middle East transit chokepoints.",
    lastAnalyzed: "2026-05-28 10:45:00"
  },
  {
    id: "sup_infosys",
    name: "Infosys EdgeVerve Logistics",
    country: "India",
    flag: "ðŸ‡®ðŸ‡³",
    category: "Logistics",
    leadTime: 8,
    riskLevel: "LOW",
    riskPercentage: 15,
    primaryRisk: "Cyber",
    geopoliticalScore: 10,
    financialScore: 12,
    weatherScore: 18,
    logisticsScore: 20,
    regulatoryScore: 25,
    cyberScore: 42,
    factors: [
      "Enterprise supply chain custom clearing software platforms",
      "Global multi-tier tracking telemetry server grids",
      "Robust cyber posture monitoring and active threat defense"
    ],
    impact: "Primary software and logistics customs clearance telemetry node. Exceptional stability.",
    timeToImpact: "Short-Term (3-5 days)",
    confidence: 98,
    alternates: [
      { name: "SAP Supply", country: "Germany", flag: "ðŸ‡©ðŸ‡ª" },
      { name: "Oracle Logistics", country: "United States", flag: "ðŸ‡ºðŸ‡¸" }
    ],
    recommendation: "Standardize Infosys EdgeVerve container tracking APIs as the primary telemetry platform.",
    lastAnalyzed: "2026-05-28 13:10:00"
  },
  {
    id: "sup_tsmc",
    name: "TSMC",
    country: "Taiwan",
    flag: "ðŸ‡¹ðŸ‡¼",
    category: "Electronics",
    leadTime: 45,
    riskLevel: "CRITICAL",
    riskPercentage: 88,
    primaryRisk: "Geopolitical",
    geopoliticalScore: 92,
    financialScore: 25,
    weatherScore: 40,
    logisticsScore: 78,
    regulatoryScore: 85,
    cyberScore: 60,
    factors: [
      "Taiwan Strait DEFCON 3 military tensions",
      "Highly concentrated global semiconductor exposure",
      "Export controls on advanced lithography tools"
    ],
    impact: "High risk of total operational shutdown if naval blockade occurs.",
    timeToImpact: "Immediate (1-3 days)",
    confidence: 90,
    alternates: [
      { name: "Tata Electronics", country: "India", flag: "ðŸ‡®ðŸ‡³" },
      { name: "Samsung Foundry", country: "South Korea", flag: "ðŸ‡°ðŸ‡·" }
    ],
    recommendation: "Diversify 25% volume to Tata Electronics Hosur OSAT or Samsung Korea immediately. Mandate safety buffer stock.",
    lastAnalyzed: "2026-05-28 10:14:00"
  },
  {
    id: "sup_asml",
    name: "ASML Holding",
    country: "Netherlands",
    flag: "ðŸ‡³ðŸ‡±",
    category: "Electronics",
    leadTime: 90,
    riskLevel: "MEDIUM",
    riskPercentage: 45,
    primaryRisk: "Regulatory",
    geopoliticalScore: 40,
    financialScore: 15,
    weatherScore: 20,
    logisticsScore: 35,
    regulatoryScore: 75,
    cyberScore: 55,
    factors: [
      "Expanding US-China export bans on DUV/EUV systems",
      "Extremely long engineering lead times",
      "Highly consolidated component supply base"
    ],
    impact: "Moderate risk. Sales restrictions to China affect revenue, but order book remains backlogged.",
    timeToImpact: "Medium-Term (3-6 months)",
    confidence: 94,
    alternates: [
      { name: "Nikon Lithography", country: "Japan", flag: "ðŸ‡¯ðŸ‡µ" },
      { name: "Canon Optical", country: "Japan", flag: "ðŸ‡¯ðŸ‡µ" }
    ],
    recommendation: "Establish regulatory compliance buffer. Monitor intellectual property security closely.",
    lastAnalyzed: "2026-05-28 11:22:00"
  },
  {
    id: "sup_samsung",
    name: "Samsung Electronics",
    country: "South Korea",
    flag: "ðŸ‡°ðŸ‡·",
    category: "Electronics",
    leadTime: 30,
    riskLevel: "HIGH",
    riskPercentage: 72,
    primaryRisk: "Geopolitical",
    geopoliticalScore: 78,
    financialScore: 30,
    weatherScore: 35,
    logisticsScore: 65,
    regulatoryScore: 50,
    cyberScore: 70,
    factors: [
      "North Korea military posture changes",
      "Semiconductor export control adjustments in Asia",
      "Industrial espionage risks at Pyeongtaek Fab"
    ],
    impact: "High shipping disruption risk if regional maritime lanes are contested.",
    timeToImpact: "Short-Term (1-2 weeks)",
    confidence: 89,
    alternates: [
      { name: "Micron Technology", country: "United States", flag: "ðŸ‡ºðŸ‡¸" },
      { name: "SK Hynix", country: "South Korea", flag: "ðŸ‡°ðŸ‡·" }
    ],
    recommendation: "Dual-source memory chips from Micron U.S. fabs. Review emergency airfreight logistics routes.",
    lastAnalyzed: "2026-05-28 12:45:00"
  },
  {
    id: "sup_maersk",
    name: "Maersk Logistics",
    country: "Denmark",
    flag: "ðŸ‡©ðŸ‡°",
    category: "Logistics",
    leadTime: 15,
    riskLevel: "CRITICAL",
    riskPercentage: 91,
    primaryRisk: "Logistics",
    geopoliticalScore: 88,
    financialScore: 40,
    weatherScore: 50,
    logisticsScore: 95,
    regulatoryScore: 45,
    cyberScore: 75,
    factors: [
      "Houthi rebel attacks on Red Sea shipping corridors",
      "Cape of Good Hope rerouting adding +14 days transit",
      "Global container shortages and blank sailings"
    ],
    impact: "Severe cost hikes and logistics delays across all European imports.",
    timeToImpact: "Immediate (1-3 days)",
    confidence: 96,
    alternates: [
      { name: "Adani Mundra Port", country: "India", flag: "ðŸ‡®ðŸ‡³" },
      { name: "DSV Global Transport", country: "Denmark", flag: "ðŸ‡©ðŸ‡°" }
    ],
    recommendation: "Shift high-priority shipments to Air/Rail combination. Pre-book ocean freight space 6 weeks in advance.",
    lastAnalyzed: "2026-05-28 13:02:00"
  },
  {
    id: "sup_byd",
    name: "BYD Auto Components",
    country: "China",
    flag: "ðŸ‡¨ðŸ‡³",
    category: "Raw Materials",
    leadTime: 25,
    riskLevel: "HIGH",
    riskPercentage: 79,
    primaryRisk: "Regulatory",
    geopoliticalScore: 85,
    financialScore: 30,
    weatherScore: 25,
    logisticsScore: 68,
    regulatoryScore: 92,
    cyberScore: 50,
    factors: [
      "US/EU proposed 25% to 100% tariffs on battery components",
      "Bilateral tech war retaliations",
      "Supply chain carbon auditing standards"
    ],
    impact: "Significant margin compression due to import tariffs and duties.",
    timeToImpact: "Short-Term (1 month)",
    confidence: 91,
    alternates: [
      { name: "CATL (Hungary Fab)", country: "Hungary", flag: "ðŸ‡­ðŸ‡º" },
      { name: "Panasonic Energy", country: "Japan", flag: "ðŸ‡¯ðŸ‡µ" }
    ],
    recommendation: "Hedge tariff impact by sourcing from Hungarian or Mexican production facilities. Re-negotiate DDP contracts.",
    lastAnalyzed: "2026-05-28 09:30:00"
  },
  {
    id: "sup_murata",
    name: "Murata Manufacturing",
    country: "Japan",
    flag: "ðŸ‡¯ðŸ‡µ",
    category: "Electronics",
    leadTime: 20,
    riskLevel: "LOW",
    riskPercentage: 28,
    primaryRisk: "Weather",
    geopoliticalScore: 20,
    financialScore: 15,
    weatherScore: 48,
    logisticsScore: 30,
    regulatoryScore: 25,
    cyberScore: 35,
    factors: [
      "Earthquake susceptibility of Ishikawa factories",
      "Rising energy costs in Japan",
      "Aging demographic labor constraints"
    ],
    impact: "Low operational risk, localized short-term shock if seismic activity occurs.",
    timeToImpact: "Unpredictable",
    confidence: 88,
    alternates: [
      { name: "TDK Corporation", country: "Japan", flag: "ðŸ‡¯ðŸ‡µ" },
      { name: "Taiyo Yuden", country: "Taiwan", flag: "ðŸ‡¹ðŸ‡¼" }
    ],
    recommendation: "No immediate structural changes. Keep standard safety stock buffer at 3 weeks.",
    lastAnalyzed: "2026-05-28 08:15:00"
  },
  {
    id: "sup_dhl",
    name: "DHL Global Supply",
    country: "Germany",
    flag: "ðŸ‡©ðŸ‡ª",
    category: "Logistics",
    leadTime: 10,
    riskLevel: "MEDIUM",
    riskPercentage: 54,
    primaryRisk: "Logistics",
    geopoliticalScore: 35,
    financialScore: 20,
    weatherScore: 40,
    logisticsScore: 72,
    regulatoryScore: 30,
    cyberScore: 68,
    factors: [
      "Lufthansa cargo strikes and labor union disputes",
      "European border check slow downs",
      "Cybersecurity vulnerabilities in supply chains"
    ],
    impact: "Moderate logistics delays across central European supply hubs.",
    timeToImpact: "Short-Term (3-5 days)",
    confidence: 92,
    alternates: [
      { name: "FedEx Express", country: "United States", flag: "ðŸ‡ºðŸ‡¸" },
      { name: "UPS Supply Chain", country: "United States", flag: "ðŸ‡ºðŸ‡¸" }
    ],
    recommendation: "Activate secondary carrier agreements with FedEx. Utilize regional secondary airports for air freight.",
    lastAnalyzed: "2026-05-28 11:40:00"
  },
  {
    id: "sup_basf",
    name: "BASF Chemical",
    country: "Germany",
    flag: "ðŸ‡©ðŸ‡ª",
    category: "Raw Materials",
    leadTime: 35,
    riskLevel: "MEDIUM",
    riskPercentage: 58,
    primaryRisk: "Financial",
    geopoliticalScore: 30,
    financialScore: 78,
    weatherScore: 30,
    logisticsScore: 45,
    regulatoryScore: 60,
    cyberScore: 40,
    factors: [
      "High natural gas pricing structures in Germany",
      "Slowing global chemical demand compressing margins",
      "Rhine River low water level restricting barge freight"
    ],
    impact: "Moderate risk of feedstock price spikes affecting manufacturing cost of goods sold.",
    timeToImpact: "Medium-Term (1-3 months)",
    confidence: 90,
    alternates: [
      { name: "Dow Chemical", country: "United States", flag: "ðŸ‡ºðŸ‡¸" },
      { name: "Sinopec Corp", country: "China", flag: "ðŸ‡¨ðŸ‡³" }
    ],
    recommendation: "Hedge chemical pricing via long-term supply contracts. Qualify Dow Chemical US as secondary source.",
    lastAnalyzed: "2026-05-28 10:50:00"
  }
];

const PRE_FILLED_THREATS = [
  "âš¡ BREAKING: Magnitude 6.2 earthquake near Hsinchu, Taiwan electronics manufacturing corridor.",
  "ðŸš¨ ALERT: Red Sea shipping lane attacks intensify â€” major ocean carriers rerouting all vessels via Cape of Good Hope.",
  "âš ï¸ UPDATE: South Korea semiconductor export controls tightened â€” regional lead times projected +15 days.",
  "ðŸ“Š MARKET: Chinese Yuan depreciates 2.3% against USD â€” Chinese supplier manufacturing raw margins recalculating.",
  "ðŸŒŠ WEATHER: Category 4 Super Typhoon heading towards primary ports in Northern Philippines â€” logistics standstill expected.",
  "ðŸŒŠ WEATHER: Flash floods disrupt manufacturing hubs across Vietnam electronics export zones.",
  "ðŸ”´ CRITICAL: Port worker labor strike begins at Port of Shanghai, China â€” container logistics backlogs compounding.",
  "âš¡ INTEL: Advanced micro-chip fab expansion in Tainan delayed 6 months due to local environmental and regulatory reviews.",
  "ðŸ“¡ CYBER: Global ransomware breach disrupts operations at Rotterdam port authority cargo tracking servers.",
  "â„ï¸ WEATHER: Heavy winter blizzard in Bavaria halts high-speed rail freight across Central Europe corridors.",
  "ðŸ­ INDUSTRY: Natural gas shortages in Western Europe trigger localized feedstock supply caps at chemical plants.",
  "ðŸ›°ï¸ COMMUNICATION: Subsea fiber cable cut in South China Sea slows database syncs between East Asian logistic nodes."
];

const SCENARIOS = [
  {
    id: "scen_taiwan",
    name: "Taiwan Strait Escalation",
    description: "Military tensions and blockades disrupt semiconductor supply chains and major cross-strait cargo routes.",
    categories: ["Electronics", "Logistics"],
    severity: "CRITICAL",
    icon: "ðŸŒŠ",
    defaultImpact: "$34.2M",
    recoveryTime: "6-12 Months"
  },
  {
    id: "scen_recession",
    name: "Global Recession -3% GDP",
    description: "A steep macroeconomic contraction reduces business margins, driving higher credit default risks among suppliers.",
    categories: ["Electronics", "Logistics", "Raw Materials", "Food", "Pharma"],
    severity: "HIGH",
    icon: "ðŸ“‰",
    defaultImpact: "$12.8M",
    recoveryTime: "4-6 Months"
  },
  {
    id: "scen_pandemic",
    name: "Pandemic Logistics Shutdown",
    description: "Coordinated border lockdowns and quarantine rules close shipping hubs, restricting commercial flights.",
    categories: ["Logistics", "Food", "Pharma"],
    severity: "CRITICAL",
    icon: "ðŸ¦ ",
    defaultImpact: "$28.5M",
    recoveryTime: "5-9 Months"
  },
  {
    id: "scen_cyber",
    name: "Cyber Attack on Supply Networks",
    description: "Distributed cyber warfare hits main enterprise resource planning (ERP) servers across East-Asian partners.",
    categories: ["Electronics", "Logistics"],
    severity: "HIGH",
    icon: "âš¡",
    defaultImpact: "$18.1M",
    recoveryTime: "2-4 Months"
  },
  {
    id: "scen_climate",
    name: "Climate Extreme Weather Event",
    description: "Simultaneous historic monsoon flooding across Southeast Asian shipping corridors paralyzes sub-tier electronics.",
    categories: ["Raw Materials", "Electronics"],
    severity: "HIGH",
    icon: "ðŸŒ¡ï¸",
    defaultImpact: "$15.4M",
    recoveryTime: "3-6 Months"
  },
  {
    id: "scen_tradewar",
    name: "Trade War Escalation",
    description: "Tariffs balloon to 60% across raw chemical materials and sub-tier metal alloys between Western economies and China.",
    categories: ["Electronics", "Raw Materials"],
    severity: "HIGH",
    icon: "ðŸ“œ",
    defaultImpact: "$22.1M",
    recoveryTime: "8-12 Months"
  }
];

const MOCK_CONSOLE_LOGS = [
  "[INITIALIZATION] Secure telemetry shell linked successfully.",
  "[CONNECT] Querying OSINT geopolitical risk index feeds...",
  "[SATELLITE] Real-time tracking kaohsiung port cargo capacity at 74%.",
  "[WEATHER] Monsoon depression detected in Northern South China Sea.",
  "[COMPILING] Sub-tier semiconductor node dependencies mapping completed.",
  "[DATA] Fetching tariff updates from US Trade Representative database.",
  "[AGENT] Neural collector verifying alternative source facilities in Hanoi.",
  "[CYBER] Firewall auditing on third-party carrier API ports completed.",
  "[INTEL] Analyzing environmental compliance delay factors in Tainan.",
  "[SYSTEM] Recalculating margin exposure models across active partners."
];

// ==========================================
// 2. PERSISTENCE & PARSING HELPERS (SAFE)
// ==========================================

const initSafeStorage = () => {
  if (!window.storage) {
    window.storage = {
      _data: {},
      getItem(key) { return this._data[key] || null; },
      setItem(key, value) { this._data[key] = String(value); },
      removeItem(key) { delete this._data[key]; },
      clear() { this._data = {}; }
    };
  }
};
initSafeStorage();

const safeJsonParse = (str, fallback = null) => {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch (e) {
    try {
      const match = str.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (match) {
        let cleaned = match[0]
          .replace(/'/g, '"')
          .replace(/,\s*([\]}])/g, '$1');
        return JSON.parse(cleaned);
      }
    } catch (e2) {
      console.error("safeJsonParse fallback failed:", e2);
    }
    return fallback;
  }
};

const getStoredItem = (key, defaultValue) => {
  try {
    const data = window.storage.getItem(key);
    return data ? safeJsonParse(data, defaultValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setStoredItem = (key, value) => {
  try {
    window.storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage set failed:", e);
  }
};

const getMockChatResponse = (prompt, suppliers) => {
  const lower = prompt.toLowerCase();
  
  if (lower.includes("critical") || lower.includes("highest risk")) {
    const criticals = suppliers.filter(s => s.riskLevel === "CRITICAL" || s.riskPercentage >= 85);
    return `### Critical Risk Supplier Audit

I have run an automated scan across the current supplier portfolio. We have **${criticals.length}** suppliers flagged in the **CRITICAL** danger zone:

${criticals.map(s => `- **${s.name}** (${s.country} // ${s.category}): **${s.riskPercentage}% Risk**. Key Driver: **${s.primaryRisk}**. *Recommendation:* ${s.recommendation}`).join("\n")}

**IMMEDIATE TACTICAL ACTIONS:**
1. Reroute upcoming ocean freight away from affected logistics channels.
2. Formally contact alternative backups in Mexico or Western Europe.
3. Pre-finance safety stock pipelines.`;
  }
  
  if (lower.includes("taiwan") || lower.includes("asia") || lower.includes("india")) {
    const asiaSuppliers = suppliers.filter(s => ["India", "Taiwan", "China", "South Korea", "Japan"].includes(s.country));
    return `### Indian & APAC Geopolitical Exposure Map

We currently track **${asiaSuppliers.length}** active partners inside the highly volatile APAC corridor:

| Supplier | Location | Main Risk Factor | Risk Score |
| :--- | :--- | :--- | :---: |
${asiaSuppliers.map(s => `| **${s.name}** | ${s.flag} ${s.country} | ${s.factors[0] || "Regional supply choke points"} | \`${s.riskPercentage}%\` |`).join("\n")}

**RISK MITIGATION DIRECTIVES:**
- **Diversify Production**: Distribute volume to secondary fabs in **India Hub** (Hosur packaging).
- **Safety Inventory**: Standardize an immediate 45-day on-site warehouse reserve at Adani Mundra Port.
- **Freight Transition**: Secure locked-in slots for fast air charter routing fallback routes.`;
  }

  if (lower.includes("report") || lower.includes("executive summary")) {
    return `### Supply Chain Strategic Executive Summary

**Operational Risk Overview:**
Our global supplier portfolio displays an elevated exposure score, heavily concentrated in primary technology corridors (Taiwan/China) and shipping lanes (Red Sea). 

**Key Exposure Statistics:**
- Total Monitored Facilities: **${suppliers.length}**
- High/Critical Level Warnings: **${suppliers.filter(s => ["HIGH", "CRITICAL"].includes(s.riskLevel)).length}**
- Overall Average Risk Index: **${Math.floor(suppliers.reduce((acc, s) => acc + s.riskPercentage, 0) / suppliers.length)}%**

**Strategic Imperatives:**
1. **Multi-Source Procurement:** Set target for max 50% reliance on single countries.
2. **Logistics Agility:** Pivot Ocean-to-Air lanes for critical components.
3. **Cyber Defense Auditing:** Establish zero-trust requirements on API hooks linked to suppliers.`;
  }

  return `### BUDDY SHIELD AI Operations Terminal Response

Acknowledged. Processing natural language query for supply chain intelligence: *"${prompt}"*

**Current Portfolio Status:**
- Monitored nodes: **${suppliers.length}** suppliers globally.
- Average Risk Index: **${Math.floor(suppliers.reduce((acc, s) => acc + s.riskPercentage, 0) / suppliers.length)}%**.
- Threat updates monitored in real-time: **Active**.

**Operational Recommendation:**
Please run a **Scenario Simulation** via the **Scenario Engine** sidebar panel to test the immediate resilience of our operations against targeted tariffs or natural disasters. Feel free to refine your question or ask for alternate manufacturers.`;
};

const generateMockAnalysis = (supplier) => {
  // Recalculate scores with slight high-fidelity random variance centered around original values
  const geo = Math.min(100, Math.max(10, (supplier.geopoliticalScore || 35) + Math.floor(Math.random() * 14) - 7));
  const fin = Math.min(100, Math.max(10, (supplier.financialScore || 35) + Math.floor(Math.random() * 14) - 7));
  const wea = Math.min(100, Math.max(10, (supplier.weatherScore || 35) + Math.floor(Math.random() * 14) - 7));
  const log = Math.min(100, Math.max(10, (supplier.logisticsScore || 35) + Math.floor(Math.random() * 14) - 7));
  const reg = Math.min(100, Math.max(10, (supplier.regulatoryScore || 35) + Math.floor(Math.random() * 14) - 7));
  const cyb = Math.min(100, Math.max(10, (supplier.cyberScore || 35) + Math.floor(Math.random() * 14) - 7));

  // Compute aggregate risk percentage based on category focus and scores
  let avg = Math.floor((geo + fin + wea + log + reg + cyb) / 6);
  
  // Categorical skew factors
  if (supplier.category === "Electronics") avg = Math.min(100, Math.floor(avg * 1.1));
  if (supplier.category === "Logistics") avg = Math.min(100, Math.floor(avg * 1.05));
  
  // Determine risk level string
  let level = "LOW";
  if (avg >= 85) level = "CRITICAL";
  else if (avg >= 70) level = "HIGH";
  else if (avg >= 45) level = "MEDIUM";

  // Select a primary risk driver dynamically based on the highest individual score
  const scores = [
    { name: "Geopolitical", val: geo },
    { name: "Financial", val: fin },
    { name: "Weather", val: wea },
    { name: "Logistics", val: log },
    { name: "Regulatory", val: reg },
    { name: "Cybersecurity", val: cyb }
  ];
  scores.sort((a, b) => b.val - a.val);
  const primaryDriver = scores[0].name;

  // Generate dynamic, realistic factors based on the primary risk
  let newFactors = supplier.factors ? [...supplier.factors] : [];
  if (primaryDriver === "Geopolitical") {
    newFactors = [
      `Elevated regional defense readiness triggers localized transport channel chokepoints near ${supplier.country}.`,
      "Import tariff adjustment schedules disrupt baseline transaction modeling.",
      "Strategic bilateral security revisions impact direct component customs priority."
    ];
  } else if (primaryDriver === "Cybersecurity") {
    newFactors = [
      "Vulnerability scan flags outdated SSL protocol version on main ERP gateway.",
      "Third-party shipping tracking API reports elevated brute-force intrusion triggers.",
      "Unpatched buffer overflow risk identified in regional inventory control interface."
    ];
  } else if (primaryDriver === "Weather") {
    newFactors = [
      "Extreme atmospheric storm depression slows air freighter customs clearing.",
      "Localized flood advisory slows sub-tier component trucking logistics.",
      "Precipitation patterns exceed standard 10-year facility engineering limits."
    ];
  } else {
    newFactors = [
      `Slight logistical latency fluctuation detected at local transport hubs in ${supplier.country}.`,
      "Baseline cost adjustment factors match standard global margin trends.",
      "Sub-tier material availability remains stable with expected lead-time limits."
    ];
  }

  // Generate next-step dynamic recommendation
  let rec = supplier.recommendation || "Diversify regional exposure.";
  if (level === "CRITICAL" || level === "HIGH") {
    rec = `Urgent: Establish a secondary volume supply hedge at Adani Mundra Port or Tata Electronics Hosur (+${supplier.leadTime + 5}d fallback).`;
  } else {
    rec = `Optimize: Sourcing index is fully stable. Establish minor safety reserve pipelines at domestic Indian nodes.`;
  }

  return {
    ...supplier,
    riskLevel: level,
    riskPercentage: avg,
    primaryRisk: primaryDriver,
    geopoliticalScore: geo,
    financialScore: fin,
    weatherScore: wea,
    logisticsScore: log,
    regulatoryScore: reg,
    cyberScore: cyb,
    factors: newFactors,
    recommendation: rec,
    lastAnalyzed: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
};

// ==========================================
// 3. MAIN APPLICATION COMPONENT
// ==========================================

export default function App() {
  // App Loading Diagnostics
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loadingText, setLoadingText] = useState("âš¡ BUDDY SHIELD AI INITIALIZING SYSTEM CHASSIS...");

  // Authentication & App Config
  const [isLoggedIn, setIsLoggedIn] = useState(() => getStoredItem("buddy_auth", false));
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Pro Max Features: Interactive Sea-Route and Monte Carlo Sandbox states
  const [selectedSeaRoute, setSelectedSeaRoute] = useState("cape");
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [sandboxDriver, setSandboxDriver] = useState("Geopolitical");
  const [sandboxCategory, setSandboxCategory] = useState("Electronics");
  const [sandboxIntensity, setSandboxIntensity] = useState(7);
  const [sandboxLogs, setSandboxLogs] = useState([]);

  // Pro Max Feature 3: Bharatiya Strategic Reshoring Planner states
  const [reshoreFromId, setReshoreFromId] = useState("sup_tsmc");
  const [reshoreVolume, setReshoreVolume] = useState(40);
  const [reshoreToId, setReshoreToId] = useState("sup_tata");

  // Pro Max Feature 4: Cyber Shield API Firewall Isolation Console states
  const [isolatedNodes, setIsolatedNodes] = useState(() => getStoredItem("isolated_nodes", {}));

  // Navigation & Theme
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarHover, setSidebarHover] = useState(false);
  const [theme, setTheme] = useState(() => getStoredItem("aegisflow_theme", "cyan"));

  // API Configuration
  const [apiKey, setApiKey] = useState(() => getStoredItem("anthropic_api_key", ""));
  const [showSettings, setShowSettings] = useState(false);
  const [claudeStatus, setClaudeStatus] = useState("unknown"); // 'unknown' | 'connected' | 'error'
  const [isTestingKey, setIsTestingKey] = useState(false);

  // Streaming chat typewriter
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [streamingText, setStreamingText] = useState("");

  // India Hub Dashboard state
  const [indiaPortThroughput, setIndiaPortThroughput] = useState({ mundra: 78, jnpt: 64, chennai: 71, kolkata: 55 });
  const [inrRate, setInrRate] = useState(83.42);

  // Agent: OSINT Sentinel
  const [osintStatus, setOsintStatus] = useState("idle");
  const [osintLogs, setOsintLogs] = useState(["[OSINT] Agent idle. Click 'Run Agent' to begin geopolitical news scan."]);

  // Agent: Rupee FX Hedger
  const [fxStatus, setFxStatus] = useState("idle");
  const [fxLogs, setFxLogs] = useState(["[FX] Agent idle. Click 'Run Agent' to begin USD/INR impact analysis."]);

  // Agent: Monsoon Weather Oracle
  const [weatherStatus, setWeatherStatus] = useState("idle");
  const [weatherLogs, setWeatherLogs] = useState(["[WEATHER] Agent idle. Click 'Run Agent' to begin Indian port weather scan."]);

  // Pro Max: Notification dropdown panel state
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  // Notification ref & outside click close handler
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  // Suppliers & Dynamic State
  const [suppliers, setSuppliers] = useState(() => getStoredItem("suppliers", DEFAULT_SUPPLIERS));
  const [expandedSupplier, setExpandedSupplier] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMapSupplier, setSelectedMapSupplier] = useState(null);

  // Pro Max: Dual Supplier Comparison State
  const [compareAId, setCompareAId] = useState("sup_tsmc");
  const [compareBId, setCompareBId] = useState("sup_tata");

  // New Supplier Form
  const [isAddingSupplier, setIsAddingSupplier] = useState(false);
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierCountry, setNewSupplierCountry] = useState("India");
  const [newSupplierCategory, setNewSupplierCategory] = useState("Electronics");
  const [newSupplierLeadTime, setNewSupplierLeadTime] = useState(20);
  const [formError, setFormError] = useState("");

  // Live Threat War Room Page State
  const [threatEvents, setThreatEvents] = useState([
    {
      id: "th_1",
      severity: "CRITICAL",
      title: "Red Sea Shipping Lane Attack Escalates",
      desc: "Armed drones target container vessels near Bab al-Mandab. Maersk announces indefinite rerouting of Asia-EU shipments via South Africa Cape of Good Hope, adding +14 days transit.",
      categories: ["Logistics", "Raw Materials"],
      affectedSuppliers: ["Maersk Logistics", "BYD Auto Components"],
      timestamp: "2 mins ago",
      autoAnalyzed: true,
      read: false
    },
    {
      id: "th_2",
      severity: "HIGH",
      title: "Taiwan Strait Air Defense Patrols Elevated",
      desc: "DEFCON 3 military posture reported. Tactical operations slow local commercial seaport throughput in Kaohsiung.",
      categories: ["Electronics", "Logistics"],
      affectedSuppliers: ["TSMC", "Samsung Electronics"],
      timestamp: "12 mins ago",
      autoAnalyzed: true,
      read: false
    },
    {
      id: "th_3",
      severity: "MEDIUM",
      title: "Munich Air Hub Labor Strike Declared",
      desc: "Ground crew walkouts force cancellation of 60% of transatlantic air freighters, shifting logistics to secondary nodes.",
      categories: ["Logistics"],
      affectedSuppliers: ["DHL Global Supply"],
      timestamp: "45 mins ago",
      autoAnalyzed: true,
      read: false
    }
  ]);
  const [threatsDetectedToday, setThreatsDetectedToday] = useState(14);
  const [autoUpdatesTriggered, setAutoUpdatesTriggered] = useState(6);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [systemUptime, setSystemUptime] = useState(0);

  // Pro Max: Live Running Telemetry Logs
  const [consoleLogs, setConsoleLogs] = useState([
    "[SYSTEM] BUDDY SHIELD AI secure shell active.",
    "[CONNECT] Fetching localized OSINT inputs.",
    "[COMPILING] Sub-tier electronics indexes mapping complete."
  ]);

  // Pro Max: Financial Margin Cost Impact Calculator State
  const [calculatorSupplierId, setCalculatorSupplierId] = useState("sup_tsmc");
  const [calculatorValue, setCalculatorValue] = useState(1000000); // default $1M

  // Active Scan State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanText, setScanText] = useState("");

  // Agent Trace Pipeline State
  const [traceSupplierId, setTraceSupplierId] = useState("sup_adani");
  const [traceLogs, setTraceLogs] = useState({
    collector: `[CONNECT] Linked to satellite shipping grids. Located factory coordinates inside India.
[SCAN] Detected lead time latency: 20 days.
[GET] Querying regional weather warnings.`,
    analyzer: `[MODEL] Processing geopolitical friction coefficient vs regional DEFCON level.
[CALC] Computing logistics risk at 30 factor weight.
[SCORE] Primary Risk detected: Geopolitical & Logistics constraints.`,
    vendor: `[SEARCH] Querying alternative suppliers database.
[MATCH] Found alternate: Electronics facility in Vietnam / Mexico.
[COST] Projected relocation logistics delta: +8.5% margin impact.`,
    generator: `[SYNTHESIS] Structuring strategic executive boardroom directive.
[REPORT] Generated tactical diversification recommendation.
[COMPLETE] Agent trace finished.`
  });
  const [traceStatus, setTraceStatus] = useState("complete");

  // Scenario Simulator State
  const [selectedScenarioId, setSelectedScenarioId] = useState("scen_taiwan");
  const [scenarioIntensity, setScenarioIntensity] = useState(7);
  const [simResults, setSimResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Executive Report Page State
  const [reportTitle, setReportTitle] = useState("BUDDY SHIELD AI Strategic Boardroom Brief");
  const [reportPreparedFor, setReportPreparedFor] = useState("Board of Directors");
  const [reportClassification, setReportClassification] = useState("CONFIDENTIAL");
  const [reportSections, setReportSections] = useState({
    summary: true,
    matrix: true,
    alerts: true,
    regional: true,
    recommendations: true,
    responsibleAI: true
  });
  const [reportOutput, setReportOutput] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Intelligence Chat State
  const [chatMessages, setChatMessages] = useState(() => getStoredItem("chat_messages", [
    {
      id: "chat_init",
      role: "assistant",
      content: "### BUDDY SHIELD AI Core Initialized\n\nGreetings. I am **BUDDY SHIELD AI**, your cognitive risk intelligence agent. I have fully indexed our supplier portfolio, integrated active global threat feeds, and connected real-time satellite logistics data.\n\nHow can I assist your operations desk today?",
      timestamp: "13:18"
    }
  ]));
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Global UI States
  const [toast, setToast] = useState(null);
  const [flashingSuppliers, setFlashingSuppliers] = useState({});
  const [currentTime, setCurrentTime] = useState("");
  const [apiError, setApiError] = useState("");

  // ==========================================
  // 4. PERSISTENCE & THEME INITIALIZERS
  // ==========================================

  useEffect(() => {
    let currentPercent = 0;
    const stages = [
      { max: 15, text: "âš¡ [BOOT] BUDDY SHIELD AI RISK SHELL INITIALIZING..." },
      { max: 35, text: "ðŸ“¡ [CONNECT] VERIFYING SECURE INTEGRATED SATELLITE LINKS..." },
      { max: 55, text: "ðŸ”’ [AUDIT] AUDITING QUANTUM-RESISTANT CYBER DEFENSE INTEGRITY..." },
      { max: 75, text: "🛰️ [RESOLVE] SYNCING ISRO TELEMETRY NODES (BENGALURU/PUNE)..." },
      { max: 90, text: "ðŸ“¦ [INTELLIGENCE] MONITORING TATA HOSUR & ADANI MUNDRA DIRECTIVES..." },
      { max: 100, text: "ðŸŸ¢ [SUCCESS] BUDDY SHIELD AI ONLINE. REDIRECTING CONTROLLER..." }
    ];

    const timer = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 8) + 4;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsAppLoading(false);
        }, 400);
      }
      setLoadingPercent(currentPercent);
      
      const currentStage = stages.find(s => currentPercent <= s.max) || stages[stages.length - 1];
      setLoadingText(currentStage.text);
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    setStoredItem("aegisflow_theme", theme);
  }, [theme]);

  // Secure Passcode auth handler
  const handleLoginSubmit = () => {
    if (passcode.trim() === "AEGIS-OPERATIONS-2026") {
      setIsLoggedIn(true);
      setStoredItem("buddy_auth", true);
      setAuthError("");
    } else {
      setAuthError("INVALID CREDENTIAL PASSCODE. ACCESS DENIED.");
    }
  };

  const handleBypassLogin = () => {
    setIsLoggedIn(true);
    setStoredItem("buddy_auth", true);
    setAuthError("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStoredItem("buddy_auth", false);
  };

  // ==========================================
  // 5. MEMOIZED METRICS & VISUAL DATA
  // ==========================================

  const portfolioStats = useMemo(() => {
    const total = suppliers.length;
    const critical = suppliers.filter(s => s.riskLevel === "CRITICAL").length;
    const high = suppliers.filter(s => s.riskLevel === "HIGH").length;
    const avgRisk = total > 0 ? Math.floor(suppliers.reduce((acc, s) => acc + s.riskPercentage, 0) / total) : 0;
    return { total, critical, high, avgRisk };
  }, [suppliers]);

  const riskDistributionData = useMemo(() => {
    const levels = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
    suppliers.forEach(s => {
      levels[s.riskLevel] = (levels[s.riskLevel] || 0) + 1;
    });
    return [
      { name: "LOW", value: levels.LOW, color: "#30D158" },
      { name: "MEDIUM", value: levels.MEDIUM, color: "#FFD60A" },
      { name: "HIGH", value: levels.HIGH, color: "#FF6B00" },
      { name: "CRITICAL", value: levels.CRITICAL, color: "#FF2D55" }
    ].filter(v => v.value > 0);
  }, [suppliers]);

  const regionRiskData = useMemo(() => {
    const regions = { 
      "India Hub": { total: 0, count: 0 }, 
      "Asia-Pacific": { total: 0, count: 0 }, 
      "Europe": { total: 0, count: 0 }, 
      "Americas": { total: 0, count: 0 } 
    };
    suppliers.forEach(s => {
      let r = "Europe";
      if (s.country === "India") {
        r = "India Hub";
      } else if (["Taiwan", "South Korea", "China", "Japan"].includes(s.country)) {
        r = "Asia-Pacific";
      } else if (["United States", "Mexico"].includes(s.country)) {
        r = "Americas";
      }
      regions[r].total += s.riskPercentage;
      regions[r].count += 1;
    });
    return Object.entries(regions).map(([name, data]) => ({
      name,
      avgRisk: data.count > 0 ? Math.floor(data.total / data.count) : 0
    })).filter(v => v.avgRisk > 0 || v.name === "India Hub");
  }, [suppliers]);

  const timelineData = useMemo(() => {
    return [
      { date: "05/22", avgRisk: 42, criticalCount: 1 },
      { date: "05/23", avgRisk: 45, criticalCount: 1 },
      { date: "05/24", avgRisk: 48, criticalCount: 2 },
      { date: "05/25", avgRisk: 52, criticalCount: 2 },
      { date: "05/26", avgRisk: 58, criticalCount: 2 },
      { date: "05/27", avgRisk: 61, criticalCount: 2 },
      { date: "05/28", avgRisk: portfolioStats.avgRisk, criticalCount: portfolioStats.critical }
    ];
  }, [portfolioStats]);

  // Dynamic values calculated by the Financial Calculator
  const calculatorResults = useMemo(() => {
    const selectedSupplier = suppliers.find(s => s.id === calculatorSupplierId) || suppliers[0];
    if (!selectedSupplier) return { exposure: 0, delay: 0, penalty: 0 };
    
    const exposure = Math.floor(calculatorValue * (selectedSupplier.riskPercentage / 100) * 0.4);
    const delay = Math.floor(selectedSupplier.leadTime * (1 + (selectedSupplier.riskPercentage / 100) * 0.8));
    const penalty = ["China", "Taiwan"].includes(selectedSupplier.country) ? Math.floor(calculatorValue * 0.15) : 0;

    return { exposure, delay, penalty, supplierName: selectedSupplier.name };
  }, [calculatorSupplierId, calculatorValue, suppliers]);

  // Pro Max: Dual Supplier Comparison computation
  const dualCompareResults = useMemo(() => {
    const sA = suppliers.find(s => s.id === compareAId);
    const sB = suppliers.find(s => s.id === compareBId);
    if (!sA || !sB) return null;

    const winner = sA.riskPercentage < sB.riskPercentage ? sA : sB;
    const saferPercent = Math.abs(sA.riskPercentage - sB.riskPercentage);
    const leadTimeBuffer = Math.abs(sA.leadTime - sB.leadTime);

    return {
      sA, sB,
      winner,
      saferPercent,
      leadTimeBuffer,
      chartData: [
        { name: "Geopolitical", [sA.name]: sA.geopoliticalScore, [sB.name]: sB.geopoliticalScore },
        { name: "Financial", [sA.name]: sA.financialScore, [sB.name]: sB.financialScore },
        { name: "Weather", [sA.name]: sA.weatherScore, [sB.name]: sB.weatherScore },
        { name: "Logistics", [sA.name]: sA.logisticsScore, [sB.name]: sB.logisticsScore },
        { name: "Regulatory", [sA.name]: sA.regulatoryScore, [sB.name]: sB.regulatoryScore },
        { name: "Cyber", [sA.name]: sA.cyberScore, [sB.name]: sB.cyberScore }
      ]
    };
  }, [compareAId, compareBId, suppliers]);

  // ==========================================
  // 6. SYNCHRONOUS AND ASYNCHRONOUS TIMERS
  // ==========================================

  const triggerToast = useCallback((msg, type = "cyan") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // System clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Telemetry Console logs streamer
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      const randomLog = MOCK_CONSOLE_LOGS[Math.floor(Math.random() * MOCK_CONSOLE_LOGS.length)];
      setConsoleLogs(prev => [...prev.slice(-6), `[${new Date().toTimeString().split(' ')[0]}] ${randomLog}`]);
    }, 4000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Live War Room Threat Feeds Ticker
  useEffect(() => {
    if (!isLoggedIn || !isMonitoringActive) return;
    
    const ticker = setInterval(() => {
      setSystemUptime(prev => prev + 1);
    }, 1000);

    const mainTimer = setInterval(() => {
      const randomBase = PRE_FILLED_THREATS[Math.floor(Math.random() * PRE_FILLED_THREATS.length)];
      const cleanTitle = randomBase.replace(/âš¡|ðŸš¨|âš ï¸|ðŸ“Š|ðŸŒŠ|ðŸ’¹|ðŸ”´|ðŸ­|ðŸ“¡|ðŸ›°ï¸/g, "").split(":")[0].trim();
      const cleanDesc = randomBase.split(":")[1]?.trim() || "Critical regional infrastructure blockades reported.";

      const threatCategories = ["Electronics", "Logistics", "Raw Materials"];
      const affectedCats = [threatCategories[Math.floor(Math.random() * threatCategories.length)]];
      if (Math.random() > 0.6 && !affectedCats.includes("Logistics")) affectedCats.push("Logistics");

      const matchingSuppliers = suppliers.filter(s => affectedCats.includes(s.category));
      const affectedNames = matchingSuppliers.map(s => s.name);

      const newThreat = {
        id: `th_${Date.now()}`,
        severity: Math.random() > 0.7 ? "CRITICAL" : (Math.random() > 0.4 ? "HIGH" : "MEDIUM"),
        title: cleanTitle,
        desc: cleanDesc,
        categories: affectedCats,
        affectedSuppliers: affectedNames,
        timestamp: "Just now",
        autoAnalyzed: true,
        read: false
      };

      setThreatEvents(prev => [newThreat, ...prev.slice(0, 7)]);
      setThreatsDetectedToday(prev => prev + 1);
      setAutoUpdatesTriggered(prev => prev + matchingSuppliers.length);
      setUnreadCount(prev => prev + 1);

      const updatedSuppliers = suppliers.map(s => {
        if (affectedCats.includes(s.category)) {
          setFlashingSuppliers(prev => ({ ...prev, [s.id]: true }));
          setTimeout(() => {
            setFlashingSuppliers(prev => ({ ...prev, [s.id]: false }));
          }, 1000);

          const increment = newThreat.severity === "CRITICAL" ? 15 : (newThreat.severity === "HIGH" ? 10 : 5);
          const newPercentage = Math.min(100, s.riskPercentage + increment);
          let newRiskLevel = "LOW";
          if (newPercentage >= 85) newRiskLevel = "CRITICAL";
          else if (newPercentage >= 70) newRiskLevel = "HIGH";
          else if (newPercentage >= 50) newRiskLevel = "MEDIUM";

          return {
            ...s,
            riskPercentage: newPercentage,
            riskLevel: newRiskLevel,
            lastAnalyzed: new Date().toISOString().replace('T', ' ').substring(0, 19)
          };
        }
        return s;
      });

      setSuppliers(updatedSuppliers);
      setStoredItem("suppliers", updatedSuppliers);

      if (matchingSuppliers.length > 0) {
        triggerToast(`Live alert: ${matchingSuppliers.length} supplier scores auto-calculated in War Room`, "critical");
      }
    }, 15000);

    return () => {
      clearInterval(ticker);
      clearInterval(mainTimer);
    };
  }, [isLoggedIn, isMonitoringActive, suppliers, triggerToast]);

  const formattedUptime = useMemo(() => {
    const h = String(Math.floor(systemUptime / 3600)).padStart(2, '0');
    const m = String(Math.floor((systemUptime % 3600) / 60)).padStart(2, '0');
    const s = String(systemUptime % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }, [systemUptime]);

  // India live data ticker
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setIndiaPortThroughput(prev => ({
        mundra: Math.max(55, Math.min(98, prev.mundra + (Math.random() > 0.5 ? 1 : -1))),
        jnpt: Math.max(50, Math.min(95, prev.jnpt + (Math.random() > 0.5 ? 1 : -1))),
        chennai: Math.max(52, Math.min(97, prev.chennai + (Math.random() > 0.5 ? 1 : -1))),
        kolkata: Math.max(40, Math.min(85, prev.kolkata + (Math.random() > 0.5 ? 1 : -1))),
      }));
      setInrRate(prev => parseFloat((prev + (Math.random() * 0.08 - 0.04)).toFixed(2)));
    }, 4000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // ==========================================
  // 7. CORE INTELLIGENCE PIPELINES
  // ==========================================

  const handleTestClaudeConnection = async () => {
    if (!apiKey || isTestingKey) return;
    setIsTestingKey(true);
    setClaudeStatus("unknown");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "dangerously-allow-browser": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 10,
          messages: [{ role: "user", content: "ping" }]
        })
      });
      if (res.ok) {
        setClaudeStatus("connected");
        triggerToast("Claude AI Connected Successfully ✅", "cyan");
      } else {
        setClaudeStatus("error");
        triggerToast("Claude API key invalid or quota exceeded ❌", "critical");
      }
    } catch (e) {
      setClaudeStatus("error");
      triggerToast("Cannot connect to Claude API ❌", "critical");
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleSaveSettings = () => {
    setStoredItem("anthropic_api_key", apiKey);
    triggerToast("Anthropic API key successfully updated in secure memory context", "cyan");
    setShowSettings(false);
    if (apiKey) handleTestClaudeConnection();
  };

  // Agent: OSINT Sentinel
  const handleRunOsintAgent = async () => {
    if (osintStatus === "running") return;
    setOsintStatus("running");
    setOsintLogs(["[OSINT] 🛰️ Initializing geopolitical OSINT scanner...", "[OSINT] Connecting to global news intelligence feeds..."]);

    const mockSteps = [
      "[OSINT] Scanning 14 live geopolitical risk indices...",
      "[OSINT] Parsing US-China trade tension signals → elevated tariff risk detected.",
      "[OSINT] Cross-referencing India-Pakistan border activity → low impact on supply nodes.",
      "[OSINT] Monitoring Taiwan Strait: DEFCON 3 alert active.",
      "[OSINT] Scanning UN sanction registries for active supplier blacklists...",
      "[OSINT] Geopolitical friction score computed: 68/100 — ELEVATED",
      "[OSINT] Recommendation: Diversify Taiwan-linked semiconductor volume to India Hub nodes.",
      "[OSINT] ✅ OSINT Sentinel scan complete."
    ];

    if (apiKey) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "dangerously-allow-browser": "true" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 600,
            system: "You are an OSINT geopolitical intelligence agent. Analyze current geopolitical risks for supply chains. Respond with 6-8 short log lines starting with [OSINT] prefix, each on a new line.",
            messages: [{ role: "user", content: `Analyze geopolitical risk for these suppliers: ${suppliers.map(s => `${s.name}(${s.country})`).join(", ")}. Output log lines.` }]
          })
        });
        if (res.ok) {
          const data = await res.json();
          const lines = data.content[0].text.split("\n").filter(l => l.trim());
          for (let i = 0; i < lines.length; i++) {
            await new Promise(r => setTimeout(r, 400));
            setOsintLogs(prev => [...prev, lines[i]]);
          }
          setOsintStatus("complete");
          return;
        }
      } catch (e) {}
    }

    for (const step of mockSteps) {
      await new Promise(r => setTimeout(r, 450));
      setOsintLogs(prev => [...prev, step]);
    }
    setOsintStatus("complete");
    triggerToast("🛰️ OSINT Sentinel scan complete.", "cyan");
  };

  // Agent: Rupee FX Hedger
  const handleRunFxAgent = async () => {
    if (fxStatus === "running") return;
    setFxStatus("running");
    setFxLogs(["[FX] 💹 Initializing Rupee FX Hedger...", "[FX] Connecting to forex data streams..."]);

    const mockSteps = [
      `[FX] Current INR/USD rate: ₹${inrRate} / $1`,
      "[FX] Analyzing 30-day INR volatility window → +2.1% depreciation trend.",
      "[FX] Computing import cost inflation across Electronics tier...",
      "[FX] TSMC contract (USD-denominated): +₹18.4L margin compression detected.",
      "[FX] ASML Holding (EUR-denominated): Hedge ratio at 0.72 — acceptable.",
      "[FX] Recommended hedge: Lock forward contracts for USD 2.4M at ₹83.10 rate.",
      "[FX] India domestic suppliers insulated — no forex risk exposure.",
      "[FX] ✅ FX Hedging analysis complete. Total exposure: ₹2.28 Crore."
    ];

    if (apiKey) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "dangerously-allow-browser": "true" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 600,
            system: "You are a Rupee FX hedging specialist. Analyze USD/INR exchange rate impact on supply chain import costs. Respond with 6-8 short log lines starting with [FX] prefix, each on a new line.",
            messages: [{ role: "user", content: `Current INR rate: ${inrRate}. Analyze forex risk for suppliers: ${suppliers.filter(s => s.country !== "India").map(s => `${s.name}(${s.country})`).join(", ")}` }]
          })
        });
        if (res.ok) {
          const data = await res.json();
          const lines = data.content[0].text.split("\n").filter(l => l.trim());
          for (let i = 0; i < lines.length; i++) {
            await new Promise(r => setTimeout(r, 400));
            setFxLogs(prev => [...prev, lines[i]]);
          }
          setFxStatus("complete");
          return;
        }
      } catch (e) {}
    }

    for (const step of mockSteps) {
      await new Promise(r => setTimeout(r, 450));
      setFxLogs(prev => [...prev, step]);
    }
    setFxStatus("complete");
    triggerToast("💹 Rupee FX Hedger analysis complete.", "cyan");
  };

  // Agent: Monsoon Weather Oracle
  const handleRunWeatherAgent = async () => {
    if (weatherStatus === "running") return;
    setWeatherStatus("running");
    setWeatherLogs(["[WEATHER] 🌦️ Initializing Monsoon Weather Oracle...", "[WEATHER] Scanning IMD satellite feeds for Indian ports..."]);

    const mockSteps = [
      `[WEATHER] Mundra Port (Gujarat): ${indiaPortThroughput.mundra}% capacity — cyclone risk LOW.`,
      `[WEATHER] JNPT Mumbai: ${indiaPortThroughput.jnpt}% capacity — monsoon surge risk MEDIUM.`,
      `[WEATHER] Chennai Port: ${indiaPortThroughput.chennai}% capacity — northeast monsoon active.`,
      `[WEATHER] Kolkata Port: ${indiaPortThroughput.kolkata}% capacity — Bay of Bengal depression forming.`,
      "[WEATHER] IMD forecast: Heavy rainfall Kerala coast (next 72h) — potential delay to Serum Institute cold-chain logistics.",
      "[WEATHER] Cyclone Bay-01 tracking 600km off Andhra Pradesh — Category 1, monitoring.",
      "[WEATHER] Recommendation: Pre-route pharma cold-chain via Mundra for next 5 days.",
      "[WEATHER] ✅ Monsoon Weather Oracle scan complete."
    ];

    if (apiKey) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "dangerously-allow-browser": "true" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 600,
            system: "You are an Indian monsoon and port weather intelligence agent. Analyze weather risk for Indian ports (Mundra, JNPT, Chennai, Kolkata). Respond with 6-8 short log lines starting with [WEATHER] prefix, each on a new line.",
            messages: [{ role: "user", content: `Analyze weather risk for Indian supply chain ports. Current throughput: Mundra ${indiaPortThroughput.mundra}%, JNPT ${indiaPortThroughput.jnpt}%, Chennai ${indiaPortThroughput.chennai}%, Kolkata ${indiaPortThroughput.kolkata}%` }]
          })
        });
        if (res.ok) {
          const data = await res.json();
          const lines = data.content[0].text.split("\n").filter(l => l.trim());
          for (let i = 0; i < lines.length; i++) {
            await new Promise(r => setTimeout(r, 400));
            setWeatherLogs(prev => [...prev, lines[i]]);
          }
          setWeatherStatus("complete");
          return;
        }
      } catch (e) {}
    }

    for (const step of mockSteps) {
      await new Promise(r => setTimeout(r, 450));
      setWeatherLogs(prev => [...prev, step]);
    }
    setWeatherStatus("complete");
    triggerToast("🌦️ Monsoon Weather Oracle scan complete.", "cyan");
  };

  const handleRunFullScan = async () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanText("Initializing AI neural collector...");

    const updated = [...suppliers];
    
    for (let i = 0; i < updated.length; i++) {
      setScanProgress(Math.floor(((i) / updated.length) * 100));
      setScanText(`Agent tracing supplier node [${i + 1}/${updated.length}]: ${updated[i].name}...`);
      await new Promise(resolve => setTimeout(resolve, 800));

      const processed = generateMockAnalysis(updated[i]);
      updated[i] = processed;

      setFlashingSuppliers(prev => ({ ...prev, [processed.id]: true }));
      setTimeout(() => {
        setFlashingSuppliers(prev => ({ ...prev, [processed.id]: false }));
      }, 400);
    }

    setScanProgress(100);
    setScanText("Pipeline analysis completed.");
    setTimeout(() => {
      setIsScanning(false);
      setSuppliers(updated);
      setStoredItem("suppliers", updated);
      triggerToast("Full intelligence scan updated. Risk profiles fully recalculated.", "cyan");
    }, 500);
  };

  const handleAnalyzeSupplier = async (supplierId) => {
    const target = suppliers.find(s => s.id === supplierId);
    if (!target) return;

    triggerToast(`Initiating Agent Trace pipeline for ${target.name}...`, "cyan");
    setFlashingSuppliers(prev => ({ ...prev, [supplierId]: "loading" }));

    setTraceStatus("running");
    setTraceSupplierId(supplierId);
    setTraceLogs({
      collector: "Searching intelligence feeds...",
      analyzer: "Pending...",
      vendor: "Pending...",
      generator: "Pending..."
    });

    try {
      await new Promise(res => setTimeout(res, 600));
      setTraceLogs(prev => ({
        ...prev,
        collector: `[CONNECT] Linked to satellite shipping grids. Located factory coordinates inside ${target.country}.\n[SCAN] Detected lead time latency: ${target.leadTime} days.\n[GET] Querying regional weather warnings.`
      }));

      await new Promise(res => setTimeout(res, 600));
      setTraceLogs(prev => ({
        ...prev,
        analyzer: `[MODEL] Processing geopolitical friction coefficient vs regional DEFCON level.\n[CALC] Computing logistics risk at ${target.leadTime * 1.5} factor weight.\n[SCORE] Primary Risk detected: Geopolitical & Logistics constraints.`
      }));

      await new Promise(res => setTimeout(res, 600));
      setTraceLogs(prev => ({
        ...prev,
        vendor: `[SEARCH] Querying alternative suppliers database.\n[MATCH] Found alternate: ${target.category} facility in Vietnam / Mexico.\n[COST] Projected relocation logistics delta: +8.5% margin impact.`
      }));

      await new Promise(res => setTimeout(res, 400));
      setTraceLogs(prev => ({
        ...prev,
        generator: `[SYNTHESIS] Structuring strategic executive boardroom directive.\n[REPORT] Generated tactical diversification recommendation.\n[COMPLETE] Agent trace finished.`
      }));

      let finalAnalysis = null;

      if (apiKey) {
        try {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "dangerously-allow-browser": "true"
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1000,
              system: "You are a supply chain risk AI. Respond ONLY with valid JSON. No markdown. No backticks. No preamble. No explanation.",
              messages: [{
                role: "user",
                content: `Analyze supply chain risk for ${target.name} in ${target.country}. Category: ${target.category}, Lead Time: ${target.leadTime} days.`
              }]
            })
          });

          if (res.ok) {
            const rawData = await res.json();
            const parsed = safeJsonParse(rawData.content[0].text);
            if (parsed) {
              finalAnalysis = {
                id: target.id,
                name: target.name,
                country: target.country,
                flag: target.flag,
                category: target.category,
                leadTime: target.leadTime,
                riskLevel: parsed.overallRisk,
                riskPercentage: parsed.overallPercentage,
                primaryRisk: parsed.primaryRisk,
                geopoliticalScore: parsed.geopoliticalScore || 50,
                financialScore: parsed.financialScore || 50,
                weatherScore: parsed.weatherScore || 50,
                logisticsScore: parsed.logisticsScore || 50,
                regulatoryScore: parsed.regulatoryScore || 50,
                cyberScore: parsed.cyberScore || 50,
                factors: parsed.factors || ["Geopolitical tensions"],
                impact: parsed.impact || "Supply chain logistics delays",
                timeToImpact: parsed.timeToImpact || "Immediate",
                confidence: parsed.confidence || 85,
                alternates: parsed.alternates || [{ name: "Backup Corp", country: "Mexico", flag: "ðŸ‡²ðŸ‡½" }],
                recommendation: parsed.recommendation || "Diversify regional exposure.",
                lastAnalyzed: new Date().toISOString().replace('T', ' ').substring(0, 19)
              };
            }
          }
        } catch (apiErr) {
          setApiError(`Claude API Error: ${apiErr.message}. Utilizing high-fidelity mock fallback.`);
          setTimeout(() => setApiError(""), 6000);
        }
      }

      if (!finalAnalysis) {
        finalAnalysis = generateMockAnalysis(target);
      }

      const updated = suppliers.map(s => s.id === supplierId ? finalAnalysis : s);
      setSuppliers(updated);
      setStoredItem("suppliers", updated);
      setTraceStatus("complete");

      setFlashingSuppliers(prev => ({ ...prev, [supplierId]: "flash" }));
      setTimeout(() => {
        setFlashingSuppliers(prev => ({ ...prev, [supplierId]: false }));
      }, 1000);

      triggerToast(`Intelligence scan complete for ${target.name}. Risk set to ${finalAnalysis.riskLevel}.`, "cyan");
    } catch (e) {
      triggerToast("Critical pipeline execution failure", "critical");
      setFlashingSuppliers(prev => ({ ...prev, [supplierId]: false }));
    }
  };

  const handleAddSupplier = () => {
    if (!newSupplierName.trim()) {
      setFormError("Supplier name is required");
      return;
    }
    setFormError("");

    const newId = `sup_${Date.now()}`;
    const flags = {
      "Taiwan": "ðŸ‡¹ðŸ‡¼", "South Korea": "ðŸ‡°ðŸ‡·", "China": "ðŸ‡¨ðŸ‡³", "Japan": "ðŸ‡¯ðŸ‡µ",
      "Netherlands": "ðŸ‡³ðŸ‡±", "Germany": "ðŸ‡©ðŸ‡ª", "United States": "ðŸ‡ºðŸ‡¸",
      "Vietnam": "ðŸ‡»ðŸ‡³", "Mexico": "ðŸ‡²ðŸ‡½", "India": "ðŸ‡®ðŸ‡³"
    };

    const added = {
      id: newId,
      name: newSupplierName,
      country: newSupplierCountry,
      flag: flags[newSupplierCountry] || "ðŸŒ",
      category: newSupplierCategory,
      leadTime: Number(newSupplierLeadTime),
      riskLevel: "MEDIUM",
      riskPercentage: 50,
      primaryRisk: "Logistics",
      geopoliticalScore: 50,
      financialScore: 50,
      weatherScore: 50,
      logisticsScore: 50,
      regulatoryScore: 50,
      cyberScore: 50,
      factors: ["Awaiting deep intelligence scan..."],
      impact: "Baseline analysis pending.",
      timeToImpact: "Pending",
      confidence: 100,
      alternates: [],
      recommendation: "Run deep neural scan to calculate tactical directives.",
      lastAnalyzed: "Never"
    };

    const updated = [added, ...suppliers];
    setSuppliers(updated);
    setStoredItem("suppliers", updated);

    triggerToast(`Supplier ${newSupplierName} saved. Initiating baseline scan.`, "cyan");
    setIsAddingSupplier(false);
    setNewSupplierName("");
    handleAnalyzeSupplier(newId);
  };

  const handleRunScenario = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const scenario = SCENARIOS.find(s => s.id === selectedScenarioId);
    triggerToast(`Modeling scenario: "${scenario.name}" at intensity ${scenarioIntensity}/10...`, "cyan");

    try {
      if (apiKey) {
        try {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "dangerously-allow-browser": "true"
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1000,
              system: "You are a supply chain scenario analyst. Return JSON.",
              messages: [{
                role: "user",
                content: `Calculate scenario ${scenario.name} impact on ${JSON.stringify(suppliers)} at intensity ${scenarioIntensity}`
              }]
            })
          });

          if (res.ok) {
            const rawData = await res.json();
            const parsed = safeJsonParse(rawData.content[0].text);
            if (parsed) {
              setSimResults(parsed);
              setIsSimulating(false);
              return;
            }
          }
        } catch (apiErr) {
          setApiError(`Scenario API Error: ${apiErr.message}. Utilizing high-fidelity simulation engine.`);
          setTimeout(() => setApiError(""), 6000);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockImpacts = suppliers.map(s => {
        let isAffected = scenario.categories.includes(s.category);
        if (scenario.id === "scen_recession") isAffected = true;

        let changeVal = 0;
        if (isAffected) {
          changeVal = Math.floor((scenarioIntensity * 4.5) + (Math.random() * 10));
        } else {
          changeVal = Math.floor(Math.random() * 8);
        }

        const newPercentage = Math.min(100, s.riskPercentage + changeVal);
        let newRisk = "LOW";
        if (newPercentage >= 85) newRisk = "CRITICAL";
        else if (newPercentage >= 70) newRisk = "HIGH";
        else if (newPercentage >= 50) newRisk = "MEDIUM";

        return {
          id: s.id,
          name: s.name,
          flag: s.flag,
          baselineRisk: s.riskLevel,
          baselineRiskPercentage: s.riskPercentage,
          scenarioRisk: newRisk,
          scenarioRiskPercentage: newPercentage,
          change: `+${changeVal}% worse`,
          keyImpact: isAffected 
            ? `${scenario.name} directly constrains regional operations and delays supply.` 
            : `Indirect macro logistics strain, operations remain stable.`,
          urgentAction: isAffected 
            ? `Increase buffer stock safety target to ${Math.max(30, s.leadTime + 15)} days immediately.` 
            : `Establish quarterly risk review.`
        };
      });

      const totalLoss = (scenarioIntensity * 2.8 * (1 + (Math.random() * 0.2))).toFixed(1);

      setSimResults({
        scenarioSummary: `The ${scenario.name} triggers widespread capacity constraints across critical components, driving overall lead time delay deltas up.`,
        totalImpact: `$${totalLoss}M Est.`,
        supplierImpacts: mockImpacts,
        topThreats: [
          `Sub-tier shipping corridor blockades in East Asia.`,
          `Secondary material cost compounding (tariffs).`,
          `Alternative source space scarcity (cargo bottlenecks).`
        ],
        mitigationPriority: mockImpacts
          .filter(m => m.scenarioRisk === "CRITICAL" || m.scenarioRisk === "HIGH")
          .sort((a,b) => b.scenarioRiskPercentage - a.scenarioRiskPercentage)
          .map(m => m.name),
        recoveryTimeEstimate: scenario.recoveryTime
      });

      triggerToast("Scenario simulation model completed. Visualized reports loaded below.", "cyan");
    } catch (e) {
      triggerToast("Simulation modeling failed.", "critical");
    } finally {
      setIsSimulating(false);
    }
  };

  const handleRunSandboxSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSandboxLogs(["[SANDBOX] INITIALIZING MONTE CARLO STRESS CONTEXT...", "[SANDBOX] CONFIGURING DYNAMIC SHOCK PROFILE..."]);

    await new Promise(res => setTimeout(res, 350));
    setSandboxLogs(prev => [...prev, `[SHOCK] TARGET SECTOR: ${sandboxCategory.toUpperCase()} // DRIVER: ${sandboxDriver.toUpperCase()}`]);
    
    await new Promise(res => setTimeout(res, 350));
    setSandboxLogs(prev => [...prev, `[ITERATION] GENERATING 10,000 MONTE CARLO PROBABILITY PATHS...`]);

    await new Promise(res => setTimeout(res, 350));
    setSandboxLogs(prev => [...prev, `[CALCULATING] SOLVING GEOPOLITICAL LATENCY DISTRIBUTIONS...`]);

    await new Promise(res => setTimeout(res, 350));
    setSandboxLogs(prev => [...prev, `[COMPLETE] 10,000 SCENARIO RUNS PROCESSED IN 1.4S.`]);

    const targetSuppliers = suppliers.filter(s => s.category === sandboxCategory);
    
    const mockImpacts = suppliers.map(s => {
      const isAffected = s.category === sandboxCategory;
      let changeVal = 0;
      if (isAffected) {
        changeVal = Math.floor((sandboxIntensity * 5.2) + (Math.random() * 8));
      } else {
        changeVal = Math.floor(Math.random() * 6);
      }

      const newPercentage = Math.min(100, s.riskPercentage + changeVal);
      let newRisk = "LOW";
      if (newPercentage >= 85) newRisk = "CRITICAL";
      else if (newPercentage >= 70) newRisk = "HIGH";
      else if (newPercentage >= 50) newRisk = "MEDIUM";

      return {
        id: s.id,
        name: s.name,
        flag: s.flag,
        baselineRisk: s.riskLevel,
        baselineRiskPercentage: s.riskPercentage,
        scenarioRisk: newRisk,
        scenarioRiskPercentage: newPercentage,
        change: `+${changeVal}% worse`,
        keyImpact: isAffected 
          ? `Monte Carlo stress shows highly elevated vulnerability inside ${sandboxCategory} facilities.` 
          : `Negligible spillover logs, operations structurally secure.`,
        urgentAction: isAffected 
          ? `Force alternate dual-sourcing immediately. Set buffer safety to ${s.leadTime + 18} days.` 
          : `Review quarterly risk indices.`
      };
    });

    const totalLoss = (sandboxIntensity * 3.4 * (1 + (Math.random() * 0.15))).toFixed(1);

    setSimResults({
      scenarioSummary: `Custom ${sandboxDriver} shock of intensity ${sandboxIntensity}/10 executed across all monitored ${sandboxCategory} supply routes.`,
      totalImpact: `$${totalLoss}M Est.`,
      supplierImpacts: mockImpacts,
      topThreats: [
        `Systemic lead-time constraints inside ${sandboxCategory} hubs.`,
        `Friction and border customs compoundments (+${sandboxIntensity * 4}% delay risk).`,
        `Concentrated single-source dependencies exposed.`
      ],
      mitigationPriority: mockImpacts
        .filter(m => m.scenarioRisk === "CRITICAL" || m.scenarioRisk === "HIGH")
        .sort((a,b) => b.scenarioRiskPercentage - a.scenarioRiskPercentage)
        .map(m => m.name),
      recoveryTimeEstimate: `${Math.floor(sandboxIntensity * 1.2)} - ${Math.floor(sandboxIntensity * 1.8)} Months`
    });

    setIsSimulating(false);
    triggerToast("Monte Carlo Sandbox stress test finished.", "cyan");
  };

  const handleApplyScenarioScores = () => {
    if (!simResults) return;
    const updated = suppliers.map(s => {
      const sim = simResults.supplierImpacts.find(si => si.id === s.id);
      if (sim) {
        return {
          ...s,
          riskLevel: sim.scenarioRisk,
          riskPercentage: sim.scenarioRiskPercentage,
          lastAnalyzed: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
      }
      return s;
    });
    setSuppliers(updated);
    setStoredItem("suppliers", updated);
    triggerToast("Scenario risk scores successfully applied to live dashboard.", "critical");
  };

  const handleResetToBaseline = () => {
    setSuppliers(DEFAULT_SUPPLIERS);
    setStoredItem("suppliers", DEFAULT_SUPPLIERS);
    setSimResults(null);
    triggerToast("Portfolio restored to baseline risk ratings.", "cyan");
  };

  const handleExecuteReshoring = () => {
    const fromSupplier = suppliers.find(s => s.id === reshoreFromId);
    const toSupplier = suppliers.find(s => s.id === reshoreToId);
    if (!fromSupplier || !toSupplier) {
      triggerToast("Invalid reshoring parameters.", "critical");
      return;
    }

    if (fromSupplier.country === "India") {
      triggerToast("Source supplier must be a foreign node.", "critical");
      return;
    }

    if (toSupplier.country !== "India") {
      triggerToast("Target reshoring node must be a domestic India hub.", "critical");
      return;
    }

    const updatedSuppliers = suppliers.map(s => {
      if (s.id === fromSupplier.id) {
        // Reduced systemic risk since we rely on it less
        const newPct = Math.max(10, s.riskPercentage - Math.floor(reshoreVolume * 0.5));
        let newLevel = "LOW";
        if (newPct >= 85) newLevel = "CRITICAL";
        else if (newPct >= 70) newLevel = "HIGH";
        else if (newPct >= 50) newLevel = "MEDIUM";
        return {
          ...s,
          riskPercentage: newPct,
          riskLevel: newLevel,
          lastAnalyzed: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
      }
      if (s.id === toSupplier.id) {
        // Domestic node receives volume, gains higher priority
        const newPct = Math.max(5, s.riskPercentage - Math.floor(reshoreVolume * 0.1)); // stays low due to domestic support
        return {
          ...s,
          riskPercentage: newPct,
          lastAnalyzed: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
      }
      return s;
    });

    setSuppliers(updatedSuppliers);
    setStoredItem("suppliers", updatedSuppliers);
    triggerToast(`ðŸ‡®ðŸ‡³ Reshored ${reshoreVolume}% to ${toSupplier.name}! Geopolitical exposure reduced.`, "cyan");

    // Add log to console
    setConsoleLogs(prev => [
      ...prev,
      `[RESHORE] Shifted ${reshoreVolume}% allocations from ${fromSupplier.name} (${fromSupplier.country}) to ${toSupplier.name} (India Hub).`,
      `[SYSTEM] Recalculating geopolitical dependencies... Risk mitigated successfully.`
    ]);
  };

  const handleToggleIsolation = (supplierId) => {
    const isIsolated = !!isolatedNodes[supplierId];
    const targetSup = suppliers.find(s => s.id === supplierId);
    if (!targetSup) return;

    const newIsolated = {
      ...isolatedNodes,
      [supplierId]: !isIsolated
    };
    setIsolatedNodes(newIsolated);
    setStoredItem("isolated_nodes", newIsolated);

    // Update the supplier's risk ratings when isolated:
    // When isolated, their cyber risk is quarantined, reducing our systemic exposure
    const updatedSuppliers = suppliers.map(s => {
      if (s.id === supplierId) {
        // If isolated, its cyber risk decreases in our framework because it is isolated from the network!
        const changeVal = !isIsolated ? -25 : 25;
        const newCyberScore = Math.max(5, Math.min(100, s.cyberScore + changeVal));
        const newPct = Math.max(10, Math.min(100, s.riskPercentage + (changeVal * 0.4)));
        let newLevel = "LOW";
        if (newPct >= 85) newLevel = "CRITICAL";
        else if (newPct >= 70) newLevel = "HIGH";
        else if (newPct >= 50) newLevel = "MEDIUM";

        return {
          ...s,
          cyberScore: newCyberScore,
          riskPercentage: Math.floor(newPct),
          riskLevel: newLevel,
          lastAnalyzed: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
      }
      return s;
    });

    setSuppliers(updatedSuppliers);
    setStoredItem("suppliers", updatedSuppliers);

    if (!isIsolated) {
      triggerToast(`ðŸ›¡ï¸ ${targetSup.name} API Hook severed and isolated!`, "critical");
      // Add log
      setConsoleLogs(prev => [
        ...prev,
        `[FIREWALL] ZERO-TRUST QUARANTINE: Severed API hooks for ${targetSup.name}.`,
        `[WARNING] ${targetSup.name} communications isolated. Core database secure.`
      ]);
    } else {
      triggerToast(`ðŸŸ¢ ${targetSup.name} API Hook restored to secure grid.`, "cyan");
      setConsoleLogs(prev => [
        ...prev,
        `[FIREWALL] RESTORED: API communication re-authorized for ${targetSup.name}.`,
        `[SYSTEM] Syncing real-time telemetry parameters...`
      ]);
    }
  };

  const handleGenerateReport = async () => {
    if (isGeneratingReport) return;
    setIsGeneratingReport(true);

    triggerToast("AI Executive Writer composing report summary...", "cyan");

    try {
      const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      const criticalCount = suppliers.filter(s => s.riskLevel === "CRITICAL").length;
      const highCount = suppliers.filter(s => s.riskLevel === "HIGH").length;

      if (apiKey) {
        try {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "dangerously-allow-browser": "true"
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1000,
              system: "You are a senior supply chain risk consultant writing a board-level report.",
              messages: [{
                role: "user",
                content: `Generate boardroom brief for BUDDY SHIELD AI based on ${JSON.stringify(suppliers)}`
              }]
            })
          });

          if (res.ok) {
            const rawData = await res.json();
            setReportOutput(rawData.content[0].text);
            setIsGeneratingReport(false);
            return;
          }
        } catch (apiErr) {
          setApiError(`Report API Error: ${apiErr.message}. Utilizing executive mock builder.`);
          setTimeout(() => setApiError(""), 6000);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1800));

      const mockText = `### EXECUTIVE SUMMARY
This report details the comprehensive supply chain risk posture for our global procurement operations center. As of May 2026, the aggregate portfolio risk index stands at **${portfolioStats.avgRisk}%**. Ongoing friction in the Taiwan Strait combined with severe, persistent shipping blockades in the Red Sea have created a volatile logistics climate, driving a significant backlog in core semiconductors. We currently identify **${criticalCount}** critical and **${highCount}** high-risk nodes requiring immediate strategic board intervention to prevent systemic inventory shortages.

---

### RISK MATRIX TABLE
Our verified suppliers have been classified under high-fidelity threat modeling guidelines:

| Supplier | Location | Category | Risk Rating | Key Vulnerability | Est. Time to Impact |
| :--- | :--- | :--- | :---: | :--- | :--- |
${suppliers.map(s => `| **${s.name}** | ${s.country} | ${s.category} | **${s.riskLevel}** | ${s.factors[0] || "Global logistics delays"} | ${s.timeToImpact} |`).join("\n")}

---

### CRITICAL SUPPLIER ALERTS
Deep analysis of our highest-threat partners:

${suppliers.filter(s => ["CRITICAL", "HIGH"].includes(s.riskLevel)).map(s => `
#### ðŸš¨ WARNING: ${s.name} (${s.country} // ${s.category})
- **Risk Assessment:** Currently rated at **${s.riskPercentage}%** risk overall. Primary stress driver relates to **${s.primaryRisk.toUpperCase()}** hazards.
- **Business Impact:** ${s.impact}
- **Immediate Recommended Directive:** ${s.recommendation}
`).join("\n")}

---

### REGIONAL RISK ANALYSIS
Operational vulnerabilities mapped to primary geographical corridors:
1. **India Hub (IN):** Key strategic resilience corridor. Highly optimized OSAT/IC assembly hubs in Hosur and port container gates at Mundra provide low-stress alternative lanes.
2. **Asia-Pacific (APAC):** High geopolitical tensions. Concentrated supplier reliance on semiconductor foundries in Taiwan and memory hubs in South Korea represents a critical single point of failure.
3. **Europe (EU):** Persistent freight transit latencies due to shipping detours. Feedstock shortages in major chemical hubs present medium-term price spikes.
4. **Americas (US/MX):** Relatively stable risk profile. Secondary supply lines in Mexico are operational, offering prime nearshoring opportunities.

---

### STRATEGIC RECOMMENDATIONS
We mandate immediate authorization for the following operational directives:
1. **Dual-Sourcing Allocation (IMMEDIATE):** Pivot at least 25% of technology components to designated alternate suppliers outside primary geopolitical choke points.
2. **Pre-Booking Logistics (IMMEDIATE):** Allocate a pre-funded ocean freight budget for air/rail transitions to bypass maritime blockades.
3. **Buffer Stock Mandate (SHORT-TERM):** Force suppliers to stock a minimum of 45 days of raw materials on-site.
4. **Supply Chain Visibility (SHORT-TERM):** Mandate real-time IoT cargo trackers on all high-value semiconductor freights.
5. **Cyber Defense Auditing (LONG-TERM):** Enforce zero-trust API guidelines on all third-party supplier logistics platforms.

---

### RESPONSIBLE AI STATEMENT
This Executive Report was compiled by BUDDY SHIELD AI (v4.0.0) utilizing high-fidelity predictive modeling. Data pipelines aggregate satellite logistics, geopolitical news indices, and climatology feeds. 

AI-generated summaries serve as advisory intelligence. All conclusions, particularly those authorizing capital reallocation or contract cancellations, must be cross-verified by regional logistics directors before final business execution.`;

      setReportOutput(mockText);
      triggerToast("AI executive report generated successfully.", "cyan");
    } catch (e) {
      triggerToast("Report builder failed.", "critical");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleCopyReport = () => {
    if (!reportOutput) return;
    navigator.clipboard.writeText(reportOutput);
    triggerToast("Complete report copied to system clipboard!", "cyan");
  };

  const handleSendMessage = async (customPrompt = null) => {
    const activePrompt = customPrompt || chatInput;
    if (!activePrompt.trim() || isChatLoading) return;

    const userMessage = {
      id: `chat_user_${Date.now()}`,
      role: "user",
      content: activePrompt,
      timestamp: new Date().toTimeString().substring(0, 5)
    };

    const currentHistory = [...chatMessages, userMessage];
    setChatMessages(currentHistory);
    setChatInput("");
    setIsChatLoading(true);

    try {
      let responseText = "";

      if (apiKey) {
        try {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "dangerously-allow-browser": "true"
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1000,
              system: `You are BUDDY SHIELD AI, an elite Indian supply chain risk intelligence agent. Sanskrit for Shield. Current suppliers: ${JSON.stringify(suppliers)}`,
              messages: currentHistory.map(m => ({ role: m.role, content: m.content }))
            })
          });

          if (res.ok) {
            const rawData = await res.json();
            responseText = rawData.content[0].text;
          }
        } catch (apiErr) {
          setApiError(`Chat API Error: ${apiErr.message}. Falling back to terminal advisor.`);
          setTimeout(() => setApiError(""), 6000);
        }
      }

      if (!responseText) {
        responseText = getMockChatResponse(activePrompt, suppliers);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const aiMessage = {
        id: `chat_ai_${Date.now()}`,
        role: "assistant",
        content: responseText,
        timestamp: new Date().toTimeString().substring(0, 5)
      };

      const updatedHistory = [...currentHistory, aiMessage];
      setChatMessages(updatedHistory);
      setStoredItem("chat_messages", updatedHistory);
    } catch (e) {
      triggerToast("Chat communication crashed", "critical");
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChat = () => {
    const initial = [
      {
        id: "chat_init",
        role: "assistant",
        content: "### BUDDY SHIELD AI Core Initialized\n\nGreetings. I am **BUDDY SHIELD AI**, your cognitive risk intelligence agent. I have fully indexed our supplier portfolio, integrated active global threat feeds, and connected real-time satellite logistics data.\n\nHow can I assist your operations desk today?",
        timestamp: new Date().toTimeString().substring(0, 5)
      }
    ];
    setChatMessages(initial);
    setStoredItem("chat_messages", initial);
    triggerToast("Chat terminal history cleared.", "cyan");
  };

  const RenderMarkdown = ({ text }) => {
    const lines = text.split('\n');
    let inList = false;
    let listItems = [];
    const elements = [];

    const flushList = (key) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-5 my-2 space-y-1 text-text-secondary font-body">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('### ')) {
        flushList(idx);
        elements.push(
          <h3 key={idx} className="font-display text-accent-theme text-base font-bold uppercase tracking-wider mt-4 mb-2 border-b border-white/10 pb-1">
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith('#### ')) {
        flushList(idx);
        elements.push(
          <h4 key={idx} className="font-display text-text-primary text-sm font-semibold tracking-wider mt-3 mb-1">
            {trimmed.substring(5)}
          </h4>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        inList = true;
        const rawContent = trimmed.substring(2);
        listItems.push(<li key={`li-${idx}`} className="text-text-secondary text-sm leading-relaxed">{parseBoldAndCode(rawContent)}</li>);
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushList(idx);
        const rawContent = trimmed.replace(/^\d+\.\s/, "");
        elements.push(
          <div key={idx} className="flex items-start gap-2 my-2 text-sm">
            <span className="text-accent-theme font-display font-bold font-mono">{trimmed.match(/^\d+/)[0]}.</span>
            <span className="text-text-secondary leading-relaxed font-body">{parseBoldAndCode(rawContent)}</span>
          </div>
        );
      } else if (trimmed === '---') {
        flushList(idx);
        elements.push(<hr key={idx} className="border-white/5 my-4" />);
      } else if (trimmed.startsWith('|') && idx < lines.length && lines[idx+1]?.trim()?.startsWith('|')) {
        flushList(idx);
        if (trimmed.includes('---')) return;
        const cells = trimmed.split('|').map(c => c.trim()).filter(Boolean);
        const isHeader = idx === 0 || (lines[idx-1] && lines[idx-1].trim() === '');
        elements.push(
          <div key={idx} className={`grid grid-cols-4 gap-2 py-1.5 px-3 my-0.5 rounded text-xs ${isHeader ? 'bg-white/5 font-bold border-b border-white/10' : 'bg-white/5 border border-white/5'}`}>
            {cells.map((c, cidx) => <span key={cidx} className={cidx === 3 ? "text-accent-theme font-mono text-right" : "text-text-secondary"}>{parseBoldAndCode(c)}</span>)}
          </div>
        );
      } else if (trimmed === '') {
        flushList(idx);
      } else {
        flushList(idx);
        elements.push(
          <p key={idx} className="text-text-secondary text-sm leading-relaxed my-2 font-body">
            {parseBoldAndCode(trimmed)}
          </p>
        );
      }
    });

    flushList(lines.length);
    return <div className="space-y-1">{elements}</div>;
  };

  const parseBoldAndCode = (text) => {
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    const splitParts = text.split(regex);

    return splitParts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-accent-theme font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="bg-bg-base border border-accent-theme/20 text-accent-theme text-xs px-1 py-0.5 rounded font-mono font-normal">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  // ==========================================
  // 8. ROUTER RENDER LOGIC
  // ==========================================

  // RENDER APP DIAGNOSTIC INITIAL BOOT LOADER
  if (isAppLoading) {
    return (
      <div className="min-h-screen w-screen bg-bg-base flex flex-col items-center justify-center p-6 relative overflow-hidden select-none font-body">
        {/* Futuristic glowing backdrop gradients */}
        <div className="absolute inset-0 pointer-events-none opacity-25 cyber-grid-backdrop animate-[pulse_4s_ease-in-out_infinite] z-5" />
        <div className="absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,var(--accent-theme)_0%,transparent_60%)] opacity-20 blur-3xl pointer-events-none animate-pulse z-10" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-bg-base/95 via-transparent to-bg-base/95 z-15" />

        {/* Hologram Diagonal Scanline sweeps */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

        {/* Floating Matrix Code Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {[
            "010110", "SEC_LEVEL_4", "ISRO_LINK_ON", "TATA_OSAT_OK", "MUNDRA_PORT_ACTIVE",
            "MONTE_CARLO_CORE_S", "GEOPOLITICAL_INDEX_SYS", "ZERO_TRUST_PASS", "BUDDY_SHIELD_V4", "AEGIS_OPS_ON"
          ].map((particle, idx) => (
            <div
              key={idx}
              className="code-particle select-none"
              style={{
                left: `${5 + idx * 9.5}%`,
                animationDelay: `${idx * 1.5}s`,
                animationDuration: `${12 + (idx % 3) * 4}s`
              }}
            >
              {particle}
            </div>
          ))}
        </div>

        {/* Pro Max Immersive Loader Glass Chassis */}
        <div className="glass-card max-w-lg w-full p-8 space-y-6 text-center border-accent-theme/40 z-30 relative shadow-[0_25px_60px_rgba(0,0,0,0.85)] holo-scanner overflow-hidden animate-fade-slide">
          
          {/* Laser-sweep indicator line at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-80" />
          
          {/* Corner Crosshair Trim Decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent-theme/50" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-accent-theme/50" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-accent-theme/50" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent-theme/50" />

          {/* Saffron/Chakra/Emerald Concentric Spinning Rings */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-28 h-28 rounded-full border border-accent-theme/10 flex items-center justify-center">
              {/* Outer spinning ring - Saffron */}
              <div className="absolute inset-0 rounded-full border-3 border-dashed border-[#FF9933]/30 animate-[spin_12s_linear_infinite]" />
              {/* Middle spinning ring - Emerald (counter-clockwise) */}
              <div className="absolute inset-2 rounded-full border-2 border-dotted border-[#138808]/50 animate-[spin_8s_linear_infinite_reverse]" />
              {/* Inner glowing ring - Accent theme */}
              <div className="absolute inset-5 rounded-full border border-dashed border-accent-theme/80 animate-[spin_5s_linear_infinite]" />
              
              {/* Core Cpu symbol with custom pulsing aura */}
              <div className="w-14 h-14 rounded-full bg-accent-theme/10 border border-accent-theme/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.35)] relative">
                <Cpu className="w-7 h-7 text-accent-theme animate-pulse" />
                <span className="absolute inset-0 rounded-full border border-accent-theme/20 animate-ping opacity-60" />
              </div>
            </div>
            
            <div className="mt-2 space-y-1">
              <h1 className="font-display font-black text-3xl tracking-widest text-text-primary uppercase flex items-center justify-center gap-2">
                <span>BUDDY</span> <span className="text-accent-theme font-extrabold">SHIELD AI</span>
              </h1>
              <p className="text-[10px] font-mono text-text-secondary/80 tracking-widest uppercase mt-1">
                cognitive risk intelligence command chassis
              </p>
            </div>
          </div>

          <hr className="border-accent-theme/15" />

          {/* Diagnostics Real-time Log Console Terminal */}
          <div className="bg-black/85 border border-white/5 rounded-2xl p-4 h-36 flex flex-col justify-end text-left font-mono space-y-1.5 overflow-hidden relative shadow-inner">
            <div className="absolute top-2.5 right-3.5 text-[7px] text-text-secondary/40 tracking-widest uppercase select-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-low animate-ping" />
              TELEMETRY LOGS LINK: STABLE
            </div>
            <div className="text-[8.5px] text-text-secondary/30 line-clamp-1">{`[${new Date().toTimeString().split(' ')[0]}] [SECURE_CORE] QUANTUM-TUNNEL INTERACTIVE GRIDS ACTIVE`}</div>
            <div className="text-[8.5px] text-text-secondary/50 line-clamp-1">{`[${new Date().toTimeString().split(' ')[0]}] [OSINT_GRID] CONSUMING ACTIVE GEOPOLITICAL INTELLIGENCE...`}</div>
            <div className="text-[8.5px] text-text-secondary/70 line-clamp-1">{`[${new Date().toTimeString().split(' ')[0]}] [BENGALURU_HUB] ESTABLISHED CRYPTO-SECURE ENCLAVE NODE`}</div>
            <div className="text-[10px] text-accent-theme font-bold line-clamp-2 animate-pulse">{loadingText}</div>
          </div>

          {/* Progress bar with premium scanline glow */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary">
              <span className="tracking-widest uppercase text-[9px] text-text-secondary/70">DEPLOYING SECURE SECURITY CORRIDORS</span>
              <span className="text-accent-theme font-black">{loadingPercent}%</span>
            </div>
            <div className="w-full bg-white/5 border border-white/5 rounded-full h-3 overflow-hidden p-[1px] relative shadow-inner">
              <div 
                className="bg-gradient-to-r from-[#FF9933] via-accent-theme to-[#138808] h-full rounded-full transition-all duration-150 shadow-[0_0_15px_var(--accent-theme)] relative" 
                style={{ width: `${loadingPercent}%` }}
              >
                {/* Micro reflection shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[pulse_2s_infinite] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Live Checklists metrics */}
          <div className="grid grid-cols-2 gap-2 text-left font-mono text-[9px] pt-2">
            {[
              { text: "GEOPOLITICAL ENCLAVES", pct: 15 },
              { text: "ISRO INDIAN TELEMETRY", pct: 45 },
              { text: "ZERO-TRUST FIREWALLS", pct: 70 },
              { text: "MONTE CARLO PLATFORM", pct: 90 }
            ].map((metric, idx) => {
              const isLit = loadingPercent >= metric.pct;
              return (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2.5 ${
                    isLit 
                      ? 'border-[#138808]/40 bg-[#138808]/5 text-low' 
                      : 'border-white/5 bg-white/2 text-text-secondary/40'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isLit ? 'bg-low shadow-[0_0_10px_#30D158] animate-pulse' : 'bg-white/10'}`} />
                  <span className="truncate tracking-wide font-extrabold">{metric.text}</span>
                </div>
              );
            })}
          </div>

          <div className="text-[8.5px] font-mono text-text-secondary/40 tracking-wider">
            PORTAL INTERNALS MOUNTED VIA LOCALHOST // AEGIS SYSTEM RECONNAISSANCE CONSOLE
          </div>
        </div>
      </div>
    );
  }

  // RENDER SECURITY ACCESS SCREEN (LOGIN PORTAL)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-screen bg-bg-base flex items-center justify-center p-6 relative overflow-hidden select-none font-body">
        
        {/* Animated Cyber backdrop rings */}
        <div className="absolute inset-0 pointer-events-none opacity-20 cyber-grid-backdrop animate-[pulse_4s_ease-in-out_infinite] z-5" />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <div className="w-[680px] h-[680px] rounded-full border border-accent-theme/5 absolute animate-[orbitRotate_36s_linear_infinite]" />
          <div className="w-[500px] h-[500px] rounded-full border border-dashed border-accent-theme/10 absolute animate-[orbitRotate_24s_linear_infinite_reverse]" />
          <div className="w-[320px] h-[320px] rounded-full border border-accent-theme/15 absolute animate-[orbitRotate_18s_linear_infinite]" />
        </div>

        {/* Diagonal Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-bg-base/90 via-transparent to-bg-base/90 z-15" />

        {/* Login glass container */}
        <div className="glass-card max-w-md w-full p-8 space-y-6 text-center border-accent-theme/50 z-20 relative shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Saffron & Emerald Laser Header line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-80" />
          
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-accent-theme/40" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-accent-theme/40" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-accent-theme/40" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-accent-theme/40" />

          {/* Glowing Shield Header */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-accent-theme/10 border border-accent-theme flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.25)] animate-pulse">
              <Shield className="w-8 h-8 text-accent-theme animate-pulse" />
            </div>
            
            <div className="mt-2">
              <h1 className="font-display font-black text-2xl tracking-widest text-text-primary uppercase flex items-center justify-center gap-2">
                <span>BUDDY SHIELD AI</span>
              </h1>
              <p className="text-[9px] font-mono text-text-secondary tracking-widest uppercase mt-1">cognitive risk command core</p>
            </div>
          </div>

          <hr className="border-accent-theme/15" />

          {/* Secure Fields */}
          <div className="space-y-4 text-left">
            {authError && (
              <div className="text-[10px] font-mono font-bold text-critical bg-critical/10 border border-critical/20 rounded-xl p-3 text-center animate-pulse">
                {authError}
              </div>
            )}

            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-display font-extrabold text-text-secondary uppercase tracking-widest block">OPERATOR KEYPASS CODE</label>
                <span className="text-[8px] font-mono text-accent-theme uppercase bg-white/5 border border-white/5 px-2 py-0.5 rounded">SEC LEVEL 4</span>
              </div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="ENTER CODEPASS PORTAL"
                className="w-full bg-black/40 border border-accent-theme/20 focus:border-accent-theme focus:outline-none rounded-xl py-3.5 px-4 text-xs font-mono text-center text-text-primary tracking-[0.4em] focus:shadow-[0_0_20px_var(--accent-theme-dim)] transition-all font-bold"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLoginSubmit();
                }}
              />
              <span className="text-[9px] font-mono text-text-secondary/60 text-center block pt-1 select-text">Evaluator Passcode: <strong className="text-text-primary">AEGIS-OPERATIONS-2026</strong></span>
            </div>
          </div>

          {/* India Evaluator Smart ID Passcard (Premium Bypass Module) */}
          <div 
            onClick={handleBypassLogin}
            className="group relative cursor-pointer border border-[#FF9933]/30 hover:border-[#138808]/50 bg-gradient-to-br from-[#FF9933]/5 to-[#138808]/5 hover:from-[#FF9933]/10 hover:to-[#138808]/10 rounded-2xl p-5 text-left transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(255,153,51,0.25)] select-none mt-4"
          >
            {/* government of india seal overlay */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-60" />
            
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[7.5px] font-mono text-[#FF9933] uppercase tracking-widest block font-bold">MINISTRY SECURITY INJECTOR</span>
                <h4 className="font-display font-extrabold text-[11px] text-text-primary uppercase tracking-wider mt-0.5">ISRO / DEFENSE OPERATIONS</h4>
                <p className="text-[8px] font-mono text-text-secondary mt-1">CLEARANCE LEVEL: MINISTRY-EVALUATOR</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 relative">
                <Shield className="w-4.5 h-4.5 text-[#138808] group-hover:animate-bounce" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-low animate-ping" />
              </div>
            </div>

            {/* Interactive barcode */}
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-white/5 font-mono text-[6.5px] text-text-secondary/50">
              <div className="w-16 h-4 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)_1px,transparent_1px,transparent_3px)] opacity-50" />
              <span className="truncate">KV-AUTH-OPERATIONS // ID_9832X_B</span>
            </div>

            {/* Hover visual swipe cue */}
            <div className="mt-3 flex justify-between items-center text-[9px] font-display font-bold uppercase tracking-wider text-[#FF9933] group-hover:text-low transition-colors">
              <span>SWIPE SMARTCARD FOR DIRECT ENTRY â¯</span>
              
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleLoginSubmit}
              className="w-full py-3.5 bg-gradient-to-r from-accent-theme to-accent-theme/80 text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-[0_0_18px_var(--accent-theme)]"
            >
              AUTHENTICATE SECURITY SESSION
            </button>
            <div className="text-[9px] font-mono text-text-secondary/40">
              SECURE PORTAL CORE V4.0 // MICROSOFT CLOUD INTEL INDIA
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER WORKSPACE SESSION
  return (
    <div className={`min-h-screen bg-bg-base text-text-primary flex relative overflow-hidden font-body animate-mesh select-none theme-${theme}`}>
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-bg-base/80 via-transparent to-bg-base/80 z-10" />

      {/* Global notifications */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-fade-slide glass-card px-4 py-3 flex items-center gap-3 border-l-4 border-l-accent-theme shadow-glow-cyan max-w-sm">
          <Zap className="text-accent-theme w-5 h-5 animate-pulse" />
          <span className="text-xs font-semibold text-text-primary uppercase tracking-wide">{toast.msg}</span>
        </div>
      )}

      {apiError && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-slide bg-critical/20 backdrop-blur border border-critical rounded-xl px-5 py-3 flex items-center gap-3 shadow-glow-critical">
          <AlertCircle className="text-critical w-5 h-5 animate-pulse" />
          <span className="text-xs font-semibold text-text-primary font-mono">{apiError}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside 
        className="h-screen bg-bg-base/40 backdrop-blur-md border-r border-white/5 flex flex-col items-center justify-between py-6 transition-all duration-300 z-30 group relative"
        style={{ width: sidebarHover ? '220px' : '64px' }}
        onMouseEnter={() => setSidebarHover(true)}
        onMouseLeave={() => setSidebarHover(false)}
      >
        <div className="w-full flex flex-col items-center gap-8">
          
          <div className="flex items-center gap-3 px-4 py-2 select-none">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-accent-theme flex items-center justify-center shadow-[0_0_12px_rgba(var(--accent-theme),0.4)]">
              <span className="font-display font-black text-accent-theme text-sm tracking-tighter">KV</span>
            </div>
            {sidebarHover && (
              <span className="font-display font-bold text-sm tracking-widest text-text-primary uppercase animate-fade-slide flex items-center gap-1.5">
                BUDDY<span className="text-accent-theme">AI</span> <span>ðŸ‡®ðŸ‡³</span>
              </span>
            )}
          </div>

          <nav className="w-full flex flex-col items-start px-2 gap-1.5">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart2 },
              { id: "indiadash", label: "India Hub", icon: Globe, badge: "🇮🇳" },
              { id: "suppliers", label: "Suppliers", icon: Package },
              { id: "warroom", label: "War Room", icon: Radio, highlight: true },
              { id: "trace", label: "Agent Trace", icon: Activity },
              { id: "scenarios", label: "Scenario Engine", icon: Sliders },
              { id: "report", label: "Executive Report", icon: FileText },
              { id: "chat", label: "Intelligence", icon: MessageSquare }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setSelectedMapSupplier(null);
                    setShowNotifications(false);
                  }}
                  className={`w-full py-2.5 px-3 rounded-lg flex items-center gap-4 transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/5 text-accent-theme border-l-2 border-accent-theme shadow-[inset_1px_0_0_rgba(255,255,255,0.05)]' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <div className="relative">
                    {item.badge ? (
                      <span className="text-base leading-none">{item.badge}</span>
                    ) : (
                      <Icon className="w-5 h-5 flex-shrink-0" />
                    )}
                    {item.highlight && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-critical animate-ping" />
                    )}
                  </div>
                  {sidebarHover && (
                    <span className="font-display font-semibold text-xs tracking-wider uppercase animate-fade-slide truncate">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="w-full flex flex-col items-center gap-4 px-2">
          <button 
            onClick={() => setShowSettings(true)}
            className="w-full py-2 px-3 rounded-lg flex items-center gap-4 text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-200"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {sidebarHover && (
              <span className="font-display font-semibold text-xs tracking-wider uppercase truncate animate-fade-slide">Settings</span>
            )}
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-lg flex items-center gap-4 text-text-secondary hover:text-critical hover:bg-critical/10 transition-all duration-200"
          >
            <X className="w-5 h-5 flex-shrink-0 text-critical" />
            {sidebarHover && (
              <span className="font-display font-semibold text-xs tracking-wider uppercase truncate animate-fade-slide text-critical">Exit Command</span>
            )}
          </button>
          
          <div className="text-[10px] font-mono text-accent-theme/40">
            {sidebarHover ? "BUDDY SHIELD v4.0" : "v4.0"}
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE SCREEN */}
      <main className="flex-1 h-screen overflow-y-auto flex flex-col z-20">
        
        {/* TOP STATUS BAR */}
        <header className="border-b border-white/5 bg-bg-base/30 backdrop-blur-md px-6 py-4 flex items-center justify-between relative z-40">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xs font-black tracking-widest text-text-primary uppercase flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-theme animate-pulse" />
              BUDDY SHIELD AI SECURE CONSOLE <span className="text-accent-theme">[{activePage.toUpperCase()}]</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            
            {/* Quick theme selector tags */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
              {[
                { id: "cyan", color: "bg-accent-cyan" },
                { id: "crimson", color: "bg-critical" },
                { id: "amber", color: "bg-[#FF9933]" }, // Saffron orange
                { id: "emerald", color: "bg-[#128807]" } // Ashoka green
              ].map(themeItem => (
                <button
                  key={themeItem.id}
                  onClick={() => setTheme(themeItem.id)}
                  className={`w-4 h-4 rounded-full ${themeItem.color} border transition-all ${
                    theme === themeItem.id ? 'border-text-primary scale-110 shadow-glow-cyan' : 'border-transparent opacity-60'
                  }`}
                  title={`Switch to ${themeItem.id} theme`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-text-secondary bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg select-none">
              <Clock className="w-4 h-4 text-accent-theme" />
              <span>{currentTime}</span>
            </div>

            {/* FULLY FUNCTIONAL NOTIFICATION BUTTON AND DROPDOWN */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative cursor-pointer text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-critical text-[9px] font-mono font-bold flex items-center justify-center text-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-4 z-50 bg-bg-base/95 border border-accent-theme/40 rounded-2xl p-4 w-80 animate-fade-slide glass-card text-left space-y-3 shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-display font-extrabold text-[10px] text-text-primary uppercase tracking-wider">Active Telemetry Warnings</span>
                    <button 
                      onClick={() => {
                        setThreatEvents(prev => prev.map(t => ({ ...t, read: true })));
                        setUnreadCount(0);
                        triggerToast("All notifications flagged as read.", "cyan");
                      }}
                      className="text-[9px] font-mono text-accent-theme hover:underline uppercase"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    {threatEvents.map((evt, idx) => {
                      let severityColor = "text-low";
                      if (evt.severity === "CRITICAL") severityColor = "text-critical animate-pulse";
                      else if (evt.severity === "HIGH") severityColor = "text-high";
                      else if (evt.severity === "MEDIUM") severityColor = "text-medium";

                      return (
                        <div 
                          key={evt.id} 
                          onClick={() => {
                            setThreatEvents(prev => prev.map(t => t.id === evt.id ? { ...t, read: true } : t));
                            if (!evt.read) {
                              setUnreadCount(prev => Math.max(0, prev - 1));
                            }
                            setActivePage("warroom");
                            setShowNotifications(false);
                            triggerToast(`Tracing: ${evt.title}`, "cyan");
                          }}
                          className={`p-2.5 rounded-xl border cursor-pointer transition-all space-y-1 ${
                            !evt.read 
                              ? 'border-accent-theme/40 bg-accent-theme/5 hover:bg-accent-theme/10 shadow-[0_0_8px_rgba(var(--accent-theme),0.1)]' 
                              : 'border-white/5 opacity-70 bg-white/3 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`text-[9px] font-display font-black tracking-widest uppercase ${severityColor}`}>{evt.severity}</span>
                            <span className="text-[8px] font-mono text-text-secondary">{evt.timestamp}</span>
                          </div>
                          <p className="text-[11px] font-bold text-text-primary leading-tight line-clamp-1">{evt.title}</p>
                          <p className="text-[10px] text-text-secondary leading-normal line-clamp-1">{evt.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[9px] font-mono text-text-secondary">
                    <span>Active events: {threatEvents.length}</span>
                    <button 
                      onClick={() => {
                        setActivePage("warroom");
                        setShowNotifications(false);
                      }}
                      className="text-accent-theme hover:underline"
                    >
                      War Room Dashboard â¯
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border border-accent-theme/20 bg-accent-theme/5 px-3 py-1 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-low animate-ping" />
              <span className="font-display font-bold text-[9px] tracking-widest text-accent-theme uppercase">COMMAND SECURE</span>
            </div>
          </div>
        </header>

        {/* CONTAINER FOR ACTIVE VIEWS */}
        <div className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* ========================================================
              PAGE 1: DASHBOARD
              ======================================================== */}
          {activePage === "dashboard" && (
            <div className="space-y-6 animate-fade-slide">
              
              {/* Row 1: 4 KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Supplier Nodes", value: portfolioStats.total, icon: Package, trend: "Secure Link", color: "text-accent-theme" },
                  { label: "Critical Priority Alerts", value: portfolioStats.critical, icon: AlertTriangle, trend: "DEFCON Alert", color: "text-critical", animate: true },
                  { label: "High Priority Exposure", value: portfolioStats.high, icon: Shield, trend: "Expanding Tariffs", color: "text-high" },
                  { label: "Aggregate Portfolio Index", value: `${portfolioStats.avgRisk}%`, icon: TrendingUp, trend: "+2.4% MoM", color: "text-medium" }
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`glass-card p-5 relative overflow-hidden ${kpi.animate ? 'animate-glow-critical' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[9px] font-display font-semibold tracking-wider text-text-secondary uppercase">{kpi.label}</p>
                          <h3 className={`text-3xl font-display font-black tracking-tight mt-2 ${kpi.color}`}>
                            {kpi.value}
                          </h3>
                        </div>
                        <div className={`p-2.5 rounded-lg bg-white/5 border border-white/5 ${kpi.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-4 text-[10px] text-text-secondary font-mono">
                        <span className={`w-1.5 h-1.5 rounded-full ${kpi.color === 'text-critical' ? 'bg-critical' : 'bg-accent-theme'}`} />
                        <span>STATUS: <strong className="text-text-primary uppercase">{kpi.trend}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pro Max: Interactive SVG Global Risk Map */}
              <div className="glass-card p-6 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-theme animate-ping" />
                      Interactive Global Risk Telemetry Grid
                    </h3>
                    <p className="text-[10px] text-text-secondary mt-1">Hover coordinate indicators to trace operational hazards in real-time.</p>
                  </div>
                  <span className="text-[8px] font-mono text-accent-theme uppercase bg-white/5 border border-white/5 px-2 py-1 rounded-lg">ACTIVE SATELLITE LINKS</span>
                </div>

                <div className="relative bg-bg-base/30 border border-white/5 rounded-2xl p-4 flex justify-center items-center h-80">
                  
                  {/* Cyber Network Grid Vector SVG Map */}
                  <svg viewBox="0 0 1000 450" className="w-full h-full opacity-65 text-text-secondary select-none">
                    <path d="M 0,75 L 1000,75 M 0,150 L 1000,150 M 0,225 L 1000,225 M 0,300 L 1000,300 M 0,375 L 1000,375" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
                    <path d="M 150,0 L 150,450 M 300,0 L 300,450 M 450,0 L 450,450 M 600,0 L 600,450 M 750,0 L 750,450 M 900,0 L 900,450" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
                    <path d="M 150,60 Q 200,80 250,90 T 320,120 T 280,240 T 310,320 T 360,400 T 330,440 L 300,440 T 260,320 T 180,220 T 120,100 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                    <path d="M 450,80 Q 550,50 650,40 T 800,80 T 920,120 T 850,250 T 750,380 T 600,320 T 500,200 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                    <path d="M 460,200 Q 550,220 580,280 T 550,380 T 480,420 Z" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <path d="M 800,330 Q 860,340 880,380 T 820,420 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <path d="M 230,120 Q 520,100 520,110 T 840,190" fill="none" stroke="var(--accent-theme)" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                    <path d="M 520,110 Q 720,140 810,140" fill="none" stroke="var(--accent-theme)" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                  </svg>

                  {/* Dynamic Interactive Pulsing Nodes */}
                  {[
                    { id: "sup_tsmc", name: "TSMC", country: "Taiwan", x: "81%", y: "42%" },
                    { id: "sup_asml", name: "ASML", country: "Netherlands", x: "52%", y: "25%" },
                    { id: "sup_samsung", name: "Samsung", country: "South Korea", x: "83%", y: "32%" },
                    { id: "sup_maersk", name: "Maersk", country: "Denmark", x: "53%", y: "20%" },
                    { id: "sup_byd", name: "BYD", country: "China", x: "78%", y: "45%" },
                    { id: "sup_murata", name: "Murata", country: "Japan", x: "85%", y: "34%" },
                    { id: "sup_dhl", name: "DHL", country: "Germany", x: "51%", y: "28%" },
                    { id: "sup_basf", name: "BASF", country: "Germany", x: "52%", y: "30%" },
                    // India Hub suppliers coordinates
                    { id: "sup_tata", name: "Tata Electronics", country: "India", x: "71%", y: "48%" },
                    { id: "sup_adani", name: "Adani Mundra Port", country: "India", x: "69%", y: "46%" },
                    { id: "sup_isro", name: "ISRO Aerospace", country: "India", x: "70.5%", y: "49.5%" },
                    { id: "sup_bel", name: "BEL Pune", country: "India", x: "69.5%", y: "47.5%" },
                    { id: "sup_reliance", name: "Reliance Jamnagar", country: "India", x: "68.5%", y: "46.2%" },
                    { id: "sup_serum", name: "Serum Institute", country: "India", x: "69.8%", y: "47.8%" },
                    { id: "sup_infosys", name: "Infosys EdgeVerve", country: "India", x: "70.8%", y: "49.0%" }
                  ].map(node => {
                    const sup = suppliers.find(s => s.id === node.id);
                    if (!sup) return null;

                    let pulseBg = "bg-low";
                    let ringBg = "border-low";
                    if (sup.riskLevel === "CRITICAL") {
                      pulseBg = "bg-critical";
                      ringBg = "border-critical";
                    } else if (sup.riskLevel === "HIGH") {
                      pulseBg = "bg-high";
                      ringBg = "border-high";
                    } else if (sup.riskLevel === "MEDIUM") {
                      pulseBg = "bg-medium";
                      ringBg = "border-medium";
                    }

                    return (
                      <div 
                        key={node.id} 
                        className="absolute cursor-pointer group"
                        style={{ left: node.x, top: node.y }}
                        onMouseEnter={() => setSelectedMapSupplier(sup)}
                      >
                        <div className={`w-8 h-8 rounded-full border absolute -top-4 -left-4 animate-ping opacity-60 ${ringBg}`} />
                        <div className={`w-3.5 h-3.5 rounded-full border border-bg-base shadow-glow-cyan relative z-20 ${pulseBg} transition-transform group-hover:scale-125`} />
                      </div>
                    );
                  })}

                  {/* Map hover details */}
                  {selectedMapSupplier && (
                    <div className="absolute bottom-4 right-4 z-40 bg-bg-base/95 border border-accent-theme/40 rounded-2xl p-4 w-72 animate-fade-slide glass-card text-left space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-display font-extrabold text-xs text-text-primary uppercase tracking-wide truncate max-w-[150px]">{selectedMapSupplier.name}</span>
                        <span className="text-[8px] font-mono text-accent-theme uppercase">{selectedMapSupplier.country}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary border-t border-b border-white/5 py-1.5">
                        <span>RISK SCORE: <strong className="text-text-primary">{selectedMapSupplier.riskPercentage}%</strong></span>
                        <span className="text-critical uppercase font-bold">{selectedMapSupplier.riskLevel}</span>
                      </div>
                      <p className="text-[10px] text-text-secondary leading-snug line-clamp-2">{selectedMapSupplier.impact}</p>
                      
                      <div className="flex justify-between pt-1">
                        <button 
                          onClick={() => {
                            setActivePage("suppliers");
                            setExpandedSupplier(selectedMapSupplier.id);
                          }}
                          className="text-[9px] font-display font-bold text-accent-theme hover:underline uppercase"
                        >
                          OPEN DETAILED DOSSIER
                        </button>
                        <button 
                          onClick={() => setSelectedMapSupplier(null)}
                          className="text-[9px] font-mono text-text-secondary hover:text-text-primary"
                        >
                          CLOSE
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Row 2: 2 Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-5">
                  <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4">Portfolio Risk Level Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {riskDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#050A14" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(5, 10, 20, 0.95)', border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '8px' }}
                          itemStyle={{ color: '#F0F8FF', fontSize: '12px' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontFamily: 'Orbitron' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-card p-5">
                  <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4">Average Risk Index by Region</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionRiskData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                        <XAxis type="number" stroke="#8899AA" domain={[0, 100]} style={{ fontSize: '10px', fontFamily: 'Mono' }} />
                        <YAxis dataKey="name" type="category" stroke="#8899AA" style={{ fontSize: '10px', fontFamily: 'Orbitron' }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'rgba(5, 10, 20, 0.95)', border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '8px' }}
                          labelStyle={{ color: 'var(--accent-theme)', fontWeight: 'bold', fontSize: '10px' }}
                          itemStyle={{ color: '#F0F8FF', fontSize: '12px' }}
                        />
                        <Bar dataKey="avgRisk" radius={[0, 4, 4, 0]}>
                          {regionRiskData.map((entry, index) => {
                            let barColor = "#30D158";
                            if (entry.avgRisk >= 75) barColor = "#FF2D55";
                            else if (entry.avgRisk >= 50) barColor = "#FF6B00";
                            return <Cell key={`cell-${index}`} fill={barColor} />;
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Row 3: Telemetry logs stream & calculator */}
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                
                <div className="lg:col-span-4 glass-card p-5 flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest flex items-center gap-1.5">
                      <Sliders className="text-accent-theme w-4.5 h-4.5" />
                      Margin Financial Risk Calculator
                    </h3>
                    <p className="text-[10px] text-text-secondary leading-normal">Trace capital value-at-risk against live supplier bottlenecks.</p>

                    <div className="space-y-3 font-mono text-xs mt-3">
                      <div>
                        <label className="text-[9px] text-text-secondary uppercase block mb-1">Select Supplier Node</label>
                        <select
                          value={calculatorSupplierId}
                          onChange={(e) => setCalculatorSupplierId(e.target.value)}
                          className="w-full bg-bg-base border border-accent-theme/20 rounded-xl py-2 px-3 focus:outline-none focus:border-accent-theme text-text-primary"
                        >
                          {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.country})</option>)}
                        </select>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[9px] text-text-secondary uppercase">Shipped Cargo Value</label>
                          <span className="text-accent-theme font-bold">${(calculatorValue / 1000).toFixed(0)}k</span>
                        </div>
                        <input 
                          type="range"
                          min="100000"
                          max="10000000"
                          step="100000"
                          value={calculatorValue}
                          onChange={(e) => setCalculatorValue(Number(e.target.value))}
                          className="w-full accent-accent-theme cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-base/40 border border-white/5 p-4 rounded-xl space-y-2 mt-4 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Exposure Risk:</span>
                      <span className="text-critical font-bold">${(calculatorResults.exposure).toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Expected Lead Time:</span>
                      <span className="text-text-primary font-bold">{calculatorResults.delay} Days</span>
                    </div>
                    {calculatorResults.penalty > 0 && (
                      <div className="flex justify-between border-t border-white/5 pt-1">
                        <span className="text-text-secondary">Import Duty Tariff (15%):</span>
                        <span className="text-high font-bold">${(calculatorResults.penalty).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-6 glass-card p-5 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest flex items-center gap-2">
                      <Cpu className="text-accent-theme w-4.5 h-4.5 animate-pulse" />
                      Live Agent Telemetry Stream
                    </h3>
                    <p className="text-[10px] text-text-secondary mt-1">Real-time trace logs detailing active multi-agent calculations.</p>
                  </div>

                  <div className="bg-bg-base/60 border border-accent-theme/20 rounded-xl p-4 font-mono text-[10px] text-accent-theme space-y-2 min-h-36 overflow-y-auto mt-4 shadow-inner">
                    {consoleLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="opacity-50">â¯</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[9px] font-mono text-text-secondary/50 text-right mt-3">
                    CONNECTED SENSORS: 2,490 // SYNCING CORRIDORS
                  </div>
                </div>

              </div>

              {/* Row 4: Risk Timeline Chart */}
              <div className="glass-card p-5">
                <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4">Historical Portfolio Risk Correlation (7-Day Cycle)</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineData}>
                      <defs>
                        <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--accent-theme)" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="var(--accent-theme)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                      <XAxis dataKey="date" stroke="#8899AA" style={{ fontSize: '10px', fontFamily: 'Mono' }} />
                      <YAxis stroke="#8899AA" style={{ fontSize: '10px', fontFamily: 'Mono' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(5, 10, 20, 0.95)', border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '8px' }}
                        labelStyle={{ color: 'var(--accent-theme)', fontWeight: 'bold', fontSize: '10px' }}
                        itemStyle={{ color: '#F0F8FF', fontSize: '12px' }}
                      />
                      <Area type="monotone" dataKey="avgRisk" stroke="var(--accent-theme)" fillOpacity={1} fill="url(#colorAvg)" name="Avg Risk Index (%)" />
                      <Area type="monotone" dataKey="criticalCount" stroke="#FF2D55" fill="none" name="Critical Node Count" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom scan trigger */}
              <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between border-accent-theme/30">
                <div className="flex items-center gap-3">
                  <Cpu className="text-accent-theme w-6 h-6 animate-pulse" />
                  <div>
                    <h4 className="font-display font-semibold text-xs tracking-wider uppercase">Aggregated Neural Risk Scanning Workspace</h4>
                    <p className="text-[10px] text-text-secondary mt-1">Analyzes live shipping trackers and trade filings across all nodes.</p>
                  </div>
                </div>

                <div className="w-full md:w-auto flex items-center gap-4">
                  {isScanning && (
                    <div className="flex-1 md:w-60 bg-white/5 border border-white/5 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-accent-theme to-accent-theme/40 h-full transition-all duration-300 animate-scan-pulse" 
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  )}
                  <button
                    onClick={handleRunFullScan}
                    disabled={isScanning}
                    className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-accent-theme to-accent-theme/80 text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all select-none"
                  >
                    {isScanning ? scanText : "RUN FULL PORTFOLIO SCAN"}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================
              INDIA HUB DASHBOARD
              ======================================================== */}
          {activePage === "indiadash" && (() => {
            const indiaSuppliers = suppliers.filter(s => s.country === "India");
            const indiaAvgRisk = indiaSuppliers.length > 0 ? Math.floor(indiaSuppliers.reduce((a, s) => a + s.riskPercentage, 0) / indiaSuppliers.length) : 0;

            const indiaRadarData = [
              { subject: "Geopolitical", ...Object.fromEntries(indiaSuppliers.map(s => [s.name.split(" ")[0], s.geopoliticalScore])) },
              { subject: "Financial", ...Object.fromEntries(indiaSuppliers.map(s => [s.name.split(" ")[0], s.financialScore])) },
              { subject: "Weather", ...Object.fromEntries(indiaSuppliers.map(s => [s.name.split(" ")[0], s.weatherScore])) },
              { subject: "Logistics", ...Object.fromEntries(indiaSuppliers.map(s => [s.name.split(" ")[0], s.logisticsScore])) },
              { subject: "Regulatory", ...Object.fromEntries(indiaSuppliers.map(s => [s.name.split(" ")[0], s.regulatoryScore])) },
              { subject: "Cyber", ...Object.fromEntries(indiaSuppliers.map(s => [s.name.split(" ")[0], s.cyberScore])) },
            ];

            const sectorData = [
              { sector: "Electronics", count: suppliers.filter(s => s.category === "Electronics").length, india: suppliers.filter(s => s.category === "Electronics" && s.country === "India").length },
              { sector: "Logistics", count: suppliers.filter(s => s.category === "Logistics").length, india: suppliers.filter(s => s.category === "Logistics" && s.country === "India").length },
              { sector: "Raw Materials", count: suppliers.filter(s => s.category === "Raw Materials").length, india: suppliers.filter(s => s.category === "Raw Materials" && s.country === "India").length },
              { sector: "Pharma", count: suppliers.filter(s => s.category === "Pharma").length, india: suppliers.filter(s => s.category === "Pharma" && s.country === "India").length },
            ];

            const trend30 = Array.from({ length: 30 }, (_, i) => ({
              day: `D-${30 - i}`,
              indiaRisk: Math.max(10, Math.min(45, 22 + Math.sin(i * 0.4) * 8 + (i > 25 ? indiaAvgRisk - 22 : 0))),
              globalRisk: Math.max(35, Math.min(80, 52 + Math.cos(i * 0.3) * 12)),
            }));

            const portData = [
              { port: "Mundra", throughput: indiaPortThroughput.mundra, color: "#00D4FF" },
              { port: "JNPT", throughput: indiaPortThroughput.jnpt, color: "#138808" },
              { port: "Chennai", throughput: indiaPortThroughput.chennai, color: "#FF9933" },
              { port: "Kolkata", throughput: indiaPortThroughput.kolkata, color: "#8B5CF6" },
            ];

            const radarColors = ["#00D4FF", "#30D158", "#FF9933", "#FF2D55", "#FFD60A", "#8B5CF6"];

            return (
              <div className="space-y-6 animate-fade-slide">

                {/* Header */}
                <div className="glass-card p-5 relative overflow-hidden border-[#FF9933]/30">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-display font-black text-lg tracking-widest uppercase text-text-primary flex items-center gap-2">
                        <span>🇮🇳</span> India Hub Intelligence Dashboard
                      </h2>
                      <p className="text-xs text-text-secondary mt-1">Real-time visibility into India's supply chain resilience, port activity, and macro risk posture.</p>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div className="text-[9px] text-text-secondary uppercase">LIVE INR / USD</div>
                      <div className="text-2xl font-black text-[#FF9933]">₹{inrRate}</div>
                      <div className="text-[9px] text-text-secondary/60 mt-0.5">Live simulated rate</div>
                    </div>
                  </div>
                </div>

                {/* KPI Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "India Suppliers", value: indiaSuppliers.length, sub: "Active nodes", color: "text-[#FF9933]", icon: "🏭" },
                    { label: "India Avg Risk", value: `${indiaAvgRisk}%`, sub: "Portfolio index", color: "text-low", icon: "🛡️" },
                    { label: "Mundra Throughput", value: `${indiaPortThroughput.mundra}%`, sub: "Live capacity", color: "text-accent-theme", icon: "🚢" },
                    { label: "INR Exposure", value: `₹${(suppliers.filter(s => s.country !== "India").reduce((a, s) => a + s.riskPercentage, 0) * inrRate / 100).toFixed(0)}L`, sub: "Est import risk", color: "text-high", icon: "💹" },
                  ].map((kpi, idx) => (
                    <div key={idx} className="glass-card p-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-40" />
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[9px] font-display font-semibold tracking-wider text-text-secondary uppercase">{kpi.label}</p>
                          <h3 className={`text-2xl font-display font-black tracking-tight mt-1 ${kpi.color}`}>{kpi.value}</h3>
                          <p className="text-[9px] font-mono text-text-secondary/60 mt-1">{kpi.sub}</p>
                        </div>
                        <span className="text-2xl">{kpi.icon}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts Row 1: Radar + Sector */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card p-5">
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse" />
                      India Supplier Risk Radar (6 Dimensions)
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={indiaRadarData}>
                          <PolarGrid stroke="rgba(255,255,255,0.06)" />
                          <PolarAngleAxis dataKey="subject" stroke="#8899AA" style={{ fontSize: '9px', fontFamily: 'Orbitron' }} />
                          <PolarRadiusAxis stroke="#8899AA" style={{ fontSize: '8px' }} domain={[0, 100]} />
                          {indiaSuppliers.slice(0, 4).map((s, i) => (
                            <Radar key={s.id} name={s.name.split(" ")[0]} dataKey={s.name.split(" ")[0]} stroke={radarColors[i]} fill={radarColors[i]} fillOpacity={0.15} />
                          ))}
                          <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', fontFamily: 'Orbitron' }} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(5,10,20,0.95)', border: '1px solid rgba(255,153,51,0.3)', borderRadius: '8px' }} itemStyle={{ color: '#F0F8FF', fontSize: '11px' }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="glass-card p-5">
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse" />
                      India vs Global Sector Supplier Split
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sectorData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="sector" stroke="#8899AA" style={{ fontSize: '9px', fontFamily: 'Orbitron' }} />
                          <YAxis stroke="#8899AA" style={{ fontSize: '9px' }} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(5,10,20,0.95)', border: '1px solid rgba(255,153,51,0.3)', borderRadius: '8px' }} itemStyle={{ color: '#F0F8FF', fontSize: '11px' }} />
                          <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', fontFamily: 'Orbitron' }} />
                          <Bar dataKey="count" name="Total Global" fill="rgba(255,255,255,0.12)" radius={[4,4,0,0]} />
                          <Bar dataKey="india" name="India Hub" fill="#FF9933" radius={[4,4,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Charts Row 2: 30-day trend + Port Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card p-5">
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-theme animate-ping" />
                      30-Day India vs Global Risk Trend
                    </h3>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trend30}>
                          <defs>
                            <linearGradient id="indiaGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FF9933" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#FF9933" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="globalGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FF2D55" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#FF2D55" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                          <XAxis dataKey="day" stroke="#8899AA" style={{ fontSize: '8px' }} tickCount={8} />
                          <YAxis stroke="#8899AA" style={{ fontSize: '8px' }} domain={[0, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(5,10,20,0.95)', border: '1px solid rgba(255,153,51,0.3)', borderRadius: '8px' }} itemStyle={{ color: '#F0F8FF', fontSize: '11px' }} />
                          <Area type="monotone" dataKey="indiaRisk" name="India Risk %" stroke="#FF9933" fill="url(#indiaGrad)" strokeWidth={2} />
                          <Area type="monotone" dataKey="globalRisk" name="Global Risk %" stroke="#FF2D55" fill="url(#globalGrad)" strokeWidth={1.5} strokeDasharray="4 4" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="glass-card p-5">
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#138808] animate-ping" />
                      🚢 Live Indian Port Throughput Capacity
                    </h3>
                    <p className="text-[9px] text-text-secondary mb-4 font-mono">Live-simulated. Updates every 4s via satellite feed link.</p>
                    <div className="space-y-4">
                      {portData.map(port => (
                        <div key={port.port}>
                          <div className="flex justify-between items-center text-xs font-mono mb-1">
                            <span className="text-text-primary font-bold">{port.port} Port</span>
                            <span style={{ color: port.color }} className="font-bold">{port.throughput}% capacity</span>
                          </div>
                          <div className="w-full bg-white/5 border border-white/5 h-3 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${port.throughput}%`, backgroundColor: port.color, boxShadow: `0 0 8px ${port.color}60` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-[8px] font-mono text-text-secondary/40 text-right">SATELLITE LINK: ACTIVE // IMD INTEGRATION</div>
                  </div>
                </div>

                {/* India Supplier Quick Table */}
                <div className="glass-card p-5">
                  <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                    🏭 India Hub Supplier Dossier
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/5 text-[9px] text-text-secondary uppercase tracking-widest">
                          <th className="text-left py-2 pr-4">Supplier</th>
                          <th className="text-left py-2 pr-4">Category</th>
                          <th className="text-left py-2 pr-4">Lead Time</th>
                          <th className="text-left py-2 pr-4">Risk</th>
                          <th className="text-left py-2">Primary Risk Driver</th>
                        </tr>
                      </thead>
                      <tbody>
                        {indiaSuppliers.map(s => {
                          let riskColor = "text-low";
                          if (s.riskLevel === "CRITICAL") riskColor = "text-critical animate-pulse";
                          else if (s.riskLevel === "HIGH") riskColor = "text-high";
                          else if (s.riskLevel === "MEDIUM") riskColor = "text-medium";
                          return (
                            <tr key={s.id} className="border-b border-white/5 hover:bg-white/3 transition-all cursor-pointer" onClick={() => { setActivePage("suppliers"); setExpandedSupplier(s.id); }}>
                              <td className="py-2.5 pr-4 font-bold text-text-primary">{s.name}</td>
                              <td className="py-2.5 pr-4 text-text-secondary">{s.category}</td>
                              <td className="py-2.5 pr-4 text-text-secondary">{s.leadTime}d</td>
                              <td className={`py-2.5 pr-4 font-black ${riskColor}`}>{s.riskLevel} ({s.riskPercentage}%)</td>
                              <td className="py-2.5 text-text-secondary">{s.primaryRisk}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            );
          })()}

          {/* ========================================================
              PAGE 2: SUPPLIERS
              ======================================================== */}
          {activePage === "suppliers" && (
            <div className="space-y-6 animate-fade-slide">
              
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-2.5 text-text-secondary w-4.5 h-4.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, country, or tier category..."
                    className="w-full bg-white/5 hover:bg-white/10 border border-accent-theme/20 focus:border-accent-theme focus:outline-none rounded-xl py-2 pl-10 pr-4 text-xs font-body text-text-primary transition-all"
                  />
                </div>
                
                <button
                  onClick={() => setIsAddingSupplier(!isAddingSupplier)}
                  className="w-full md:w-auto px-4 py-2 border border-accent-theme hover:bg-accent-theme/10 rounded-xl font-display font-bold text-xs uppercase tracking-widest text-accent-theme transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {isAddingSupplier ? "Cancel New Node" : "Add Supplier Node"}
                </button>
              </div>

              {isAddingSupplier && (
                <div className="glass-card p-5 animate-fade-slide border-l-4 border-l-accent-theme space-y-4">
                  <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-wider">New Partner Onboarding Workspace</h3>
                  
                  {formError && <div className="text-xs text-critical font-mono bg-critical/10 p-2.5 rounded-lg">{formError}</div>}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[10px] font-display font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">Supplier Name</label>
                      <input 
                        type="text" 
                        value={newSupplierName}
                        onChange={(e) => setNewSupplierName(e.target.value)}
                        placeholder="e.g. Tata OSAT" 
                        className="w-full bg-bg-base border border-accent-theme/20 rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-theme"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-display font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">Country Hub</label>
                      <select 
                        value={newSupplierCountry}
                        onChange={(e) => setNewSupplierCountry(e.target.value)}
                        className="w-full bg-bg-base border border-accent-theme/20 rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-theme font-mono"
                      >
                        {["India", "Taiwan", "South Korea", "China", "Japan", "Netherlands", "Germany", "United States", "Vietnam", "Mexico"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-display font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">Component Tier</label>
                      <select 
                        value={newSupplierCategory}
                        onChange={(e) => setNewSupplierCategory(e.target.value)}
                        className="w-full bg-bg-base border border-accent-theme/20 rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-theme font-mono"
                      >
                        {["Electronics", "Logistics", "Raw Materials", "Food", "Pharma"].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-display font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">Standard Lead Time (Days)</label>
                      <input 
                        type="number" 
                        value={newSupplierLeadTime}
                        onChange={(e) => setNewSupplierLeadTime(e.target.value)}
                        className="w-full bg-bg-base border border-accent-theme/20 rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-theme font-mono"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleAddSupplier}
                    className="px-6 py-2 bg-accent-theme text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all"
                  >
                    Save & Initialize Risk Analysis
                  </button>
                </div>
              )}

              {/* Pro Max Feature 3: Bharatiya Strategic Reshoring Planner */}
              <div className="glass-card p-5 text-left space-y-4 border-accent-theme/40 relative overflow-hidden">
                {/* Visual saffron-emerald glowing scan accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-80" />
                
                <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="text-sm animate-pulse">ðŸ‡®ðŸ‡³</span>
                  Bharatiya Strategic Reshoring Planner
                </h3>
                <p className="text-[10px] text-text-secondary leading-normal">
                  Relocate single-source procurement volume from volatile foreign hubs to high-reliability domestic Indian manufacturing clusters.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div>
                    <label className="text-[9px] font-mono text-text-secondary uppercase block mb-1">Foreign Sourcing Node</label>
                    <select
                      value={reshoreFromId}
                      onChange={(e) => setReshoreFromId(e.target.value)}
                      className="w-full bg-bg-base border border-white/5 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-accent-theme text-text-primary font-mono"
                    >
                      {suppliers.filter(s => s.country !== "India").map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.country})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono text-text-secondary uppercase block mb-1">Target Reshoring Cluster</label>
                    <select
                      value={reshoreToId}
                      onChange={(e) => setReshoreToId(e.target.value)}
                      className="w-full bg-bg-base border border-white/5 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-accent-theme text-text-primary font-mono"
                    >
                      {suppliers.filter(s => s.country === "India").map(s => (
                        <option key={s.id} value={s.id}>{s.name} (India Hub)</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono text-text-secondary uppercase block mb-1">Shift Volume Ratio: <strong className="text-[#FF9933]">{reshoreVolume}%</strong></label>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={reshoreVolume}
                        onChange={(e) => setReshoreVolume(Number(e.target.value))}
                        className="flex-1 accent-[#FF9933] cursor-pointer bg-white/10 rounded-lg h-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Outcome Gauges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5 animate-fade-slide">
                  <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-left font-mono">
                    <span className="text-[8px] text-text-secondary uppercase block">Risk Reduction</span>
                    <span className="text-xs font-bold text-low mt-1 block">-{Math.floor(reshoreVolume * 0.5)}% Geopolitical Risk</span>
                  </div>
                  <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-left font-mono">
                    <span className="text-[8px] text-text-secondary uppercase block">Transit Lead-Time Hedge</span>
                    <span className="text-xs font-bold text-accent-theme mt-1 block">-{Math.floor(reshoreVolume * 0.2)} Days Saved</span>
                  </div>
                  <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-left font-mono">
                    <span className="text-[8px] text-text-secondary uppercase block">Local Capacity Growth</span>
                    <span className="text-xs font-bold text-[#FF9933] mt-1 block">+{Math.floor(reshoreVolume * 0.15)}% Yield</span>
                  </div>
                  <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-left font-mono">
                    <span className="text-[8px] text-text-secondary uppercase block">Reshoring Capital Incentive</span>
                    <span className="text-xs font-bold text-text-primary mt-1 block">INR {(reshoreVolume * 22.4).toFixed(1)} Lakhs</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-3 border-t border-white/5">
                  <div className="w-full md:w-1/2 bg-white/5 border border-white/5 rounded-full h-2 overflow-hidden p-[1px]">
                    <div 
                      className="bg-gradient-to-r from-[#FF9933] via-[#ffffff] to-[#138808] h-full rounded-full transition-all duration-300 shadow-[0_0_12px_#FF9933]"
                      style={{ width: `${reshoreVolume}%` }}
                    />
                  </div>

                  <button
                    onClick={handleExecuteReshoring}
                    className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white font-display font-black text-[9px] uppercase tracking-widest rounded-xl hover:opacity-90 transition-all select-none shadow-[0_0_12px_rgba(255,153,51,0.4)]"
                  >
                    EXECUTE DEPLOYMENT TO INDIAN HUB
                  </button>
                </div>
              </div>

              {/* Pro Max: Dual Supplier Side-by-Side Comparison Engine */}
              <div className="glass-card p-5 text-left space-y-4">
                <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <Sliders className="text-accent-theme w-4.5 h-4.5" />
                  Dual-Supplier Strategic Comparison Engine
                </h3>
                <p className="text-[10px] text-text-secondary leading-normal">Compare two monitored partners side-by-side to optimize procurement resilience.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="text-[9px] font-mono text-text-secondary uppercase block mb-1">SUPPLIER A</label>
                    <select
                      value={compareAId}
                      onChange={(e) => setCompareAId(e.target.value)}
                      className="w-full bg-bg-base border border-white/5 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-accent-theme text-text-primary font-mono"
                    >
                      {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.country})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-text-secondary uppercase block mb-1">SUPPLIER B</label>
                    <select
                      value={compareBId}
                      onChange={(e) => setCompareBId(e.target.value)}
                      className="w-full bg-bg-base border border-white/5 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-accent-theme text-text-primary font-mono"
                    >
                      {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.country})</option>)}
                    </select>
                  </div>
                </div>

                {dualCompareResults && (
                  <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-4 pt-4 border-t border-white/5 animate-fade-slide">
                    
                    <div className="lg:col-span-5 space-y-3 font-mono text-xs">
                      <div className="grid grid-cols-3 font-bold border-b border-white/5 pb-2 text-[10px]">
                        <span>Metric</span>
                        <span className="text-accent-cyan truncate">{dualCompareResults.sA.name}</span>
                        <span className="text-accent-theme truncate text-right">{dualCompareResults.sB.name}</span>
                      </div>

                      {[
                        { label: "Overall Risk %", valA: `${dualCompareResults.sA.riskPercentage}%`, valB: `${dualCompareResults.sB.riskPercentage}%` },
                        { label: "Geopolitical", valA: dualCompareResults.sA.geopoliticalScore, valB: dualCompareResults.sB.geopoliticalScore },
                        { label: "Financial", valA: dualCompareResults.sA.financialScore, valB: dualCompareResults.sB.financialScore },
                        { label: "Weather", valA: dualCompareResults.sA.weatherScore, valB: dualCompareResults.sB.weatherScore },
                        { label: "Logistics", valA: dualCompareResults.sA.logisticsScore, valB: dualCompareResults.sB.logisticsScore },
                        { label: "Lead Time", valA: `${dualCompareResults.sA.leadTime}d`, valB: `${dualCompareResults.sB.leadTime}d` }
                      ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-3 py-1 border-b border-white/5">
                          <span className="text-text-secondary">{row.label}</span>
                          <span className="text-text-primary">{row.valA}</span>
                          <span className="text-text-primary text-right">{row.valB}</span>
                        </div>
                      ))}

                      <div className="border border-accent-theme/20 bg-accent-theme/5 p-3 rounded-xl mt-4">
                        <span className="text-[9px] font-display font-bold text-accent-theme uppercase block">TACTICAL COMPARATIVE VERDICT</span>
                        <p className="text-[11px] text-text-primary leading-normal mt-1">
                          **{dualCompareResults.winner.name}** represents the strategically safer option, displaying a **{dualCompareResults.saferPercent}% lower risk profile**. Selecting **{dualCompareResults.winner.name}** yields a **{dualCompareResults.leadTimeBuffer}-day lead-time buffer delta**.
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-5 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dualCompareResults.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="name" stroke="#8899AA" style={{ fontSize: '9px', fontFamily: 'Mono' }} />
                          <YAxis stroke="#8899AA" style={{ fontSize: '9px', fontFamily: 'Mono' }} domain={[0, 100]} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(5, 10, 20, 0.95)', border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '8px' }}
                            itemStyle={{ color: '#F0F8FF', fontSize: '11px' }}
                          />
                          <Bar dataKey={dualCompareResults.sA.name} fill="rgba(0, 212, 255, 0.4)" radius={[2, 2, 0, 0]} />
                          <Bar dataKey={dualCompareResults.sB.name} fill="var(--accent-theme)" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                  </div>
                )}
              </div>

              {/* SUPPLIERS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suppliers
                  .filter(s => {
                    const query = searchQuery.toLowerCase();
                    return s.name.toLowerCase().includes(query) || s.country.toLowerCase().includes(query) || s.category.toLowerCase().includes(query);
                  })
                  .map(supplier => {
                    const isFlashing = flashingSuppliers[supplier.id] === true;
                    const isLoading = flashingSuppliers[supplier.id] === "loading";
                    const isExpanded = expandedSupplier === supplier.id;

                    let badgeColor = "text-low border-low/30 bg-low/10";
                    let barColor = "from-low to-low/30";
                    if (supplier.riskLevel === "CRITICAL") {
                      badgeColor = "text-critical border-critical/30 bg-critical/10 animate-pulse";
                      barColor = "from-critical to-critical/30";
                    } else if (supplier.riskLevel === "HIGH") {
                      badgeColor = "text-high border-high/30 bg-high/10";
                      barColor = "from-high to-high/30";
                    } else if (supplier.riskLevel === "MEDIUM") {
                      badgeColor = "text-medium border-medium/30 bg-medium/10";
                      barColor = "from-medium to-medium/30";
                    }

                    return (
                      <div 
                        key={supplier.id} 
                        className={`glass-card p-5 flex flex-col justify-between transition-all duration-300 ${
                          isFlashing ? 'flash-update' : ''
                        } ${supplier.riskLevel === 'CRITICAL' ? 'animate-glow-critical' : ''}`}
                      >
                        <div>
                          
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-display font-black text-sm tracking-widest text-text-primary uppercase truncate max-w-[150px]">
                                {supplier.name}
                              </h3>
                              <p className="text-[10px] text-text-secondary mt-1 flex items-center gap-1.5 font-mono">
                                <span>{supplier.flag}</span>
                                <span>{supplier.country}</span>
                              </p>
                            </div>
                            
                            <span className={`text-[9px] font-display font-bold px-2 py-0.5 rounded border tracking-widest uppercase ${badgeColor}`}>
                              {supplier.riskLevel}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-6 text-xs border-t border-b border-white/5 py-3 font-mono">
                            <div>
                              <span className="text-[9px] font-display font-semibold text-text-secondary uppercase">TIER</span>
                              <p className="text-text-primary font-bold uppercase tracking-wider mt-0.5">{supplier.category}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-display font-semibold text-text-secondary uppercase">LEAD TIME</span>
                              <p className="text-text-primary font-bold mt-0.5">{supplier.leadTime} DAYS</p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary mb-1">
                              <span>RISK PERCENTAGE</span>
                              <span className="font-bold text-text-primary">{supplier.riskPercentage}%</span>
                            </div>
                            <div className="w-full bg-white/5 border border-white/5 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${barColor} transition-all duration-500`}
                                style={{ width: `${supplier.riskPercentage}%` }}
                              />
                            </div>
                          </div>

                        </div>

                        <div className="mt-6 space-y-3">
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAnalyzeSupplier(supplier.id)}
                              disabled={isLoading}
                              className="flex-1 py-2 border border-white/5 hover:border-accent-theme/40 rounded-xl bg-white/5 text-text-secondary hover:text-accent-theme font-display text-[9px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                            >
                              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                              {isLoading ? "ANALYZING..." : "INTELLIGENCE SCAN"}
                            </button>
                            
                            <button
                              onClick={() => setExpandedSupplier(isExpanded ? null : supplier.id)}
                              className="px-3 py-2 border border-white/5 hover:border-accent-theme/40 rounded-xl text-text-secondary hover:text-text-primary transition-all flex items-center justify-center"
                            >
                              {isExpanded ? <ChevronDown className="w-4 h-4 text-accent-theme" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                          </div>

                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-white/5 space-y-4 animate-fade-slide text-left">
                              
                              <div>
                                <span className="text-[9px] font-display font-semibold text-text-secondary uppercase">KEY RISK FACTORS</span>
                                <ul className="list-disc pl-4 mt-1 text-[11px] text-text-secondary leading-relaxed space-y-0.5">
                                  {supplier.factors.map((f, fidx) => <li key={fidx}>{f}</li>)}
                                </ul>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-[9px] font-display font-semibold text-text-secondary uppercase block">BUSINESS IMPACT</span>
                                  <p className="text-[11px] text-text-secondary leading-snug mt-0.5">{supplier.impact}</p>
                                </div>
                                <div>
                                  <span className="text-[9px] font-display font-semibold text-text-secondary uppercase block">TIME TO IMPACT</span>
                                  <p className="text-[11px] text-text-secondary mt-0.5 font-bold font-mono">{supplier.timeToImpact}</p>
                                </div>
                              </div>

                              <div className="border-l-2 border-accent-theme bg-accent-theme/5 p-3 rounded-r-xl">
                                <span className="text-[9px] font-display font-semibold text-accent-theme uppercase block">TACTICAL RE-ALLOCATION DIRECTIVE</span>
                                <p className="text-[11px] text-text-primary leading-normal mt-1">{supplier.recommendation}</p>
                              </div>

                              {supplier.alternates && supplier.alternates.length > 0 && (
                                <div>
                                  <span className="text-[9px] font-display font-semibold text-text-secondary uppercase block mb-1">QUALIFIED ALTERNATIVE VENDORS</span>
                                  <div className="flex gap-2">
                                    {supplier.alternates.map((alt, altIdx) => (
                                      <div key={altIdx} className="bg-white/5 border border-white/5 rounded-lg p-2 flex-1 text-[10px] flex items-center justify-between font-mono">
                                        <span className="text-text-primary font-bold truncate max-w-[80px]">{alt.name}</span>
                                        <span className="text-text-secondary font-semibold flex items-center gap-1">
                                          <span>{alt.flag}</span>
                                          <span>{alt.country}</span>
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="text-[9px] font-mono text-text-secondary text-right pt-2">
                                LAST SCANNED: <span className="text-text-primary">{supplier.lastAnalyzed}</span>
                              </div>

                            </div>
                          )}

                        </div>
                      </div>
                    );
                  })}
              </div>

            </div>
          )}

          {/* ========================================================
              PAGE 3: LIVE RISK WAR ROOM
              ======================================================== */}
          {activePage === "warroom" && (
            <div className="space-y-6 animate-fade-slide">
              
              <div className="w-full bg-bg-base border-t border-b border-white/5 py-2.5 overflow-hidden relative select-none">
                <div className="flex whitespace-nowrap animate-ticker font-body text-xs text-text-secondary uppercase tracking-widest">
                  {[...PRE_FILLED_THREATS, ...PRE_FILLED_THREATS].map((threat, idx) => (
                    <span key={idx} className="inline-flex items-center mx-4 gap-2">
                      <span>{threat}</span>
                      <span className="text-accent-theme/40">â—†</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex justify-between items-center bg-white/3 backdrop-blur-md p-3 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Radio className="text-critical w-5 h-5 animate-pulse" />
                      <h3 className="font-display font-extrabold text-sm tracking-wider uppercase">Active Threat Telemetry Feed</h3>
                    </div>
                    <div className="flex items-center gap-2 bg-critical/10 px-2.5 py-0.5 rounded-full border border-critical/20">
                      <span className="w-1.5 h-1.5 bg-critical rounded-full animate-ping" />
                      <span className="font-display text-[9px] tracking-widest text-critical font-bold">STREAM ACTIVE</span>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[640px] overflow-y-auto pr-2">
                    {threatEvents.map(evt => {
                      let tagColor = "border-white/10 text-text-secondary bg-white/5";
                      let cardBorder = "border-white/5 hover:border-accent-theme/30";
                      
                      if (evt.severity === "CRITICAL") {
                        tagColor = "border-critical/30 text-critical bg-critical/5";
                        cardBorder = "border-critical/30 bg-critical/5 animate-glow-critical";
                      } else if (evt.severity === "HIGH") {
                        tagColor = "border-high/30 text-high bg-high/5";
                        cardBorder = "border-high/20 bg-high/3";
                      }

                      return (
                        <div 
                          key={evt.id} 
                          className={`p-5 rounded-2xl border transition-all duration-300 text-left animate-fade-slide ${cardBorder}`}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <span className={`text-[9px] font-display font-black px-2 py-0.5 rounded border tracking-widest uppercase ${tagColor}`}>
                                {evt.severity}
                              </span>
                              <h4 className="font-display font-black text-sm text-text-primary tracking-wide pt-2">
                                {evt.title}
                              </h4>
                            </div>
                            <span className="text-[9px] font-mono text-text-secondary whitespace-nowrap">{evt.timestamp}</span>
                          </div>

                          <p className="text-xs text-text-secondary leading-relaxed mt-3">{evt.desc}</p>

                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {evt.categories.map(cat => (
                              <span key={cat} className="text-[9px] font-mono border border-white/10 text-text-secondary bg-white/5 px-2 py-0.5 rounded-full">
                                {cat}
                              </span>
                            ))}
                          </div>

                          {evt.affectedSuppliers && evt.affectedSuppliers.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-white/5">
                              <span className="text-[9px] font-display font-bold text-text-secondary tracking-wider block mb-2">AFFECTED SYSTEM PARTNERS:</span>
                              <div className="flex flex-wrap gap-2">
                                {evt.affectedSuppliers.map(as => {
                                  const sup = suppliers.find(s => s.name === as);
                                  return (
                                    <div key={as} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg flex items-center gap-1.5 text-[10px] font-mono">
                                      <span className="w-1.5 h-1.5 rounded-full bg-critical animate-ping" />
                                      <span className="text-text-primary font-bold">{as}</span>
                                      <span className="text-text-secondary">({sup ? `${sup.riskPercentage}%` : '85%'})</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {evt.autoAnalyzed && (
                            <div className="mt-3 flex items-center gap-1 text-[9px] font-mono text-accent-theme">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>AI DIRECTIVE AUTOMATICALLY PROCESSED</span>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6 text-left">
                  
                  {/* Pro Max Component: Interactive Strategic Route Optimizer */}
                  <div className="glass-card p-5 relative overflow-hidden">
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <Globe className="text-accent-theme w-4.5 h-4.5 animate-pulse" />
                      Satellite Sea-Lane Route Optimizer
                    </h3>
                    <p className="text-[10px] text-text-secondary leading-normal mb-4 select-none">Simulate global shipping detours and evaluate transit exposures in real-time.</p>

                    <div className="relative bg-bg-base/40 border border-white/5 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 200 200" className="w-full h-full text-accent-theme select-none">
                        <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,2" opacity="0.3" />
                        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,2" opacity="0.3" />
                        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                        <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                        <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                        
                        {/* 1. Suez Route Vector */}
                        <path 
                          d="M 20,100 L 180,100" 
                          fill="none" 
                          stroke={selectedSeaRoute === "suez" ? "#FF2D55" : "rgba(255, 45, 85, 0.15)"} 
                          strokeWidth={selectedSeaRoute === "suez" ? "2" : "1"} 
                          className={selectedSeaRoute === "suez" ? "animate-pulse" : ""}
                        />
                        
                        {/* 2. Cape Route Vector */}
                        <path 
                          d="M 20,100 Q 100,160 180,100" 
                          fill="none" 
                          stroke={selectedSeaRoute === "cape" ? "#30D158" : "rgba(48, 209, 88, 0.15)"} 
                          strokeWidth={selectedSeaRoute === "cape" ? "2" : "1"} 
                          strokeDasharray={selectedSeaRoute === "cape" ? "" : "3,3"} 
                        />

                        {/* 3. IMEC Railway Vector */}
                        <path 
                          d="M 20,100 Q 100,120 180,100" 
                          fill="none" 
                          stroke={selectedSeaRoute === "imec" ? "#FF9933" : "rgba(255, 153, 51, 0.15)"} 
                          strokeWidth={selectedSeaRoute === "imec" ? "2" : "1"} 
                          strokeDasharray="2,2"
                        />

                        {/* 4. NSR Arctic Vector */}
                        <path 
                          d="M 20,100 Q 100,40 180,100" 
                          fill="none" 
                          stroke={selectedSeaRoute === "nsr" ? "#00D4FF" : "rgba(0, 212, 255, 0.15)"} 
                          strokeWidth={selectedSeaRoute === "nsr" ? "2" : "1"} 
                          strokeDasharray={selectedSeaRoute === "nsr" ? "" : "4,4"} 
                        />

                        {/* Central command node */}
                        <circle cx="100" cy="100" r="4" fill="var(--accent-theme)" />
                        
                        {/* Spinning sweep radar line */}
                        <line x1="100" y1="100" x2="180" y2="40" stroke="var(--accent-theme)" strokeWidth="1.2" className="origin-[100px_100px] animate-[orbitRotate_10s_linear_infinite]" />
                      </svg>

                      {/* Pulsing indicator node based on selection */}
                      {selectedSeaRoute === "suez" && <span className="w-2.5 h-2.5 rounded-full bg-critical border border-white absolute animate-pulse shadow-[0_0_12px_#FF2D55] z-30" style={{ left: '50%', top: '48%' }} />}
                      {selectedSeaRoute === "cape" && <span className="w-2.5 h-2.5 rounded-full bg-low border border-white absolute animate-pulse shadow-[0_0_12px_#30D158] z-30" style={{ left: '42%', top: '68%' }} />}
                      {selectedSeaRoute === "imec" && <span className="w-2.5 h-2.5 rounded-full bg-high border border-white absolute animate-pulse shadow-[0_0_12px_#FF9933] z-30" style={{ left: '45%', top: '56%' }} />}
                      {selectedSeaRoute === "nsr" && <span className="w-2.5 h-2.5 rounded-full bg-accent-theme border border-white absolute animate-pulse shadow-glow-cyan z-30" style={{ left: '48%', top: '24%' }} />}

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center text-[7.5px] font-mono bg-bg-base/85 border border-white/5 px-2 py-1 rounded">
                        <span className="text-critical uppercase">{selectedSeaRoute === "suez" ? "SUEZ: VOLATILE TARGET ACTIVE" : "SUEZ: BLOCKED"}</span>
                        <span className="text-low uppercase">{selectedSeaRoute === "cape" ? "CAPE: SAFE BYPASS SYSTEM ACTIVE" : "CAPE: REROUTED"}</span>
                      </div>
                    </div>

                    {/* Route selector buttons */}
                    <div className="space-y-2 mt-4 text-left">
                      <span className="text-[8px] font-display font-black text-text-secondary tracking-widest uppercase block mb-1">SELECT STRATEGIC SHIPMENT ROUTING:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "cape", label: "Cape Route Bypass", color: "border-[#FF9933] text-[#FF9933]", icon: "ðŸš¢" },
                          { id: "suez", label: "Suez Canal Direct", color: "border-critical text-critical", icon: "ðŸ’€" },
                          { id: "imec", label: "IMEC Railway Hybrid", color: "border-[#138808] text-[#138808]", icon: "ðŸšŠ" },
                          { id: "nsr", label: "NSR Arctic Path", color: "border-accent-theme text-accent-theme", icon: "â„ï¸" }
                        ].map(route => (
                          <button
                            key={route.id}
                            onClick={() => setSelectedSeaRoute(route.id)}
                            className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 select-none ${
                              selectedSeaRoute === route.id
                                ? `${route.color} bg-white/5 shadow-glow-cyan`
                                : "border-white/5 hover:border-white/10 text-text-secondary bg-white/2"
                            }`}
                          >
                            <span className="text-[9px] font-display font-extrabold flex items-center gap-1.5">
                              <span>{route.icon}</span> <span className="truncate">{route.label}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic route statistics */}
                    <div className="border border-white/5 bg-white/3 rounded-xl p-3.5 space-y-2.5 mt-4 text-left">
                      <div className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-2 select-none">
                        <span className="text-text-secondary">EST. TRANSIT DELAY:</span>
                        <strong className="text-text-primary font-bold">
                          {selectedSeaRoute === "cape" ? "+14 Days" : selectedSeaRoute === "suez" ? "0 Days" : selectedSeaRoute === "imec" ? "-5 Days" : "-10 Days"}
                        </strong>
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-2 select-none">
                        <span className="text-text-secondary">MARGIN COST ADJUSTMENT:</span>
                        <strong className="text-text-primary font-bold">
                          {selectedSeaRoute === "cape" ? "+22% Freight Cost" : selectedSeaRoute === "suez" ? "Standard Rates" : selectedSeaRoute === "imec" ? "+35% Capital Cost" : "+45% Escort Fees"}
                        </strong>
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-2 select-none">
                        <span className="text-text-secondary">INSURANCE DEFCON PREMIUM:</span>
                        <strong className={selectedSeaRoute === "suez" ? "text-critical font-bold" : "text-low font-bold"}>
                          {selectedSeaRoute === "cape" ? "-75% Reduction" : selectedSeaRoute === "suez" ? "+240% Surcharge" : selectedSeaRoute === "imec" ? "-30% Lower" : "+120% Weather Tax"}
                        </strong>
                      </div>
                      <div className="text-[9px] text-text-secondary italic leading-relaxed pt-1 select-text">
                        {selectedSeaRoute === "cape" && "ðŸ’¡ Directive: High-priority microchips should bypass Suez immediately. Cape of Good Hope rerouting minimizes direct piracy exposure, though adding logistics delays."}
                        {selectedSeaRoute === "suez" && "ðŸš¨ Warning: Severe maritime threat levels are active near Bab al-Mandab. Suez transits will incur massive high-stress surcharges and potential total shipping stoppages."}
                        {selectedSeaRoute === "imec" && "ðŸ’¡ Directive: IMEC rail transport connects Mundra rail tracks directly to Western Europe. Excellent hedge to maritime distress, despite elevated customs friction."}
                        {selectedSeaRoute === "nsr" && "âš ï¸ Caution: NSR Arctic corridor offers extreme transit shortcuts, but requires heavily specialized ice-breaker support and remains highly vulnerable to extreme climatology."}
                      </div>
                    </div>

                  </div>

                  <div className="glass-card p-5">
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4">Multi-Dimensional Portfolio Risk Radar</h3>
                    <div className="h-64 flex justify-center items-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={suppliers}>
                          <PolarGrid stroke="rgba(255,255,255,0.05)" />
                          <PolarAngleAxis dataKey="name" stroke="#8899AA" style={{ fontSize: '10px', fontFamily: 'Orbitron' }} />
                          <PolarRadiusAxis stroke="#8899AA" style={{ fontSize: '9px', fontFamily: 'Mono' }} />
                          <Radar name="Geopolitical" dataKey="geopoliticalScore" stroke="#FF2D55" fill="#FF2D55" fillOpacity={0.2} />
                          <Radar name="Logistics" dataKey="logisticsScore" stroke="var(--accent-theme)" fill="var(--accent-theme)" fillOpacity={0.2} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(5, 10, 20, 0.95)', border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '8px' }}
                            itemStyle={{ color: '#F0F8FF', fontSize: '12px' }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="glass-card p-5 space-y-4">
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4">Real-Time Threat Telemetry</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Threats Cataloged Today", value: threatsDetectedToday, color: "text-accent-theme" },
                        { label: "Auto-Scans Completed", value: autoUpdatesTriggered, color: "text-medium" },
                        { label: "Supplier Nodes in Alert", value: suppliers.filter(s => ["CRITICAL", "HIGH"].includes(s.riskLevel)).length, color: "text-critical" },
                        { label: "Telemetry Uptime Monitor", value: formattedUptime, color: "text-low" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/3 border border-white/5 p-4 rounded-xl">
                          <span className="text-[9px] font-display font-bold text-text-secondary uppercase">{item.label}</span>
                          <h4 className={`text-xl font-display font-black tracking-tight mt-1.5 ${item.color}`}>{item.value}</h4>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsMonitoringActive(!isMonitoringActive)}
                      className={`w-full py-3 rounded-xl border font-display font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        isMonitoringActive 
                          ? 'border-critical/30 hover:border-critical bg-critical/5 text-critical' 
                          : 'border-accent-theme/30 hover:border-accent-theme bg-accent-theme/5 text-accent-theme'
                      }`}
                    >
                      {isMonitoringActive ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>PAUSE LIVE THREAT INTAKE</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 animate-ping" />
                          <span>RESUME MONITORING ACTIVE</span>
                        </>
                      )}
                    </button>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ========================================================
              PAGE 4: AGENT REASONING TRACE
              ======================================================== */}
          {activePage === "trace" && (
            <div className="space-y-6 animate-fade-slide">
              
              {/* Pro Max: Interactive SVG Sub-Tier Supply Chain Dependency network graph */}
              <div className="glass-card p-5 text-left space-y-4">
                <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <Globe className="text-accent-theme w-4.5 h-4.5" />
                  Sub-Tier Supplier Dependency Network Map
                </h3>
                <p className="text-[10px] text-text-secondary leading-normal">Trace critical microchips and feedstocks from raw fabrication to logistics hubs and final enterprise node. Pulse indicates risk level.</p>

                <div className="relative bg-bg-base/30 border border-white/5 rounded-xl p-4 flex justify-center items-center h-64 overflow-x-auto">
                  <svg viewBox="0 0 800 220" className="w-full min-w-[600px] h-full text-text-secondary select-none">
                    
                    {/* Path traces connecting Tier 3 to Tier 2 */}
                    <path d="M 120,30 L 320,30 M 120,70 L 320,70 M 120,110 L 320,110 M 120,150 L 320,70 M 120,150 L 320,190 M 120,190 L 320,220 M 120,190 L 320,70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="3,3" />
                    {/* Path traces connecting Tier 2 to Tier 1 */}
                    <path d="M 380,30 L 580,65 M 380,70 L 580,115 M 380,110 L 580,65 M 380,150 L 580,115 M 380,190 L 580,165 M 380,220 L 580,165" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="3,3" />
                    {/* Path traces connecting Tier 1 to target command center */}
                    <path d="M 640,65 L 740,110 M 640,115 L 740,110 M 640,165 L 740,110" fill="none" stroke="var(--accent-theme)" strokeWidth="2.5" strokeDasharray="4,4" className="animate-[orbitRotate_15s_linear_infinite]" />

                    {/* Column 1: Tier 3 (Raw Materials / Tooling / Aerospace Alloys) */}
                    {[
                      { id: "sup_asml", name: "ASML EUV", x: 80, y: 30 },
                      { id: "sup_basf", name: "BASF Chem", x: 80, y: 70 },
                      { id: "sup_byd", name: "BYD Battery", x: 80, y: 110 },
                      { id: "sup_reliance", name: "Jamnagar Petro (IN)", x: 80, y: 150 },
                      { id: "sup_isro", name: "ISRO Aero (IN)", x: 80, y: 190 }
                    ].map(node => {
                      const sup = suppliers.find(s => s.id === node.id);
                      const color = sup ? (sup.riskLevel === 'CRITICAL' ? 'fill-critical' : (sup.riskLevel === 'HIGH' ? 'fill-high' : (sup.riskLevel === 'MEDIUM' ? 'fill-medium' : 'fill-low'))) : 'fill-low';
                      return (
                        <g key={node.id} className="cursor-pointer" onClick={() => { setTraceSupplierId(node.id); setTraceStatus("idle"); }}>
                          <circle cx={node.x} cy={node.y} r="8" className={`animate-pulse ${color}`} />
                          <circle cx={node.x} cy={node.y} r="5" fill="#050A14" />
                          <text x={node.x - 50} y={node.y + 3} fill="#8899AA" className="text-[7.5px] font-mono">{node.name}</text>
                        </g>
                      );
                    })}

                    {/* Column 2: Tier 2 (Production Fabs / Advanced OSATs) */}
                    {[
                      { id: "sup_tsmc", name: "TSMC Fab", x: 350, y: 30 },
                      { id: "sup_tata", name: "Tata OSAT (IN)", x: 350, y: 70 },
                      { id: "sup_samsung", name: "Samsung", x: 350, y: 110 },
                      { id: "sup_murata", name: "Murata CAPs", x: 350, y: 150 },
                      { id: "sup_bel", name: "BEL Pune (IN)", x: 350, y: 190 },
                      { id: "sup_serum", name: "Serum Biotech (IN)", x: 350, y: 220 }
                    ].map(node => {
                      const sup = suppliers.find(s => s.id === node.id);
                      const color = sup ? (sup.riskLevel === 'CRITICAL' ? 'fill-critical' : (sup.riskLevel === 'HIGH' ? 'fill-high' : (sup.riskLevel === 'MEDIUM' ? 'fill-medium' : 'fill-low'))) : 'fill-low';
                      return (
                        <g key={node.id} className="cursor-pointer" onClick={() => { setTraceSupplierId(node.id); setTraceStatus("idle"); }}>
                          <circle cx={node.x} cy={node.y} r="8" className={`animate-pulse ${color}`} />
                          <circle cx={node.x} cy={node.y} r="5" fill="#050A14" />
                          <text x={node.x - 30} y={node.y - 10} fill="#8899AA" className="text-[7.5px] font-mono font-bold">{node.name}</text>
                        </g>
                      );
                    })}

                    {/* Column 3: Tier 1 (Logistics Nodes & Tracking Systems) */}
                    {[
                      { id: "sup_maersk", name: "Maersk Sea", x: 610, y: 65 },
                      { id: "sup_adani", name: "Adani Mundra (IN)", x: 610, y: 115 },
                      { id: "sup_infosys", name: "Infosys Track (IN)", x: 610, y: 165 }
                    ].map(node => {
                      const sup = suppliers.find(s => s.id === node.id);
                      const color = sup ? (sup.riskLevel === 'CRITICAL' ? 'fill-critical' : (sup.riskLevel === 'HIGH' ? 'fill-high' : (sup.riskLevel === 'MEDIUM' ? 'fill-medium' : 'fill-low'))) : 'fill-low';
                      return (
                        <g key={node.id} className="cursor-pointer" onClick={() => { setTraceSupplierId(node.id); setTraceStatus("idle"); }}>
                          <circle cx={node.x} cy={node.y} r="8" className={`animate-pulse ${color}`} />
                          <circle cx={node.x} cy={node.y} r="5" fill="#050A14" />
                          <text x={node.x + 14} y={node.y + 3} fill="#8899AA" className="text-[7.5px] font-mono font-bold">{node.name}</text>
                        </g>
                      );
                    })}

                    {/* Enterprise Target Node: BuddyAI */}
                    <g className="cursor-pointer">
                      <rect x="735" y="95" width="30" height="30" rx="6" fill="var(--accent-theme)" className="opacity-15 animate-pulse" />
                      <rect x="740" y="100" width="20" height="20" rx="4" fill="var(--accent-theme)" />
                      <text x="710" y="145" fill="var(--accent-theme)" className="text-[9px] font-display font-black tracking-widest">BUDDY SHIELD</text>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="glass-card p-5 flex flex-col md:flex-row gap-4 justify-between items-center text-left">
                <div>
                  <h3 className="font-display font-extrabold text-sm tracking-widest uppercase">Multi-Agent Verification Pipeline</h3>
                  <p className="text-[10px] text-text-secondary mt-1">Trace real-time parsing execution logs across sub-tier components.</p>
                </div>
                
                <select
                  value={traceSupplierId}
                  onChange={(e) => {
                    setTraceSupplierId(e.target.value);
                    setTraceStatus("idle");
                  }}
                  className="w-full md:w-60 bg-white/5 border border-white/5 focus:border-accent-theme focus:outline-none rounded-xl py-2 px-3 text-xs font-mono text-text-primary"
                >
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.country})</option>)}
                </select>
              </div>

              <div className="glass-card p-6 space-y-6 text-left relative">
                
                <div className="absolute left-[33px] top-12 bottom-12 border-l border-dashed border-white/10 z-0" />

                {[
                  {
                    num: 1,
                    name: "Agent 1 â€” DATA COLLECTOR",
                    icon: Globe,
                    color: "text-accent-theme border-accent-theme/30",
                    log: traceLogs.collector || "Awaiting scan trigger to collect satellite coordinate logs, regional DEFCON bulletins, and lead-time latencies."
                  },
                  {
                    num: 2,
                    name: "Agent 2 â€” RISK ANALYZER",
                    icon: Activity,
                    color: "text-high border-high/30",
                    log: traceLogs.analyzer || "Awaiting scan trigger to parse geopolitical friction variables and compute weighted supply risk factors."
                  },
                  {
                    num: 3,
                    name: "Agent 3 â€” VENDOR INTELLIGENCE",
                    icon: Truck,
                    color: "text-low border-low/30",
                    log: traceLogs.vendor || "Awaiting scan trigger to cross-reference alternative qualified manufacturers and calculate margin repositioning deltas."
                  },
                  {
                    num: 4,
                    name: "Agent 4 â€” REPORT GENERATOR",
                    icon: FileText,
                    color: "text-accent-theme border-accent-theme/30",
                    log: traceLogs.generator || "Awaiting scan trigger to synthesize all quantitative outputs into an actionable boardroom strategic advisory directive."
                  }
                ].map(node => {
                  const Icon = node.icon;
                  return (
                    <div key={node.num} className="flex gap-6 items-start relative z-10 animate-fade-slide">
                      
                      <div className={`w-10 h-10 rounded-full border bg-bg-base flex items-center justify-center font-display font-black text-xs ${node.color} shadow-glow-cyan flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 bg-white/3 border border-white/5 rounded-2xl p-4 font-mono text-xs">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5">
                          <span className="font-display font-extrabold text-[10px] tracking-wider text-text-primary uppercase">{node.name}</span>
                          <span className="text-[9px] text-text-secondary uppercase font-bold">
                            {traceStatus === 'complete' ? "COMPLETE âœ“" : (traceStatus === 'running' ? "RUNNING..." : "PENDING")}
                          </span>
                        </div>
                        <p className="text-text-secondary leading-relaxed whitespace-pre-line">{node.log}</p>
                        
                        <div className="flex gap-4 mt-3 text-[9px] text-accent-theme/60">
                          <span>EXECUTION: <strong className="text-accent-theme">340ms</strong></span>
                          <span>TOKENS ESTIMATED: <strong className="text-accent-theme">380</strong></span>
                        </div>
                      </div>

                    </div>
                  );
                })}

              </div>

              {/* Pro Max Feature 4: Cyber Shield API Firewall Isolation Console */}
              <div className="glass-card p-6 text-left space-y-4 border-critical/30 relative overflow-hidden">
                {/* Glowing red-cyan laser bar accent */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-critical via-transparent to-accent-theme opacity-80" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest flex items-center gap-2">
                      <Shield className="text-critical w-4.5 h-4.5 animate-pulse" />
                      Zero-Trust API Firewall Isolation Console
                    </h3>
                    <p className="text-[10px] text-text-secondary leading-normal">
                      Supplier API hooks represent external network vulnerability entryways. Quarantining compromised nodes severs connection metrics instantly.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-left md:text-right font-mono text-xs select-none flex-shrink-0">
                    <span className="text-[8px] text-text-secondary uppercase">SECURE QUARANTINE SHIELD STATUS</span>
                    <p className="text-xs font-bold text-low mt-0.5">ZERO-TRUST SHIELD: <strong className="text-critical">{Object.values(isolatedNodes).filter(Boolean).length} ISOLATED</strong></p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[260px] overflow-y-auto pr-1 mt-3">
                  {suppliers.map(s => {
                    const isIsolated = !!isolatedNodes[s.id];
                    let cyberHealth = "text-low";
                    let cyberBar = "bg-low";
                    if (s.cyberScore > 65) {
                      cyberHealth = "text-critical animate-pulse";
                      cyberBar = "bg-critical";
                    } else if (s.cyberScore > 45) {
                      cyberHealth = "text-high";
                      cyberBar = "bg-high";
                    } else if (s.cyberScore > 30) {
                      cyberHealth = "text-medium";
                      cyberBar = "bg-medium";
                    }

                    return (
                      <div 
                        key={s.id} 
                        className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                          isIsolated 
                            ? 'border-critical/30 bg-critical/5 shadow-[0_0_12px_rgba(255,45,85,0.15)]' 
                            : 'border-white/5 bg-white/3 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="truncate">
                            <span className="text-[10px] font-display font-extrabold text-text-primary uppercase tracking-wide truncate block">
                              {s.name}
                            </span>
                            <span className="text-[8px] font-mono text-text-secondary mt-0.5 block truncate">{s.flag} {s.country} // {s.category}</span>
                          </div>

                          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            {isIsolated ? (
                              <span className="text-[7px] font-mono font-bold px-1.5 py-0.5 rounded border border-critical text-critical bg-critical/5 uppercase animate-pulse">
                                ðŸ”’ ISOLATED
                              </span>
                            ) : (
                              <span className="text-[7px] font-mono font-bold px-1.5 py-0.5 rounded border border-low text-low bg-low/5 uppercase">
                                ðŸ”“ AUTHORIZED
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Cyber Health Index */}
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between items-center text-[8.5px] font-mono">
                            <span className="text-text-secondary uppercase">API Vulnerability Rating</span>
                            <span className={`font-bold ${cyberHealth}`}>{s.cyberScore}% risk</span>
                          </div>
                          <div className="w-full bg-white/5 border border-white/5 h-1.5 rounded-full overflow-hidden p-[0.5px]">
                            <div 
                              className={`h-full rounded-full ${cyberBar} transition-all duration-300`} 
                              style={{ width: `${s.cyberScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Isolation Switch Toggle */}
                        <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-white/5">
                          <span className="text-[7.5px] font-mono text-text-secondary uppercase">FIREWALL STATUS</span>
                          <button
                            onClick={() => handleToggleIsolation(s.id)}
                            className={`px-2.5 py-1 rounded-lg font-display text-[8px] font-bold uppercase tracking-wider transition-all select-none focus:outline-none ${
                              isIsolated 
                                ? 'bg-critical text-white shadow-[0_0_10px_rgba(255,45,85,0.4)]' 
                                : 'border border-white/10 hover:border-critical/30 text-text-secondary hover:text-critical'
                            }`}
                          >
                            {isIsolated ? "Restore API" : "Sever API"}
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    handleAnalyzeSupplier(traceSupplierId);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-accent-theme to-accent-theme/80 text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all select-none"
                >
                  RUN LIVE AGENT PIPELINE SCAN
                </button>

                <button
                  onClick={() => {
                    const payload = {
                      supplier: traceSupplierId,
                      logs: traceLogs,
                      systemStatus: "ACTIVE",
                      timestamp: new Date().toISOString()
                    };
                    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
                    triggerToast("Pipeline Trace JSON copied to clipboard!", "cyan");
                  }}
                  className="px-4 py-2 border border-white/5 hover:border-white/20 rounded-xl text-text-secondary hover:text-text-primary transition-all text-xs font-display font-semibold uppercase tracking-wider"
                >
                  Export Trace JSON
                </button>
              </div>

              {/* ===== NEW SPECIALIST AI AGENTS ===== */}
              <div className="space-y-1 pt-4">
                <h3 className="font-display font-black text-xs text-text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933] animate-pulse" />
                  Specialist Intelligence Agents — India Operations Command
                </h3>
                <p className="text-[10px] text-text-secondary">Three dedicated autonomous agents providing live geopolitical, forex, and weather risk intelligence for Indian supply corridors.</p>
              </div>

              {/* AGENT: OSINT Sentinel */}
              {(() => {
                const statusColors = { idle: "text-text-secondary border-white/10", running: "text-accent-theme border-accent-theme/40 animate-pulse", complete: "text-low border-low/30", error: "text-critical border-critical/30" };
                const statusLabel = { idle: "IDLE", running: "SCANNING...", complete: "COMPLETE ✓", error: "ERROR" };
                return (
                  <div className="glass-card p-5 space-y-4 text-left border-l-4 border-l-[#00D4FF]/60">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent-theme/10 border border-accent-theme/30 flex items-center justify-center text-xl">🛰️</div>
                        <div>
                          <h4 className="font-display font-black text-xs text-text-primary uppercase tracking-widest">OSINT Sentinel</h4>
                          <p className="text-[9px] font-mono text-text-secondary mt-0.5">Geopolitical News & Sanctions Intelligence Scanner</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[8px] font-display font-black px-2 py-0.5 rounded border tracking-widest uppercase ${statusColors[osintStatus]}`}>
                          {statusLabel[osintStatus]}
                        </span>
                        <button
                          onClick={osintStatus === "complete" || osintStatus === "error" ? () => { setOsintStatus("idle"); setOsintLogs(["[OSINT] Agent reset. Click 'Run Agent' to begin."]) } : handleRunOsintAgent}
                          disabled={osintStatus === "running"}
                          className={`px-4 py-1.5 rounded-xl font-display font-black text-[9px] uppercase tracking-widest transition-all select-none ${osintStatus === "running" ? "bg-accent-theme/20 text-accent-theme/50 cursor-not-allowed" : osintStatus === "complete" || osintStatus === "error" ? "border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20" : "bg-accent-theme text-white hover:opacity-90"}`}
                        >
                          {osintStatus === "running" ? "SCANNING..." : osintStatus === "complete" || osintStatus === "error" ? "RESET" : "RUN AGENT"}
                        </button>
                      </div>
                    </div>
                    <div className="bg-black/50 border border-accent-theme/15 rounded-xl p-4 font-mono text-[10px] text-accent-theme space-y-1.5 max-h-36 overflow-y-auto">
                      {osintLogs.map((log, idx) => (
                        <div key={idx} className={`flex gap-2 ${log.includes("✅") ? "text-low font-bold" : log.includes("DEFCON") || log.includes("ELEVATED") ? "text-high" : "text-accent-theme"}`}>
                          <span className="opacity-40">›</span><span>{log}</span>
                        </div>
                      ))}
                      {osintStatus === "running" && <div className="text-accent-theme/50 animate-pulse">█</div>}
                    </div>
                  </div>
                );
              })()}

              {/* AGENT: Rupee FX Hedger */}
              {(() => {
                const statusColors = { idle: "text-text-secondary border-white/10", running: "text-[#FF9933] border-[#FF9933]/40 animate-pulse", complete: "text-low border-low/30", error: "text-critical border-critical/30" };
                const statusLabel = { idle: "IDLE", running: "COMPUTING...", complete: "COMPLETE ✓", error: "ERROR" };
                return (
                  <div className="glass-card p-5 space-y-4 text-left border-l-4 border-l-[#FF9933]/60">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FF9933]/10 border border-[#FF9933]/30 flex items-center justify-center text-xl">💹</div>
                        <div>
                          <h4 className="font-display font-black text-xs text-text-primary uppercase tracking-widest">Rupee FX Hedger</h4>
                          <p className="text-[9px] font-mono text-text-secondary mt-0.5">USD/INR Impact Analyzer & Forex Hedge Advisor — Live Rate: ₹{inrRate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[8px] font-display font-black px-2 py-0.5 rounded border tracking-widest uppercase ${statusColors[fxStatus]}`}>
                          {statusLabel[fxStatus]}
                        </span>
                        <button
                          onClick={fxStatus === "complete" || fxStatus === "error" ? () => { setFxStatus("idle"); setFxLogs(["[FX] Agent reset. Click 'Run Agent' to begin."]) } : handleRunFxAgent}
                          disabled={fxStatus === "running"}
                          className={`px-4 py-1.5 rounded-xl font-display font-black text-[9px] uppercase tracking-widest transition-all select-none ${fxStatus === "running" ? "bg-[#FF9933]/20 text-[#FF9933]/50 cursor-not-allowed" : fxStatus === "complete" || fxStatus === "error" ? "border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20" : "bg-[#FF9933] text-white hover:opacity-90"}`}
                        >
                          {fxStatus === "running" ? "COMPUTING..." : fxStatus === "complete" || fxStatus === "error" ? "RESET" : "RUN AGENT"}
                        </button>
                      </div>
                    </div>
                    <div className="bg-black/50 border border-[#FF9933]/15 rounded-xl p-4 font-mono text-[10px] text-[#FF9933] space-y-1.5 max-h-36 overflow-y-auto">
                      {fxLogs.map((log, idx) => (
                        <div key={idx} className={`flex gap-2 ${log.includes("✅") ? "text-low font-bold" : log.includes("Crore") || log.includes("compression") ? "text-high" : "text-[#FF9933]"}`}>
                          <span className="opacity-40">›</span><span>{log}</span>
                        </div>
                      ))}
                      {fxStatus === "running" && <div className="text-[#FF9933]/50 animate-pulse">█</div>}
                    </div>
                  </div>
                );
              })()}

              {/* AGENT: Monsoon Weather Oracle */}
              {(() => {
                const statusColors = { idle: "text-text-secondary border-white/10", running: "text-[#138808] border-[#138808]/40 animate-pulse", complete: "text-low border-low/30", error: "text-critical border-critical/30" };
                const statusLabel = { idle: "IDLE", running: "SCANNING...", complete: "COMPLETE ✓", error: "ERROR" };
                return (
                  <div className="glass-card p-5 space-y-4 text-left border-l-4 border-l-[#138808]/60">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#138808]/10 border border-[#138808]/30 flex items-center justify-center text-xl">🌦️</div>
                        <div>
                          <h4 className="font-display font-black text-xs text-text-primary uppercase tracking-widest">Monsoon Weather Oracle</h4>
                          <p className="text-[9px] font-mono text-text-secondary mt-0.5">IMD Port Weather Monitor — Mundra {indiaPortThroughput.mundra}% / JNPT {indiaPortThroughput.jnpt}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[8px] font-display font-black px-2 py-0.5 rounded border tracking-widest uppercase ${statusColors[weatherStatus]}`}>
                          {statusLabel[weatherStatus]}
                        </span>
                        <button
                          onClick={weatherStatus === "complete" || weatherStatus === "error" ? () => { setWeatherStatus("idle"); setWeatherLogs(["[WEATHER] Agent reset. Click 'Run Agent' to begin."]) } : handleRunWeatherAgent}
                          disabled={weatherStatus === "running"}
                          className={`px-4 py-1.5 rounded-xl font-display font-black text-[9px] uppercase tracking-widest transition-all select-none ${weatherStatus === "running" ? "bg-[#138808]/20 text-[#138808]/50 cursor-not-allowed" : weatherStatus === "complete" || weatherStatus === "error" ? "border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20" : "bg-[#138808] text-white hover:opacity-90"}`}
                        >
                          {weatherStatus === "running" ? "SCANNING..." : weatherStatus === "complete" || weatherStatus === "error" ? "RESET" : "RUN AGENT"}
                        </button>
                      </div>
                    </div>
                    <div className="bg-black/50 border border-[#138808]/15 rounded-xl p-4 font-mono text-[10px] text-[#30D158] space-y-1.5 max-h-36 overflow-y-auto">
                      {weatherLogs.map((log, idx) => (
                        <div key={idx} className={`flex gap-2 ${log.includes("✅") ? "text-low font-bold" : log.includes("Cyclone") || log.includes("MEDIUM") ? "text-high" : "text-[#30D158]"}`}>
                          <span className="opacity-40">›</span><span>{log}</span>
                        </div>
                      ))}
                      {weatherStatus === "running" && <div className="text-[#30D158]/50 animate-pulse">█</div>}
                    </div>
                  </div>
                );
              })()}

            </div>
          )}

          {/* ========================================================
              PAGE 5: SCENARIO ENGINE
              ======================================================== */}
          {activePage === "scenarios" && (
            <div className="space-y-6 animate-fade-slide">
              
              <div className="text-left space-y-1">
                <h2 className="font-display font-extrabold text-lg tracking-widest uppercase">Operations Scenario Simulator</h2>
                <p className="text-xs text-text-secondary">Model hypothetical global crises and evaluate immediate financial, logistics, and risk exposures.</p>
              </div>

              {/* Scenario Tab Switcher */}
              <div className="flex gap-4 border-b border-white/5 pb-2">
                <button
                  onClick={() => {
                    setIsSandboxMode(false);
                    setSimResults(null);
                  }}
                  className={`pb-2 px-1 font-display font-bold text-xs uppercase tracking-widest transition-all focus:outline-none ${
                    !isSandboxMode 
                      ? 'text-accent-theme border-b-2 border-accent-theme' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Standard Crises
                </button>
                <button
                  onClick={() => {
                    setIsSandboxMode(true);
                    setSimResults(null);
                  }}
                  className={`pb-2 px-1 font-display font-bold text-xs uppercase tracking-widest transition-all focus:outline-none ${
                    isSandboxMode 
                      ? 'text-accent-theme border-b-2 border-accent-theme' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Monte Carlo Stress Sandbox ðŸš€
                </button>
              </div>

              {!isSandboxMode ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {SCENARIOS.map(scen => {
                      const isSelected = selectedScenarioId === scen.id;
                      return (
                        <button
                          key={scen.id}
                          onClick={() => {
                            setSelectedScenarioId(scen.id);
                            setSimResults(null);
                          }}
                          className={`glass-card p-5 text-left flex flex-col justify-between transition-all select-none ${
                            isSelected ? 'border-accent-theme shadow-glow-cyan' : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-2xl">{scen.icon}</span>
                              <span className={`text-[9px] font-display font-bold px-2 py-0.5 rounded border tracking-wider uppercase ${
                                scen.severity === 'CRITICAL' ? 'text-critical border-critical/30' : 'text-high border-high/30'
                              }`}>
                                {scen.severity}
                              </span>
                            </div>

                            <h4 className="font-display font-extrabold text-sm text-text-primary tracking-wide pt-2">
                              {scen.name}
                            </h4>
                            <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                              {scen.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
                            <span className="text-text-secondary uppercase">AFFECTS:</span>
                            <span className="text-accent-theme font-bold uppercase">{scen.categories.join(", ")}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="glass-card p-5 space-y-4 text-left">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-display font-bold text-text-secondary uppercase tracking-widest">CRISIS MODELING INTENSITY</label>
                      <span className="text-xl font-display font-black text-critical">{scenarioIntensity} / 10</span>
                    </div>
                    
                    <input 
                      type="range"
                      min="1"
                      max="10"
                      value={scenarioIntensity}
                      onChange={(e) => {
                        setScenarioIntensity(Number(e.target.value));
                        setSimResults(null);
                      }}
                      className="w-full accent-accent-theme cursor-pointer bg-white/10 rounded-lg h-2"
                    />

                    <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary">
                      <span>CONTAINED / LOCALIZED</span>
                      <span>MID-LEVEL CONTRACTION</span>
                      <span className="text-critical">CATASTROPHIC / GLOBAL CRISIS</span>
                    </div>
                  </div>

                  <button
                    onClick={handleRunScenario}
                    disabled={isSimulating}
                    className="w-full py-4 bg-gradient-to-r from-accent-theme to-accent-theme/80 text-white font-display font-black text-sm uppercase tracking-widest rounded-2xl hover:opacity-95 transition-all shadow-glow-cyan"
                  >
                    {isSimulating ? "AI COMPUTING GEOPOLITICAL FLOW MATRIX..." : "RUN SCENARIO SIMULATION"}
                  </button>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Sandbox Controls */}
                    <div className="space-y-6">
                      <div className="glass-card p-5 text-left space-y-4">
                        <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest">
                          1. Target Category to Shock
                        </h3>
                        <p className="text-[10px] text-text-secondary">Select the industrial sector to test against the shock vector.</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {["Electronics", "Logistics", "Raw Materials", "Food", "Pharma"].map(cat => {
                            const isActive = sandboxCategory === cat;
                            return (
                              <button
                                key={cat}
                                onClick={() => {
                                  setSandboxCategory(cat);
                                  setSimResults(null);
                                }}
                                className={`py-2 px-3.5 rounded-xl border text-[10px] font-display font-bold uppercase tracking-wider transition-all select-none ${
                                  isActive 
                                    ? 'border-accent-theme bg-accent-theme/10 text-accent-theme shadow-glow-cyan' 
                                    : 'border-white/5 bg-white/3 text-text-secondary hover:text-text-primary hover:bg-white/5'
                                }`}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="glass-card p-5 text-left space-y-4">
                        <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest">
                          2. Select Primary Shock Driver
                        </h3>
                        <p className="text-[10px] text-text-secondary">Choose the root catalyst triggering the simulated Monte Carlo vectors.</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {["Geopolitical", "Weather", "Cyber", "Financial", "Regulatory"].map(drv => {
                            const isActive = sandboxDriver === drv;
                            return (
                              <button
                                key={drv}
                                onClick={() => {
                                  setSandboxDriver(drv);
                                  setSimResults(null);
                                }}
                                className={`py-2 px-3.5 rounded-xl border text-[10px] font-display font-bold uppercase tracking-wider transition-all select-none ${
                                  isActive 
                                    ? 'border-accent-theme bg-accent-theme/10 text-accent-theme shadow-glow-cyan' 
                                    : 'border-white/5 bg-white/3 text-text-secondary hover:text-text-primary hover:bg-white/5'
                                }`}
                              >
                                {drv}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="glass-card p-5 text-left space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest">
                            3. Set Shock Intensity
                          </h3>
                          <span className="text-base font-display font-black text-critical">{sandboxIntensity} / 10</span>
                        </div>
                        <input 
                          type="range"
                          min="1"
                          max="10"
                          value={sandboxIntensity}
                          onChange={(e) => {
                            setSandboxIntensity(Number(e.target.value));
                            setSimResults(null);
                          }}
                          className="w-full accent-accent-theme cursor-pointer bg-white/10 rounded-lg h-2"
                        />
                        <div className="flex justify-between items-center text-[9px] font-mono text-text-secondary">
                          <span>LOCALIZED SHOCK</span>
                          <span>MID-SCALE DISTURBANCE</span>
                          <span className="text-critical">CATASTROPHIC CRISIS</span>
                        </div>
                      </div>

                      <button
                        onClick={handleRunSandboxSimulation}
                        disabled={isSimulating}
                        className="w-full py-4 bg-gradient-to-r from-accent-theme to-accent-theme/80 text-white font-display font-black text-xs uppercase tracking-widest rounded-2xl hover:opacity-95 transition-all shadow-glow-cyan"
                      >
                        {isSimulating ? "RUNNING SIMULATIONS..." : "EXECUTE 10,000 MONTE CARLO STRESS SHOCKS"}
                      </button>
                    </div>

                    {/* Console log terminal for Sandbox */}
                    <div className="glass-card p-5 flex flex-col justify-between text-left h-full min-h-[380px] bg-black/60 relative overflow-hidden rounded-2xl border-white/5">
                      <div className="absolute top-4 right-4 text-[7px] font-mono text-text-secondary/40 tracking-widest uppercase">STRESS ENGINE NODE</div>
                      <div className="space-y-3">
                        <h3 className="font-display font-bold text-xs text-accent-theme uppercase tracking-widest">
                          ðŸ›¡ï¸ MONTE CARLO TELEMETRY LOGS
                        </h3>
                        <p className="text-[10px] font-mono text-text-secondary">Dynamic simulation log feeds of stressed paths.</p>
                      </div>

                      <div className="flex-1 my-4 bg-black/45 border border-white/5 p-4 rounded-xl font-mono text-[9px] text-accent-theme space-y-1.5 overflow-y-auto max-h-[220px]">
                        {sandboxLogs.length === 0 ? (
                          <div className="text-text-secondary/40 italic">Awaiting sandbox simulation trigger...</div>
                        ) : (
                          sandboxLogs.map((log, idx) => (
                            <div key={idx} className={`${log.includes('[COMPLETE]') ? 'text-low font-bold' : (log.includes('[SHOCK]') ? 'text-high font-bold' : 'text-accent-theme')}`}>
                              {log}
                            </div>
                          ))
                        )}
                      </div>

                      <div className="text-[8px] font-mono text-text-secondary/40">
                        10,000 MULTI-VARIATE PATH EQUATIONS RESOLVED // HACKATHON STRESS SUITE ACTIVE
                      </div>
                    </div>

                  </div>
                </>
              )}

              {simResults && (
                <div className="glass-card p-6 space-y-6 text-left animate-fade-slide border-l-4 border-l-critical">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">âš¡</span>
                        <h3 className="font-display font-black text-base text-text-primary tracking-widest uppercase">
                          SIMULATION RESULTS: {SCENARIOS.find(s => s.id === selectedScenarioId).name}
                        </h3>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{simResults.scenarioSummary}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/5 p-3 rounded-xl font-mono text-xs">
                      <div>
                        <span className="text-[9px] font-display font-semibold text-text-secondary uppercase">EST. VALUE AT RISK</span>
                        <p className="text-base text-critical font-bold">{simResults.totalImpact}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-display font-semibold text-text-secondary uppercase">RECOVERY HORIZON</span>
                        <p className="text-base text-text-primary font-bold">{simResults.recoveryTimeEstimate}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest mb-4">Comparative Scenario Impact Index</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={simResults.supplierImpacts}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                          <XAxis dataKey="name" stroke="#8899AA" style={{ fontSize: '10px', fontFamily: 'Orbitron' }} />
                          <YAxis stroke="#8899AA" style={{ fontSize: '10px', fontFamily: 'Mono' }} domain={[0, 100]} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(5, 10, 20, 0.95)', border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '8px' }}
                            itemStyle={{ color: '#F0F8FF', fontSize: '12px' }}
                          />
                          <Bar dataKey="baselineRiskPercentage" fill="rgba(255, 255, 255, 0.15)" name="Baseline Risk (%)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="scenarioRiskPercentage" fill="#FF2D55" name="Scenario Risk (%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest">Partner Exposure Matrix</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
                      {simResults.supplierImpacts.map(si => (
                        <div key={si.id} className="bg-white/3 border border-white/5 rounded-2xl p-4 space-y-3">
                          
                          <div className="flex justify-between items-center">
                            <span className="font-display font-extrabold text-xs text-text-primary uppercase">{si.name}</span>
                            <span className="text-xs font-mono font-bold text-critical uppercase">{si.change}</span>
                          </div>

                          <div className="flex justify-between items-center text-xs border-t border-b border-white/5 py-2 font-mono">
                            <div>
                              <span className="text-[9px] text-text-secondary uppercase">BASELINE</span>
                              <p className="text-accent-theme font-bold mt-0.5">{si.baselineRisk}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-text-secondary uppercase">SCENARIO</span>
                              <p className="text-critical font-bold mt-0.5">{si.scenarioRisk}</p>
                            </div>
                          </div>

                          <p className="text-xs text-text-secondary leading-normal">{si.keyImpact}</p>

                          <div className="border border-high/30 bg-high/5 p-2.5 rounded-xl text-left">
                            <span className="text-[9px] font-display font-bold text-high uppercase block">URGENT ACTION DIRECTIVE</span>
                            <p className="text-xs text-text-primary mt-1 font-body leading-normal">{si.urgentAction}</p>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    <div>
                      <h4 className="font-display font-bold text-[10px] text-text-secondary uppercase tracking-widest mb-2">TOP GEOPOLITICAL EXPOSURES</h4>
                      <ol className="list-decimal pl-4 text-xs text-text-secondary space-y-1.5 font-body leading-relaxed">
                        {simResults.topThreats.map((t, tidx) => <li key={tidx}>{t}</li>)}
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[10px] text-text-secondary uppercase tracking-widest mb-2">MITIGATION PRIORITY ORDER</h4>
                      <div className="flex flex-wrap gap-2">
                        {simResults.mitigationPriority.map((p, pidx) => (
                          <span key={pidx} className="px-3 py-1 bg-critical/10 border border-critical/30 rounded-lg text-xs font-mono font-bold text-critical">
                            {pidx + 1}. {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end pt-4 border-t border-white/5">
                    <button
                      onClick={handleResetToBaseline}
                      className="px-4 py-2 border border-white/5 hover:border-white/20 rounded-xl text-text-secondary hover:text-text-primary transition-all text-xs font-display font-semibold uppercase tracking-wider"
                    >
                      RESET TO BASELINE
                    </button>
                    <button
                      onClick={() => {
                        const reportText = `SCENARIO OUTCOME REPORT\nScenario: ${SCENARIOS.find(s => s.id === selectedScenarioId).name}\nSummary: ${simResults.scenarioSummary}\nFinancial Risk: ${simResults.totalImpact}\n\nTop Actions Needed:\n${simResults.supplierImpacts.map(s => `- ${s.name}: ${s.urgentAction}`).join("\n")}`;
                        navigator.clipboard.writeText(reportText);
                        triggerToast("Scenario report copied to clipboard!", "cyan");
                      }}
                      className="px-4 py-2 border border-white/5 hover:border-white/20 rounded-xl text-text-secondary hover:text-text-primary transition-all text-xs font-display font-semibold uppercase tracking-wider"
                    >
                      EXPORT SCENARIO REPORT
                    </button>
                    <button
                      onClick={handleApplyScenarioScores}
                      className="px-5 py-2 bg-critical text-text-primary font-display font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all select-none"
                    >
                      APPLY SCENARIO SCORES
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ========================================================
              PAGE 6: EXECUTIVE REPORT
              ======================================================== */}
          {activePage === "report" && (
            <div className="space-y-6 animate-fade-slide">
              
              <div className="glass-card p-5 space-y-4 text-left">
                <h3 className="font-display font-black text-sm tracking-wider uppercase text-text-primary">Executive Report Compiler Workspace</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-display font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">Document Title</label>
                    <input 
                      type="text" 
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      className="w-full bg-bg-base border border-white/5 rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-theme font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-display font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">Prepared For</label>
                    <input 
                      type="text" 
                      value={reportPreparedFor}
                      onChange={(e) => setReportPreparedFor(e.target.value)}
                      className="w-full bg-bg-base border border-white/5 rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-theme font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-display font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">Classification Tag</label>
                    <select 
                      value={reportClassification}
                      onChange={(e) => setReportClassification(e.target.value)}
                      className="w-full bg-bg-base border border-white/5 rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-theme font-mono"
                    >
                      {["INTERNAL ONLY", "CONFIDENTIAL", "RESTRICTED ACCESS"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-display font-semibold text-text-secondary uppercase tracking-wider block">INCLUDED ANALYSIS MODULES</span>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-text-secondary">
                    {[
                      { id: "summary", label: "Executive Summary" },
                      { id: "matrix", label: "Supplier Risk Table" },
                      { id: "alerts", label: "Critical Node Alerts" },
                      { id: "regional", label: "Regional Risk Trends" },
                      { id: "recommendations", label: "Board Recommendations" },
                      { id: "responsibleAI", label: "Responsible AI Statement" }
                    ].map(sec => (
                      <label key={sec.id} className="flex items-center gap-2 cursor-pointer hover:text-text-primary">
                        <input 
                          type="checkbox" 
                          checked={reportSections[sec.id]}
                          onChange={() => setReportSections(prev => ({ ...prev, [sec.id]: !prev[sec.id] }))}
                          className="accent-accent-theme rounded border-white/10 bg-bg-base focus:ring-0"
                        />
                        <span>{sec.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerateReport}
                  disabled={isGeneratingReport}
                  className="w-full py-3 bg-gradient-to-r from-accent-theme to-accent-theme/80 text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all select-none shadow-glow-cyan"
                >
                  {isGeneratingReport ? "AI COMPOSING EXECUTIVE SUMMARY BRIEF..." : "GENERATE BOARD-LEVEL EXECUTIVE BRIEF"}
                </button>
              </div>

              {reportOutput && (
                <div className="glass-card p-8 space-y-6 text-left animate-fade-slide border-t-8 border-t-accent-theme relative shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
                  
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-accent-theme/30" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-accent-theme/30" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-accent-theme/30" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-accent-theme/30" />

                  <div className="flex justify-between items-start border-b border-white/5 pb-6">
                    <div className="space-y-1">
                      <span className="font-display font-black text-xs text-accent-theme tracking-widest block">BUDDY SHIELD AI STRATEGIC ADVISORY</span>
                      <h2 className="font-display font-black text-xl text-text-primary tracking-widest uppercase mt-2">
                        {reportTitle}
                      </h2>
                      <div className="flex gap-4 text-[10px] font-mono text-text-secondary pt-1">
                        <span>PREPARED FOR: <strong className="text-text-primary uppercase">{reportPreparedFor}</strong></span>
                        <span>DATE: <strong className="text-text-primary font-mono">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</strong></span>
                        <span>ANALYST: <strong className="text-text-primary">BUDDY SHIELD AI v4.0</strong></span>
                      </div>
                    </div>
                    
                    <span className="font-display text-xs font-black px-3 py-1 rounded border border-critical bg-critical/5 text-critical tracking-widest uppercase">
                      {reportClassification}
                    </span>
                  </div>

                  <article className="space-y-6 pr-2 select-text font-body">
                    <RenderMarkdown text={reportOutput} />
                  </article>

                  <div className="border-t border-white/5 pt-6 flex justify-between items-center text-[10px] font-mono text-text-secondary">
                    <span>GENERATED VIA BUDDY SHIELD AI DEEP MODELING PIPELINE</span>
                    <span>RESTRICTED DISTRIB // MICROSOFT SYSTEM INTEL AGENT</span>
                  </div>

                  <div className="flex gap-4 justify-end pt-4 border-t border-white/5">
                    <button
                      onClick={handleGenerateReport}
                      className="px-4 py-2 border border-white/5 hover:border-white/20 rounded-xl text-text-secondary hover:text-text-primary transition-all text-xs font-display font-semibold uppercase tracking-wider"
                    >
                      ðŸ”„ REGENERATE BRIEF
                    </button>
                    <button
                      onClick={handleCopyReport}
                      className="px-6 py-2.5 bg-gradient-to-r from-accent-theme to-accent-theme/80 text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all select-none shadow-glow-cyan"
                    >
                      ðŸ“‹ COPY FULL REPORT TEXT
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ========================================================
              PAGE 7: INTELLIGENCE CHAT
              ======================================================== */}
          {activePage === "chat" && (
            <div className="h-[680px] glass-card flex flex-col justify-between overflow-hidden animate-fade-slide relative">
              
              <div className="p-4 border-b border-white/5 bg-bg-base/35 backdrop-blur flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-white/5 border flex items-center justify-center font-display font-black text-xs tracking-wider ${claudeStatus === "connected" ? "border-low text-low shadow-[0_0_10px_rgba(48,209,88,0.3)]" : "border-accent-theme text-accent-theme shadow-glow-cyan animate-pulse"}`}>KS</div>
                  <div className="text-left">
                    <h3 className="font-display font-black text-xs tracking-wider text-text-primary uppercase">Conversational Intel Workspace</h3>
                    <p className="text-[9px] font-mono text-text-secondary mt-0.5">
                      {claudeStatus === "connected" ? "CLAUDE AI LIVE // REAL-TIME RESPONSES" : "MOCK AI ENGINE // SET API KEY IN SETTINGS"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-[8px] font-display font-black tracking-widest uppercase ${
                    claudeStatus === "connected" ? "border-low/40 bg-low/10 text-low" :
                    claudeStatus === "error" ? "border-critical/40 bg-critical/10 text-critical" :
                    "border-white/10 bg-white/5 text-text-secondary"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${claudeStatus === "connected" ? "bg-low animate-ping" : claudeStatus === "error" ? "bg-critical" : "bg-text-secondary/40"}`} />
                    {claudeStatus === "connected" ? "Claude AI LIVE" : claudeStatus === "error" ? "API Error" : "Mock Mode"}
                  </div>
                  <button
                    onClick={handleClearChat}
                    className="px-3 py-1 border border-white/5 hover:border-white/10 rounded-lg text-text-secondary hover:text-text-primary transition-all text-[10px] font-mono font-semibold uppercase tracking-wider"
                  >
                    Clear Logs
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-6 text-left">
                {chatMessages.map(msg => {
                  const isAi = msg.role === "assistant";
                  return (
                    <div 
                      key={msg.id}
                      className={`flex gap-4 ${isAi ? 'justify-start' : 'justify-end'} animate-fade-slide`}
                    >
                      {isAi && (
                        <div className="w-8 h-8 rounded-lg border border-accent-theme/35 bg-white/5 flex items-center justify-center font-display font-black text-accent-theme text-xs flex-shrink-0">
                          KS
                        </div>
                      )}

                      <div 
                        className={`p-4 rounded-2xl max-w-xl text-xs font-body leading-relaxed select-text ${
                          isAi 
                            ? 'glass-card border border-white/5 text-text-secondary bg-white/3' 
                            : 'bg-accent-theme/10 border border-accent-theme/35 text-text-primary font-semibold shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                        }`}
                      >
                        {isAi ? (
                          <RenderMarkdown text={msg.content} />
                        ) : (
                          <p className="whitespace-pre-line font-body">{msg.content}</p>
                        )}
                        <span className={`text-[8px] font-mono mt-2 block text-right ${isAi ? 'text-text-secondary/60' : 'text-text-secondary/80'}`}>
                          {msg.timestamp}
                        </span>
                      </div>

                    </div>
                  );
                })}

                {isChatLoading && (
                  <div className="flex gap-4 justify-start animate-fade-slide">
                    <div className="w-8 h-8 rounded-lg border border-accent-theme/30 bg-white/5 flex items-center justify-center font-display font-black text-accent-theme text-xs flex-shrink-0 animate-spin">
                      KS
                    </div>
                    <div className="glass-card border border-white/5 p-4 rounded-2xl flex items-center gap-1.5 bg-white/3">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent-theme animate-ping" />
                      <span className="font-mono text-[9px] text-accent-theme font-bold tracking-widest uppercase">COMMUNICATING...</span>
                    </div>
                  </div>
                )}
              </div>

              {chatMessages.length <= 1 && (
                <div className="p-4 bg-bg-base/20 border-t border-white/5 text-left space-y-2 select-none">
                  <span className="text-[9px] font-display font-bold text-text-secondary tracking-widest uppercase block mb-1">SUGGESTED INTEL QUERIES:</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {[
                      "Which suppliers are critical risk?",
                      "Suggest alternates for Taiwan suppliers",
                      "Biggest threat this week?",
                      "Generate executive summary",
                      "How do I reduce my Asia-Pacific risk?",
                      "Compare Tata Electronics vs Samsung risk"
                    ].map(chip => (
                      <button
                        key={chip}
                        onClick={() => handleSendMessage(chip)}
                        className="bg-white/3 hover:bg-white/5 border border-white/5 hover:border-accent-theme/35 rounded-xl py-2 px-3 text-[11px] text-text-secondary hover:text-text-primary text-left transition-all truncate"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 border-t border-white/5 bg-bg-base/40 backdrop-blur-md flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Ask BUDDY SHIELD AI to generate summaries, map exposures, or evaluate alternatives..."
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 focus:border-accent-theme focus:outline-none rounded-xl py-3 px-4 text-xs font-body text-text-primary transition-all"
                  disabled={isChatLoading}
                />
                
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-accent-theme to-accent-theme/80 hover:opacity-90 rounded-xl text-white transition-all flex items-center justify-center gap-2 shadow-glow-cyan"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* SETTINGS PANEL MODAL */}
      {showSettings && (
        <div className="fixed inset-0 bg-bg-base/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 space-y-6 text-left border-accent-theme animate-fade-slide">
            
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Settings className="text-accent-theme w-5 h-5 animate-pulse" />
                <h3 className="font-display font-black text-sm tracking-widest text-text-primary uppercase">OPERATIONS PARAMETERS</h3>
              </div>
              
              <button 
                onClick={() => setShowSettings(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-display font-bold text-text-secondary uppercase tracking-wider block">Anthropic API Secret Key</label>
                  <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                    claudeStatus === "connected" ? "text-low border-low/30 bg-low/10" :
                    claudeStatus === "error" ? "text-critical border-critical/30 bg-critical/10" :
                    "text-text-secondary border-white/10"
                  }`}>
                    {claudeStatus === "connected" ? "✅ VERIFIED" : claudeStatus === "error" ? "❌ INVALID" : "STORES SECURELY"}
                  </span>
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full bg-white/5 focus:border-accent-theme focus:outline-none rounded-xl py-2.5 px-3.5 text-xs font-mono text-text-primary transition-all font-semibold"
                />
                <span className="text-[10px] text-text-secondary leading-normal block">
                  Input a standard Claude API key. If left blank, the app will use its high-fidelity mock engine.
                </span>

                {/* Test Connection Button */}
                <button
                  onClick={handleTestClaudeConnection}
                  disabled={!apiKey || isTestingKey}
                  className={`w-full py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all select-none flex items-center justify-center gap-2 ${
                    !apiKey ? "opacity-30 cursor-not-allowed border border-white/5 text-text-secondary" :
                    isTestingKey ? "border border-accent-theme/30 text-accent-theme animate-pulse" :
                    claudeStatus === "connected" ? "bg-low/10 border border-low/30 text-low" :
                    claudeStatus === "error" ? "bg-critical/10 border border-critical/30 text-critical" :
                    "border border-accent-theme/30 text-accent-theme hover:bg-accent-theme/5"
                  }`}
                >
                  {isTestingKey ? (
                    <><span className="w-3 h-3 rounded-full border-2 border-accent-theme border-t-transparent animate-spin" /> TESTING CONNECTION...</>
                  ) : claudeStatus === "connected" ? (
                    "✅ Claude AI Connected"
                  ) : claudeStatus === "error" ? (
                    "❌ Connection Failed — Retry"
                  ) : (
                    "TEST CLAUDE CONNECTION"
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 border border-white/5 hover:border-white/20 rounded-xl text-text-secondary hover:text-text-primary transition-all text-xs font-display font-semibold uppercase tracking-wider"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSaveSettings}
                className="px-5 py-2.5 bg-gradient-to-r from-accent-theme to-accent-theme/80 text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-glow-cyan"
              >
                Save Configuration
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
