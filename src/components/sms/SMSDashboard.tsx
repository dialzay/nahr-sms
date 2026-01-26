'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { hospitals } from '@/lib/data';
import type { SMSLog, Delivery, Hospital } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, MessageSquare, PlusCircle, Truck } from 'lucide-react';
import SMSTable from './SMSTable';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import SendSMSForm from './SendSMSForm';

export default function SMSDashboard() {
  const [smsLogs, setSmsLogs] = useState<SMSLog[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    // This hook ensures data is loaded only on the client, preventing hydration errors.
    const { smsLogs: clientSmsLogs, deliveries: clientDeliveries } = require('@/lib/data');
    setSmsLogs(clientSmsLogs);
    setDeliveries(clientDeliveries);
  }, []);

  const stats = {
    hospitalsReported: new Set(smsLogs.map(log => log.hospitalName)).size,
    totalMessages: smsLogs.length,
  };

  const handleSmsSent = (formValues: any, targetHospitals: Hospital[]) => {
    const newLogs: SMSLog[] = targetHospitals.map((hospital, index) => ({
      id: `sms${smsLogs.length + 1 + index}`,
      time: new Date(),
      hospitalName: hospital.name,
      phone: hospital.phone,
      message: formValues.message,
      waterAmount: 0, // This is an outgoing message, not a water level report
    }));
    setSmsLogs(prevLogs => [...newLogs, ...prevLogs]);
    setSheetOpen(false); // Close sheet on successful submission
  };

  const upcomingDeliveries = deliveries
    .filter(d => new Date(d.deliveryTime) >= new Date() && d.status === 'scheduled')
    .sort((a, b) => new Date(a.deliveryTime).getTime() - new Date(b.deliveryTime).getTime());

  const groupedDeliveries = upcomingDeliveries.reduce((acc, delivery) => {
    const dateKey = format(new Date(delivery.deliveryTime), 'PPP'); // e.g., "Jan 26, 2026"
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(delivery);
    return acc;
  }, {} as Record<string, Delivery[]>);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SMS Dashboard</h1>
          <p className="text-muted-foreground">Real-time feed of incoming water level reports.</p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New SMS
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-lg flex flex-col">
            <SheetHeader>
              <SheetTitle>Send New SMS</SheetTitle>
              <SheetDescription>
                Compose and send a message to one or more hospitals.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6">
                <SendSMSForm 
                  hospitals={hospitals} 
                  onSmsSent={handleSmsSent}
                />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/hospitals">
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hospitals Reported Today</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.hospitalsReported}</div>
              <p className="text-xs text-muted-foreground">out of {hospitals.length} total hospitals</p>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages Received</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">in the current session</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {Object.keys(groupedDeliveries).length > 0 ? (
                <ScrollArea className="h-96">
                    <div className="space-y-6 pr-4">
                        {Object.entries(groupedDeliveries).map(([date, dateDeliveries]) => (
                            <div key={date}>
                                <h3 className="text-lg font-semibold mb-4 sticky top-0 bg-card py-2 z-10">
                                  {date}
                                </h3>
                                <div className="space-y-4">
                                {dateDeliveries.map(delivery => (
                                    <div key={delivery.id} className="p-3 rounded-lg border bg-card-foreground/5">
                                        <div className="flex justify-between items-start">
                                            <div className="font-semibold">{delivery.hospitalName}</div>
                                            <Badge variant={delivery.status === 'completed' ? 'default' : 'secondary'} className="capitalize">{delivery.status}</Badge>
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                        From: <span className="font-medium text-foreground">{delivery.supplierName}</span>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                        Time: <span className="font-medium text-foreground">{format(new Date(delivery.deliveryTime), 'p')}</span>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-72 rounded-md border border-dashed">
                <Truck className="h-10 w-10 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">No upcoming deliveries scheduled.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Incoming Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <SMSTable smsLogs={smsLogs} />
        </CardContent>
      </Card>
    </div>
  );
}
