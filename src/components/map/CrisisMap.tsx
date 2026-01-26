'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { HospitalWithStatus, WaterStatusLevel } from '@/lib/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet icon path in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

// Custom icon logic - USING STANDARD TAILWIND COLORS
const statusColors: Record<WaterStatusLevel, string> = {
  critical: 'bg-red-500',
  urgent: 'bg-orange-500',
  warning: 'bg-yellow-500',
  safe: 'bg-green-500',
};

// Status text colors for popup
const statusTextColors: Record<WaterStatusLevel, string> = {
  critical: 'text-red-500',
  urgent: 'text-orange-500',
  warning: 'text-yellow-500',
  safe: 'text-green-500',
};

const createMarkerIcon = (status: WaterStatusLevel, isSelected: boolean) => {
  return L.divIcon({
    html: `<div class="${cn(
      'w-6 h-6 rounded-full border-3 border-white shadow-lg transition-all flex items-center justify-center',
      statusColors[status],
      isSelected ? 'ring-4 ring-blue-500 ring-offset-2 scale-125 animate-pulse' : ''
    )}">
      <span class="text-white text-xs font-bold">🏥</span>
    </div>`,
    className: '', // important to clear default leaflet styles
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Component to handle map view changes when hospital is selected
function ChangeView({ center, zoom }: { center: [number, number] | null; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

type CrisisMapProps = {
  hospitals: HospitalWithStatus[];
  selectedHospitalId: string | null;
  onSelectHospital: (hospital: HospitalWithStatus) => void;
};

export default function CrisisMap({ hospitals, selectedHospitalId, onSelectHospital }: CrisisMapProps) {
  const omdurmanCenter: [number, number] = [15.63, 32.48];
  
  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId);
  const selectedHospitalLocation = selectedHospital ? [selectedHospital.location.lat, selectedHospital.location.lng] as [number, number] : null;

  // Log for debugging
  useEffect(() => {
    if (hospitals.length > 0) {
      console.log('Map hospitals:', hospitals.length);
      console.log('First hospital location:', hospitals[0]?.location);
    }
  }, [hospitals]);

  return (
    <MapContainer
      center={omdurmanCenter}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
      className="rounded-lg"
    >
      <ChangeView center={selectedHospitalLocation} zoom={14} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hospitals.map((hospital) => {
        // Skip if no location
        if (!hospital.location?.lat || !hospital.location?.lng) {
          console.warn('Hospital missing location:', hospital.name);
          return null;
        }

        return (
          <Marker
            key={hospital.id}
            position={[hospital.location.lat, hospital.location.lng]}
            icon={createMarkerIcon(hospital.status.level, hospital.id === selectedHospitalId)}
            eventHandlers={{
              click: () => {
                onSelectHospital(hospital);
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <div className="font-bold text-gray-900 mb-2">{hospital.name}</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={cn(
                      'font-semibold',
                      statusTextColors[hospital.status.level]
                    )}>
                      {hospital.status.level.charAt(0).toUpperCase() + hospital.status.level.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hours Left:</span>
                    <span className="font-bold">{Math.round(hospital.status.hoursRemaining)}h</span>
                  </div>
                  {hospital.currentWater && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Water:</span>
                      <span className="font-bold">{hospital.currentWater.toLocaleString()}L</span>
                    </div>
                  )}
                  {hospital.dailyUsage && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Use:</span>
                      <span className="font-bold">{hospital.dailyUsage.toLocaleString()}L/day</span>
                    </div>
                  )}
                </div>
                <button 
                  className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm"
                  onClick={() => {
                    console.log('Schedule delivery for:', hospital.name);
                    alert(`Would schedule delivery for ${hospital.name}`);
                  }}
                >
                  Schedule Water Delivery
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
