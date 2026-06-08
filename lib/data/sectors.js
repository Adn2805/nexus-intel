import { 
  Laptop, 
  Zap, 
  Activity, 
  Landmark, 
  ShoppingCart, 
  Factory, 
  Shield, 
  Radio, 
  Car, 
  Cpu, 
  Cloud, 
  Pill, 
  Package, 
  Bitcoin, 
  Building, 
  Layers, 
  Lightbulb 
} from 'lucide-react';

export const sectors = [
  { id: 'tech', name: 'Technology', icon: <Laptop size={18} />, color: 'var(--accent)', industries: ['Software', 'Hardware', 'IT Services'] },
  { id: 'energy', name: 'Energy', icon: <Zap size={18} />, color: 'var(--mixed)', industries: ['Oil & Gas', 'Renewables'] },
  { id: 'healthcare', name: 'Healthcare', icon: <Activity size={18} />, color: 'var(--positive)', industries: ['Hospitals', 'Medical Devices'] },
  { id: 'finance', name: 'Finance', icon: <Landmark size={18} />, color: 'var(--text-secondary)', industries: ['Banking', 'Insurance', 'Investment'] },
  { id: 'consumer', name: 'Consumer', icon: <ShoppingCart size={18} />, color: 'var(--accent-cyan)', industries: ['Retail', 'E-commerce'] },
  { id: 'industrial', name: 'Industrial', icon: <Factory size={18} />, color: 'var(--text-muted)', industries: ['Manufacturing', 'Machinery'] },
  { id: 'defense', name: 'Defense', icon: <Shield size={18} />, color: 'var(--negative)', industries: ['Aerospace', 'Military'] },
  { id: 'telecom', name: 'Telecom', icon: <Radio size={18} />, color: 'var(--accent-secondary)', industries: ['Wireless', 'Broadband'] },
  { id: 'auto', name: 'Automotive', icon: <Car size={18} />, color: 'var(--mixed)', industries: ['EV', 'Auto Parts'] },
  { id: 'semiconductor', name: 'Semiconductor', icon: <Cpu size={18} />, color: 'var(--accent)', industries: ['Chips', 'Equipment'] },
  { id: 'ai_cloud', name: 'AI & Cloud', icon: <Cloud size={18} />, color: 'var(--accent)', industries: ['Cloud Infrastructure', 'AI Models'] },
  { id: 'pharma', name: 'Pharma', icon: <Pill size={18} />, color: 'var(--positive)', industries: ['Biotech', 'Drug Development'] },
  { id: 'fmcg', name: 'FMCG', icon: <Package size={18} />, color: 'var(--mixed)', industries: ['Food & Beverage', 'Household Goods'] },
  { id: 'crypto', name: 'Crypto', icon: <Bitcoin size={18} />, color: 'var(--mixed)', industries: ['Exchanges', 'Mining'] },
  { id: 'real_estate', name: 'Real Estate', icon: <Building size={18} />, color: 'var(--text-secondary)', industries: ['Commercial', 'Residential'] },
  { id: 'materials', name: 'Materials', icon: <Layers size={18} />, color: 'var(--text-muted)', industries: ['Chemicals', 'Metals'] },
  { id: 'utilities', name: 'Utilities', icon: <Lightbulb size={18} />, color: 'var(--mixed)', industries: ['Electric', 'Water'] }
];
