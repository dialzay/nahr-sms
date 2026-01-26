// src/app/sms-dashboard/page.tsx
import SMSDashboard from '@/components/sms/SMSDashboard';
import Link from 'next/link';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export default function SmsDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </Link>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <Link 
                href="/map" 
                className="text-blue-600 hover:text-blue-800 transition font-medium"
              >
                View Crisis Map →
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="text-blue-500" size={20} />
              <span className="font-semibold text-gray-900">Nahr Grid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📱 SMS Monitoring Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time tracking of hospital water reports via SMS. Each message updates the crisis map and triggers emergency responses.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">11</div>
              <div className="text-sm opacity-90">Total Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">&lt;1 min</div>
              <div className="text-sm opacity-90">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">SMS</div>
              <div className="text-sm opacity-90">Primary Protocol</div>
            </div>
          </div>
        </div>

        {/* SMS Dashboard Component */}
        <SMSDashboard />

        {/* Demo Instructions */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-yellow-800 mb-3">🎥 Video Demo Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="font-semibold text-gray-800">1. Show SMS Simulation</div>
              <p className="text-sm text-gray-600">Click "Critical: 1,500L" button to simulate emergency SMS</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-gray-800">2. Explain the Flow</div>
              <p className="text-sm text-gray-600">"Hospital texts → System processes → Map updates → Delivery scheduled"</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-gray-800">3. Connect to Map</div>
              <p className="text-sm text-gray-600">Mention how this SMS would turn a hospital red on the crisis map</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            <strong>Emergency SMS Number:</strong> +249 900 123 456
          </p>
          <p className="mt-1">
            Format: <code className="bg-gray-100 px-2 py-1 rounded">WATER [amount in liters]</code>
          </p>
        </div>
      </div>
    </div>
  );
}
