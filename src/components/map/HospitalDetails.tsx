'use client';

import { useTransition } from 'react';
import type { HospitalWithStatus, WaterStatusLevel } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Clock, Droplets, Phone, Thermometer, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { triggerAutoSchedule } from '@/app/map/actions';
import { Skeleton } from '../ui/skeleton';

const statusInfo: Record<WaterStatusLevel, { text: string; color: string; icon: React.ReactNode }> = {
  critical: { text: 'Critical', color: 'text-status-critical', icon: <AlertCircle className="h-5 w-5" /> },
  urgent: { text: 'Urgent', color: 'text-status-urgent', icon: <Clock className="h-5 w-5" /> },
  warning: { text: 'Warning', color: 'text-status-warning', icon: <Thermometer className="h-5 w-5" /> },
  safe: { text: 'Safe', color: 'text-status-safe', icon: <Droplets className="h-5 w-5" /> },
};

export default function HospitalDetails({ hospital }: { hospital: HospitalWithStatus | null }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAutoSchedule = () => {
    if (!hospital) return;
    startTransition(async () => {
      const result = await triggerAutoSchedule(hospital.id);
      toast({
        title: result.success ? 'Delivery Scheduled' : 'Scheduling Failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
    });
  };

  if (!hospital) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">Select a hospital on the map to see details.</p>
        <div className="space-y-4 mt-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Separator />
            <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
            </div>
        </div>
      </div>
    );
  }

  const { status } = hospital;
  const info = statusInfo[status.level];

  return (
    <Card className="border-0 shadow-none rounded-none">
      <CardHeader>
        <CardTitle className="text-xl">{hospital.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          {hospital.phone}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={cn('p-3 rounded-lg flex items-center gap-3', `bg-status-${status.level}/10`)}>
          <div className={cn('p-2 rounded-full', `bg-status-${status.level}/20`, info.color)}>
            {info.icon}
          </div>
          <div>
            <p className={cn('font-bold', info.color)}>{info.text}</p>
            <p className="text-sm text-muted-foreground">
              ~{Math.round(status.hoursRemaining)} hours of water remaining
            </p>
          </div>
        </div>
        
        <Separator />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Water</span>
            <span className="font-medium">{hospital.currentWater.toLocaleString()} L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Daily Usage</span>
            <span className="font-medium">{hospital.dailyUsage.toLocaleString()} L/day</span>
          </div>
        </div>

        {status.level === 'critical' && (
          <>
            <Separator />
            <div className="space-y-2">
                <h3 className="font-semibold">Emergency Action</h3>
                <p className="text-sm text-muted-foreground">
                    This hospital is in critical condition. An emergency water delivery is required.
                </p>
                <Button 
                    className="w-full" 
                    onClick={handleAutoSchedule}
                    disabled={isPending}
                >
                    <Truck className="mr-2 h-4 w-4" />
                    {isPending ? 'Scheduling...' : 'Auto-Schedule Emergency Delivery'}
                </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
