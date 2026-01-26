# 🚨 Nahl Grid - Emergency Water Distribution

**Live Demo Link:** https://nahr-sms.vercel.app/ 
**GitHub:** https://github.com/dialzay/nahr-sms

## 🏥 Problem
11 Omdurman hospitals lack clean water. Staff SMS water levels but there's no coordination system.

## 💡 Solution
Real-time SMS-based system that maps hospital water levels and auto-schedules deliveries.

## ⚡ How It Works
1. Hospital texts "WATER [amount]"
2. System calculates hours remaining
3. Map colors hospitals: Red (<12h), Yellow (12-24h), Green (>48h)
4. Critical hospitals trigger automatic delivery scheduling
5. Suppliers receive SMS orders

## 🛠️ Tech Stack
- Frontend: Next.js 15, TypeScript, Tailwind
- Mapping: Leaflet.js, OpenStreetMap
- Backend: Firebase
- Deployment: Vercel

## 🚀 Quick Start
```bash
git clone https://github.com/dialzay/studio.git
cd studio
npm install
npm run dev
