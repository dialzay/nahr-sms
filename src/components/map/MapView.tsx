'use client';

import { useState, useMemo } from 'react';
import type { Hospital, HospitalWithStatus } from '@/lib/types';
import { hospitals as initialHospitals } from '@/lib/data';
import { calculateWaterStatus } from '@/lib/utils';
import CrisisMap from './CrisisMap';
import HospitalDetails from './HospitalDetails';
import { ScrollArea } from '../ui/scroll-area';

export default function MapView() {
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(hospitals[0]?.id || null);

  const hospitalsWithStatus: HospitalWithStatus[] = useMemo(() => {
    return hospitals.map(hospital => ({
      ...hospital,
      status: calculateWaterStatus(hospital.currentWater, hospital.dailyUsage),
    }));
  }, [hospitals]);

  const selectedHospital = useMemo(() => {
    return hospitalsWithStatus.find(h => h.id === selectedHospitalId) || null;
  }, [hospitalsWithStatus, selectedHospitalId]);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      <div className="md:w-2/3 lg:w-3/4 h-1/2 md:h-full order-2 md:order-1">
        <CrisisMap 
          hospitals={hospitalsWithStatus}
          selectedHospitalId={selectedHospitalId}
          onSelectHospital={(hospital) => setSelectedHospitalId(hospital.id)}
        />
      </div>
      <aside className="md:w-1/3 lg:w-1/4 h-1/2 md:h-full border-l bg-card order-1 md:order-2">
        <ScrollArea className="h-full">
            <HospitalDetails hospital={selectedHospital} />
        </ScrollArea>
      </aside>
    </div>
  );
}
