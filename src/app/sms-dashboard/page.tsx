// src/components/sms/SMSDashboard.tsx (Fallback)
'use client';

import { useState } from 'react';
import { MessageSquare, Phone, Hospital, Clock, Bell, Send } from 'lucide-react';

export default function SMSDashboard() {
  const [messages, setMessages] = useState([
    { id: 1, hospital: 'Omdurman Hospital', phone: '+249 91 200 0001', message: 'WATER 1500', time: '10:30 AM', status: 'critical' },
    { id: 2, hospital: 'Al-Nau Hospital', phone: '+249 91 200 0002', message: 'WATER 12000', time: '09:45 AM', status: 'safe' },
    { id: 3, hospital: "Children's Hospital", phone: '+249 91 200 0003', message: 'WATER 4500', time: '08:15 AM', status: 'warning' },
  ]);

  const simulateSMS = () => {
    const hospitals = ['Omdurman Hospital', 'Al-Nau Hospital', 'Children\'s Hospital'];
    const water = Math.floor(Math.random() * 15000) + 1000;
    const status = water < 3000 ? 'critical' : water < 6000 ? 'warning' : 'safe';
    
    const newMsg = {
      id: messages.length + 1,
      hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
      phone: '+249 91 XXX XXXX',
      message: `WATER ${water}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status
    };
    
    setMessages([newMsg, ...messages]);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Incoming SMS Messages</h2>
            <p className="text-gray-600">Simulate hospital SMS reports to test the system</p>
          </div>
          <button 
            onClick={simulateSMS}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Bell size={20} />
            Simulate Incoming SMS
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No SMS messages yet</p>
            <p className="text-gray-400 text-sm mt-1">Click the button above to simulate</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      msg.status === 'critical' ? 'bg-red-100' :
                      msg.status === 'warning' ? 'bg-yellow-100' :
                      'bg-green-100'
                    }`}>
                      <Hospital className={
                        msg.status === 'critical' ? 'text-red-600' :
                        msg.status === 'warning' ? 'text-yellow-600' :
                        'text-green-600'
                      } size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{msg.hospital}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone size={14} />
                        <span>{msg.phone}</span>
                        <Clock size={14} />
                        <span>{msg.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      msg.status === 'critical' ? 'bg-red-100 text-red-800' :
                      msg.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {msg.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="font-mono text-blue-800">{msg.message}</div>
                  <div className="text-sm text-blue-600 mt-1">
                    Format: "WATER [AMOUNT_IN_LITERS]"
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
