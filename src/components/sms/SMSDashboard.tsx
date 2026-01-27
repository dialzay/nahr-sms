// src/components/sms/SMSDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Phone, Hospital, Clock, Bell, Send } from 'lucide-react';

interface SMSMessage {
  id: string;
  hospital: string;
  phone: string;
  message: string;
  waterAmount: number;
  timestamp: Date;
  status: 'critical' | 'warning' | 'safe';
}

export default function SMSDashboard() {
  const [messages, setMessages] = useState<SMSMessage[]>([
    {
      id: '1',
      hospital: 'Omdurman Teaching Hospital',
      phone: '+249 91 200 0001',
      message: 'WATER 1500',
      waterAmount: 1500,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'critical'
    },
    {
      id: '2',
      hospital: 'Al-Nau Hospital',
      phone: '+249 91 200 0002',
      message: 'WATER 12000',
      waterAmount: 12000,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'safe'
    },
    {
      id: '3',
      hospital: "Children's Hospital",
      phone: '+249 91 200 0003',
      message: 'WATER 4500',
      waterAmount: 4500,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      status: 'warning'
    },
  ]);

  const [autoSimulate, setAutoSimulate] = useState(true);
  const [lastAction, setLastAction] = useState<string>('');

  // Sample hospital data
  const hospitals = [
    { name: "Omdurman Teaching Hospital", phone: "+249 91 200 0001", dailyUsage: 2000 },
    { name: "Al-Nau Hospital", phone: "+249 91 200 0002", dailyUsage: 3000 },
    { name: "Children's Hospital", phone: "+249 91 200 0003", dailyUsage: 1500 },
    { name: "Al-Moalim Hospital", phone: "+249 91 200 0004", dailyUsage: 1800 },
    { name: "Al-Shaab Hospital", phone: "+249 91 200 0005", dailyUsage: 2200 },
  ];

  // Function to simulate receiving an SMS
  const simulateSMS = (hospitalIndex?: number, waterAmount?: number) => {
    const hospital = hospitals[hospitalIndex ?? Math.floor(Math.random() * hospitals.length)];
    const amount = waterAmount ?? Math.floor(Math.random() * 15000) + 1000;
    const hoursLeft = Math.floor(amount / hospital.dailyUsage * 24);
    
    const newSMS: SMSMessage = {
      id: Date.now().toString(),
      hospital: hospital.name,
      phone: hospital.phone,
      message: `WATER ${amount}`,
      waterAmount: amount,
      timestamp: new Date(),
      status: hoursLeft < 12 ? 'critical' : hoursLeft < 24 ? 'warning' : 'safe'
    };

    setMessages(prev => [newSMS, ...prev]);
    setLastAction(`SMS from ${hospital.name}: ${amount.toLocaleString()}L`);
    
    // Play notification sound
    playNotificationSound();
    
    // Show browser notification
    showBrowserNotification(hospital.name, amount, hoursLeft);
    
    return newSMS;
  };

  const playNotificationSound = () => {
    try {
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {
        // Fallback: Use browser beep
        console.log('\u0007'); // ASCII bell character
      });
    } catch (e) {
      console.log('Sound not available');
    }
  };

  const showBrowserNotification = (hospital: string, amount: number, hours: number) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`📱 SMS from ${hospital}`, {
        body: `${amount.toLocaleString()}L remaining (~${hours}h)`,
        icon: '/favicon.ico'
      });
    }
  };

  // Auto-simulate every 15 seconds
  useEffect(() => {
    if (!autoSimulate) return;
    
    const interval = setInterval(() => {
      simulateSMS();
    }, 15000);
    
    return () => clearInterval(interval);
  }, [autoSimulate]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const clearMessages = () => {
    setMessages([]);
    setLastAction('Cleared all messages');
  };

  const totalWaterReported = messages.reduce((sum, msg) => sum + msg.waterAmount, 0);
  const criticalCount = messages.filter(m => m.status === 'critical').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
          <MessageSquare className="text-blue-600" size={32} />
          SMS Monitoring Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time SMS updates from 11 hospitals in Omdurman. Each message triggers map updates and emergency responses.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <h3 className="text-lg font-semibold mb-4">Simulate Hospital SMS Reports</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => simulateSMS(0, 1500)}
                className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition flex flex-col items-center"
              >
                <Hospital size={20} />
                <span className="mt-2 font-medium">Critical: 1,500L</span>
                <span className="text-sm opacity-90">(&lt;12h water)</span>
              </button>
              
              <button
                onClick={() => simulateSMS(1, 5000)}
                className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600 transition flex flex-col items-center"
              >
                <Hospital size={20} />
                <span className="mt-2 font-medium">Warning: 5,000L</span>
                <span className="text-sm opacity-90">(12-24h water)</span>
              </button>
              
              <button
                onClick={() => simulateSMS(2, 12000)}
                className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-700 transition flex flex-col items-center"
              >
                <Hospital size={20} />
                <span className="mt-2 font-medium">Safe: 12,000L</span>
                <span className="text-sm opacity-90">(&gt;48h water)</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => simulateSMS()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Bell size={20} />
                Simulate Random SMS
              </button>
              
              <button
                onClick={clearMessages}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Clear All Messages
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/3 lg:border-l lg:pl-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSimulate}
                    onChange={(e) => setAutoSimulate(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-gray-700">Auto-simulate every 15s</span>
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Automatically generates hospital SMS reports
                </p>
              </div>
              
              {lastAction && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Last action:</span> {lastAction}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium mb-2">How SMS Integration Works:</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-blue-600 mb-1">1. Hospital Texts</div>
              <p>Staff sends "WATER [amount]" to +249 900 123 456</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-blue-600 mb-1">2. System Processes</div>
              <p>Parses SMS, updates database, calculates criticality</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-blue-600 mb-1">3. Map Updates</div>
              <p>Hospital marker changes color based on hours remaining</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-blue-600 mb-1">4. Response Triggered</div>
              <p>Critical status auto-schedules emergency delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="text-blue-500" size={24} />
            <div className="text-2xl font-bold">{messages.length}</div>
          </div>
          <div className="text-gray-700">Total SMS Today</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Hospital className="text-red-500" size={24} />
            <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
          </div>
          <div className="text-gray-700">Critical Reports</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Phone className="text-green-500" size={24} />
            <div className="text-2xl font-bold">{hospitals.length}/11</div>
          </div>
          <div className="text-gray-700">Hospitals Reported</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Send className="text-purple-500" size={24} />
            <div className="text-2xl font-bold">
              {(totalWaterReported / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="text-gray-700">Liters Reported</div>
        </div>
      </div>

      {/* SMS Messages Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Incoming SMS Messages</h2>
          <p className="text-gray-600 text-sm mt-1">
            Real-time log of hospital SMS reports. Click a message to view hospital details on map.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hospital
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Water Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <MessageSquare size={48} className="text-gray-300" />
                      <p className="text-gray-500 text-lg">No SMS messages received yet</p>
                      <p className="text-gray-400">Click buttons above to simulate hospital SMS reports</p>
                    </div>
                  </td>
                </tr>
              ) : (
                messages.map((sms) => (
                  <tr 
                    key={sms.id} 
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => {
                      // In production: Would navigate to hospital on map
                      console.log('Selected hospital:', sms.hospital);
                      alert(`Would navigate to ${sms.hospital} on map`);
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm font-medium">
                          {sms.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {sms.timestamp.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Hospital size={16} className="text-blue-500" />
                        <span className="font-medium">{sms.hospital}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {sms.phone}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="font-mono text-blue-800 font-medium">{sms.message}</div>
                        <div className="text-xs text-blue-600 mt-1">
                          Format: "WATER [AMOUNT_IN_LITERS]"
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-gray-900">
                        {sms.waterAmount.toLocaleString()} L
                      </div>
                      <div className="text-sm text-gray-500">
                        ~{Math.floor(sms.waterAmount / 1000)} days supply
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sms.status === 'critical' 
                          ? 'bg-red-100 text-red-800 border border-red-200' 
                          : sms.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          : 'bg-green-100 text-green-800 border border-green-200'
                      }`}>
                        {sms.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    
