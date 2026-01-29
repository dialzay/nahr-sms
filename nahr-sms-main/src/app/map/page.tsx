'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import MapView to ensure Leaflet only runs on the client-side.
const MapView = dynamic(() => import('@/components/map/MapView'), {
  loading: () => (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      <div className="md:w-2/3 lg:w-3/4 h-1/2 md:h-full order-2 md:order-1">
        <Skeleton className="w-full h-full" />
      </div>
      <aside className="md:w-1/3 lg:w-1/4 h-1/2 md:h-full border-l bg-card order-1 md:order-2 p-4">
        <p className="text-muted-foreground">Loading map...</p>
        <div className="space-y-4 mt-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="border-t pt-4 mt-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-5 w-1/4" />
              </div>
               <div className="flex justify-between">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-5 w-1/4" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  ),
  ssr: false,
});


export default function MapPage() {
  return <MapView />;
}
