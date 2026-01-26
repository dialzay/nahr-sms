'use client';

import { useState, useEffect } from 'react';
import { hospitals, suppliers } from '@/lib/data';
import type { Delivery } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import CreateDeliveryForm from './CreateDeliveryForm';
import DeliveryList from './DeliveryList';

export default function DeliverySchedule() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    // This hook ensures data is loaded only on the client, preventing hydration errors.
    const { deliveries: clientDeliveries } = require('@/lib/data');
    setDeliveries(clientDeliveries);
  }, []);

  const addDelivery = (newDelivery: Omit<Delivery, 'id'>) => {
    const deliveryWithId: Delivery = {
      ...newDelivery,
      id: `d${deliveries.length + 1}`,
    };
    setDeliveries(prev => [deliveryWithId, ...prev]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Delivery Schedule</h1>
          <p className="text-muted-foreground">Manage and track all water deliveries.</p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Delivery
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Schedule a New Delivery</SheetTitle>
              <SheetDescription>
                Fill in the details to dispatch a water tanker to a hospital in need.
              </SheetDescription>
            </SheetHeader>
            <CreateDeliveryForm 
              hospitals={hospitals} 
              suppliers={suppliers} 
              onDeliveryCreated={(newDelivery) => {
                addDelivery(newDelivery);
                setSheetOpen(false);
              }}
            />
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled & Recent Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <DeliveryList deliveries={deliveries} suppliers={suppliers} />
        </CardContent>
      </Card>
    </div>
  );
}
