# 💧 Nahr Grid - Emergency Water Distribution System Team Vertex SU#18

**🌊 "Nahr" means "River" in Arabic - Bringing life-giving water to those in need**

Nahr Grid is a real-time coordination system that manages emergency water deliveries to 11 hospitals in Omdurman, Sudan. Hospital staff send SMS water reports, the system visualizes criticality on an interactive map, and automatically schedules water deliveries from suppliers.

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/dialzay/studio.git
cd studio

# Install dependencies
npm install

# Run development server
npm run dev
Open http://localhost:3000 in your browser.

🧪 Testing the Application
Open the live demo at https://nahr-sms.vercel.app

View the crisis map - See 11 hospitals color-coded by water levels

Simulate SMS reports - Click "Simulate SMS" in the dashboard

Interact with markers - Click hospital markers to see details

Schedule deliveries - Test the delivery scheduling interface

Demo Features:

Interactive map with OpenStreetMap

SMS simulation dashboard

Criticality algorithm (Red: <12h, Yellow: 12-24h, Green: >48h)

Hospital water statistics

Delivery scheduling interface

🛠️ Tech Stack
Frontend: Next.js 15, TypeScript, Tailwind CSS

Mapping: React-Leaflet, OpenStreetMap

Backend: Firebase (Firestore)

UI: shadcn/ui components

Deployment: Vercel

🙏 Credits & Acknowledgments
Made by Zaina Fahad
Team Members: Rakan Ibrahim, Zohaa Fahad and Minjae Song 
OpenStreetMap for free mapping tiles

Firebase for backend infrastructure

Leaflet.js for mapping library

shadcn/ui for UI components


📄 License
MIT License - See LICENSE file for details.

Nahr Grid: Because every drop counts in saving lives.

