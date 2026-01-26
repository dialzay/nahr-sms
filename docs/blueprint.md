# **App Name**: Omdurman Water Watch

## Core Features:

- SMS Processing: Receive SMS updates from hospitals, extract water level data, and update the system. Logic is handled via Firebase Cloud Functions.
- Real-time Crisis Map: Display a map of Omdurman with color-coded hospital locations based on water levels (Red: <12 hours, Orange: 12-24 hours, Yellow: 24-48 hours, Green: >48 hours).
- SMS Dashboard: Display a table of all incoming SMS messages with details such as time, hospital name, phone number, message content, and extracted water amount. Provides real-time updates.
- Delivery Scheduling: Enable coordinators to schedule water deliveries to hospitals by selecting the hospital, supplier, water amount, and delivery time.
- Data Storage: Store hospital data, SMS logs, delivery schedules, and supplier information using Firestore. Data must include hospital water levels and geolocations.
- Automated Alert System: Automatically schedule emergency deliveries when a hospital's water level falls below a critical threshold, triggering a tool using a model to reason when a new delivery should be created

## Style Guidelines:

- Primary color: Dark blue (#2B6CB0) for trust and stability, reflecting the importance of the water supply.
- Background color: Light gray (#F5F7FA) to ensure readability and focus on the data-rich content.
- Accent color: Teal (#26A69A) to highlight interactive elements and calls to action, differentiating them from the primary color while remaining harmonious.
- Body and headline font: 'PT Sans', a humanist sans-serif, combines a modern look and a little warmth or personality, and is suitable for headlines or body text.
- Use clear, simple icons to represent hospitals, water levels, and delivery status on the map and dashboards.
- Maintain a clean, responsive layout optimized for slow internet connections, with a top navigation bar for easy access to different sections.
- Implement subtle animations for real-time updates, such as color changes on the map or new SMS arrivals in the dashboard.