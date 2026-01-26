// src/app/page.tsx - NEW HOME PAGE
import Link from 'next/link';
import { MapPin, MessageSquare, Calendar, AlertTriangle, Phone, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            🚨 <span className="text-blue-600">Nahr Grid</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Emergency Water Distribution for Omdurman Hospitals
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Real-time SMS-based coordination system delivering clean water to 11 hospitals 
            in crisis-stricken Omdurman, Sudan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/map" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-3"
            >
              <MapPin size={24} />
              View Live Crisis Map
            </Link>
            <Link 
              href="/sms" 
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-3"
            >
              <MessageSquare size={24} />
              SMS Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <AlertTriangle className="text-red-600" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">Real-time Crisis Mapping</h3>
            <p className="text-gray-600 text-center">
              Color-coded map shows hospital water levels: Red (Critical), Yellow (Warning), Green (Safe)
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Phone className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">SMS-Based Reporting</h3>
            <p className="text-gray-600 text-center">
              Hospital staff text water levels. No internet required. Works on any mobile phone.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Truck className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">Automated Dispatch</h3>
            <p className="text-gray-600 text-center">
              Critical hospitals trigger automatic water delivery scheduling to suppliers.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">⚡ How Nahr Grid Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">1️⃣</div>
              <h4 className="font-bold text-lg mb-2">Hospital Texts</h4>
              <p className="text-gray-700">Staff send "WATER [amount]" via SMS</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">2️⃣</div>
              <h4 className="font-bold text-lg mb-2">System Processes</h4>
              <p className="text-gray-700">Parses SMS, updates database, calculates criticality</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">3️⃣</div>
              <h4 className="font-bold text-lg mb-2">Map Updates</h4>
              <p className="text-gray-700">Real-time color coding based on water levels</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">4️⃣</div>
              <h4 className="font-bold text-lg mb-2">Delivery Triggered</h4>
              <p className="text-gray-700">Critical alerts automatically schedule water deliveries</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-10">📊 Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold text-red-600">11</div>
              <p className="text-gray-600">Hospitals Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <p className="text-gray-600">Real-time Monitoring</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">100%</div>
              <p className="text-gray-600">SMS-Based</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">&lt;1h</div>
              <p className="text-gray-600">Emergency Response</p>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/map" className="group">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition hover:border-blue-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold group-hover:text-blue-600">Crisis Map</h3>
              </div>
              <p className="text-gray-600">Interactive map showing real-time hospital water levels</p>
            </div>
          </Link>
          
          <Link href="/sms" className="group">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition hover:border-green-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MessageSquare className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold group-hover:text-green-600">SMS Dashboard</h3>
              </div>
              <p className="text-gray-600">Monitor incoming SMS reports from hospitals</p>
            </div>
          </Link>
          
          <Link href="/schedule" className="group">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition hover:border-purple-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-bold group-hover:text-purple-600">Delivery Schedule</h3>
              </div>
              <p className="text-gray-600">View and manage scheduled water deliveries</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
