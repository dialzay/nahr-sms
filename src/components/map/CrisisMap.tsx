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

// Custom icon logic
const statusColors: Record<WaterStatusLevel, string> = {
  critical: 'bg-status-critical',
  urgent: 'bg-status-urgent',
  warning: 'bg-status-warning',
  safe: 'bg-status-safe',
};

const createMarkerIcon = (status: WaterStatusLevel, isSelected: boolean) => {
  return L.divIcon({
    html: `<div class="${cn(
      'w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all',
      statusColors[status],
      isSelected ? 'ring-2 ring-primary ring-offset-2 scale-150' : ''
    )}"></div>`,
    className: '', // important to clear default leaflet styles
    iconSize: [14, 14],
    iconAnchor: [7, 7],
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

  return (
    <MapContainer
      center={omdurmanCenter}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <ChangeView center={selectedHospitalLocation} zoom={14} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hospitals.map((hospital) => (
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
          <Popup>
            <div className="font-bold">{hospital.name}</div>
            <div>Status: <span className={cn(
              'font-semibold',
              `text-status-${hospital.status.level}`
            )}>{hospital.status.level.charAt(0).toUpperCase() + hospital.status.level.slice(1)}</span></div>
            <div>~{Math.round(hospital.status.hoursRemaining)} hours left</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
